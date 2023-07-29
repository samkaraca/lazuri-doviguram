import { AppBar } from "../app_bar";
import { ThemesSection } from "./themes_section/themes_section";
import { WelcomeSection } from "./welcome_section/welcome_section";
import { Footer } from "../footer";
import Head from "next/head";
import { ReactNode } from "react";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";

export function LandingPageView({
  themePreviews,
  home = "/",
  createNewThemeButton,
}: {
  themePreviews: ThemeMetaDTO[];
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
        themePreviews={themePreviews}
        createNewThemeButton={createNewThemeButton}
      />
      <Footer />
    </>
  );
}
