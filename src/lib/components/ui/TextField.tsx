import clsx from 'clsx';
import type { ComponentChildren, JSX } from 'preact';
import { useRef, useId } from 'preact/hooks';

import { TEXTFIELD_CONSTANTS } from '../../theme/constants';

export type TextFieldVariant = 'outlined' | 'filled' | 'standard';
export type TextFieldSize = 'small' | 'medium' | 'large';
export type TextFieldColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export interface TextFieldProps extends Omit<
  JSX.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'size' | 'label'
> {
  /**
   * TextField variant
   */
  variant?: TextFieldVariant;
  /**
   * TextField size
   */
  size?: TextFieldSize;
  /**
   * TextField color
   */
  color?: TextFieldColor;
  /**
   * If true, the input is disabled
   */
  disabled?: boolean;
  /**
   * If true, the input is required
   */
  required?: boolean;
  /**
   * If true, the input is read-only
   */
  readOnly?: boolean;
  /**
   * If true, the input takes full width of container
   */
  fullWidth?: boolean;
  /**
   * If true, renders as textarea
   */
  multiline?: boolean;
  /**
   * Number of rows for textarea (only for multiline)
   */
  rows?: number;
  /**
   * Label text
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Success state
   */
  success?: boolean;
  /**
   * Warning state
   */
  warning?: boolean;
  /**
   * Element placed at the start of the input
   */
  startAdornment?: ComponentChildren;
  /**
   * Element placed at the end of the input
   */
  endAdornment?: ComponentChildren;
  /**
   * Input type
   */
  type?: string;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Input value
   */
  value?: string | number;
  /**
   * Default value
   */
  defaultValue?: string | number;
  /**
   * Change handler
   */
  onChange?: JSX.GenericEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Input name
   */
  name?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Custom id for the input
   */
  id?: string;
}

/**
 * Helper function to determine the state color based on error/success/warning states
 */
const getStateColor = (
  error: boolean,
  success: boolean,
  warning: boolean,
  defaultColor: TextFieldColor
): TextFieldColor => {
  if (error) return 'error';
  if (success) return 'success';
  if (warning) return 'warning';
  return defaultColor;
};

/**
 * Helper function to generate root classes
 */
const getRootClasses = (
  variant: TextFieldVariant,
  size: TextFieldSize,
  stateColor: TextFieldColor,
  disabled: boolean,
  fullWidth: boolean,
  error: boolean,
  success: boolean,
  warning: boolean,
  readOnly: boolean,
  className?: string
) => {
  return clsx(
    'textfield',
    `textfield-variant-${variant}`,
    `textfield-size-${size}`,
    `textfield-color-${stateColor}`,
    {
      'textfield-disabled': disabled,
      'textfield-full-width': fullWidth,
      'textfield-error': error,
      'textfield-success': success,
      'textfield-warning': warning,
      'textfield-readonly': readOnly,
      'textfield-focused': false, // Will be handled by CSS :focus-within
    },
    className
  );
};

/**
 * Helper function to generate input classes
 */
const getInputClasses = (startAdornment?: ComponentChildren, endAdornment?: ComponentChildren) => {
  return clsx('textfield-input', {
    'textfield-input-with-start': Boolean(startAdornment),
    'textfield-input-with-end': Boolean(endAdornment),
  });
};

/**
 * Helper function to generate helper text classes
 */
const getHelperTextClasses = (error: boolean, success: boolean, warning: boolean) => {
  return clsx('textfield-helper-text', {
    'textfield-helper-text-error': error,
    'textfield-helper-text-success': success,
    'textfield-helper-text-warning': warning,
  });
};

export const TextField = ({
  variant = 'outlined',
  size = 'medium',
  color = 'primary',
  disabled = false,
  required = false,
  readOnly = false,
  fullWidth = false,
  multiline = false,
  rows = TEXTFIELD_CONSTANTS.DEFAULT_ROWS,
  label,
  helperText,
  error = false,
  success = false,
  warning = false,
  startAdornment,
  endAdornment,
  type = 'text',
  className,
  value,
  defaultValue,
  onChange,
  name,
  placeholder,
  id: customId,
  ...rest
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = customId ?? `textfield-${generatedId}`;
  const helperTextId = helperText ? `${inputId}-helper` : undefined;
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const stateColor = getStateColor(error, success, warning, color);
  const rootClasses = getRootClasses(
    variant,
    size,
    stateColor,
    disabled,
    fullWidth,
    error,
    success,
    warning,
    readOnly,
    className
  );
  const inputClasses = getInputClasses(startAdornment, endAdornment);

  const baseInputProps = {
    id: inputId,
    className: inputClasses,
    disabled,
    required,
    readOnly,
    value,
    defaultValue,
    onChange,
    name,
    placeholder,
    'aria-describedby': helperTextId,
    'aria-invalid': error ? ('true' as const) : undefined,
    'aria-required': required ? ('true' as const) : undefined,
  };

  const inputProps = { ...baseInputProps, ...rest };

  return (
    <div className={rootClasses}>
      {label && (
        <label htmlFor={inputId} className='textfield-label'>
          {label}
          {required && (
            <span className='textfield-required' aria-label='required'>
              *
            </span>
          )}
        </label>
      )}
      <div className='textfield-input-wrapper'>
        {startAdornment && <div className='textfield-start-adornment'>{startAdornment}</div>}
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            rows={rows}
            {...(inputProps as JSX.HTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            {...(inputProps as JSX.HTMLAttributes<HTMLInputElement>)}
          />
        )}
        {endAdornment && <div className='textfield-end-adornment'>{endAdornment}</div>}
      </div>
      {helperText && (
        <div id={helperTextId} className={getHelperTextClasses(error, success, warning)}>
          {helperText}
        </div>
      )}
    </div>
  );
};
