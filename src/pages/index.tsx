import Head from "next/head";
import { LandingPageView } from "../features/landing_page_view";
import { DynamoDBThemeRepository } from "@/lib/repositories/theme/dynamodb_theme_repository";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import ThemeApiService from "@/lib/services/theme/theme_api_service";
import { DynamoDBWebsitePageTemplateRepository } from "@/lib/repositories/website_page_template/dynamodb_website_page_template_repository";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

export default function LandingPage({
  themeMetas,
  pageTemplate,
}: {
  themeMetas: ThemeMetaDTO[];
  pageTemplate: IndexPageTemplate;
}) {
  return (
    <>
      <Head>
        <title>{pageTemplate.pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPageView
        home="/"
        themePreviews={themeMetas}
        pageTemplate={pageTemplate}
      />
    </>
  );
}

export async function getStaticProps() {
  const themeRepo = new DynamoDBThemeRepository();
  const adminThemeRepoService = new ThemeApiService(themeRepo);
  const res = await adminThemeRepoService.getThemeMetas();

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
        themeMetas: res.data,
        pageTemplate: websiteTemplate.data,
      },
    };
  }

  console.error(
    `/ -> getStaticProps. Error: DynamoDBThemeRepository -> getThemePreviews returned error.`
  );
}
