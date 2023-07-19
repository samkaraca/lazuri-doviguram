import styles from "./welcome_section.module.scss";

export function WelcomeSection() {
  return (
    <section className={styles["welcome"]}>
      <div>
        <h1>Lazuri Doviguram!</h1>
        <p>
          Tarihin en eski dönemlerinden beri Kafkas insanının duygularına
          tercüman olmuş, yaşamlarına eşlik etmiş bir dili, daha yakından
          tanımak ister misin?
        </p>
        <button className="simple">Öğrenmeye Başla</button>
        <img src="/reading-kid.png" />
      </div>
    </section>
  );
}
