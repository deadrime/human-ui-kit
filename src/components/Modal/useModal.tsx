import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useModalContext } from './ModalContextProvider';
import { Modal } from './Modal';
import Button from '@components/buttons';
import Text from '@components/Text';
import styles from './Modal.module.less';

export interface ConfirmationProps {
  onOk: () => void;
  onCancel?: () => void;
  content: React.ReactNode;
  title?: React.ReactNode;
  okText?: string;
}

const defaultTitle = (
  <Text
    family={'syne'}
    size="body1"
    md={'title4'}
    extrabold
  >
    CONFIRMATION
  </Text>
);

export const ConfirmModal: React.FC<ConfirmationProps & { id: string }> = ({
  id,
  title = 'Confirmation',
  content,
  onCancel,
  onOk,
  okText = 'Confirm',
}) => {
  const modalContext = useModalContext();
  const open = modalContext.openedModals.includes(id);
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      await onOk?.();
      modalContext.removeOpenedModal(id);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    modalContext.removeOpenedModal(id);
    onCancel?.();
  };

  return (
    <Modal
      predefinedModalId={id}
      title={title || defaultTitle}
      open={open}
      onClose={handleCancel}
      layer={2}
    >
      <div className={styles.confirmationModalBodyWrapper}>
        <div>{content}</div>
        <Button
          loading={loading}
          filled
          style={{ marginTop: 40 }}
          size={'large'}
          variant={'primary'}
          onClick={handleOk}
        >
          {okText}
        </Button>
      </div>
    </Modal>
  );
};

export const useModal = () => {
  const modalContext = useModalContext();

  const confirm = (props: ConfirmationProps) => {
    const confirmationModalId = nanoid();
    const modal = <ConfirmModal id={confirmationModalId} {...props} />;
    modalContext.showConfirmationModal(confirmationModalId, modal);
  };

  return {
    confirm,
    message: modalContext.message,
  };
};
