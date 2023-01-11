import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { nanoid } from 'nanoid';
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import IconClose from '@icons/close.svg';
import IconButton from '@components/buttons/IconButton';
import Text from '@components/Text';
import styles from './Modal.module.less';
import { useModalContext } from './ModalContextProvider';
import { ClientOnly } from '@components/ClientOnly';

const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  wrapperClassName?: string;
  modalClassName?: string;
  modalBodyClassName?: string;
  closeable?: boolean;
  noShadow?: boolean;
  header?: React.ReactNode;
  predefinedModalId?: string;
  centered?: boolean;
  layer?: number;
  style?: CSSProperties;
  destroyOnClose?: boolean;
} & Pick<CSSProperties, 'width' | 'minWidth' | 'maxWidth' | 'height' | 'minHeight' | 'maxHeight'>

function useModalId() {
  const modalIdRef = useRef<string>(nanoid());
  return modalIdRef.current;
}

// TODO: Add animation on open
export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  modalClassName,
  modalBodyClassName,
  wrapperClassName,
  closeable = true,
  noShadow = false,
  predefinedModalId = null,
  centered = false,
  layer = 1,
  style,
  destroyOnClose = true,

  width,
  minWidth = 520,
  maxWidth,
  height,
  minHeight,
  maxHeight,
}) => {
  const modalRef = useRef<HTMLDivElement>();
  const modalId = useModalId();
  const [isFocusTrapped, setIsFocusTrapped] = useState(false);
  const { addOpenedModal, removeOpenedModal } = useModalContext();
  const [shouldBeMounted, setShouldBeMounted] = useState(false);

  useEffect(() => {
    setIsFocusTrapped(!!open);
  }, [open]);

  useEffect(() => {
    if (predefinedModalId) return;

    if (open) {
      addOpenedModal(modalId);
    } else {
      removeOpenedModal(modalId);
    }
  }, [addOpenedModal, modalId, open, removeOpenedModal, predefinedModalId, destroyOnClose]);

  useEffect(() => {
    return () => {
      removeOpenedModal(modalId);
    };
  }, [modalId, removeOpenedModal]);

  useEffect(() => {
    if (open) {
      setShouldBeMounted(true);
    }
    if (destroyOnClose && !open) {
      setShouldBeMounted(false);
    }
  }, [open, destroyOnClose]);

  if (!modalRoot || !shouldBeMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <ClientOnly>
      <FocusTrap
        active={isFocusTrapped}
        focusTrapOptions={{
          allowOutsideClick: closeable,
          initialFocus: () => {
            if (modalRef.current == null) {
              return undefined;
            }

            // First try to locate a custom autofocus element
            const autofocusElement = modalRef.current.querySelector('.modal-autofocus');
            if (autofocusElement) {
              return autofocusElement as HTMLElement;
            }

            // Then try to locate the first interactive control
            const firstElement = modalRef.current.querySelector('button, input, textarea, select, details');
            if (firstElement) {
              return firstElement as HTMLElement;
            }

            // Otherwise, focus the modal element itself
            return modalRef.current;
          },
        }}
      >
        <div
          className={classNames(styles.modalWrapper, wrapperClassName, {
            [styles.hidden]: !open,
          })}
          style={{
            zIndex: layer * 200,
            ...style,
          }}
        >
          <div className={styles.closeArea} onClick={onClose} />
          <div
            ref={modalRef}
            tabIndex={-1}
            className={
              classNames(styles.modal, {
                [styles.withShadow]: !noShadow,
                [styles.centered]: centered,
              }, modalClassName)
            }
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                onClose();
              }
            }}
            style={{
              width: width,
              height: height,
              minWidth: minWidth,
              maxWidth: maxWidth,
              minHeight: minHeight,
              maxHeight: maxHeight,
            }}
          >
            {!title && closeable &&
              <IconButton
                icon={<IconClose />}
                transparent
                variant="secondary"
                size="small"
                className={styles.absoluteCloseButton}
                onClick={() => onClose()}
              />
            }
            {title && <div className={styles.modalHeader}>
              {typeof title === 'string' ?
                <Text
                  extrabold
                  size="body1"
                  md={'title4'}
                  family="syne"
                  className={styles.modalTitle}
                >
                  {title}
                </Text> : title
              }
              {closeable &&
                <IconButton
                  icon={<IconClose />}
                  transparent
                  variant="secondary"
                  size="small"
                  onClick={() => onClose()}
                />
              }
            </div>}
            <div className={classNames(styles.modalBody, modalBodyClassName)}>
              {open && children}
            </div>
          </div>
        </div>
      </FocusTrap>
    </ClientOnly>,
    modalRoot
  );
};
