import { createContext, useContext } from "react";
import { useQuiz } from "../hooks/useQuiz";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const quiz = useQuiz();

  return <QuizContext.Provider value={quiz}>{children}</QuizContext.Provider>;
}

function UseQuizContext() {
  const quiz = useContext(QuizContext);
  return quiz;
}

export { QuizProvider, UseQuizContext };
