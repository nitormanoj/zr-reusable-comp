# ZR Core UI Component Library

## Purpose

The library provides stable, accessible Angular components that translate ZwickRoell design decisions onto PrimeNG primitives. Product teams consume ZR components and tokens; PrimeNG remains an implementation detail that can evolve behind the ZR API.

## Architecture

```text
projects/ui-table/src/lib/
  core/
    tokens.ts       # typed design-token contract
    _theme.scss     # CSS custom properties and PrimeNG overrides
  checkbox/         # ZrCheckboxComponent and focused tests
  table/            # future table composition split
  public-api.ts     # supported package entry point
```

Each component owns its public inputs, outputs, accessibility behavior, and visual adaptations. New PrimeNG modules should be wrapped when ZR needs a stable API, consistent defaults, or product-specific behavior.

## Adoption rules

- Import components from `ui-table`, never from PrimeNG internals.
- Load the PrimeNG base styles and the ZR theme once at the application root.
- Prefer ZR tokens over component-local colors and spacing.
- Every component must document keyboard behavior, accessibility names, states, and examples.
- Every public input and output requires a unit test; interactive components also require an accessibility test.
