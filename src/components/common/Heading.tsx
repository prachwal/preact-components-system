import type { HeadingLevel } from '../../types/common';

interface HeadingProps {
  level: HeadingLevel;
  children: preact.ComponentChildren;
  className?: string;
}

const Heading = ({ level, children, className }: HeadingProps) => {
  const renderHeading = () => {
    switch (level) {
      case 1: return <h1 className={className}>{children}</h1>;
      case 2: return <h2 className={className}>{children}</h2>;
      case 3: return <h3 className={className}>{children}</h3>;
      case 4: return <h4 className={className}>{children}</h4>;
      case 5: return <h5 className={className}>{children}</h5>;
      case 6: return <h6 className={className}>{children}</h6>;
    }
  };

  return renderHeading();
};

export default Heading;