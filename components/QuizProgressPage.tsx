import { QuestionContext } from '@/context/QuestionContextProvider';
import { questionsData } from '@/questions/questions';
import { useContext, useEffect, useState } from 'react';
import { BsArrowRightCircle, BsEmojiSunglasses } from 'react-icons/bs';
import { MdOutlineChildCare } from 'react-icons/md';

export default function QuizProgressPage() {
  const context = useContext(QuestionContext);
  const [showNextButton, setShowNextButton] = useState(false);
  console.log(context.currentQuestion);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (context.currentProgressBarHeight === 600) return;
      if (context.answeredLastQuestionCorrectly) {
        context.setCurrentProgressBarHeight((prev) => prev + 40);
      }
    }, 700);
    const nextButtonTimeout = setTimeout(() => {
      setShowNextButton(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(nextButtonTimeout);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="relative h-[604px] flex w-10 border-2 border-white rounded-lg">
          <div
            style={{ height: `${context.currentProgressBarHeight}px` }}
            className="bg-avaPink mt-auto w-full rounded-md transition-all duration-1000 ease-in-out"
          />

          <div className="absolute left-14 top-2 w-40">
            <BsEmojiSunglasses color="white" size={40} />
            <span className="mt-2 block">Sensi Expert</span>
          </div>
          <div className="absolute left-14 bottom-0 w-40">
            <MdOutlineChildCare color="white" size={50} />
            <span className="mt-2 block">Sensi Beginner</span>
          </div>
        </div>
      </div>
      <button
        disabled={!showNextButton}
        className={`${
          !showNextButton && 'opacity-0'
        } absolute right-20 top-[50%] transform -translate-y-1/2 transition-all duration-500 ease-in-out hover:bg-gray-700 rounded-full hover:scale-105`}
        onClick={() => {
          context.setShowQuestionPricePage(false);
          if (context.currentQuestion + 1 === questionsData.length) {
            context.setShowScorePage(true);
            return;
          }

          context.setCurrentQuestion((prev) => prev + 1);
        }}
      >
        <BsArrowRightCircle color="white" size={60} />
      </button>
    </>
  );
}
