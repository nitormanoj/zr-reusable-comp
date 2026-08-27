# Component Documentation

Storybook is the interactive catalog for the ZR Core UI library.

## Run locally

```bash
npm run storybook
```

Open `http://localhost:6006` and select **Core UI > Checkbox**.

## Story conventions

Stories are colocated with their component and use the component's public API. Keep examples production-like and include meaningful labels. Use controls for supported inputs and actions for emitted events. Add named stories for meaningful states rather than relying on a single configurable example.

## Review checklist

- API names and defaults match the component contract.
- Design tokens and PrimeNG overrides render correctly.
- Keyboard focus and interaction work without a mouse.
- Disabled, error, loading, and empty states are represented where applicable.
- The story includes an import and usage example.
- Unit and accessibility tests cover the documented behavior.