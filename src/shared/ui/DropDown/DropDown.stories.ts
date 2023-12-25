import type { Meta, StoryObj } from '@storybook/react';

import DropDown from './DropDown';
const doctors = ['Терапевт', 'Хирург', 'Стоматолог'];

const meta = {
  title: 'UI/DropDown',
  component: DropDown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Вариант',
      defaultValue: 'Primary',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    values: { description: 'Значения списка', defaultValue: 'Primary' },
    label: {
      description: 'Надпись на выпадающем списке',
      defaultValue: 'Primary',
    },
    backgroundColor: { description: 'Цвет поля выпадающего списка', defaultValue: 'Primary' },
  },
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;
//----------------------------------------

//----------------------------------------
export const Primary: Story = {
  args: {
    values: doctors,
    label: 'Найти',
    variant: 'primary',
    backgroundColor: '#FFF',
  },
};
export const Secondary: Story = {
  args: {
    values: doctors,
    label: 'Искать!',
    variant: 'secondary',
    backgroundColor: '#F0F0F0',
  },
};
