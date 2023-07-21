import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { LandingPageView } from "@/features/landing_page_view";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [themeMetas, setThemeMetas] = useState<ThemeMetaDTO[]>([]);

  const fetchThemeMetas = async () => {
    const resObj = await fetch(`/api/admin/temalar`);
    const res = (await resObj.json()) as ThemeMetaDTO[];
    setThemeMetas(res);
  };

  useEffect(() => {
    fetchThemeMetas();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Paneli | Lazuri Doviguram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPageView isAdmin={true} themeMetas={themeMetas} />
    </>
  );
}
