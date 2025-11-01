# Preact Components System - Accessible & Responsive Layout

A complete, accessible, and responsive layout application built with Preact + TypeScript, featuring a comprehensive theme system, WCAG 2.1 AA compliance, and mobile-first design.

## 🌟 Features

- ✅ **Full Accessibility (WCAG 2.1 AA)**
  - Keyboard navigation support
  - Screen reader compatibility
  - High contrast themes
  - Focus management
  - Skip links
  - ARIA labels and roles

- 🎨 **Theme System**
  - Light, Dark, and System themes
  - Automatic system preference detection
  - LocalStorage persistence
  - Smooth theme transitions

- 📱 **Responsive Design**
  - Mobile-first approach
  - Collapsible sidebar on mobile
  - Persistent sidebar on desktop
  - Touch-friendly interface

- 🎯 **Interactive Elements**
  - Accessible hamburger menu
  - Theme toggle with cycle functionality
  - Focus trap in sidebar
  - ESC key support

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

### Theme System Test
Open `test-theme.html` in your browser to verify:
- LocalStorage functionality
- Theme persistence
- System preference detection

### Accessibility Test
Open the main app and run this in the console:
```javascript
// Copy and paste the contents of accessibility-test.js
```

### Manual Testing Checklist
- [ ] Tab navigation through all interactive elements
- [ ] ESC key closes sidebar when open
- [ ] Theme switching cycles properly (system → light → dark → system)
- [ ] LocalStorage saves theme preference
- [ ] Responsive behavior on different screen sizes
- [ ] Skip link functionality
- [ ] Focus management when opening/closing sidebar

## 📁 Project Structure

```
src/
├── app.tsx          # Main application with all components
├── app.css          # Comprehensive styles with theme variables
├── index.css        # Base styles and resets
└── main.tsx         # Application entry point

test-theme.html      # Theme system test page
accessibility-test.js # Accessibility validation script
```

## 🎨 Theme Implementation

The theme system uses CSS custom properties and automatically:
1. Loads user preference from `localStorage` (key: `app:theme`)
2. Falls back to system preference if no user preference
3. Defaults to light theme if neither is available
4. Updates DOM attributes and classes dynamically
5. Persists changes to localStorage (except for 'system' theme)

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate through all interactive elements
- **Enter/Space**: Activate buttons and links
- **ESC**: Close sidebar when open
- **Skip Link**: Jump to main content

### Screen Reader Support
- Proper ARIA labels and roles
- Semantic HTML structure
- Descriptive button labels
- Navigation landmarks

### Visual Accessibility
- WCAG 2.1 AA color contrast ratios
- Visible focus indicators
- High contrast themes
- Reduced motion support

## 📐 Layout Structure

```
┌─────────────────────────────────────┐
│           Header (sticky)             │
├─────────────┬─────────────────────────┤
│             │                         │
│   Sidebar   │      Main Content     │
│  (sticky)   │                         │
│             │                         │
│             ├─────────────────────────┤
│             │       Footer            │
└─────────────┴─────────────────────────┘
```

## 🎯 Component Architecture

- **ThemeProvider**: Context provider for theme management
- **AppShell**: Main layout wrapper
- **Header**: Top navigation with brand and controls
- **Sidebar**: Navigation menu with footer
- **ThemeToggle**: Cyclic theme switcher
- **SkipLink**: Accessibility skip navigation

## 🔧 Customization

### Theme Colors
Edit CSS custom properties in `app.css`:
```css
:root {
  --accent: #your-color;
  --bg: #your-background;
  --text: #your-text-color;
}
```

### Breakpoints
Modify responsive breakpoints:
```css
:root {
  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1024px;
}
```

## 📋 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test accessibility and responsiveness
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!

## 🙏 Acknowledgments

- Built with [Preact](https://preactjs.com/)
- Inspired by modern accessibility guidelines
- Designed with mobile-first approach
- Tested for WCAG 2.1 AA compliance
