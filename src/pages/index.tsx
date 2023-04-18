import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Lazuri Doviguram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div id="main">
        <h1>Ana sayfa</h1>
        <Link href="/admin">Admin Paneli</Link>
      </div>
    </>
  );
}
