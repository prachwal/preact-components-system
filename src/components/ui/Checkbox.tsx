import clsx from 'clsx';
import type { JSX } from 'preact';
import { useRef, useId, useEffect } from 'preact/hooks';

export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface CheckboxProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'label'> {
  /**
   * Checkbox size
   */
  size?: CheckboxSize;
  /**
   * Checkbox color
   */
  color?: CheckboxColor;
  /**
   * If true, the checkbox is checked
   */
  checked?: boolean;
  /**
   * If true, the checkbox is in indeterminate state
   */
  indeterminate?: boolean;
  /**
   * If true, the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * If true, the checkbox is required
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
   * Input name
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

export const Checkbox = ({
  size = 'medium',
  color = 'primary',
  checked,
  indeterminate = false,
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
}: CheckboxProps) => {
  const generatedId = useId();
  const inputId = customId ?? `checkbox-${generatedId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  // Set indeterminate state using ref in useEffect
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const rootClasses = clsx(
    'checkbox',
    `checkbox-size-${size}`,
    `checkbox-color-${color}`,
    `checkbox-label-${labelPlacement}`,
    {
      'checkbox-disabled': disabled,
      'checkbox-checked': checked,
      'checkbox-indeterminate': indeterminate,
    },
    className
  );

  const checkboxElement = (
    <div className="checkbox-wrapper">
      <input
        ref={inputRef}
        type="checkbox"
        id={inputId}
        className="checkbox-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        name={name}
        value={value}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-required={required ? 'true' : undefined}
        {...rest}
      />
      <span className="checkbox-icon" aria-hidden="true">
        {indeterminate ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        )}
      </span>
    </div>
  );

  if (!label) {
    return <div className={rootClasses}>{checkboxElement}</div>;
  }

  return (
    <label className={rootClasses}>
      {checkboxElement}
      <span className="checkbox-label">
        {label}
        {required && <span className="checkbox-required" aria-label="required">*</span>}
      </span>
    </label>
  );
};
