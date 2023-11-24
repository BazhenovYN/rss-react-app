import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import RootLayout from '@/layouts/RootLayout';
import { wrapper } from '@/store/store';

import '@/styles/globals.scss';

export default function App({ Component, ...appProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(appProps);
  return (
    <RootLayout>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </RootLayout>
  );
}
