# ui-table-workspace

This workspace contains a publishable Angular library `ui-table` and a demo application `demo-app`.

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
npx ng build ui-table
```

If your environment doesn't use the Angular library builder, you can build the package directly with `ng-packagr`:

```bash
npx ng-packagr -p projects/ui-table/ng-package.json
```

After build, a distributable will be in `dist/ui-table` or `projects/ui-table/dist` depending on the build command used.

How to publish:

```bash
cd dist/ui-table
npm publish
```

How another Angular app would install and use it after publishing:

1. Install from npm:

```bash
npm install ui-table
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
