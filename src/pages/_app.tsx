import "@/styles/globals.css";
import "@/styles/common.css";
import type { AppProps } from "next/app";
import StoreProvider from "@/store/StoreProvider";
import { BaseHeader } from "../components/BaseHeader";
import { BaseFooter } from "../components/BaseFooter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="wrapper">
      <StoreProvider {...pageProps.initialZustandState}>
        <BaseHeader />
        <Component {...pageProps} />
        <BaseFooter />
      </StoreProvider>
    </div>
  );
}
