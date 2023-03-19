import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { Ubuntu } from "next/font/google";

const inter = Ubuntu({ subsets: ["latin"], weight: "300" });
const theme = createTheme({ typography: { fontFamily: "" } });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
