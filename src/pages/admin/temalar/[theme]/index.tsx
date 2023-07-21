import { GetServerSidePropsContext } from "next";
import { Theme } from "@/core/models/entities/learning_unit";
import { ThemePage as ThemePageElement } from "@/features/theme_page";
import { useEffect, useState } from "react";
import { AdminTools } from "@/features/admin_tools";

export default function ThemePage({ themeId }: { themeId: string }) {
  const [themeData, setThemeData] = useState<Theme>();

  const fetchTheme = async (themeId: string) => {
    const resObj = await fetch(`/api/admin/temalar/${themeId}`);
    const res = (await resObj.json()) as Theme;
    setThemeData(Theme.from(res));
  };

  useEffect(() => {
    fetchTheme(themeId);
  }, [themeId]);

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { theme } = context.params as unknown as { theme: string };

  return { props: { themeId: theme } };
}
