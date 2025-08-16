import { PDFDownloadLink } from "@react-pdf/renderer";
import QuizPDF from "./QuizPDF";
import CertificatePDF from "./CertificatePDF";

function Result({
  numQ,
  level,
  points,
  maxPoints,
  dispatch,
  timeSec,
  saveAnswer,
  name,
}) {
  const p = Math.floor((points / maxPoints) * 100);

  const maxSec = numQ * 30;
  console.log(maxSec);
  const sec = maxSec - timeSec;
  const m = Math.floor(sec / 60);
  const s = sec % 60;

  return (
    <div className="flex flex-col gap-6 w-[90%] max-w-lg p-8 bg-white rounded-2xl shadow-2xl text-center z-50">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Quiz Summary</h2>
        <p className="text-gray-500">Review your performance and results</p>
      </div>

      <div className="p-6 space-y-2 text-center bg-indigo-100 rounded-xl">
        <p className="font-medium tracking-wide text-gray-600 uppercase">
          Final Score
        </p>
        <h2 className="text-4xl font-extrabold text-indigo-600">{p}%</h2>
        <p className="font-semibold text-gray-700">
          {points} / {maxPoints}
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-700">
          Quiz Details
        </h3>
        <hr className="mb-4" />
        <div className="grid grid-cols-3 gap-4 text-gray-700">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm">Total Questions</p>
            <p className="text-xl font-bold">{numQ}</p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm">Time Taken</p>
            <p className="text-xl font-bold">
              {m < 10 && 0}
              {m}:{s < 10 && 0}
              {s}
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm">Level</p>
            <p className="text-xl font-bold">{level}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center">
        <PDFDownloadLink
          document={
            <QuizPDF
              saveAnswer={saveAnswer}
              numQ={numQ}
              level={level}
              points={points}
              maxPoints={maxPoints}
              timeSec={timeSec}
            />
          }
          fileName="quiz-result.pdf"
        >
          {({ loading }) => (
            <button
              className={`flex-1 px-5 py-3 text-white rounded-lg transition 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Download Quiz Result (PDF)"}
            </button>
          )}
        </PDFDownloadLink>

        {p >= 50 && (
          <PDFDownloadLink
            document={<CertificatePDF studentName={name} />}
            fileName="certificate.pdf"
          >
            {({ loading }) => (
              <button
                className={`flex-1 px-5 py-3 text-white rounded-lg transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
              >
                {loading ? "Loading..." : "Download Certificate (PDF)"}
              </button>
            )}
          </PDFDownloadLink>
        )}

        <button
          onClick={() => dispatch({ type: "reset" })}
          className="flex-1 px-5 py-3 text-white transition bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;
