import styles from "./styles.module.scss";

export function ActivityFooter({
  isFinished,
  reattemptToActivity,
  closeActivity,
  finishActivity,
}: {
  isFinished: boolean;
  reattemptToActivity: VoidFunction;
  closeActivity: VoidFunction;
  finishActivity: VoidFunction;
}) {
  return (
    <footer className={styles["footer"]}>
      {isFinished ? (
        <div className="row-group">
          <button className="simple" onClick={reattemptToActivity}>
            Tekrar Çöz
          </button>
          <button className="simple" onClick={closeActivity}>
            Bitir
          </button>
        </div>
      ) : (
        <button className="simple" onClick={finishActivity}>
          Sonucu gör
        </button>
      )}
    </footer>
  );
}
