import clsx from 'clsx';
import type { JSX, ComponentChildren } from 'preact';
import { useRef, useId } from 'preact/hooks';

export type RadioSize = 'small' | 'medium' | 'large';
export type RadioColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface RadioProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'label'> {
  /**
   * Radio size
   */
  size?: RadioSize;
  /**
   * Radio color
   */
  color?: RadioColor;
  /**
   * If true, the radio is checked
   */
  checked?: boolean;
  /**
   * If true, the radio is disabled
   */
  disabled?: boolean;
  /**
   * If true, the radio is required
   */
  required?: boolean;
  /**
   * Label text
   */
  label?: string;
  /**
   * Label position
   */
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Default checked state
   */
  defaultChecked?: boolean;
  /**
   * Change handler
   */
  onChange?: JSX.GenericEventHandler<HTMLInputElement>;
  /**
   * Input name (required for radio groups)
   */
  name?: string;
  /**
   * Input value
   */
  value?: string | number;
  /**
   * Custom id for the input
   */
  id?: string;
}

export const Radio = ({
  size = 'medium',
  color = 'primary',
  checked,
  disabled = false,
  required = false,
  label,
  labelPlacement = 'end',
  className,
  defaultChecked,
  onChange,
  name,
  value,
  id: customId,
  ...rest
}: RadioProps) => {
  const generatedId = useId();
  const inputId = customId ?? `radio-${generatedId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const rootClasses = clsx(
    'radio',
    `radio-size-${size}`,
    `radio-color-${color}`,
    `radio-label-${labelPlacement}`,
    {
      'radio-disabled': disabled,
      'radio-checked': checked,
    },
    className
  );

  const radioElement = (
    <div className="radio-wrapper">
      <input
        ref={inputRef}
        type="radio"
        id={inputId}
        className="radio-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        name={name}
        value={value}
        {...rest}
      />
      <span className="radio-icon" aria-hidden="true">
        <span className="radio-icon-outer" />
        <span className="radio-icon-inner" />
      </span>
    </div>
  );

  if (!label) {
    return <div className={rootClasses}>{radioElement}</div>;
  }

  return (
    <label className={rootClasses}>
      {radioElement}
      <span className="radio-label">
        {label}
        {required && <span className="radio-required" aria-label="required">*</span>}
      </span>
    </label>
  );
};

export interface RadioGroupProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Name for the radio group (applied to all radios)
   */
  name: string;
  /**
   * Currently selected value
   */
  value?: string | number;
  /**
   * Default selected value
   */
  defaultValue?: string | number;
  /**
   * Change handler
   */
  onChange?: (value: string | number) => void;
  /**
   * Radio group orientation
   */
  row?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Children elements (Radio components)
   */
  children?: ComponentChildren;
}

export const RadioGroup = ({
  name: _name,
  value: _value,
  defaultValue: _defaultValue,
  onChange,
  row = false,
  className,
  children,
  ...rest
}: RadioGroupProps) => {
  const rootClasses = clsx(
    'radio-group',
    {
      'radio-group-row': row,
    },
    className
  );

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (onChange) {
      onChange(target.value);
    }
  };

  return (
    <div className={rootClasses} role="radiogroup" onChange={handleChange} {...rest}>
      {children}
    </div>
  );
};
