# @packages/ui

A shared Shadcn/UI component library for the Vite + React + BunJS workspace.

## Components

### Button

A customizable button component with a modern design.

```tsx
import { Button } from '@packages/ui/components/ui/button';

function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
```

#### Props

- `children`: React.ReactNode - Button content
- `onClick?`: () => void - Click handler function

## Development

1. Make changes to components in `src/`
2. Build the package:
   ```bash
   bun run build
   ```

## Adding New Components

1. Create your component in `src/`
2. Export it in `"./components/*": "./src/components/*.tsx"`
3. Add documentation to this README

## License

MIT License - see the [LICENSE](../../LICENSE) file for details. 