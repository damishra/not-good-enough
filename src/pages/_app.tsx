import type { AppProps } from "next/app";
import "../styles/main.scss";
import UIShell from "../components/uishell";
import BodyShell from "../components/bodyshell";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UIShell />
      <BodyShell>
        <Component {...pageProps} />
      </BodyShell>
    </>
  );
}

export default MyApp;
