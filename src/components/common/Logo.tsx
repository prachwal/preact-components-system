interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className, width = 32, height = 32 }: LogoProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    aria-hidden="true"
    className={className}
  >
    <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1" />
    <path d="M16 8v16M8 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="4" fill="currentColor" />
  </svg>
);

export default Logo;