/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';

import { Switch } from '../components/ui/Switch';

const meta = {
  title: 'Components/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Switch size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Switch color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Switch',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Switch',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch disabled label="Disabled Off" />
      <Switch disabled defaultChecked label="Disabled On" />
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
      <Switch size="small" defaultChecked label="Small" />
      <Switch size="medium" defaultChecked label="Medium" />
      <Switch size="large" defaultChecked label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch color="primary" defaultChecked label="Primary" />
      <Switch color="secondary" defaultChecked label="Secondary" />
      <Switch color="error" defaultChecked label="Error" />
      <Switch color="warning" defaultChecked label="Warning" />
      <Switch color="info" defaultChecked label="Info" />
      <Switch color="success" defaultChecked label="Success" />
    </div>
  ),
};

export const LabelPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch labelPlacement="end" defaultChecked label="Label End (default)" />
      <Switch labelPlacement="start" defaultChecked label="Label Start" />
      <Switch labelPlacement="top" defaultChecked label="Label Top" />
      <Switch labelPlacement="bottom" defaultChecked label="Label Bottom" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    defaultChecked: true,
  },
};

export const ControlledSwitch: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          checked={checked}
          onChange={(e) => setChecked((e.target as HTMLInputElement).checked)}
          label={`Switch is ${checked ? 'ON' : 'OFF'}`}
        />
        <button onClick={() => setChecked(!checked)}>
          Toggle Switch
        </button>
      </div>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      soundEffects: false,
    });
    
    const handleChange = (key: string) => (e: Event) => {
      const target = e.target as HTMLInputElement;
      setSettings({ ...settings, [key]: target.checked });
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Settings
        </div>
        <Switch
          checked={settings.notifications}
          onChange={handleChange('notifications')}
          label="Enable Notifications"
        />
        <Switch
          checked={settings.darkMode}
          onChange={handleChange('darkMode')}
          label="Dark Mode"
        />
        <Switch
          checked={settings.autoSave}
          onChange={handleChange('autoSave')}
          label="Auto Save"
        />
        <Switch
          checked={settings.soundEffects}
          onChange={handleChange('soundEffects')}
          label="Sound Effects"
        />
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <pre style={{ margin: 0, fontSize: '0.875rem' }}>
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      termsAccepted: false,
      newsletter: false,
      marketing: false,
    });
    
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };
    
    const handleChange = (key: string) => (e: Event) => {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [key]: target.checked });
    };
    
    return (
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}
        onSubmit={handleSubmit}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Sign Up Form
        </div>
        
        <Switch
          required
          checked={formData.termsAccepted}
          onChange={handleChange('termsAccepted')}
          label="I accept the terms and conditions"
        />
        
        <Switch
          checked={formData.newsletter}
          onChange={handleChange('newsletter')}
          label="Subscribe to newsletter"
        />
        
        <Switch
          checked={formData.marketing}
          onChange={handleChange('marketing')}
          label="Receive marketing emails"
        />
        
        <button
          type="submit"
          style={{ padding: '8px 16px', cursor: 'pointer', marginTop: '8px' }}
          disabled={!formData.termsAccepted}
        >
          Submit
        </button>
      </form>
    );
  },
};

export const CustomLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch
        defaultChecked
        onLabel="ON"
        offLabel="OFF"
        label="With ON/OFF labels"
      />
      <Switch
        onLabel="✓"
        offLabel="✗"
        label="With checkmarks"
      />
      <Switch
        defaultChecked
        onLabel="1"
        offLabel="0"
        label="With binary labels"
      />
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    
    const handleChange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const newValue = target.checked;
      
      setIsLoading(true);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsEnabled(newValue);
      setIsLoading(false);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          checked={isEnabled}
          disabled={isLoading}
          onChange={handleChange}
          label={isLoading ? 'Saving...' : `Feature is ${isEnabled ? 'enabled' : 'disabled'}`}
        />
        {isLoading && (
          <div style={{ color: '#666', fontSize: '0.875rem' }}>
            Processing your request...
          </div>
        )}
      </div>
    );
  },
};

export const CompactGroup: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      feature1: true,
      feature2: false,
      feature3: true,
      feature4: false,
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '300px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Feature Toggles
        </div>
        {Object.entries(features).map(([key, value]) => (
          <Switch
            key={key}
            size="small"
            checked={value}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setFeatures({ ...features, [key]: target.checked });
            }}
            label={`Feature ${key.slice(-1)}`}
          />
        ))}
      </div>
    );
  },
};
