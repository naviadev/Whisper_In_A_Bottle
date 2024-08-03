import type { AppProps } from "next/app";
// eslint-disable-next-line import/no-unresolved
import SocketClient from "components/SocketClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocketClient />
      <Component {...pageProps} />;
    </>
  );
}
