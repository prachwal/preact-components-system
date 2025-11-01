import { describe, it, expect, vi } from 'vitest';
import { useState } from 'preact/hooks';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Accordion, AccordionSummary, AccordionDetails } from './Accordion';

describe('Accordion', () => {
  it('renders summary content', () => {
    render(
      <Accordion>
        <AccordionSummary>Test Summary</AccordionSummary>
      </Accordion>
    );
    expect(screen.getByText('Test Summary')).toBeInTheDocument();
  });

  it('starts collapsed by default', () => {
    render(
      <Accordion>
        <AccordionSummary>Test Summary</AccordionSummary>
      </Accordion>
    );
    // Should not render AccordionDetails when collapsed
    expect(screen.queryByText('Test Details')).not.toBeInTheDocument();
  });

  it('expands when clicked', () => {
    const TestComponent = () => {
      const [expanded, setExpanded] = useState(false);

      return (
        <Accordion expanded={expanded} onChange={setExpanded}>
          <AccordionSummary>Test Summary</AccordionSummary>
          {expanded && (
            <AccordionDetails>Test Details</AccordionDetails>
          )}
        </Accordion>
      );
    };

    render(<TestComponent />);

    expect(screen.queryByText('Test Details')).not.toBeInTheDocument();

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(screen.getByText('Test Details')).toBeInTheDocument();
  });

  it('calls onChange when expanded', () => {
    const handleChange = vi.fn();
    render(
      <Accordion onChange={handleChange}>
        <AccordionSummary>Test Summary</AccordionSummary>
      </Accordion>
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('starts expanded when defaultExpanded is true', () => {
    render(
      <Accordion defaultExpanded>
        <AccordionSummary>Test Summary</AccordionSummary>
        <AccordionDetails>Test Details</AccordionDetails>
      </Accordion>
    );
    expect(screen.getByText('Test Details')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Accordion disabled>
        <AccordionSummary>Test Summary</AccordionSummary>
      </Accordion>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(
      <Accordion variant="outlined">
        <AccordionSummary>Test</AccordionSummary>
      </Accordion>
    );
    const accordion = container.querySelector('.accordion');
    expect(accordion).toHaveClass('accordion-variant-outlined');
  });

  it('applies size classes correctly', () => {
    const { container } = render(
      <Accordion size="small">
        <AccordionSummary>Test</AccordionSummary>
      </Accordion>
    );
    const accordion = container.querySelector('.accordion');
    expect(accordion).toHaveClass('accordion-size-small');
  });
});