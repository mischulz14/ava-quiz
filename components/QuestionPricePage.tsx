import { QuestionContext } from '@/context/QuestionContextProvider';
import { useContext, useEffect, useState } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';

const pricesSteps = [
  '1 MILLION',
  '300.000',
  '150000',
  '75.000',
  '30.000',
  '15.000',
  '10.000',
  '5.000',
  '2.000',
  '1.000',
  '500',
  '400',
  '300',
  '200',
  '100',
];

export default function QuestionPricePage() {
  const context = useContext(QuestionContext);
  const [showNextButton, setShowNextButton] = useState(false);

  // the numbers are reversed so that the first element is the highest price
  const pricesAmountsReversed = Array.from(
    { length: pricesSteps.length },
    (_, i) => 15 - i,
  );

  // set Timeout to change the current price
  useEffect(() => {
    const timeout = setTimeout(() => {
      context.setCurrentPrice((prev) => prev + 2.5);
    }, 1000);
    const nextButtonTimeout = setTimeout(() => {
      setShowNextButton(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(nextButtonTimeout);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-start justify-center h-[700px]">
        <div className="relative pb-2">
          {pricesAmountsReversed.map((price, index) => {
            return (
              <div key={index} className=" px-2 flex gap-4 items-center  h-10">
                <p
                  className={`${
                    price === 15 || price === 10 || price === 5
                      ? 'text-avaGreen text-xl font-bold'
                      : 'text-avaOrange-light font-bold'
                  }`}
                >
                  <span className="mr-4">{price}</span>
                  <span>{pricesSteps[index]}</span>
                </p>
              </div>
            );
          })}
          <p
            style={{
              display: 'block',
              bottom: `${context.currentPrice}rem`,
            }}
            className="absolute bg-gray-300/30 rounded-md h-10 w-full mb-2 pb-1 border-white border-2 transition-all duration-1000"
          >
            {' '}
          </p>
        </div>
      </div>

      <button
        className={`${
          !showNextButton && 'opacity-0'
        } absolute right-20 top-[50%] transform -translate-y-1/2 transition-all duration-500 ease-in-out hover:bg-gray-700 rounded-full`}
        onClick={() => {
          context.setShowQuestionPricePage(false);
          context.setCurrentQuestion((prev) => prev + 1);
        }}
      >
        <BsArrowRightCircle color="white" size={60} />
      </button>
    </>
  );
}
