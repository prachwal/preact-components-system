import type { HeadingLevel } from '../../types/common';

export interface HeadingProps {
  level: HeadingLevel;
  children: preact.ComponentChildren;
  className?: string;
}

export const Heading = ({ level, children, className }: HeadingProps) => {
  const Tag = `h${level}` as const;
  return <Tag className={className}>{children}</Tag>;
};