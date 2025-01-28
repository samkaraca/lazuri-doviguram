import TP from "@/features/theme_page";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import ITheme from "@/lib/theme/theme";
import { useAdminTheme } from "@/api/theme/useAdminTheme";

const AT = dynamic(() => import("@/features/admin_tools"), {
  ssr: false,
});

export default function ThemePage() {
  const pathname = usePathname();
  const { data: adminTheme } = useAdminTheme({ themeSlug: pathname ? pathname.split("/").pop() as string : "" });
  const [themeData, setThemeData] = useState<ITheme>();

  useEffect(() => {
    if (!pathname || !adminTheme) return;
    setThemeData(adminTheme?.data as ITheme);
  }, [pathname, adminTheme]);

  if (themeData) {
    return <TP home="/admin" theme={themeData} adminTools={<AT />} />;
  }

  return (
    <div className="admin-waiting-room">
      <h1>Merhaba Admin!</h1>
      <p>Tema Yükleniyor...</p>
    </div>
  );
}
