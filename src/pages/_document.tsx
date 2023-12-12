import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/${process.env.PROJECT_OWNER}/metadata-files/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/${process.env.PROJECT_OWNER}/metadata-files/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/${process.env.PROJECT_OWNER}/metadata-files/favicon-16x16.png`}
        />
        <link
          rel="manifest"
          href={`/${process.env.PROJECT_OWNER}/metadata-files/site.webmanifest`}
        />
        <link
          rel="mask-icon"
          href={`/${process.env.PROJECT_OWNER}/metadata-files/safari-pinned-tab.svg`}
          color="#2b5797"
        />
        <link
          rel="shortcut icon"
          href={`/${process.env.PROJECT_OWNER}/metadata-files/favicon.ico`}
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta
          name="msapplication-config"
          content={`/${process.env.PROJECT_OWNER}/metadata-files/browserconfig.xml`}
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
