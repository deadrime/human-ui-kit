import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Pagination, { PaginationProps } from './Pagination';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Pagination,
} as Meta<any>;

export const Default = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div style={{ width: 250 }}>
        <Pagination
          current={currentPage}
          onChange={setCurrentPage}
          {...args}
        />
      </div>
    );
  },
  args: {
    pageSize: 10,
    total: 100,
    showSizeChanger: false,
    showLessItems: true,
  } as PaginationProps,
};
