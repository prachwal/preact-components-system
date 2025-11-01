import { useTheme } from '../../contexts/ThemeContext';
import type { Theme } from '../../types/theme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const getNextTheme = (currentTheme: Theme): Theme => {
    switch (currentTheme) {
      case 'light': return 'dark';
      case 'dark': return 'system';
      case 'system': return 'light';
      default: return 'light';
    }
  };

  const getThemeIcon = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'system': return '🖥️';
      default: return '☀️';
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(getNextTheme(theme))}
      aria-label={`Change theme to ${getNextTheme(theme)}`}
    >
      {getThemeIcon(theme)}
    </button>
  );
};

export default ThemeToggle;