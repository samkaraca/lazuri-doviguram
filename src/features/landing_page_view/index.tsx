import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { AppBar } from "../app_bar";
import styles from "./styles.module.scss";
import { ThemesSection } from "./themes_section/themes_section";
import { WelcomeSection } from "./welcome_section/welcome_section";
import { Footer } from "../footer";
import Head from "next/head";

export function LandingPageView({
  isAdmin,
  themeMetas,
}: {
  isAdmin: boolean;
  themeMetas: ThemeMetaDTO[];
}) {
  return (
    <>
      <Head>
        <title>Lazuri Doviguram!</title>
      </Head>
      <AppBar />
      <WelcomeSection />
      <ThemesSection themeMetas={themeMetas} isAdmin={isAdmin} />
      <Footer />
    </>
  );
}
