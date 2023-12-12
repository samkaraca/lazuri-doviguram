import TP from "@/features/theme_page";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import ThemeAdminService from "@/lib/services/theme/theme_admin_service";
import ITheme from "@/lib/theme/theme";
import { DynamoDBWebsitePageTemplateRepository } from "@/lib/repositories/website_page_template/dynamodb_website_page_template_repository";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

const AT = dynamic(() => import("@/features/admin_tools"), {
  ssr: false,
});

export default function ThemePage() {
  const pathname = usePathname();
  const adminService = useRef(new ThemeAdminService());
  const [themeData, setThemeData] = useState<ITheme>();
  const [pageTemplate, setPageTemplate] = useState<IndexPageTemplate>();

  const fetchTheme = async (pathName: string) => {
    setThemeData(await adminService.current.fetchTheme(pathName));
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
    if (!pathname) return;
    const splitPathname = pathname.split("/");
    const themePathName = splitPathname[splitPathname.length - 1];
    fetchTheme(themePathName);
    fetchPageTemplate();
  }, [pathname]);

  if (themeData && pageTemplate) {
    return (
      <TP
        home="/admin"
        theme={themeData}
        adminTools={<AT />}
        pageTemplate={pageTemplate}
      />
    );
  }

  return (
    <div className="admin-waiting-room">
      <h1>Merhaba Admin!</h1>
      <p>Tema Yükleniyor...</p>
    </div>
  );
}
