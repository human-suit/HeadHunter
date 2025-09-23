import { createRoot } from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { store } from './app/store';

import '@mantine/core/styles.css';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Provider>
);
