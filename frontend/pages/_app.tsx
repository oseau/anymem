import type { AppProps } from "next/app";
import React from "react";
import { appWithTranslation } from 'next-i18next';
import "../styles/globals.css"; // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
