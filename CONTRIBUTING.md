# Contributing to Core UI

## Change process

1. Open an issue describing the user need and affected component.
2. Add or update the component example and tests with the implementation.
3. Keep public APIs backward-compatible unless a breaking change is explicitly approved.
4. Request review from the component owner and one consuming product team.
5. Update the changelog entry before merge.

## Definition of done

- TypeScript and template diagnostics are clean.
- Unit tests cover public inputs, outputs, and important states.
- Keyboard and screen-reader behavior is verified.
- Documentation includes an import, usage example, states, and limitations.
- The library and demo application build successfully.

## Ownership

The Core UI maintainers own shared tokens, accessibility standards, release tooling, and API policy. Component owners maintain implementation and examples. Product teams may propose changes and report defects, but should not fork shared components without an architectural review.
