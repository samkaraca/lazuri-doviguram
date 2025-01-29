import styles from "./welcome_section.module.scss";

export function WelcomeSection() {
  return (
    <section className={styles["welcome"]}>
      <div>
        <h1 className="font-bold">{process.env.NEXT_PUBLIC_WELCOME_HEADLINE}</h1>
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
        <img
          src={`/${process.env.NEXT_PUBLIC_PROJECT_OWNER}/welcome-image.png`}
        />
      </div>
    </section>
  );
}
