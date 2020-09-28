import React from "react";

import "bootstrap-daterangepicker/daterangepicker.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
