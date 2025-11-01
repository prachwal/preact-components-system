import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';
import { Stepper, Step, StepLabel, StepContent } from './Stepper';

describe('Stepper', () => {
  it('renders stepper', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.stepper')).toBeInTheDocument();
  });

  it('applies orientation class correctly', () => {
    const { container } = render(
      <Stepper activeStep={0} orientation="vertical">
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.stepper-orientation-vertical')).toBeInTheDocument();
  });

  it('applies alternative label class when alternativeLabel is true', () => {
    const { container } = render(
      <Stepper activeStep={0} alternativeLabel>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.stepper-alternative-label')).toBeInTheDocument();
  });

  it('marks active step correctly', () => {
    const { container } = render(
      <Stepper activeStep={1}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </Stepper>
    );

    const steps = container.querySelectorAll('.step');
    expect(steps[1]).toHaveClass('step-active');
  });

  it('marks completed steps correctly', () => {
    const { container } = render(
      <Stepper activeStep={2}>
        <Step completed>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </Stepper>
    );

    const steps = container.querySelectorAll('.step');
    expect(steps[0]).toHaveClass('step-completed');
    expect(steps[1]).toHaveClass('step-completed'); // Auto-completed (before active)
  });

  it('calls onStepClick when step is clicked in nonLinear mode', () => {
    const handleStepClick = vi.fn();
    const { container } = render(
      <Stepper activeStep={0} nonLinear onStepClick={handleStepClick}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
    );

    const steps = container.querySelectorAll('.step-button');
    fireEvent.click(steps[1]);

    expect(handleStepClick).toHaveBeenCalledWith(1);
  });

  it('does not call onStepClick when not in nonLinear mode', () => {
    const handleStepClick = vi.fn();
    const { container } = render(
      <Stepper activeStep={0} onStepClick={handleStepClick}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
    );

    const steps = container.querySelectorAll('.step-button');
    fireEvent.click(steps[1]);

    expect(handleStepClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Stepper activeStep={0} className="custom-stepper">
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.custom-stepper')).toBeInTheDocument();
  });
});

describe('Step', () => {
  it('renders step', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.step')).toBeInTheDocument();
  });

  it('applies completed class when completed prop is true', () => {
    const { container } = render(
      <Stepper activeStep={1}>
        <Step completed>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
    );

    const step = container.querySelector('.step');
    expect(step).toHaveClass('step-completed');
  });

  it('applies disabled class when disabled prop is true', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step disabled>
          <StepLabel>Step 2</StepLabel>
        </Step>
      </Stepper>
    );

    const steps = container.querySelectorAll('.step');
    expect(steps[1]).toHaveClass('step-disabled');
  });

  it('throws error when used outside Stepper', () => {
    expect(() => {
      render(
        <Step>
          <StepLabel>Test</StepLabel>
        </Step>
      );
    }).toThrow('Step must be used within Stepper component');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step className="custom-step">
          <StepLabel>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.custom-step')).toBeInTheDocument();
  });
});

describe('StepLabel', () => {
  it('renders step label', () => {
    render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel icon={<span>★</span>}>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('renders optional text', () => {
    render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel optional="Optional">Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('applies error class when error prop is true', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel error>Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.step-label-error')).toBeInTheDocument();
  });

  it('throws error when used outside Step', () => {
    expect(() => {
      render(<StepLabel>Test</StepLabel>);
    }).toThrow('StepLabel must be used within Step component');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step>
          <StepLabel className="custom-label">Step 1</StepLabel>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.custom-label')).toBeInTheDocument();
  });
});

describe('StepContent', () => {
  it('renders step content', () => {
    render(
      <Stepper activeStep={0} orientation="vertical">
        <Step>
          <StepLabel>Step 1</StepLabel>
          <StepContent>Content for step 1</StepContent>
        </Step>
      </Stepper>
    );
    expect(screen.getByText('Content for step 1')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Stepper activeStep={0} orientation="vertical">
        <Step>
          <StepLabel>Step 1</StepLabel>
          <StepContent className="custom-content">Content</StepContent>
        </Step>
      </Stepper>
    );
    expect(container.querySelector('.custom-content')).toBeInTheDocument();
  });
});
