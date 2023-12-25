import type { Meta, StoryObj } from '@storybook/react';

import SbtBtn from './SbtBtn';

const meta = {
  title: 'UI/Button',
  component: SbtBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Вариант',
      defaultValue: 'Active',
      options: ['active', 'hover', 'pressed', 'disabled'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof SbtBtn>;

export default meta;
type Story = StoryObj<typeof meta>;
//----------------------------------------
export const Active: Story = {
  args: {
    variant: 'active',
  },
};
export const Hover: Story = {
  args: {
    variant: 'hover',
  },
};
export const Pressed: Story = {
  args: {
    variant: 'pressed',
  },
};
export const Disabled: Story = {
  args: {
    variant: 'disabled',
  },
};
