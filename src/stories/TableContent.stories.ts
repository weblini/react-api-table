import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TableContent from "../components/TableContent";

const meta = {
  title: "Components/TableContent",
  component: TableContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    resetState: fn(),
    isLoading: false,
    error: undefined,
    data: { items: undefined },
    rows: 5,
  },
} satisfies Meta<typeof TableContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
  args: {
    data: {
      items: [
        {
          count: 2529336,
          name: "javascript",
        },
        {
          count: 2192979,
          name: "python",
        },
        {
          count: 1917582,
          name: "java",
        },
        {
          count: 1615340,
          name: "c#",
        },
        {
          count: 1464631,
          name: "php",
        },
      ],
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    data: { items: [] },
  },
};

export const Error: Story = {
  args: {
    error: { message: "An error occured", name: "Error" },
  },
};
