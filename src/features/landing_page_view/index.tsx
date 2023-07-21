import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { AppBar } from "../app_bar";
import styles from "./styles.module.scss";
import { ThemesSection } from "./themes_section/themes_section";
import { WelcomeSection } from "./welcome_section/welcome_section";
import { Footer } from "../footer";
import Head from "next/head";
import { ReactNode } from "react";

export function LandingPageView({
  themeMetas,
  home = "/",
  createNewThemeButton,
}: {
  themeMetas: ThemeMetaDTO[];
  home: "/admin" | "/";
  createNewThemeButton?: ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Lazuri Doviguram!</title>
      </Head>
      <AppBar home={home} />
      <WelcomeSection />
      <ThemesSection
        home={home}
        themeMetas={themeMetas}
        createNewThemeButton={createNewThemeButton}
      />
      <Footer />
    </>
  );
}
