# Contributing to Preact Components System

Thank you for considering contributing to Preact Components System! This document outlines the process and guidelines for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/prachwal/preact-components-system/issues)
2. If not, create a new issue using the Bug Report template
3. Include as much detail as possible: steps to reproduce, expected behavior, actual behavior, environment details

### Suggesting Features

1. Check if the feature has already been requested
2. Create a new issue using the Feature Request template
3. Clearly describe the feature, its use case, and potential benefits

### Pull Requests

1. **Fork the repository** and create a new branch from `master`

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Make your changes** following our coding standards

4. **Write tests** for your changes

   ```bash
   npm run test
   ```

5. **Ensure code quality**

   ```bash
   npm run lint        # Check linting
   npm run type-check  # Check TypeScript
   npm run build       # Ensure build works
   ```

6. **Commit your changes** using conventional commits

   ```bash
   git commit -m "feat: add new component"
   git commit -m "fix: resolve button styling issue"
   git commit -m "docs: update README"
   ```

7. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/prachwal/preact-components-system.git
cd preact-components-system

# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook for component development
npm run storybook

# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:coverage
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Provide proper types for all props and functions
- Avoid using `any` types
- Document complex types with JSDoc comments

### Components

- Use functional components with hooks
- Follow the existing component structure
- Add proper TypeScript interfaces for props
- Include JSDoc comments with examples
- Export components from `index.ts`

### Testing

- Write comprehensive tests for all components
- Aim for >80% code coverage
- Test accessibility features
- Test responsive behavior
- Use descriptive test names

### Styling

- Use SCSS modules for component styles
- Follow the existing naming conventions
- Ensure responsive design
- Test in multiple browsers

### Documentation

- Update README.md if adding new features
- Add TSDoc comments for public APIs
- Create Storybook stories for new components
- Update TypeDoc documentation

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:

```text
feat(button): add loading state
fix(grid): resolve spacing issue on mobile
docs(readme): update installation instructions
test(card): add accessibility tests
```

## Pull Request Process

1. **Update documentation** if you've made changes to the API
2. **Add/update tests** for your changes
3. **Ensure all checks pass** (CI will run automatically)
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** if requested before merging

## Code Review

All submissions require review. We'll:

- Check code quality and adherence to standards
- Verify tests are comprehensive
- Ensure documentation is updated
- Test functionality in multiple browsers
- Provide constructive feedback

## Questions?

Feel free to:

- Open a [Discussion](https://github.com/prachwal/preact-components-system/discussions)
- Ask in pull request comments
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
