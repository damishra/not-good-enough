import type { AppProps } from "next/app";
import "../styles/main.scss";
import UIShell from "../components/uishell";
import BodyShell from "../components/bodyshell";
import { useState } from "react";
import type { pages } from "../logic/frontend";

function MyApp({ Component, pageProps }: AppProps) {
  const [current, setCurrent] = useState("dashboard" as pages);
  return (
    <>
      <UIShell current={current} />
      <BodyShell>
        <Component setCurrent={setCurrent} {...pageProps} />
      </BodyShell>
    </>
  );
}

export default MyApp;
