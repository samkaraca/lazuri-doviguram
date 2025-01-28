import Head from "next/head";
import { LandingPageView } from "../features/landing_page_view";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import { getThemeMetas } from "@/backend/services/theme/getThemeMetas";

export default function LandingPage({
  themeMetas,
}: {
  themeMetas: ThemeMetaDTO[];
}) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJECT_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPageView home="/" themePreviews={themeMetas} />
    </>
  );
}

export async function getStaticProps() {
  const res = await getThemeMetas();

  if (res.status === "success" && res.data) {
    return {
      props: {
        themeMetas: res.data.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        ),
      },
    };
  }

  console.error(
    `/ -> getStaticProps. Error: DynamoDBThemeRepository -> getThemePreviews returned error.`
  );
}
