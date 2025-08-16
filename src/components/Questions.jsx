import { useEffect } from "react";

const btn =
  "px-4 py-2 text-gray-800 transition bg-gray-200 rounded-lg hover:bg-gray-300";
const btnCorrect =
  "px-4 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600";
const btnWrong =
  "px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600";

function Questions({
  question,
  answer,
  dispatch,
  numQ,
  index,
  points,
  maxPoints,
  timeSec,
}) {
  const progressPercent = (index / numQ) * 100;
  const hasAnswer = answer !== null;
  const m = Math.floor(timeSec / 60);
  const s = timeSec % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6 w-[90%] max-w-md p-8 bg-white rounded-2xl shadow-2xl text-center z-50">
      <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
        <div
          className="h-full transition-all duration-300 bg-indigo-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between mt-1 text-sm text-gray-600">
        <span className="px-2 py-1 font-semibold bg-gray-100 rounded-lg">
          Point: {points} / {maxPoints}
        </span>
        <span className="px-2 py-1 font-semibold bg-gray-100 rounded-lg">
          Time Left: {m < 10 && 0}
          {m}:{s < 10 && 0}
          {s}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-gray-700">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => dispatch({ type: "answer", payload: index })}
            className={
              hasAnswer
                ? index === question.answer
                  ? btnCorrect
                  : index === answer
                  ? answer === question.answer
                    ? btnCorrect
                    : btnWrong
                  : btn
                : btn
            }
            disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>

      <hr className="border-gray-300" />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {index + 1} of {numQ} Q
        </p>
        {hasAnswer ? (
          index < numQ - 1 ? (
            <button
              onClick={() => dispatch({ type: "nextQ" })}
              className="px-5 py-2 text-white transition bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: "finsh" })}
              className="px-5 py-2 text-white transition bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              Finsh
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}

export default Questions;
