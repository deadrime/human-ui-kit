import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import Text from '@components/Text';
import { LOADING_STATUSES } from '@const/loading-statuses';
import { useMeasure } from 'react-use';
import styles from './Mentions.module.less';
import getCaretCoordinates from 'textarea-caret';
import { Spinner } from '../Spinner';
import classNames from 'classnames';
import { MentionsProps } from './types';

const SYMBOL = '@';
const MAX_PROFILES_TO_SHOW = 5;

const Mentions = <T extends Record<string, any>>({ children, ...props }: MentionsProps<T>) => {
  const {
    suggestions,
    suggestionsLoadingStatus,
    refreshSuggestions,
    renderSuggestionItem,
  } = props;

  const [suggestionsMeasureRef, suggestionsMeasurements] = useMeasure();

  const profilesToShow = useMemo(() => {
    return suggestions.slice(0, MAX_PROFILES_TO_SHOW);
  }, [suggestions]);

  const hasMore = useMemo(() => suggestions.length > profilesToShow.length, [
    suggestions,
    profilesToShow,
  ]);

  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [forcefullyHidden, setForcefullyHidden] = useState(false);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const suggestionsProfileListRef = useRef(null);

  const value = useMemo(() => props?.value || children?.props?.value, [
    props?.value,
    children?.props?.value,
  ]);

  const applyMention = (e, username: string) => {
    e.preventDefault();
    const onChange = props?.onChange || children?.props?.onChange;
    const message = value;
    const parts = [];

    let left = 0, right = 0;
    const end = textareaRef.current.selectionEnd;

    while (right <= end) {
      if (message[right] === SYMBOL) {
        parts.push(message.substring(left, right));
        left = right;
      }
      right++;
    }

    const last = message.substring(end);

    parts.push(`@${username} `);
    const first = parts.join('');

    setSuggestionsVisible(false);
    onChange(first.concat(last));
    textareaRef.current.focus();
  };

  const { left, height } = textareaRef.current
    ? getCaretCoordinates(textareaRef.current, textareaRef.current?.selectionEnd)
    : { left: 0, height: 0 };

  useEffect(() => {
    const message = value;
    if (!message) return;
    setForcefullyHidden(false);
    let end = textareaRef.current?.selectionEnd;

    let username = '';
    let current = end;

    for (let left = end; left >= 0; left--) {
      if (message[left] === SYMBOL) {
        current = left + 1;
        while (current < end) {
          if (!message[current].match(/[A-Za-z0-9_]/)) {
            setSuggestionsVisible(false);
            return;
          }
          username += message[current];
          current += 1;
        }
        break;
      }
    }

    if (username) {
      refreshSuggestions(username);
      setSuggestionsVisible(true);
    } else {
      setSuggestionsVisible(false);
    }
  }, [value, refreshSuggestions, suggestionsVisible]);

  const showEmptySuggestions = useMemo(() => {
    return suggestionsLoadingStatus === LOADING_STATUSES.SUCCESS && suggestions.length === 0;
  }, [suggestions, suggestionsLoadingStatus]);

  const showNotReady = useMemo(() =>
    suggestionsLoadingStatus === LOADING_STATUSES.NOT_STARTED ||
    suggestionsLoadingStatus === LOADING_STATUSES.LOADING,
  [suggestionsLoadingStatus]);

  const suggestionsContainerInlineStyles = useMemo(() => {
    if (!containerRef?.current) return null;

    const { top: containerTop } = containerRef.current.getBoundingClientRect();
    if (containerTop < suggestionsMeasurements.height) {
      return {
        left,
        top: height,
      };
    }
    return {
      left,
      bottom: height * 2,
    };
  }, [suggestionsMeasurements.height, containerRef, left, height]);

  useIsomorphicLayoutEffect(() => {
    if (profilesToShow.length > 0) {
      suggestionsProfileListRef.current?.querySelector('button').focus();
    }
  }, [profilesToShow]);

  const keyPressHandler = useCallback((e) => {
    const isOnInput = document.activeElement === textareaRef.current;

    if (e.key === 'Escape') {
      setForcefullyHidden(true);
      textareaRef.current.focus();
      return;
    }

    if (e.key === 'Enter' && !isOnInput) {
      e.preventDefault();
      suggestionsProfileListRef.current.querySelector(`button.${styles.profile}:focus`).click();
      return;
    }

    if (e.key === 'ArrowDown') {
      const nextSibling = suggestionsProfileListRef?.current.querySelector(`button.${styles.profile}:focus + button`);
      if (nextSibling) {
        nextSibling.focus();
      } else {
        suggestionsProfileListRef.current.querySelector(`button.${styles.profile}:first-child`).focus();
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      const prevSibling = suggestionsProfileListRef?.current.querySelector(`button.${styles.profile}:focus`)?.previousSibling;
      if (prevSibling) {
        prevSibling.focus();
      } else {
        suggestionsProfileListRef.current.querySelector(`button.${styles.profile}:last-child`).focus();
      }
      return;
    }

    textareaRef.current.focus();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    el.addEventListener('keydown', keyPressHandler);

    return () => el.removeEventListener('keydown', keyPressHandler);
  }, [keyPressHandler]);


  return (
    <div className={styles.container} ref={containerRef}>
      {suggestionsVisible && !forcefullyHidden &&
        <div
          className={styles.suggestions}
          style={suggestionsContainerInlineStyles}
          ref={suggestionsMeasureRef}
        >
          {showEmptySuggestions &&
            <Text className={styles.noMatchText} size={'body2'}>No users found</Text>
          }
          {showNotReady &&
            <div className={styles.spinnerWrapper}>
              <Spinner style={{ alignSelf: 'center', color: 'var(--color-primary)' }} size={'large'} />
            </div>
          }
          {!showNotReady &&
            <div className={styles.profilesList} ref={suggestionsProfileListRef}>
              {profilesToShow.map(profile => (
                <button
                  className={classNames(styles.profile, { [styles.hasMore]: hasMore })}
                  key={profile.userID}
                  onClick={(e) => applyMention(e, profile.username)}
                >
                  {renderSuggestionItem(profile)}
                </button>
              ))}
            </div>}
          {hasMore && <Text className={styles.hasMoreText} size={'body2'}>Just keep typing...</Text>}
        </div>}
      {React.cloneElement(
        children,
        {
          ...children.props,
          ...props,
          ref: textareaRef,
        }
      )}
    </div>
  );
};

export default Mentions;
