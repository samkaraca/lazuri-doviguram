import TP from "@/features/theme_page";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useAdminTheme } from "@/api/theme/useAdminTheme";

const AT = dynamic(() => import("@/features/admin_tools"), {
  ssr: false,
});

export default function ThemePage() {
  const { query } = useRouter();
  const { data: adminTheme } = useAdminTheme({ themeSlug: query.theme as string });

  if (adminTheme?.data) {
    return <TP home="/admin" theme={adminTheme.data} adminTools={<AT />} />;
  }

  return (
    <div className="admin-waiting-room">
      <h1>Merhaba Admin!</h1>
      <p>Tema Yükleniyor...</p>
    </div>
  );
}
