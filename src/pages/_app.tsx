import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { Ubuntu } from "next/font/google";

const inter = Ubuntu({ subsets: ["latin-ext"], weight: ["300", "400", "700"] });

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
    fontWeightLight: "300",
    fontWeightRegular: "400",
    fontWeightBold: "700",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
