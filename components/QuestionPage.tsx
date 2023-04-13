import { QuestionContext } from '@/context/QuestionContextProvider';
import { questionsData } from '@/questions/questions';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { BsArrowRightCircle, BsPeople, BsTelephone } from 'react-icons/bs';

export default function QuestionPage() {
  const questionContext = useContext(QuestionContext);
  const questions = questionsData;
  const currentQuestion = questions[questionContext.currentQuestion];
  const [answers, setAnswers] = useState(currentQuestion.answers);
  const [checkForWin, setCheckForWin] = useState(false);
  const noAnswersChosen =
    answers.filter((answer) => answer.isChosen).length === 0;

  function filterOutTwoRrandomWrongAnswers() {
    const wrongAnswers = answers.filter((answer) => !answer.correct);
    const randomWrongAnswer1 =
      wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    // Filter out the first random wrong answer
    const filteredWrongAnswers = wrongAnswers.filter(
      (answer) => answer.text !== randomWrongAnswer1.text,
    );
    const randomWrongAnswer2 =
      filteredWrongAnswers[
        Math.floor(Math.random() * filteredWrongAnswers.length)
      ];

    // set answers so that the filteredWrong answers get the attribute eliminated = true
    setAnswers((prev) => {
      return prev.map((answer) => {
        if (
          answer.text === randomWrongAnswer1.text ||
          answer.text === randomWrongAnswer2.text
        ) {
          answer.eliminated = true;
        }
        return answer;
      });
    });
  }

  // useEffect that listens for the enter key and starts the checkForWin function
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter' && checkForWin) {
        questionContext.setShowQuestionPricePage(true);
        setCheckForWin(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNextQuestion = () => {
    if (questionContext.currentQuestion === questions.length - 1) {
      // Go to the results page
      console.log('Go to the results page');
      return;
    }

    questionContext.setCurrentQuestion((prev: number) => prev + 1);
  };

  const handleSetChosenAnswer = (answer: any, index: number) => {
    setAnswers((prev) => {
      return prev.map((answer, i) => {
        if (i === index) {
          answer.isChosen = true;
        } else {
          answer.isChosen = false;
        }
        return answer;
      });
    });
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-[100vh] bg-black text-white max-w-xl relative">
        <div className="rounded-full p-6 pt-8 border-2 border-gray-200 bg-white/10 flex">
          <Image src="/ava-logo-new.png" width={150} height={150} alt={''} />
        </div>
        <p className="my-8 rounded-md px-4 py-2 border-2 border-white animate-fadeIn text-xl text-center">
          {currentQuestion.question}
        </p>
        <div className="relative grid w-full grid-cols-2 gap-4">
          {currentQuestion.answers.map((answer, index) => (
            <button
              disabled={checkForWin || answer.eliminated}
              key={index}
              onClick={() => {
                handleSetChosenAnswer(answer, index);
              }}
              className={`${answer.eliminated && 'opacity-0'}${
                answer.correct && checkForWin ? 'animate-green-blinking' : ''
              } ${answer.isChosen && 'bg-avaOrange'} ${
                !answer.isChosen && !checkForWin && 'hover:bg-gray-700'
              } p-4 rounded-md border-2 border-white transition duration-200 ease-in-out hover:scale-105`}
              style={{
                opacity: 0,
                visibility: answer.eliminated ? 'hidden' : 'visible',
                animation: `fadeIn 1.5s ease-in ${index + 1.5}s forwards, ${
                  answer.correct &&
                  checkForWin &&
                  'greenBlinking 1s ease-in-out infinite'
                }`,
              }}
            >
              {answer.text}
            </button>
          ))}
        </div>
        <button
          disabled={checkForWin}
          className={`${
            noAnswersChosen && 'opacity-0'
          } mt-8 px-6 py-2 border-2 border-white rounded-md transition-all duration-500 ease-in-out hover:scale-105`}
          onClick={() => {
            // Check if the answer is correct and apply a green blinking animation
            // to the correct answer
            const correctAnswer = answers.find((answer) => answer.correct);
            if (correctAnswer) {
              setCheckForWin(true);
            }
            if (correctAnswer && correctAnswer.isChosen) {
              console.log('Correct answer');
              questionContext.setCorrectlyAnsweredQuestions((prev) => prev + 1);
              questionContext.setAnsweredLastQuestionCorrectly(true);
            } else {
              questionContext.setAnsweredLastQuestionCorrectly(false);
            }
          }}
        >
          Check
        </button>
      </div>

      <button
        className={`${
          !checkForWin && 'opacity-0'
        } absolute right-20 top-[50%] transform -translate-y-1/2 animation-fade-in transition-all duration-300 ease-in-out hover:bg-gray-700 hover:scale-105 rounded-full`}
        onClick={() => {
          questionContext.setShowQuestionPricePage(true);
          setCheckForWin(false);
        }}
      >
        <BsArrowRightCircle color="white" size={60} />
      </button>
      <div className="absolute top-4 right-10 flex gap-6">
        <button
          disabled={!questionContext.jokers.fiftyFifty}
          className={`${
            questionContext.jokers.fiftyFifty
              ? 'hover:bg-avaOrange-light'
              : 'bg-gray-200/50 opacity-80'
          } transition-all duration-200  px-4 py-1 border-2 border-white rounded-full h-18 w-18 hover:scale-105`}
          onClick={() => {
            filterOutTwoRrandomWrongAnswers();
            questionContext.setJokers((prev: any) => {
              return {
                ...prev,
                fiftyFifty: false,
              };
            });
          }}
        >
          50:50
        </button>
        <button
          disabled={!questionContext.jokers.phone}
          className={`${
            questionContext.jokers.phone
              ? 'hover:bg-avaOrange-light'
              : 'bg-gray-200/50 opacity-80'
          } transition-all duration-200  px-4 py-1 border-2 border-white rounded-full h-18 w-18 hover:scale-105`}
          onClick={() => {
            questionContext.setJokers((prev: any) => {
              return {
                ...prev,
                phone: false,
              };
            });
          }}
        >
          <BsTelephone color="white" size={20} />
        </button>
        <button
          disabled={!questionContext.jokers.audience}
          className={`${
            questionContext.jokers.audience
              ? 'hover:bg-avaOrange-light'
              : 'bg-gray-200/50 opacity-80'
          } transition-all duration-200  px-4 py-1 border-2 border-white rounded-full h-18 w-18 hover:scale-105`}
          onClick={() => {
            questionContext.setJokers((prev: any) => {
              return {
                ...prev,
                audience: false,
              };
            });
          }}
        >
          <BsPeople color="white" size={20} />
        </button>
      </div>
    </>
  );
}
