import { useState, useEffect } from "react";
import { UseQuizContext } from "../context/QuizContext";
import Loader from "./Loader";
import styles from "./Result.module.css";

export default function ResultComponent({ score, restart, goHome }) {
  const [canRestart, setCanRestart] = useState(false);
  const { IQ } = UseQuizContext();

  useEffect(() => {
    const timer = setTimeout(() => setCanRestart(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (IQ.length === 0) return <Loader />;

  return (
    <div className={styles.result}>
      <div className={styles.card}>
        <h2 className={styles.title}>Quiz finished!</h2>
        <p className={styles.score}>
          {score}/{IQ.length}
        </p>
        <div className={styles.actions}>
          <button
            className={styles.primary}
            disabled={!canRestart}
            onClick={restart}
          >
            Restart
          </button>
          <button className={styles.secondary} onClick={goHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}