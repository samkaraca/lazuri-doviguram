import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { StatusResponse } from "@/core/models/repositories/status_response";
import { LandingPageView } from "@/features/landing_page_view";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [themeMetas, setThemeMetas] = useState<ThemeMetaDTO[]>();
  const [stalling, setStalling] = useState(false);

  const fetchThemeMetas = async () => {
    const resObj = await fetch(`/api/admin/temalar`);
    const res = (await resObj.json()) as ThemeMetaDTO[];
    setThemeMetas(res);
  };

  useEffect(() => {
    fetchThemeMetas();
  }, []);

  const createNewTheme = async () => {
    setStalling(true);
    const resObj = await fetch(`/api/admin/temalar`, {
      method: "PUT",
      body: JSON.stringify({
        type: "createNewTheme",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = (await resObj.json()) as Omit<StatusResponse, "data"> & {
      data: { newThemeId: string };
    };
    if (res.status === "success") await fetchThemeMetas();
    setStalling(false);
  };

  if (!themeMetas) {
    return (
      <div className="admin-waiting-room">
        <h1>Merhaba Admin!</h1>
        <p>Ana Sayfa Yükleniyor...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Paneli | Lazuri Doviguram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LandingPageView
        home="/admin"
        themeMetas={themeMetas}
        createNewThemeButton={
          <button
            disabled={stalling}
            onClick={createNewTheme}
            style={{
              minHeight: "14rem",
              backgroundColor: "#eee",
              border: "1px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
            }}
          >
            Yeni Tema +
          </button>
        }
      />
    </>
  );
}
