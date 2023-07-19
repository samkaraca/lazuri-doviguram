import { GetServerSidePropsContext } from "next";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";
import { Theme } from "@/core/models/entities/learning_unit";
import { ThemePage as ThemePageElement } from "@/features/theme_page";

export default function ThemePage({ themeData }: { themeData: Theme }) {
  return <ThemePageElement theme={Theme.from(themeData)} isAdmin={false} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const path = context.params as unknown as { theme: string };
  const themeRepository = ThemeReposityImplementation.getInstance();
  const themeData = await themeRepository.getThemeData(path.theme);

  return {
    props: {
      themeData,
    },
  };
}
