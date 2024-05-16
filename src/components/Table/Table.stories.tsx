import React from 'react';
import { Meta } from '@storybook/react';
import Table, { TableProps, createColumnHelper } from './Table';
import Text from '@components/Text';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Table,
} as Meta<typeof Table>;

const data = [
  {
    column1: 'Column 1 text',
    column2: 'Column 2 text',
    column3: 'Column 3 text',
    column4: 'Some value',
  },
  {
    column1: 'asdasd',
    column2: 'asdsada',
    column3: 'Column 3 text',
    column4: 'asdasdsadasd',
  },
];

const columnHelper = createColumnHelper<typeof data[0]>();

const columns = [
  columnHelper.display({
    id: 'column-1',
    header: 'Column 1',
    cell: ({ row }) => (
      <Text>
        {row.original.column1}
      </Text>
    ),
  }),
  columnHelper.accessor('column2', {
    id: 'column-2',
    header: 'Column 2',
  }),
  columnHelper.accessor('column3', {
    id: 'column-3',
    header: 'Column 3',
  }),
  columnHelper.accessor('column4', {
    id: 'column-4',
    header: 'Column 4',
  }),
];

export const Default = {
  render: (args) => <Table {...args} />,
  args: {
    data,
    columns,
    mobileColumnToDisplay: 'column-1',
  } as TableProps<typeof data[0]>,
};
