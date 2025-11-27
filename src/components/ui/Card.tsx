import clsx from 'clsx';
import { h } from 'preact';
import type { ComponentChildren, JSX } from 'preact';

import { Paper } from './Paper';
import './Card.scss';

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   */
  variant?: 'elevation' | 'outlined';
  /**
   * Shadow depth (only for elevation variant)
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
  /**
   * If true, card will have hover effect
   */
  hoverable?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: h.JSX.CSSProperties;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const Card = ({
  variant = 'elevation',
  elevation = 1,
  hoverable = false,
  className,
  style,
  children,
  ...rest
}: CardProps) => {
  const classes = clsx(
    'card',
    {
      'card-hoverable': hoverable,
    },
    className
  );

  return (
    <Paper
      variant={variant}
      elevation={elevation}
      className={classes}
      style={style}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export interface CardHeaderProps {
  /**
   * Avatar element
   */
  avatar?: ComponentChildren;
  /**
   * Title text
   */
  title: string | ComponentChildren;
  /**
   * Subheader text
   */
  subheader?: string | ComponentChildren;
  /**
   * Action element (usually a button or icon button)
   */
  action?: ComponentChildren;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: h.JSX.CSSProperties;
}

export const CardHeader = ({
  avatar,
  title,
  subheader,
  action,
  className,
  style,
}: CardHeaderProps) => {
  const classes = clsx('card-header', className);

  return (
    <div className={classes} style={style}>
      {avatar && <div className="card-header-avatar">{avatar}</div>}
      <div className="card-header-content">
        <div className="card-header-title">{title}</div>
        {subheader && <div className="card-header-subheader">{subheader}</div>}
      </div>
      {action && <div className="card-header-action">{action}</div>}
    </div>
  );
};

export interface CardMediaProps {
  /**
   * Image source
   */
  image?: string;
  /**
   * Component to render as
   */
  component?: 'img' | 'video' | 'div';
  /**
   * Alt text for image
   */
  alt?: string;
  /**
   * Image height
   */
  height?: number | string;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: h.JSX.CSSProperties;
  /**
   * Children elements (for div variant)
   */
  children?: ComponentChildren;
}

export const CardMedia = ({
  image,
  component: MediaComponent = 'div',
  alt,
  height = 140,
  className,
  style = {},
  children,
  ...rest
}: CardMediaProps) => {
  const classes = clsx('card-media', className);

  const mediaStyle: h.JSX.CSSProperties = {
    ...style,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (MediaComponent === 'img') {
    return (
      <img
        src={image}
        alt={alt}
        className={classes}
        style={mediaStyle}
        {...rest as any}
      />
    );
  }

  if (MediaComponent === 'video') {
    return (
      <video className={classes} style={mediaStyle} {...rest as any}>
        {children}
      </video>
    );
  }

  return (
    <div
      className={classes}
      style={{
        ...mediaStyle,
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      {...rest as any}
    >
      {children}
    </div>
  );
};

export interface CardContentProps {
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: h.JSX.CSSProperties;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const CardContent = ({
  className,
  style,
  children,
}: CardContentProps) => {
  const classes = clsx('card-content', className);

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export interface CardActionsProps {
  /**
   * If true, actions will be aligned to the right
   */
  disableSpacing?: boolean;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: h.JSX.CSSProperties;
  /**
   * Children elements
   */
  children?: ComponentChildren;
}

export const CardActions = ({
  disableSpacing = false,
  className,
  style,
  children,
}: CardActionsProps) => {
  const classes = clsx(
    'card-actions',
    {
      'card-actions-no-spacing': disableSpacing,
    },
    className
  );

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
