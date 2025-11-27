/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';

import { Checkbox } from '../components/ui/Checkbox';

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Checkbox size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Checkbox color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Label position',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox disabled label="Disabled" />
      <Checkbox disabled defaultChecked label="Disabled Checked" />
      <Checkbox disabled indeterminate label="Disabled Indeterminate" />
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
      <Checkbox size="small" label="Small" />
      <Checkbox size="medium" label="Medium" />
      <Checkbox size="large" label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox color="primary" defaultChecked label="Primary" />
      <Checkbox color="secondary" defaultChecked label="Secondary" />
      <Checkbox color="error" defaultChecked label="Error" />
      <Checkbox color="warning" defaultChecked label="Warning" />
      <Checkbox color="info" defaultChecked label="Info" />
      <Checkbox color="success" defaultChecked label="Success" />
    </div>
  ),
};

export const LabelPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox labelPlacement="end" label="Label End (default)" />
      <Checkbox labelPlacement="start" label="Label Start" />
      <Checkbox labelPlacement="top" label="Label Top" />
      <Checkbox labelPlacement="bottom" label="Label Bottom" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {},
};

export const ControlledCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked((e.target as HTMLInputElement).checked)}
          label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
        />
        <button onClick={() => setChecked(!checked)}>
          Toggle Checkbox
        </button>
      </div>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['option1']);
    
    const handleChange = (value: string) => {
      setSelectedItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Select your preferences:
        </div>
        <Checkbox
          checked={selectedItems.includes('option1')}
          onChange={() => handleChange('option1')}
          label="Option 1"
        />
        <Checkbox
          checked={selectedItems.includes('option2')}
          onChange={() => handleChange('option2')}
          label="Option 2"
        />
        <Checkbox
          checked={selectedItems.includes('option3')}
          onChange={() => handleChange('option3')}
          label="Option 3"
        />
        <div style={{ marginTop: '16px', color: '#666' }}>
          Selected: {selectedItems.join(', ') || 'none'}
        </div>
      </div>
    );
  },
};

export const SelectAllPattern: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: true },
      { id: 3, label: 'Item 3', checked: false },
    ]);
    
    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const indeterminate = someChecked && !allChecked;
    
    const handleSelectAll = () => {
      const newChecked = !allChecked;
      setItems(items.map((item) => ({ ...item, checked: newChecked })));
    };
    
    const handleItemChange = (id: number) => {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={handleSelectAll}
          label="Select All"
          style={{ fontWeight: 'bold' }}
        />
        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <Checkbox
              key={item.id}
              checked={item.checked}
              onChange={() => handleItemChange(item.id)}
              label={item.label}
            />
          ))}
        </div>
      </div>
    );
  },
};
