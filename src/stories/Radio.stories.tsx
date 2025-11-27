/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';

import { Radio, RadioGroup } from '../components/ui/Radio';

const meta = {
  title: 'Components/Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Radio size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Radio color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the radio',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Label position',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Radio',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Radio',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio disabled label='Disabled' />
      <Radio disabled defaultChecked label='Disabled Checked' />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio size='small' defaultChecked label='Small' />
      <Radio size='medium' defaultChecked label='Medium' />
      <Radio size='large' defaultChecked label='Large' />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio color='primary' defaultChecked label='Primary' />
      <Radio color='secondary' defaultChecked label='Secondary' />
      <Radio color='error' defaultChecked label='Error' />
      <Radio color='warning' defaultChecked label='Warning' />
      <Radio color='info' defaultChecked label='Info' />
      <Radio color='success' defaultChecked label='Success' />
    </div>
  ),
};

export const LabelPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio labelPlacement='end' defaultChecked label='Label End (default)' />
      <Radio labelPlacement='start' defaultChecked label='Label Start' />
      <Radio labelPlacement='top' defaultChecked label='Label Top' />
      <Radio labelPlacement='bottom' defaultChecked label='Label Bottom' />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    defaultChecked: true,
  },
};

export const BasicRadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioGroup name='basic-group' value={selected} onChange={setSelected}>
          <Radio value='option1' label='Option 1' />
          <Radio value='option2' label='Option 2' />
          <Radio value='option3' label='Option 3' />
        </RadioGroup>
        <div style={{ marginTop: '16px', color: '#666' }}>Selected: {selected}</div>
      </div>
    );
  },
};

export const HorizontalRadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioGroup name='horizontal-group' value={selected} onChange={setSelected} row>
          <Radio value='option1' label='Option 1' />
          <Radio value='option2' label='Option 2' />
          <Radio value='option3' label='Option 3' />
        </RadioGroup>
        <div style={{ marginTop: '16px', color: '#666' }}>Selected: {selected}</div>
      </div>
    );
  },
};

export const ControlledRadio: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <RadioGroup name='controlled-group' value={selected} onChange={setSelected}>
          <Radio value='yes' label='Yes' />
          <Radio value='no' label='No' />
          <Radio value='maybe' label='Maybe' />
        </RadioGroup>
        <button onClick={() => setSelected('yes')}>Select "Yes"</button>
        <button onClick={() => setSelected('')}>Clear Selection</button>
        <div style={{ marginTop: '8px', color: '#666' }}>Selected: {selected || 'none'}</div>
      </div>
    );
  },
};

export const ColoredRadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('primary');

    return (
      <RadioGroup name='colored-group' value={selected} onChange={setSelected}>
        <Radio value='primary' color='primary' label='Primary' />
        <Radio value='secondary' color='secondary' label='Secondary' />
        <Radio value='success' color='success' label='Success' />
        <Radio value='error' color='error' label='Error' />
        <Radio value='warning' color='warning' label='Warning' />
        <Radio value='info' color='info' label='Info' />
      </RadioGroup>
    );
  },
};

export const SizedRadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('medium');

    return (
      <RadioGroup name='sized-group' value={selected} onChange={setSelected}>
        <Radio value='small' size='small' label='Small' />
        <Radio value='medium' size='medium' label='Medium' />
        <Radio value='large' size='large' label='Large' />
      </RadioGroup>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      size: 'medium',
      color: 'blue',
      delivery: 'standard',
    });

    return (
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}
        onSubmit={(e) => {
          e.preventDefault();
          alert(JSON.stringify(preferences, null, 2));
        }}
      >
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>Size:</div>
          <RadioGroup
            name='size'
            value={preferences.size}
            onChange={(value) => setPreferences({ ...preferences, size: value as string })}
          >
            <Radio value='small' label='Small' />
            <Radio value='medium' label='Medium' />
            <Radio value='large' label='Large' />
          </RadioGroup>
        </div>

        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>Color:</div>
          <RadioGroup
            name='color'
            value={preferences.color}
            onChange={(value) => setPreferences({ ...preferences, color: value as string })}
            row
          >
            <Radio value='red' label='Red' />
            <Radio value='blue' label='Blue' />
            <Radio value='green' label='Green' />
          </RadioGroup>
        </div>

        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>Delivery:</div>
          <RadioGroup
            name='delivery'
            value={preferences.delivery}
            onChange={(value) => setPreferences({ ...preferences, delivery: value as string })}
          >
            <Radio value='standard' label='Standard (5-7 days)' />
            <Radio value='express' label='Express (2-3 days)' />
            <Radio value='overnight' label='Overnight' />
          </RadioGroup>
        </div>

        <button type='submit' style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    );
  },
};
