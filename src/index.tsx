import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'remixicon/fonts/remixicon.css';
import App from './App';

const isNativeWebView = typeof window !== 'undefined' && !!(window as any).ReactNativeWebView;

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  if (isNativeWebView) {
    import('@toss/tds-mobile-ait').then(({ TDSMobileAITProvider }) => {
      root.render(
        <TDSMobileAITProvider>
          <App />
        </TDSMobileAITProvider>
      );
    }).catch(() => {
      root.render(<App />);
    });
  } else {
    root.render(<App />);
  }
}
