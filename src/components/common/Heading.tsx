import type { HeadingLevel } from '../../types/common';

interface HeadingProps {
  level: HeadingLevel;
  children: preact.ComponentChildren;
  className?: string;
}

const Heading = ({ level, children, className }: HeadingProps) => {
  const Tag = `h${level}` as const;
  return <Tag className={className}>{children}</Tag>;
};

export default Heading;