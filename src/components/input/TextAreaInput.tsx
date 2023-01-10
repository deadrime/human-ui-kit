import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import React, { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { InputProps } from './types';
import { useIsomorphicLayoutEffect } from 'react-use';
import { ownerWindow } from '@utils/ownerWindow';
import { getStyleValue } from '@utils/getStyleValue';
import { useForwardRef } from '@hooks/useForwardRef';

interface AutosizeStyles {
  outerHeightStyle?: number;
  overflow?: boolean;
}

function getUpdatedAutosizeStyles({
  input,
  shadow,
  placeholder,
  minRows,
  maxRows,
}): AutosizeStyles {
  const containerWindow = ownerWindow(input);
  const computedStyle = containerWindow.getComputedStyle(input);

  // If input's width is shrunk and it's not visible, don't sync height.
  if (computedStyle.width === '0px') {
    return {};
  }

  shadow.style.width = computedStyle.width;
  shadow.value = input.value || placeholder || 'x';
  if (shadow.value.slice(-1) === '\n') {
    // Certain fonts which overflow the line height will cause the textarea
    // to report a different scrollHeight depending on whether the last line
    // is empty. Make it non-empty to avoid this issue.
    shadow.value += ' ';
  }

  const boxSizing = computedStyle['box-sizing'];
  const padding =
    getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
  const border =
    getStyleValue(computedStyle, 'border-bottom-width') +
    getStyleValue(computedStyle, 'border-top-width');

  // The height of the inner content
  const innerHeight = shadow.scrollHeight;

  // Measure height of a textarea with a single row
  shadow.value = 'x';
  const singleRowHeight = shadow.scrollHeight;

  // The height of the outer content
  let outerHeight = innerHeight;

  if (minRows) {
    outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
  }
  if (maxRows) {
    outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
  }
  outerHeight = Math.max(outerHeight, singleRowHeight);

  // Take the box sizing into account for applying this value as a style.
  const outerHeightStyle: number = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
  const overflow = Math.abs(outerHeight - innerHeight) <= 1;

  return { outerHeightStyle, overflow };
}

export interface TextAreaInputProps extends Omit<InputProps<string>, 'ref'> {
  maxRows?: number;
  minRows?: number;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>((
  {
    onChange,
    onPaste,
    value,
    disabled,
    readOnly,
    placeholder,
    maxRows,
    minRows = 1,
    onFocus,
    onBlur,
    onKeyDown,
  },
  ref
) => {
  const inputRef = useForwardRef(ref);
  const shadowRef = useRef<HTMLTextAreaElement>();
  const renders = useRef(0);

  const [autosizeStyles, setAutosizeStyles] = useState<AutosizeStyles>({});

  const updateAutosizeStyles = useCallback((prevStyles: AutosizeStyles, newStyles: AutosizeStyles) => {
    const { outerHeightStyle, overflow } = newStyles;
    // Need a large enough difference to update the height.
    // This prevents infinite rendering loop.
    if (
      renders.current < 20 &&
      ((outerHeightStyle > 0 &&
        Math.abs((prevStyles.outerHeightStyle || 0) - outerHeightStyle) > 1) ||
        prevStyles.overflow !== overflow)
    ) {
      renders.current += 1;
      return {
        overflow,
        outerHeightStyle,
      };
    }
    return prevStyles;
  }, [renders]);

  useIsomorphicLayoutEffect(() => {
    const newState = getUpdatedAutosizeStyles({
      input: inputRef.current,
      maxRows,
      minRows,
      placeholder,
      shadow: shadowRef.current,
    });

    if (isEmpty(newState)) {
      return;
    }

    setAutosizeStyles((prevState) => {
      return updateAutosizeStyles(prevState, newState);
    });
  }, [value, inputRef, shadowRef, maxRows, minRows, placeholder, updateAutosizeStyles]);

  useEffect(() => {
    const handleResize = debounce(() => {
      renders.current = 0;

      if (inputRef.current) {
        const newState = getUpdatedAutosizeStyles({
          input: inputRef.current,
          maxRows,
          minRows,
          placeholder,
          shadow: shadowRef.current,
        });

        if (isEmpty(newState)) {
          return;
        }

        // In React 18, state updates in a ResizeObserver's callback are happening after the paint which causes flickering
        // when doing some visual updates in it. Using flushSync ensures that the dom will be painted after the states updates happen
        // Related issue - https://github.com/facebook/react/issues/24331
        flushSync(() => {
          setAutosizeStyles((prevState) => {
            return updateAutosizeStyles(prevState, newState);
          });
        });
      }
    });

    const containerWindow = ownerWindow(inputRef.current);
    containerWindow.addEventListener('resize', handleResize);
    let resizeObserver: ResizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(inputRef.current);
    }

    return () => {
      handleResize.cancel();
      containerWindow.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [inputRef, maxRows, minRows, placeholder, updateAutosizeStyles]);

  useEffect(() => {
    renders.current = 0;
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    renders.current = 0;

    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <textarea
        onPaste={onPaste}
        ref={inputRef}
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        rows={minRows}
        style={{
          height: autosizeStyles.outerHeightStyle,
          // Need a large enough difference to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: autosizeStyles.overflow ? 'hidden' : null,
          resize: 'none',
          padding: 0,
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={onKeyDown}
      />
      <textarea
        aria-hidden
        className="input"
        readOnly
        ref={shadowRef}
        tabIndex={-1}
        style={{
          // Visibility needed to hide the extra text area on iPads
          visibility: 'hidden',
          // Remove from the content flow
          position: 'absolute',
          // Ignore the scrollbar width
          overflow: 'hidden',
          height: 0,
          top: 0,
          left: 0,
          // Create a new layer, increase the isolation of the computed values
          transform: 'translateZ(0)',
          padding: 0,
        }}
      />
    </>
  );
});
