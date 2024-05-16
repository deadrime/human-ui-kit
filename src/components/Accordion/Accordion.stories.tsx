import React from 'react';
import { Meta } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion';

export default {
  component: Accordion,
} as Meta<typeof Accordion>;

export const Default = {
  render: (args) => (
    <>
      <Accordion {...args}>
        <Accordion.Summary>
          How does changing or canceling work?
        </Accordion.Summary>
        <Accordion.Details>
          Here will be text which explains how does changing or canceling work.
        </Accordion.Details>
      </Accordion>
    </>
  ),
  args: {
    size: 'normal',
  } as AccordionProps,
};
