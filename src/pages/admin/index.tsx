import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { ThemeReposityImplementation } from "@/core/models/repositories/theme_repository_implementation";
import { LandingPageView } from "@/features/landing_page_view";
import Head from "next/head";

export default function AdminPage({
  themeMetas,
}: {
  themeMetas: ThemeMetaDTO[];
}) {
  return (
    <div>
      <Head>
        <title>Admin Paneli | Lazuri Doviguram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPageView isAdmin={true} themeMetas={themeMetas} />
    </div>
  );
}

export async function getServerSideProps() {
  const themeRepository = new ThemeReposityImplementation();
  const themeMetas = await themeRepository.getThemeMetas();

  return {
    props: {
      themeMetas,
    },
  };
}
