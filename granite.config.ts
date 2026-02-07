import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'today-fortune1',
  web: {
    host: '0.0.0.0',
    port: 3010,
    commands: {
      dev: 'rsbuild dev',
      build: 'rsbuild build',
    },
  },
  permissions: [],
  outdir: 'dist',
  brand: {
    displayName: '오늘 어때',
    icon: 'https://raw.githubusercontent.com/jino123413/app-logos/master/today-fortune.png',
    primaryColor: '#6C3CE1',
    bridgeColorMode: 'inverted',
  },
  webViewProps: {
    type: 'partner',
  },
});
