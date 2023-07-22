import { GetServerSidePropsContext } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";
import { Theme } from "@/core/models/entities/learning_unit";
import { ThemePage as ThemePageElement } from "@/features/theme_page";

export default function ThemePage({ themeData }: { themeData: Theme }) {
  return <ThemePageElement home="/" theme={Theme.from(themeData)} />;
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const path = context.params as unknown as { theme: string };
  const themeRepository = new ThemeReposityImplementation();
  const themeData = await themeRepository.getThemeData(path.theme);

  return {
    props: {
      themeData,
    },
  };
}

export async function getStaticPaths() {
  const themeRepository = new ThemeReposityImplementation();
  const result = await themeRepository.getThemeIds();

  if (result.status === "success" && result.data) {
    const themePaths = result.data.map((item) => ({ params: { theme: item } }));
    return { paths: themePaths, fallback: false };
  }

  return { paths: [{ params: { theme: "id1234" } }], fallback: false };
}
