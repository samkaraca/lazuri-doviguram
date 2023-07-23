import { GetServerSidePropsContext } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";
import { Theme } from "@/core/models/entities/learning_unit";
import TP from "@/features/theme_page";

export default function ThemePage({ themeData }: { themeData: Theme }) {
  return <TP home="/" theme={Theme.from(themeData)} />;
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const path = context.params as unknown as { theme: string };
  const themeRepository = new ThemeReposityImplementation();
  const res = await themeRepository.getThemeData(path.theme);

  if (res.status === "success" && res.data) {
    return {
      props: {
        themeData: res.data,
      },
      revalidate: 60 * 15,
    };
  }

  console.error(
    `/temalar/${path} -> getStaticProps. Error: ThemeRepository -> getThemeData returned error.`
  );
}

export async function getStaticPaths() {
  const themeRepository = new ThemeReposityImplementation();
  const result = await themeRepository.getThemePathNames();

  if (result.status === "success" && result.data) {
    const themePaths = result.data.map((item) => ({ params: { theme: item } }));
    return { paths: themePaths, fallback: false };
  }

  console.error(
    `/temalar/[theme] -> getStaticPaths. Error: ThemeRepository -> getThemePathNames returned error.`
  );
}
