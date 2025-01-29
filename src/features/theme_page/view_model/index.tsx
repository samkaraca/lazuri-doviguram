import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import ITheme from "@/lib/theme/theme";
import { useAdminTheme } from "@/api/theme/useAdminTheme";
import { useRouter } from "next/router";
import { useViewModel } from "./use_view_model";
import { ViewModel as ViewModelType } from "../model/view_model";

export const ViewModelContext = createContext<ViewModelType | null>(null);

export function ViewModel({
  children,
  theme,
}: {
  children: ReactNode;
  theme: ITheme;
}) {
  const [themeData, setThemeData] = useState<ITheme>(theme);
  const viewModel = useViewModel(themeData);

  const router = useRouter();
  const isAdmin = useMemo(() => router.pathname.split("/")[1] === "admin", [router.pathname]);
  const { data: adminTheme } = useAdminTheme({ themeSlug: isAdmin ? router.query.theme as string : "" });

  useEffect(() => {
    if (adminTheme && isAdmin) {
      setThemeData(adminTheme);
    }
  }, [adminTheme, isAdmin]);

  return (
    <ViewModelContext.Provider value={viewModel}>
      {children}
    </ViewModelContext.Provider>
  );
}

export const useViewModelContext = () => useContext(ViewModelContext);
