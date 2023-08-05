import TP from "@/features/theme_page";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import ThemeAdminService from "@/lib/services/theme/theme_admin_service";
import ITheme from "@/lib/theme/theme";

const AT = dynamic(() => import("@/features/admin_tools"), {
  ssr: false,
});

export default function ThemePage() {
  const pathname = usePathname();
  const adminService = useRef(new ThemeAdminService());
  const [themeData, setThemeData] = useState<ITheme>();

  const fetchTheme = async (pathName: string) => {
    setThemeData(await adminService.current.fetchTheme(pathName));
  };

  useEffect(() => {
    if (!pathname) return;
    const splitPathname = pathname.split("/");
    const themePathName = splitPathname[splitPathname.length - 1];
    fetchTheme(themePathName);
  }, [pathname]);

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
