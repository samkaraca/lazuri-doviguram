import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { ThemeCard } from "../theme_card/theme_card";
import styles from "./themes_section.module.scss";
import { ReactNode } from "react";

export function ThemesSection({
  themeMetas,
  home,
  createNewThemeButton,
}: {
  themeMetas: ThemeMetaDTO[];
  home: "/admin" | "/";
  createNewThemeButton?: ReactNode;
}) {
  return (
    <article id="temalar" className={styles["themes"]}>
      <div>
        <h4>Temel Lazca</h4>
        <section aria-label="temalar">
          <ol className={styles["cards"]}>
            {themeMetas.map((themeMeta) => {
              return (
                <ThemeCard
                  home={home}
                  key={themeMeta.id}
                  themeMeta={themeMeta}
                />
              );
            })}
            {createNewThemeButton}
          </ol>
        </section>
      </div>
    </article>
  );
}
