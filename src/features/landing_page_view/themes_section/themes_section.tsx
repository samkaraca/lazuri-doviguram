import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";
import { ThemeCard } from "../theme_card/theme_card";
import styles from "./themes_section.module.scss";
import { ReactNode } from "react";

export function ThemesSection({
  themePreviews,
  home,
  createNewThemeButton,
}: {
  themePreviews: ThemeMetaDTO[];
  home: "/admin" | "/";
  createNewThemeButton?: ReactNode;
}) {
  return (
    <article id="temalar" className={styles["themes"]}>
      <div>
        <h4>{process.env.NEXT_PUBLIC_THEMES_HEADLINE}</h4>
        <section aria-label="temalar">
          <ol className={styles["cards"]}>
            {themePreviews.map((preview) => {
              return (
                <ThemeCard home={home} key={preview.id} previewData={preview} />
              );
            })}
            {createNewThemeButton}
          </ol>
        </section>
      </div>
    </article>
  );
}
