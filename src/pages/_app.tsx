import "@/styles/globals.scss";
import "@/styles/list.scss";
import "@/styles/button.scss";
import "@/styles/input.scss";
import "@/styles/side_bar.scss";
import "@/styles/feedback.scss";
import "@/styles/global.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

export const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
