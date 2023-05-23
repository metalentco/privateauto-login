import "../styles/globals.css";
import { fontRegularStyles, fontBoldStyles } from "../libs/fontStyles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          ${fontRegularStyles}
          ${fontBoldStyles}
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
