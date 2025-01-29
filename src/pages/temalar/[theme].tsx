import { GetServerSidePropsContext } from "next";
import TP from "@/features/theme_page";
import ITheme from "@/lib/theme/theme";
import { getTheme } from "@/backend/services/theme/getTheme";
import { getThemeIds } from "@/backend/services/theme/getThemeIds";

export default function ThemePage({ themeData }: { themeData: ITheme }) {
  return <TP home="/" theme={themeData} />;
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const path = context.params as unknown as { theme: string };
  const res = await getTheme(path.theme);

  if (res.status === "success" && res.data) {
    return {
      props: {
        themeData: {
          ...res.data,
          createdAt: res.data.createdAt.toISOString(),
        },
      },
      revalidate: 60 * 15,
    };
  }

  console.error(
    `/temalar/${path} -> getStaticProps. Error: ThemeRepository -> getTheme returned error.`
  );
}

export async function getStaticPaths() {
  const result = await getThemeIds();

  if (result.status === "success" && result.data) {
    const themePaths = result.data.map((item) => ({ params: { theme: item } }));
    return { paths: themePaths, fallback: false };
  }

  console.error(
    `/temalar/[theme] -> getStaticPaths. Error: DynamoDBThemeRepository -> getThemeIds returned error.`
  );
}
