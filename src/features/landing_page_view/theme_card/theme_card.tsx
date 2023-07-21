import { Label } from "@mui/icons-material";
import styles from "./theme_card.module.scss";
import { ThemeMetaDTO } from "@/core/models/dtos/theme_meta_dto";
import { usePathname } from "next/navigation";

export function ThemeCard({ themeMeta }: { themeMeta: ThemeMetaDTO }) {
  const pathname = usePathname();
  const { id, image, lessons, title } = themeMeta;

  return (
    <li>
      <a
        href={`${pathname}/temalar/${id}`}
        className={`${styles["card"]} card-button`}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_IMAGE_BASE_URL}/${image}`}
        />
        <div className={styles["content"]}>
          <header>
            <h2>{title}</h2>
            <button className="simple">Başla</button>
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
