import styles from "./welcome_section.module.scss";

export function WelcomeSection() {
  return (
    <section className={styles["welcome"]}>
      <div>
        <h1>{process.env.NEXT_PUBLIC_WELCOME_HEADLINE}</h1>
        <p>{process.env.NEXT_PUBLIC_WELCOME_TEXT}</p>
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
        <img src={process.env.NEXT_PUBLIC_WELCOME_IMAGE_URL} />
      </div>
    </section>
  );
}
