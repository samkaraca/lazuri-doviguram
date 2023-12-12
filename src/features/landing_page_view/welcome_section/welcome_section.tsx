import { IndexPageTemplate } from "@/lib/types/website_page_templates/index_page_template";
import styles from "./welcome_section.module.scss";

export function WelcomeSection({
  pageTemplate,
}: {
  pageTemplate: IndexPageTemplate;
}) {
  return (
    <section className={styles["welcome"]}>
      <div>
        <h1>{pageTemplate.welcomeHeadline}</h1>
        <p>{pageTemplate.welcomeText}</p>
        <button
          className="simple"
          onClick={() => {
            document.getElementById("temalar")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Öğrenmeye Başla
        </button>
        <img src={pageTemplate.welcomeImageUrl} />
      </div>
    </section>
  );
}
