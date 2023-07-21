import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { ThemeCard } from "../theme_card/theme_card";
import styles from "./themes_section.module.scss";

export function ThemesSection({
  isAdmin,
  themeMetas,
}: {
  isAdmin: boolean;
  themeMetas: ThemeMetaDTO[];
}) {
  return (
    <article className={styles["themes"]}>
      <div>
        <h4>Temel Lazca</h4>
        <section aria-label="temalar">
          <ol className={styles["cards"]}>
            {themeMetas.map((themeMeta) => {
              return <ThemeCard key={themeMeta.id} themeMeta={themeMeta} />;
            })}
            {/* <button
              style={{
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
              }}
            >
              Yeni Tema +
            </button> */}
          </ol>
        </section>
      </div>
    </article>
  );
}
