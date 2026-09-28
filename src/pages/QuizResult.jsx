import { UseQuizContext } from "../context/QuizContext";
import ResultComponent from "../components/Result";
import { useNavigate,useParams } from "react-router-dom";

function QuizResult() {
  const { score, restart,reset } = UseQuizContext();
  const { topic,difficulty } = useParams();
  const navigate = useNavigate();

  const handleRestart = () => {
    restart();
    navigate(`/quiz/${topic}/${difficulty}`);
  };

  function goHome(){
    reset();
    navigate("/")
  }

  return (
    <div>
      <ResultComponent score={score} restart={handleRestart} goHome={goHome}/>
    </div>
  );
}

export default QuizResult;
