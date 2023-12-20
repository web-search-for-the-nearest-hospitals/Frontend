import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Header from '../../../widgets/header/ui/index';
import logo1 from '../../../shared/assets/icons/logo.svg';
import logo2 from '../../../shared/assets/icons/logo2.svg';

const meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logo: {
      options: [logo1, logo2],
      control: { type: 'radio' },
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    logo: logo2,
  },
};
