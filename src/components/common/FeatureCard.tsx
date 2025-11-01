import type { ComponentChildren } from 'preact';
import Heading from './Heading';

interface FeatureCardProps {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ComponentChildren;
  className?: string;
  as?: 'article' | 'section' | 'div';
}

const FeatureCard = ({ title, level = 3, children, className, as: Wrapper = 'article' }: FeatureCardProps) => {
  return (
    <Wrapper className={`feature-card ${className || ''}`.trim()}>
      <Heading level={level}>{title}</Heading>
      {children}
    </Wrapper>
  );
};

export default FeatureCard;