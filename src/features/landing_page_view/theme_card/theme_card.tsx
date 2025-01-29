import { Label } from "@mui/icons-material";
import styles from "./theme_card.module.scss";
import { ThemeMetaDTO } from "@/lib/theme/theme_meta_dto";

export function ThemeCard({
  previewData,
  home,
}: {
  previewData: ThemeMetaDTO;
  home: "/admin" | "/";
}) {
  const { image, lessons, title, slug } = previewData;

  return (
    <li>
      <a
        href={`${home === "/" ? "" : home}/temalar/${slug}`}
        className={`${styles["card"]} card-button`}
      >
        <img
          src={`${image ? image : "/default-theme.jpg"}`}
        />
        <div className={styles["content"]}>
          <header>
            <h2>{title}</h2>
            <button className="simple lg">Başla</button>
          </header>
          <ol>
            {lessons.map((lesson) => {
              const { id, title } = lesson;

              return (
                <li key={id}>
                  <Label />
                  <h3>{title}</h3>
                </li>
              );
            })}
          </ol>
        </div>
      </a>
    </li>
  );
}
