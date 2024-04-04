import { Meta, StoryObj } from "@storybook/react";
import { fn } from '@storybook/test';
import PageCountSelector from "../components/PageCountSelector";


const meta = {
    title: 'Components/PageCountSelector',
    component: PageCountSelector,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    args: { handleChangeRows: fn() }
  } satisfies Meta<typeof PageCountSelector>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Initial: Story = {
    args: {
        rows: 5
    },
  };