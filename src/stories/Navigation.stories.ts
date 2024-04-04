import { TablePagination } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from '@storybook/test';


const meta = {
    title: 'Components/TablePagination',
    component: TablePagination,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onPageChange: fn() }
  } satisfies Meta<typeof TablePagination>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const FirstPage: Story = {
    args: {
      count: -1,
      page: 0,
      rowsPerPage: 5,
      showFirstButton: true,
      rowsPerPageOptions: []
    },
  };