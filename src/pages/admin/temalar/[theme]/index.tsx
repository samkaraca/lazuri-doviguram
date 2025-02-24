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

  if (adminTheme) {
    return <TP home="/admin" theme={adminTheme} adminTools={<AT />} />;
  }

  return (
    <div className="admin-waiting-room">
      <h1 className="font-bold text-4xl">Merhaba Admin!</h1>
      <p>Tema Yükleniyor...</p>
    </div>
  );
}
