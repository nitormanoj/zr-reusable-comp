# zr-components-workspace

This workspace contains the ZR Core UI Angular library `zr-components` and a demo application `demo-app`.

The library uses PrimeNG as its component foundation and exposes ZR-owned component APIs and design tokens. Consumers should import from `zr-components`, not from the library's internal paths.

How to run the demo app:

1. Install dependencies:

```bash
npm install
```

2. Serve the demo app:

```bash
npx ng serve demo-app
```

How to build the library for publishing:

```bash
npm run build:lib
```

If your environment doesn't use the Angular library builder, you can build the package directly with `ng-packagr`:

```bash
npx ng-packagr -p projects/zr-components/ng-package.json
```

After build, a distributable will be in `dist/zr-components` or `projects/zr-components/dist` depending on the build command used.

How to publish:

```bash
cd dist/zr-components
npm publish
```

The current package version is `0.1.0`. We follow semantic versioning: patch releases fix behavior, minor releases add backwards-compatible APIs, and major releases may contain breaking changes. Every release requires a changelog entry and maintainer approval.

## Core UI reference component

```ts
import { ZrCheckboxComponent } from 'zr-components';

@Component({
  standalone: true,
  imports: [ZrCheckboxComponent],
  template: `
    <zr-checkbox
      [checked]="enabled"
      label="Enable notifications"
      (checkedChange)="enabled = $event">
    </zr-checkbox>
  `
})
export class SettingsComponent {
  enabled = true;
}
```

Load PrimeNG base styles and the ZR theme once in the consuming application's global stylesheet. See [CORE-UI-ARCHITECTURE.md](CORE-UI-ARCHITECTURE.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for architecture, adoption, testing, and governance rules.

How another Angular app would install and use it after publishing:

1. Install from npm:

```bash
npm install zr-components
```

2. Import and use the component in your app (example):

```ts
import { TableComponent } from 'ui-table';

@Component({
  standalone: true,
  imports: [TableComponent],
  template: `<ui-table [data]="..." [columns]="..."></ui-table>`
})
export class AppComponent {}
```
