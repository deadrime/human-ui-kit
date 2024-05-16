import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '@components/buttons';
import { useModal } from './useModal';

// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Modal,
} as Meta<typeof Modal>;

export const Default = {
  render: (args) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Button onClick={() => setShowModal(true)}>Open modal</Button>
        <Modal
          {...args}
          title="Some title"
          open={showModal}
          onClose={() => setShowModal(false)}
        >Some modal content</Modal>
      </>
    );
  },
};

export const message = {
  render: () => {
    const { message } = useModal();

    return (
      <>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => message.warning('some warning')}>warning</Button>
          <Button onClick={() => message.info('some info')}>info</Button>
          <Button onClick={() => message.success('some success')}>success</Button>
          <Button onClick={() => message.error('some error')}>error</Button>
        </div>
      </>
    );
  },
  parameters:{
    controls: {
      exclude: /.*/g,
    },
  },
};
