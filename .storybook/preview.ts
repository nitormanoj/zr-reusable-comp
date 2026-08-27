import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

const primeNgConfig = applicationConfig({
  providers: [provideAnimations(), providePrimeNG({ theme: { preset: Aura } })]
});

const preview: Preview = {
  decorators: [primeNgConfig],
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: 'centered'
  }
};

export default preview;
