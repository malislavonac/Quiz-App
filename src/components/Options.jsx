import { useMemo } from "react";
import styles from "./Options.module.css";

function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

export default function Options({
  options,
  checkAnswer,
  correctAnswer,
  selectedAnswer,
}) {
  
  const questionOptions = useMemo(() => {
  const optionsArray = [...options.incorrect_answers, options.correct_answer];
  if(optionsArray.length === 2){
    return ["True","False"]
  } else{
  return shuffle(optionsArray);}
}, [options]);

  function getClass(item) {
  if (selectedAnswer === "") return styles.option;
  if (item === correctAnswer) return `${styles.option} ${styles.correct}`;
  if (item === selectedAnswer) return `${styles.option} ${styles.wrong}`;
  return `${styles.option} ${styles.dimmed}`;
}
  return (
  <div className={styles.options}>
    {questionOptions.map((item) => (
      <button
        key={item}
        className={getClass(item)}
        disabled={selectedAnswer !== ""}
        onClick={() => checkAnswer(item)}
      >
        {item}
      </button>
    ))}
  </div>
);
}
