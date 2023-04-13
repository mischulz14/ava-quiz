import { QuestionContext } from '@/context/QuestionContextProvider';
import { useContext } from 'react';

export default function ScorePage() {
  const context = useContext(QuestionContext);

  function reloadPage() {
    window.location.reload();
  }

  return (
    <>
      <div className="h-[100vh] flex flex-col gap-10 justify-center items-center">
        <p
          style={{
            opacity: 0,
            animation: `fadeIn 1s ease-in 0.5s forwards`,
          }}
          className="text-2xl font-bold"
        >
          Dein Score ist ...
        </p>
        <p
          style={{
            opacity: 0,
            animation: `fadeIn 1s ease-in 2s forwards`,
          }}
          className="text-7xl font-bold rounded-full h-40 w-40 border-2 border-white flex justify-center items-center"
        >
          {context.correctlyAnsweredQuestions}
        </p>

        {context.correctlyAnsweredQuestions >= 0 &&
          context.correctlyAnsweredQuestions < 5 && (
            <p
              style={{
                opacity: 0,
                animation: `fadeIn 1s ease-in 4s forwards`,
              }}
              className="text-2xl font-bold max-w-xl text-center"
            >
              Du bist ein Sensi-Neuling. Ein guter Anfang um mehr über das Thema
              zu lernen!
            </p>
          )}
        {context.correctlyAnsweredQuestions > 4 &&
          context.correctlyAnsweredQuestions < 11 && (
            <p
              style={{
                opacity: 0,
                animation: `fadeIn 1s ease-in 4s forwards`,
              }}
              className="text-2xl font-bold max-w-xl text-center"
            >
              Du bist ein Sensi-Fortgeschrittener. Mach weiter so!
            </p>
          )}
        {context.correctlyAnsweredQuestions > 10 && (
          <p
            style={{
              opacity: 0,
              animation: `fadeIn 1s ease-in 4s forwards`,
            }}
            className="text-2xl font-bold max-w-xl text-center"
          >
            Du bist ein Sensi-Experte. Gut gemacht!
          </p>
        )}
        <button
          style={{
            opacity: 0,
            animation: `fadeIn 1s ease-in 6s forwards`,
          }}
          className="px-8 py-4 border-2 text-2xl font-bold border-white rounded-md text-white hover:bg-gray-700 transition-all duration-300 ease-in-out hover:scale-105"
          onClick={reloadPage}
        >
          Quiz Neustarten
        </button>
      </div>
    </>
  );
}
