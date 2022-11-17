import "../styles/font.css";
import "tailwindcss/tailwind.css";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyle from "styles/GlobalStyle";
import { theme } from "styles/theme";

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
