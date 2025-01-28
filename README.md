# React + TypeScript + Vite Monorepo

This monorepo provides a robust foundation for building React applications with Vite, optimized for BunJS runtime and ESM modules. It features a modular architecture with shared packages and a streamlined development experience.

## Key Features

- **Monorepo Structure**: Organized with `apps` for applications and `packages` for shared libraries
- **BunJS Optimization**: Leverages Bun's native speed and ESM support
- **TypeScript First**: Full type safety across the entire codebase
- **Vite Powered**: Fast development server and optimized production builds
- **Component Library**: Shared UI components via `@packages/ui`
- **Flow Builder**: Extensible flow builder system via `@packages/flow`
- **ESM Ready**: Fully optimized for modern JavaScript modules

## Project Structure

```
.
├── apps/
│   └── app/                # Main application
├── packages/
│   ├── flow/               # Flow builder components and logic
│   ├── typescript-config/  # Shared TypeScript configurations
│   └── ui/                 # Shared UI components
```

## Getting Started

1. **Install Bun** (if not already installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Run the development server**:
   ```bash
   bun run dev
   ```

## Development Workflow

### Running Applications
- Start the main app:
  ```bash
  cd apps/app
  bun run dev
  ```

### Building Packages
- Build individual packages:
  ```bash
  cd packages/flow
  bun run build
  ```

### TypeScript Configuration
The project uses shared TypeScript configurations:
- `@packages/typescript-config/base.json` - Base configuration
- `@packages/typescript-config/react-library.json` - React-specific settings
- `@packages/typescript-config/vite.json` - Vite-specific settings

## Package Architecture

### `@packages/ui`
Shared UI components library featuring:
- Button
- Card
- Input
- Textarea
- Theme toggle

### `@packages/flow`
Extensible flow builder system with:
- Drag-and-drop components
- Node-based architecture
- Registry system for component management
- Canvas implementation

### `@packages/typescript-config`
Shared TypeScript configurations for:
- Base projects
- React libraries
- Vite applications

## Optimization Tips

1. **Bun Runtime**: Leverage Bun's native speed for development and testing
2. **ESM Modules**: Use `"type": "module"` in package.json for modern module support
3. **Tree Shaking**: Ensure proper ESM exports for optimal bundle sizes
4. **Shared Configs**: Utilize `@packages/typescript-config` for consistent TS settings

## Available Scripts

- `dev`: Start development server
- `build`: Build production bundle
- `preview`: Preview production build
- `clean`: Remove node_modules

## Plugins

The project uses official Vite plugins:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) for Babel-based Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) for SWC-based Fast Refresh

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
