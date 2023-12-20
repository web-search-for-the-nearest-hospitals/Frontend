import type { Meta, StoryObj } from '@storybook/react';

import CheckBox from '../../../shared/ui/CheckBox/CheckBox';

const metaCB = {
  title: 'CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color', description: 'Цвет чекбокса' },
    label: { description: 'Название чекбокса', defaultValue: 'PrimaryCB' },
    variant: {
      description: 'Вариант',
      defaultValue: 'Primary',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CheckBox>;

export default metaCB;
type Story = StoryObj<typeof metaCB>;
//----------------------------------------

//----------------------------------------
export const PrimaryCB: Story = {
  args: {
    color: '#C4BFBF',
    label: 'Круглосуточные клиники',
    backgroundColor: '#FFF',
    //backgroundColor: '#C4BFBF',
  },
};
export const SecondaryCB: Story = {
  args: {
    color: '#5254CA',
    label: 'Круглосуточные клиники',
  },
};
