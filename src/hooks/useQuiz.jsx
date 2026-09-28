import { useEffect, useReducer } from "react";
import { decode } from "html-entities";
import { categoryMap } from "../data/category";

export function useQuiz() {
  const initialState = {
    curIndex: 0,
    selectedAnswer: "",
    score: 0,
    finished: false,
    correct: false,
    IQ: [],
    loading: false,
    restartKey: 0,
    topic: null,
    difficulty: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "next": {
        const nextIndex = state.curIndex + 1;
        const isFinished = nextIndex === state.IQ.length;
        return {
          ...state,
          curIndex: isFinished ? state.curIndex : nextIndex,
          finished: isFinished,
          selectedAnswer: "",
          correct: false,
        };
      }
      case "answer": {
        const answerCorrect =
          action.payload === state.IQ[state.curIndex].correct_answer;

        return {
          ...state,
          selectedAnswer: action.payload,
          score: answerCorrect ? state.score + 1 : state.score,
          correct: answerCorrect,
        };
      }
      case "IQ": {
        return { ...state, IQ: action.payload };
      }
      case "loading": {
        return {
          ...state,
          loading: action.payload,
          error: action.payload ? null : state.error,
        };
      }
      case "Topic": {
        return { ...state, topic: action.payload };
      }
      case "Difficulty": {
        return { ...state, difficulty: action.payload };
      }

      case "error":
        return { ...state, error: action.payload };
      case "restart":
        return {
          ...state,
          curIndex: 0,
          selectedAnswer: "",
          score: 0,
          finished: false,
          correct: false,
          loading: false,
          IQ: [],
          restartKey: state.restartKey + 1,
        };
        case "reset":
          return{...initialState, restartKey:state.restartKey}
      default:
        throw new Error("Action unknown");
    }
  }

  const [
    {
      curIndex,
      selectedAnswer,
      score,
      finished,
      correct,
      IQ,
      loading,
      restartKey,
      topic,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const curQuestion = IQ[curIndex];

  function nextQuestion() {
    dispatch({ type: "next" });
  }

  function checkAnswer(item) {
    if (selectedAnswer !== "") return;
    dispatch({ type: "answer", payload: item });
  }

  function restart() {
    dispatch({ type: "restart" });
  }

  function reset() {
  dispatch({ type: "reset" });
}

  function Loading(item) {
    dispatch({ type: "loading", payload: item });
  }

  function setTopic(topic) {
    dispatch({ type: "Topic", payload: topic });
  }

  function setDifficulty(difficulty) {
    dispatch({ type: "Difficulty", payload: difficulty });
  }

  function LoadQuestions(item) {
    console.log(item);
    dispatch({ type: "IQ", payload: item });
  }

  useEffect(() => {
    if (!topic) return;
    console.log("fetching for topic:", topic);

    const controller = new AbortController();

    (async () => {
      try {
        const categoryId = categoryMap[topic];
        const url = `https://opentdb.com/api.php?amount=5${categoryId ? `&category=${categoryId}` : ""}${difficulty ? `&difficulty=${difficulty}` : ""}`;

        const res = await fetch(url, { signal: controller.signal });
        if (res.status === 429) {
          throw new Error("Rate limit");
        }
        const data = await res.json();

        const data2 = data.results.map((object) => ({
          ...object,
          question: decode(object.question),
          correct_answer: decode(object.correct_answer),
          incorrect_answers: object.incorrect_answers.map((answer) =>
            decode(answer),
          ),
        }));

        LoadQuestions(data2);
      } catch (err) {
        console.error(err.message);
        
      } finally {
        if (!controller.signal.aborted) {
          Loading(false);
        }
      }
    })();
    return () => {
      controller.abort();
    };
  }, [restartKey, topic, difficulty]);

  return {
    curIndex,
    selectedAnswer,
    score,
    finished,
    correct,
    curQuestion,
    nextQuestion,
    checkAnswer,
    restart,
    loading,
    IQ,
    setTopic,
    setDifficulty,
    reset,
  };
}
