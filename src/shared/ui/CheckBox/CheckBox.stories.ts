import type { Meta, StoryObj } from '@storybook/react';

import CheckBox from './CheckBox';

const meta = {
  title: 'UI/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color', description: 'Цвет чекбокса' },
    label: { description: 'Название чекбокса', defaultValue: 'Primary' },
    variant: {
      description: 'Вариант стилизации',
      defaultValue: 'primary',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;
//----------------------------------------

//----------------------------------------
export const Primary: Story = {
  args: {
    color: '#C4BFBF',
    label: 'Круглосуточные клиники',
  },
};
export const Secondary: Story = {
  args: {
    color: '#5254CA',
    label: 'Круглосуточные клиники',
  },
};
