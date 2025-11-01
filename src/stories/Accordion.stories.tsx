import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';
import { Accordion, AccordionSummary, AccordionDetails } from '../components/ui/Accordion';
import { Typography } from '../components/ui/Typography';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'Accordions contain creation flows and allow lightweight editing of an element.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevation', 'outlined', 'filled'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    disabled: {
      control: 'boolean',
    },
    square: {
      control: 'boolean',
    },
    defaultExpanded: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary>
        <Typography variant="subtitle1">Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div>
      <Accordion>
        <AccordionSummary>
          <Typography variant="subtitle1">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant="subtitle1">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant="subtitle1">Accordion 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Accordion variant="elevation">
        <AccordionSummary>
          <Typography variant="subtitle1">Elevation Variant</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This accordion has elevation styling.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion variant="outlined">
        <AccordionSummary>
          <Typography variant="subtitle1">Outlined Variant</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This accordion has outlined styling.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion variant="filled">
        <AccordionSummary>
          <Typography variant="subtitle1">Filled Variant</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This accordion has filled styling.</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Accordion size="small">
        <AccordionSummary>
          <Typography variant="subtitle2">Small Size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">This is a small accordion.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion size="medium">
        <AccordionSummary>
          <Typography variant="subtitle1">Medium Size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This is a medium accordion.</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'} Accordion
        </button>
        <Accordion
          expanded={expanded}
          onChange={setExpanded}
          style={{ marginTop: '16px' }}
        >
          <AccordionSummary>
            <Typography variant="subtitle1">Controlled Accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This accordion is controlled by external state.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  },
};