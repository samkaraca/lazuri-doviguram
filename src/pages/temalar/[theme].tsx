import { GetServerSidePropsContext } from "next";
import TP from "@/features/theme_page";
import { DynamoDBThemeRepository } from "@/lib/repositories/theme/dynamodb_theme_repository";
import ITheme from "@/lib/theme/theme";
import ThemeApiService from "@/lib/services/theme/theme_api_service";
import { DynamoDBWebsitePageTemplateRepository } from "@/lib/repositories/website_page_template/dynamodb_website_page_template_repository";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

export default function ThemePage({
  themeData,
  pageTemplate,
}: {
  themeData: ITheme;
  pageTemplate: IndexPageTemplate;
}) {
  return <TP home="/" theme={themeData} pageTemplate={pageTemplate} />;
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  const path = context.params as unknown as { theme: string };
  const themeRepo = new DynamoDBThemeRepository();
  const adminThemeRepoService = new ThemeApiService(themeRepo);
  const res = await adminThemeRepoService.getTheme(path.theme);

  const dynamodbWebsiteTemplateRepo =
    new DynamoDBWebsitePageTemplateRepository();
  const websiteTemplate =
    await dynamodbWebsiteTemplateRepo.getIndexPageTemplate();

  if (
    res.status === "success" &&
    res.data &&
    websiteTemplate.status === "success" &&
    websiteTemplate.data
  ) {
    return {
      props: {
        themeData: res.data,
        pageTemplate: websiteTemplate.data,
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
  const adminThemeRepoService = new ThemeApiService(themeRepo);
  const result = await adminThemeRepoService.getThemeIds();

  if (result.status === "success" && result.data) {
    const themePaths = result.data.map((item) => ({ params: { theme: item } }));
    return { paths: themePaths, fallback: false };
  }

  console.error(
    `/temalar/[theme] -> getStaticPaths. Error: DynamoDBThemeRepository -> getThemeIds returned error.`
  );
}
