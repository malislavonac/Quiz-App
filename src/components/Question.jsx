import Options from "./Options";
import styles from "./Question.module.css";

export default function Question({ question, checkAnswer, selectedAnswer }) {
  return (
    <div>
      <h3 className={styles.question}>{question.question}</h3>
      <Options
        options={question}
        checkAnswer={checkAnswer}
        correctAnswer={question.correct_answer}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}
