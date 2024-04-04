import { Meta, StoryObj } from "@storybook/react";
import { fn } from '@storybook/test';
import TableHeaders from "../components/TableHeaders";


const meta = {
    title: 'Components/TableHeaders',
    component: TableHeaders,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    args: { handleSort: fn() }
  } satisfies Meta<typeof TableHeaders>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Initial: Story = {
    args: {
        order: "desc",
        orderBy: "popular"
    },
  };