import React from 'react'
import { nanoid } from 'nanoid';
import { useCallback, useEffect } from 'react';
import { useModalContext } from '@components/Modal/ModalContextProvider';
import { ShowMessage } from '@components/Modal/useMessage';
import { ConfirmationProps, ConfirmModal } from '@components/Modal/useModal';

export let confirm: (props: ConfirmationProps) => void = () => {};
export let message: ShowMessage = (() => {}) as unknown as ShowMessage;

export const useSystemModals = () => {
  const modalContext = useModalContext();
  const confirmModal = useCallback((props: ConfirmationProps) => {
    const confirmationModalId = nanoid();
    const modal = <ConfirmModal id={confirmationModalId} {...props} />;
    modalContext.showConfirmationModal(confirmationModalId, modal);
  }, [modalContext]);

  useEffect(() => {
    confirm = confirmModal;
    message = modalContext.message;
  }, [confirmModal, modalContext.message]);
};
