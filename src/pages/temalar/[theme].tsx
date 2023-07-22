import { GetServerSidePropsContext } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";
import { Theme } from "@/core/models/entities/learning_unit";
import TP from "@/features/theme_page";

export default function ThemePage({ themeData }: { themeData: Theme }) {
  console.debug("ThemePage---", Date.now());

  return <TP home="/" theme={Theme.from(themeData)} />;
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  console.debug("getStaticProps---", Date.now());
  const path = context.params as unknown as { theme: string };
  const themeRepository = new ThemeReposityImplementation();
  console.debug("getStaticProps-1--", Date.now());
  const themeData = await themeRepository.getThemeData(path.theme);
  console.debug("getStaticProps-2--", Date.now());

  return {
    props: {
      themeData,
    },
    revalidate: 60 * 15,
  };
}

export async function getStaticPaths() {
  console.debug("getStaticPaths---", Date.now());
  const themeRepository = new ThemeReposityImplementation();
  console.debug("getStaticPaths-1--", Date.now());
  const result = await themeRepository.getThemeIds();
  console.debug("getStaticPaths-2--", Date.now());

  if (result.status === "success" && result.data) {
    const themePaths = result.data.map((item) => ({ params: { theme: item } }));
    return { paths: themePaths, fallback: false };
  }

  return { paths: [], fallback: false };
}
