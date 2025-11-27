import {
  APP_VERSION,
  STORYBOOK_URL,
  DOCS_URL,
  COVERAGE_URL,
  REPOSITORY_URL,
} from '../../config/constants';
import { Icon } from '../ui/Icon';

export interface FooterProps {
  className?: string;
}

/**
 * Footer component - application footer with navigation links
 *
 * Displays application branding, version information, and navigation links to
 * documentation resources (Storybook, API docs, test coverage, GitHub repository).
 * Includes accessibility features with proper ARIA labels and semantic navigation.
 *
 * @example
 * ```tsx
 * // Basic footer
 * <Footer />
 *
 * // Footer with custom class
 * <Footer className="custom-footer" />
 * ```
 *
 * Features:
 * - Application branding with version display
 * - External links to documentation resources
 * - Accessible navigation with ARIA labels
 * - Responsive layout with proper spacing
 */
export const Footer = ({ className = '' }: FooterProps) => {
  const links = [
    {
      href: STORYBOOK_URL,
      icon: 'Book' as const,
      label: 'Storybook',
      description: 'Component docs',
    },
    {
      href: DOCS_URL,
      icon: 'FileText' as const,
      label: 'API Docs',
      description: 'TypeDoc',
    },
    {
      href: COVERAGE_URL,
      icon: 'Activity' as const,
      label: 'Coverage',
      description: 'Test reports',
    },
    {
      href: REPOSITORY_URL,
      icon: 'Github' as const,
      label: 'GitHub',
      description: 'Source code',
    },
  ];

  return (
    <footer className={`footer ${className}`.trim()}>
      <div className='footer__container'>
        <div className='footer__info'>
          <div className='footer__brand'>
            <Icon name='Package' size='small' decorative />
            <span className='footer__title'>Preact Components System</span>
          </div>
          <div className='footer__version'>v{APP_VERSION}</div>
        </div>

        <nav className='footer__links' aria-label='Footer navigation'>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className='footer__link'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${link.label} - ${link.description}`}
            >
              <Icon name={link.icon} size='small' decorative />
              <div className='footer__link-content'>
                <span className='footer__link-label'>{link.label}</span>
                <span className='footer__link-description'>{link.description}</span>
              </div>
            </a>
          ))}
        </nav>

        <div className='footer__copyright'>
          <p>© 2025 MIT License</p>
        </div>
      </div>
    </footer>
  );
};
