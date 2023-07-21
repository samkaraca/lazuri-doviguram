import { Theme } from "@/core/models/entities/learning_unit";
import { ThemePage as ThemePageElement } from "@/features/theme_page";
import { useEffect, useState } from "react";
import { AdminTools } from "@/features/admin_tools";
import { usePathname } from "next/navigation";

export default function ThemePage() {
  const pathname = usePathname();
  const [themeData, setThemeData] = useState<Theme>();

  const fetchTheme = async (themeId: string) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}`);
    const res = (await resObj.json()) as Theme;
    setThemeData(Theme.from(res));
  };

  useEffect(() => {
    if (!pathname) return;
    const splitPathname = pathname.split("/");
    const themeId = splitPathname[splitPathname.length - 1];
    fetchTheme(themeId);
  }, [pathname]);

  if (themeData) {
    return (
      <ThemePageElement
        home="/admin"
        theme={themeData}
        adminTools={<AdminTools />}
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
