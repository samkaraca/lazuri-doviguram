import { Theme } from "@/core/models/entities/learning_unit";
import TP from "@/features/theme_page";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { StatusResponse } from "@/core/models/repositories/status_response";

const AT = dynamic(() => import("@/features/admin_tools"), {
  ssr: false,
});

export default function ThemePage() {
  const pathname = usePathname();
  const [themeData, setThemeData] = useState<Theme>();

  const fetchTheme = async (themeId: string) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}`);
    const res = (await resObj.json()) as StatusResponse<Theme>;
    if (res.status === "success" && res.data) {
      setThemeData(Theme.from(res.data));
    }
  };

  useEffect(() => {
    if (!pathname) return;
    const splitPathname = pathname.split("/");
    const themeId = splitPathname[splitPathname.length - 1];
    fetchTheme(themeId);
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
