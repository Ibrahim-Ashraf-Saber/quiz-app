function Start({ dispatch }) {
  return (
    <div className="flex flex-col gap-6 w-[90%] max-w-md p-8 bg-white rounded-2xl shadow-2xl text-center z-50">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome to React Quiz App
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
        React Quiz App to test HTML & CSS knowledge across Easy, Medium, and
        Hard levels.
      </p>
      <input
        type="text"
        onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
        placeholder="Enter your name"
        className="w-full px-4 py-2 mt-3 text-gray-800 placeholder-gray-400 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div>
        <p className="mb-2 font-semibold text-gray-700">Select Difficulty</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => dispatch({ type: "setLevel", payload: "Easy" })}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Easy
          </button>
          <button
            onClick={() => dispatch({ type: "setLevel", payload: "Medium" })}
            className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
          >
            Medium
          </button>
          <button
            onClick={() => dispatch({ type: "setLevel", payload: "Hard" })}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Hard
          </button>
        </div>
      </div>

      <div>
        <p className="mb-2 font-semibold text-gray-700">Number of Questions</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[5, 10, 15, 20].map((num) => (
            <button
              key={num}
              onClick={() => dispatch({ type: "setNumQ", payload: num })}
              className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: "start" })}
        className="px-6 py-3 text-lg font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-700"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Start;
