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

## Component documentation

Run the Storybook catalog with `npm run storybook` and open `http://localhost:6006`. Build the static catalog with `npm run build-storybook`.

Each component story should include:

- the default, interactive, disabled, and error states that consumers need to review;
- controls for public inputs and actions for public outputs;
- an import and usage example;
- keyboard, focus, labeling, and screen-reader guidance;
- links to the relevant design tokens and known limitations.

Stories are the review surface for design and product teams. A component is not ready for broad adoption until its story, tests, and API documentation are reviewed together.

