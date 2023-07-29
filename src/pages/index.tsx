import Head from "next/head";
import { LandingPageView } from "../features/landing_page_view";
import { DynamoDBThemeRepository } from "@/lib/theme/dynamodb_theme_repository";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import ApiService from "@/lib/services/theme_api_service";

export default function LandingPage({
  themeMetas,
}: {
  themeMetas: ThemeMetaDTO[];
}) {
  return (
    <>
      <Head>
        <title>Lazuri Doviguram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPageView home="/" themePreviews={themeMetas} />
    </>
  );
}

export async function getStaticProps() {
  const themeRepo = new DynamoDBThemeRepository();
  const adminThemeRepoService = new ApiService(themeRepo);
  const res = await adminThemeRepoService.getThemeMetas();

  if (res.status === "success" && res.data) {
    return {
      props: {
        themeMetas: res.data,
      },
    };
  }

  console.error(
    `/ -> getStaticProps. Error: DynamoDBThemeRepository -> getThemePreviews returned error.`
  );
}
