//  import Question from "./Question";
//  import ResultComponent from "./Result";
//  import Loader from "./Loader";
//  import { UseQuizContext } from "./QuizContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPlay from "./pages/QuizPlay";
import QuizResult from "./pages/QuizResult";
import Home from "./pages/Home";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  
  return (
    <BrowserRouter>
    <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz/:topic/:difficulty" element={<QuizPlay />}></Route>
        <Route path="/quiz/:topic/:difficulty/result" element={<QuizResult />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

// export default function App() {
//   const { finished } = UseQuizContext();

//   return !finished ? <QuizPlay /> : <QuizResult />;
// }

//  export default function App() {

//    const  {curIndex, selectedAnswer, score, finished, correct,curQuestion,nextQuestion,checkAnswer,restart,loading,IQ} = UseQuizContext()

//    return !finished ? (
//      (loading || !IQ.length)?<Loader/>:
//      <div className="quiz">
//        <h1>QUIZ APP</h1>

//        <Question
//          question={curQuestion}
//          checkAnswer={checkAnswer}
//          selectedAnswer={selectedAnswer}
//        />
//        {selectedAnswer !== "" && !finished && (
//          <button onClick={nextQuestion}>NEXT</button>
//        )}
//        {selectedAnswer!==""&&<h2>{correct?'CORRECT':'WRONG'}</h2>}
//        <progress value={curIndex + 1} max={IQ.length} />
//        {curIndex + 1}/{IQ.length}

//      </div>
//  ) : (
//      <div>
//        <ResultComponent score={score} restart={restart} />
//      </div>
//    )
//  }
