import { GetServerSidePropsContext } from "next";
import TP from "@/features/theme_page";
import { Theme } from "@/lib/theme/theme";
import { DynamoDBThemeRepository } from "@/lib/theme/dynamodb_theme_repository";
import ApiService from "@/lib/services/theme_api_service";

export default function ThemePage({ themeData }: { themeData: Theme }) {
  return <TP home="/" theme={Theme.from(themeData)} />;
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const path = context.params as unknown as { theme: string };
  const themeRepo = new DynamoDBThemeRepository();
  const adminThemeRepoService = new ApiService(themeRepo);
  const res = await adminThemeRepoService.getTheme(path.theme);

  if (res.status === "success" && res.data) {
    return {
      props: {
        themeData: res.data,
      },
      revalidate: 60 * 15,
    };
  }

  console.error(
    `/temalar/${path} -> getStaticProps. Error: ThemeRepository -> getTheme returned error.`
  );
}

export async function getStaticPaths() {
  const themeRepo = new DynamoDBThemeRepository();
  const adminThemeRepoService = new ApiService(themeRepo);
  const result = await adminThemeRepoService.getThemePathNames();

  if (result.status === "success" && result.data) {
    const themePaths = result.data.map((item) => ({ params: { theme: item } }));
    return { paths: themePaths, fallback: false };
  }

  console.error(
    `/temalar/[theme] -> getStaticPaths. Error: DynamoDBThemeRepository -> getThemePathNames returned error.`
  );
}
