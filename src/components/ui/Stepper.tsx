import type { ComponentChildren, JSX } from 'preact';
import { createContext } from 'preact';
import { useContext, useRef, useEffect } from 'preact/hooks';
import clsx from 'clsx';

type StepperOrientation = 'horizontal' | 'vertical';

interface StepperContextValue {
  activeStep: number;
  orientation: StepperOrientation;
  nonLinear: boolean;
  alternativeLabel?: boolean;
  onStepClick?: (step: number) => void;
  registerStep: () => number;
}

const StepperContext = createContext<StepperContextValue | undefined>(undefined);

export interface StepperProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * Currently active step (0-based)
   */
  activeStep: number;
  /**
   * Stepper orientation
   */
  orientation?: StepperOrientation;
  /**
   * If true, steps can be accessed non-linearly
   */
  nonLinear?: boolean;
  /**
   * If true, labels are placed below the step icons (horizontal only)
   */
  alternativeLabel?: boolean;
  /**
   * Callback when a step is clicked (only works with nonLinear)
   */
  onStepClick?: (step: number) => void;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements (Step components)
   */
  children?: ComponentChildren;
}

export const Stepper = ({
  activeStep,
  orientation = 'horizontal',
  nonLinear = false,
  alternativeLabel = false,
  onStepClick,
  className,
  children,
  ...rest
}: StepperProps) => {
  const stepCountRef = useRef(0);

  useEffect(() => {
    stepCountRef.current = 0;
  });

  const registerStep = () => {
    const index = stepCountRef.current;
    stepCountRef.current += 1;
    return index;
  };

  const classes = clsx(
    'stepper',
    `stepper-orientation-${orientation}`,
    {
      'stepper-alternative-label': alternativeLabel && orientation === 'horizontal',
    },
    className
  );

  return (
    <StepperContext.Provider
      value={{ activeStep, orientation, nonLinear, alternativeLabel, onStepClick, registerStep }}
    >
      <div className={classes} {...rest}>
        {children}
      </div>
    </StepperContext.Provider>
  );
};

export interface StepProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, step is completed
   */
  completed?: boolean;
  /**
   * If true, step is disabled
   */
  disabled?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements (StepLabel, StepContent)
   */
  children?: ComponentChildren;
}

export const Step = ({ completed = false, disabled = false, className, children, ...rest }: StepProps) => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('Step must be used within Stepper component');
  }

  const { activeStep, orientation, nonLinear, onStepClick, registerStep } = context;
  const currentIndex = registerStep();
  const isActive = activeStep === currentIndex;
  const isCompleted = completed || activeStep > currentIndex;
  const isDisabled = disabled || (!nonLinear && activeStep < currentIndex && !isCompleted);

  const handleClick = () => {
    if (nonLinear && !disabled && onStepClick) {
      onStepClick(currentIndex);
    }
  };

  const classes = clsx(
    'step',
    `step-orientation-${orientation}`,
    {
      'step-active': isActive,
      'step-completed': isCompleted,
      'step-disabled': isDisabled,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      <div
        className={clsx('step-button', {
          'step-button-clickable': nonLinear && !disabled,
        })}
        onClick={handleClick}
        role={nonLinear && !disabled ? 'button' : undefined}
        tabIndex={nonLinear && !disabled ? 0 : undefined}
      >
        {children}
      </div>
    </div>
  );
};

export interface StepLabelProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  /**
   * Custom icon for the step
   */
  icon?: ComponentChildren;
  /**
   * If true, shows error state
   */
  error?: boolean;
  /**
   * Optional description
   */
  optional?: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements (label text)
   */
  children?: ComponentChildren;
}

export const StepLabel = ({
  icon,
  error = false,
  optional,
  className,
  children,
  ...rest
}: StepLabelProps) => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('StepLabel must be used within Step component');
  }

  const { alternativeLabel } = context;

  const classes = clsx(
    'step-label',
    {
      'step-label-error': error,
      'step-label-alternative': alternativeLabel,
    },
    className
  );

  return (
    <span className={classes} {...rest}>
      <span className="step-label-icon-container">
        {icon || <span className="step-label-icon-default" />}
      </span>
      <span className="step-label-label-container">
        <span className="step-label-label">{children}</span>
        {optional && <span className="step-label-optional">{optional}</span>}
      </span>
    </span>
  );
};

export interface StepContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const StepContent = ({ className, children, ...rest }: StepContentProps) => {
  const classes = clsx('step-content', className);

  return (
    <div className={classes} {...rest}>
      <div className="step-content-inner">{children}</div>
    </div>
  );
};

export interface StepConnectorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS class name
   */
  className?: string;
}

export const StepConnector = ({ className, ...rest }: StepConnectorProps) => {
  const classes = clsx('step-connector', className);

  return (
    <div className={classes} {...rest}>
      <span className="step-connector-line" />
    </div>
  );
};
