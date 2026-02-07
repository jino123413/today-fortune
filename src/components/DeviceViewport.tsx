import { useEffect } from 'react';

export function DeviceViewport() {
  let isIOS = false;
  try {
    const { getPlatformOS } = require('@apps-in-toss/web-framework');
    isIOS = getPlatformOS() === 'ios';
  } catch {}

  useEffect(() => {
    const styles: Record<string, string> = {
      '--min-height': `${window.innerHeight}px`,
    };

    if (isIOS) {
      Object.assign(styles, {
        '--bottom-padding': `max(env(safe-area-inset-bottom), 20px)`,
        '--top-padding': `max(env(safe-area-inset-top), 20px)`,
      });
    }

    for (const [key, value] of Object.entries(styles)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, []);

  return null;
}
