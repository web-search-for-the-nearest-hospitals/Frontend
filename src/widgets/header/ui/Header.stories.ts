import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Header from './index';

const meta = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logo: {
      description: 'Логотип',
      options: ['logoClinic', 'logoLoupe'],
      control: { type: 'radio' },
    },
    variant: {
      description: 'Вариант стилизации',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    logo: 'logoClinic',
  },
};

export const Secondary: Story = {
  args: {
    logo: 'logoLoupe',
  },
};
