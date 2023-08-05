import useViewModelContext from "../../view_model";
import styles from "./styles.module.scss";

export function ActivityFooter() {
  const { closeActivity, reattemptToActivity, isSolved, finishActivity } =
    useViewModelContext()!;

  return (
    <footer className={styles["footer"]}>
      {isSolved ? (
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
