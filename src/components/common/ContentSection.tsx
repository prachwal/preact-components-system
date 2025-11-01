import type { ComponentChildren } from 'preact';
import Heading from './Heading';

interface ContentSectionProps {
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  desc: string;
  children: ComponentChildren;
  className?: string;
  as?: 'article' | 'section' | 'div';
}

const ContentSection = ({
  title,
  level = 2,
  desc,
  children,
  className,
  as: Wrapper = 'article'
}: ContentSectionProps) => {
  const wrapperClass = `content-section ${className || ''}`.trim();

  return (
    <Wrapper className={wrapperClass}>
      <Heading level={level}>{title}</Heading>
      <p>{desc}</p>
      <div className="features-grid">
        {children}
      </div>
    </Wrapper>
  );
};

export default ContentSection;