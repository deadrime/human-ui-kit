import React from 'react';
import { Meta } from '@storybook/react';
import { Form, FormItem, useFormRef } from './index';
import Button from '@components/buttons';
import { TextInputWrapper } from '..';

export default {
  component: Form,
} as Meta<typeof Form>;


export const Default = {
  render: () => {
    const formRef = useFormRef();

    return (
      <Form ref={formRef}>
        <FormItem
          name="field1"
          label="Field 1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextInputWrapper placeholder='Placeholder' />
        </FormItem>
        <FormItem
          name="field2"
          label="Field 2"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <TextInputWrapper placeholder='Placeholder' />
        </FormItem>
        <FormItem
          name="field3"
          label="Field 3"
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <TextInputWrapper placeholder='Placeholder' />
        </FormItem>
        <Button
          onClick={() => {
            formRef.current.validateFields();
          }}
        >
          Custom validation
        </Button>
      </Form>
    );
  },
};
