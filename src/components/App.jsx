import { useReducer } from "react";
import { Background } from "./Background";
import Start from "./Start";
import Questions from "./Questions";
import Result from "./Result";
import { questions } from "../data/questions";

const initialValue = {
  questions: questions.slice(0, 20),
  // ready, active, finsh
  status: "ready",
  name: "",
  numQ: 20,
  level: "Easy",
  index: 0,
  answer: null,
  points: 0,
  timeSec: 30 * 20,
  saveAnswer: [],
};

function reduce(state, action) {
  switch (action.type) {
    case "setLevel":
      return {
        ...state,
        level: action.payload,
        questions: questions
          .filter((q) => q.level === action.payload)
          .slice(0, state.numQ),
        timeSec: 30 * state.numQ,
      };
    case "setNumQ":
      return {
        ...state,
        questions: state.questions.slice(0, action.payload),
        numQ: action.payload,
        timeSec: 30 * action.payload,
      };
    case "start":
      return { ...state, status: "active" };
    case "answer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.answer ? state.points + 1 : state.points,
        saveAnswer: [
          ...state.saveAnswer,
          {
            question: question.question,
            answer: question.options[question.answer],
            myAnswer: question.options[action.payload],
          },
        ],
      };
    }
    case "nextQ":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finsh":
      return { ...state, status: "finsh" };
    case "reset":
      return initialValue;
    case "tick":
      return {
        ...state,
        timeSec: state.timeSec === 0 ? 0 : state.timeSec - 1,
        status: state.timeSec === 0 ? "finsh" : state.status,
      };
    case "setName":
      return { ...state, name: action.payload };
    default:
      throw new Error("Unkonwn Action");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      numQ,
      level,
      timeSec,
      saveAnswer,
      name,
    },
    dispatch,
  ] = useReducer(reduce, initialValue);

  const maxPoints = numQ * 1;

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <Background className="absolute inset-0 -z-50" />

      {status === "ready" && <Start dispatch={dispatch} />}
      {status === "active" && (
        <Questions
          question={questions[index]}
          answer={answer}
          dispatch={dispatch}
          numQ={numQ}
          index={index}
          points={points}
          maxPoints={maxPoints}
          timeSec={timeSec}
        />
      )}
      {status === "finsh" && (
        <Result
          numQ={numQ}
          level={level}
          points={points}
          maxPoints={maxPoints}
          dispatch={dispatch}
          timeSec={timeSec}
          saveAnswer={saveAnswer}
          name={name}
        />
      )}
    </div>
  );
}
