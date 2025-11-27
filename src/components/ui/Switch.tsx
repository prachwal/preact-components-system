import clsx from 'clsx';
import type { JSX } from 'preact';
import { useRef, useId } from 'preact/hooks';
import './Switch.scss';

export type SwitchSize = 'small' | 'medium' | 'large';
export type SwitchColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface SwitchProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'size' | 'label'> {
  /**
   * Switch size
   */
  size?: SwitchSize;
  /**
   * Switch color
   */
  color?: SwitchColor;
  /**
   * If true, the switch is checked
   */
  checked?: boolean;
  /**
   * If true, the switch is disabled
   */
  disabled?: boolean;
  /**
   * If true, the switch is required
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
   * Custom label for on state
   */
  onLabel?: string;
  /**
   * Custom label for off state
   */
  offLabel?: string;
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

export const Switch = ({
  size = 'medium',
  color = 'primary',
  checked,
  disabled = false,
  required = false,
  label,
  labelPlacement = 'end',
  onLabel,
  offLabel,
  className,
  defaultChecked,
  onChange,
  name,
  value,
  id: customId,
  ...rest
}: SwitchProps) => {
  const generatedId = useId();
  const inputId = customId ?? `switch-${generatedId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const rootClasses = clsx(
    'switch',
    `switch-size-${size}`,
    `switch-color-${color}`,
    `switch-label-${labelPlacement}`,
    {
      'switch-disabled': disabled,
      'switch-checked': checked,
    },
    className
  );

  const switchElement = (
    <div className="switch-wrapper">
      <input
        ref={inputRef}
        type="checkbox"
        role="switch"
        id={inputId}
        className="switch-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
        onChange={onChange}
        name={name}
        value={value}
        aria-checked={checked}
        {...rest}
      />
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb">
          {(onLabel ?? offLabel) && (
            <span className="switch-thumb-label">
              {checked ? (onLabel ?? '') : (offLabel ?? '')}
            </span>
          )}
        </span>
      </span>
    </div>
  );

  if (!label) {
    return <div className={rootClasses}>{switchElement}</div>;
  }

  return (
    <label className={rootClasses}>
      {switchElement}
      <span className="switch-label">
        {label}
        {required && <span className="switch-required" aria-label="required">*</span>}
      </span>
    </label>
  );
};
