import "@/styles/globals.scss";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["300", "400", "600", "700"],
});

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
    fontWeightLight: "300",
    fontWeightRegular: "400",
    fontWeightMedium: "600",
    fontWeightBold: "700",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
