import ITheme from "@/lib/theme/theme";
import { View } from "./view";
import { ViewModel } from "./view_model";
import { ReactNode } from "react";
import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";

export default function ThemePage({
  theme,
  home,
  adminTools,
  pageTemplate,
}: {
  theme: ITheme;
  home: "/admin" | "/";
  adminTools?: ReactNode;
  pageTemplate: IndexPageTemplate;
}) {
  return (
    <ViewModel theme={theme}>
      <View adminTools={adminTools} home={home} pageTemplate={pageTemplate} />
    </ViewModel>
  );
}
