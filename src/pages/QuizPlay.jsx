import { UseQuizContext } from "../context/QuizContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Question from "../components/Question";
import Loader from "../components/Loader";
import styles from "./QuizPlay.module.css";

function QuizPlay() {
  const {topic,difficulty} = useParams();
  const navigate=useNavigate();

  const {
    curIndex,
    selectedAnswer,
    finished,
    correct,
    curQuestion,
    nextQuestion,
    checkAnswer,
    IQ,
    loading,
    setTopic,
    setDifficulty,
  } = UseQuizContext();

  
  useEffect(() => {
  setTopic(topic);
}, [topic]);

useEffect(() => {
  setDifficulty(difficulty);
}, [difficulty]);
  
  useEffect(() => {
  if (finished) navigate(`/quiz/${topic}/${difficulty}/result`);
}, [finished]);
  

  if (loading || !IQ.length) return <Loader />;

  return (
  <div className={styles.quiz}>
    <div className={styles.card}>
      <progress className={styles.progress} value={curIndex + 1} max={IQ.length} />
      <span className={styles.counter}>{curIndex + 1}/{IQ.length}</span>

      <Question
        question={curQuestion}
        checkAnswer={checkAnswer}
        selectedAnswer={selectedAnswer}
      />

      {selectedAnswer !== "" && (
        <h2 className={`${styles.feedback} ${correct ? styles.correct : styles.wrong}`}>
          {correct ? "Correct!" : "Wrong!"}
        </h2>
      )}

      {selectedAnswer !== "" && !finished && (
        <button className={styles.next} onClick={nextQuestion}>Next</button>
      )}
    </div>
  </div>
);
}

export default QuizPlay;
