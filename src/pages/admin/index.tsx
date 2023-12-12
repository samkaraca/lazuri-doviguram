import { LandingPageView } from "@/features/landing_page_view";
import { DynamoDBWebsitePageTemplateRepository } from "@/lib/repositories/website_page_template/dynamodb_website_page_template_repository";
import ThemeAdminService from "@/lib/services/theme/theme_admin_service";
import ThemeApiService from "@/lib/services/theme/theme_api_service";
import { defaultTheme } from "@/lib/theme/default_theme";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function AdminPage() {
  const adminService = useRef(new ThemeAdminService());
  const [themeMetas, setThemeMetas] = useState<ThemeMetaDTO[]>();
  const [pageTemplate, setPageTemplate] = useState<IndexPageTemplate>();
  const [stalling, setStalling] = useState(false);

  const fetchThemeMetas = async () => {
    const resObj = await fetch(`/api/admin/temalar?r=theme-metas`);
    const res = await (resObj.json() as ReturnType<
      ThemeApiService["getThemeMetas"]
    >);
    if (res.status === "success" && res.data) {
      setThemeMetas(res.data);
    }
  };

  const fetchPageTemplate = async () => {
    const dynamodbWebsiteTemplateRepo =
      new DynamoDBWebsitePageTemplateRepository();
    const res = await dynamodbWebsiteTemplateRepo.getIndexPageTemplate();
    if (res.status === "success" && res.data) {
      setPageTemplate(res.data);
    }
  };

  useEffect(() => {
    fetchThemeMetas();
    fetchPageTemplate();
  }, []);

  const createTheme = async () => {
    setStalling(true);
    const res = await adminService.current.createTheme(defaultTheme());
    if (res.status === "success") await fetchThemeMetas();
    setStalling(false);
  };

  if (!themeMetas || !pageTemplate) {
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
        pageTemplate={pageTemplate}
        home="/admin"
        themePreviews={themeMetas}
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
