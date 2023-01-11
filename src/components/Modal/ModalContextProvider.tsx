import React, { createContext, FC, ReactElement, useContext, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import styles from './ModalContextProvider.module.less';
import { ShowMessage, useMessage } from './useMessage';

interface ModalContextValue {
  message: ShowMessage,
  addOpenedModal: (modalId: string) => void;
  removeOpenedModal: (modalId: string) => void;
  showConfirmationModal: (modalId: string, node: React.ReactElement) => void;
  openedModals: string[];
}

const ModalContext = createContext<ModalContextValue>({
  addOpenedModal: () => {},
  removeOpenedModal: () => {},
  showConfirmationModal: () => {},
  openedModals: [],
  message: (() => {}) as unknown as ShowMessage,
});

interface ModalContextProviderProps {
  children: ReactElement
}

export function useModalContext () {
  return useContext(ModalContext);
};

let scrollPosition = 0;

export const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [openedModals, setOpenedModals] = useState<string[]>([]);
  const [modalElement, setModalElement] = useState(null);
  const [message, contextHolder] = useMessage();

  useIsomorphicLayoutEffect(() => {
    if (openedModals.length) {
      scrollPosition = window.pageYOffset;
      Object.assign(document.body.style, {
        top: `-${scrollPosition}px`,
        position: 'fixed',
        width: '100%',
      });
    } else {
      Object.assign(document.body.style, {
        position: '',
        top: '',
        width: '',
      });
      window.scrollTo(0, scrollPosition);
    }
  }, [openedModals.length]);

  const memoizedValue = useMemo(() => {
    return {
      addOpenedModal: (modalId) => {
        setOpenedModals(prev => [...prev, modalId]);
      },
      removeOpenedModal: (modalId) => {
        setOpenedModals(prev => prev.filter(item => item !== modalId));
      },
      showConfirmationModal: (modalId, modalElement) => {
        setOpenedModals(prev => [...prev, modalId]);
        setModalElement(modalElement);
      },
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{ ...memoizedValue, openedModals, message }}
    >
      {modalElement}
      {contextHolder}
      {children}
      <div
        className={styles.modalBackdrop}
        style={{
          display: openedModals.length > 0 ? 'initial' : 'none',
        }}
      />
    </ModalContext.Provider>
  );
};
