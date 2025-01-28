import { LandingPageView } from "@/features/landing_page_view";
import { BackendThemeService } from "@/backend/services/theme_service";
import { defaultTheme } from "@/lib/theme/default_theme";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAdminCreateTheme } from "@/api/theme/useAdminCreateTheme";
import { useAdminThemeMetas } from "@/api/theme/useAdminThemeMetas";

export default function AdminPage() {

  const { mutateAsync: adminCreateTheme } = useAdminCreateTheme();
  const { data: themeMetas, refetch } = useAdminThemeMetas();
  const [stalling, setStalling] = useState(false);

  const createTheme = async () => {
    setStalling(true);
    const res = await adminCreateTheme({ theme: defaultTheme() });
    if (res.status === "success") await refetch();
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
        themePreviews={themeMetas.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1
        )}
        createNewThemeButton={
          <button
            disabled={stalling}
            onClick={createTheme}
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
