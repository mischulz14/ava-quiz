import { createContext, useState } from 'react';

const QuestionContext = createContext({
  currentQuestion: 0,
  setCurrentQuestion: (value: React.SetStateAction<number>) => {},
  jokers: {
    fiftyFifty: true,
    audience: true,
    phone: true,
  },
  setJokers: (value: React.SetStateAction<any>) => {},
  showQuestionPricePage: false,
  setShowQuestionPricePage: (value: React.SetStateAction<boolean>) => {},
  currentPrice: 0,
  setCurrentPrice: (value: React.SetStateAction<number>) => {},
  answeredLastQuestionCorrectly: false,
  setAnsweredLastQuestionCorrectly: (
    value: React.SetStateAction<boolean>,
  ) => {},
  correctlyAnsweredQuestions: 0,
  setCorrectlyAnsweredQuestions: (value: React.SetStateAction<number>) => {},
  currentProgressBarHeight: 0,
  setCurrentProgressBarHeight: (value: React.SetStateAction<number>) => {},
  showScorePage: false,
  setShowScorePage: (value: React.SetStateAction<boolean>) => {},
  showStartPage: true,
  setShowStartPage: (value: React.SetStateAction<boolean>) => {},
});

function QuestionContextProvider({ children }: any) {
  const [showStartPage, setShowStartPage] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [answeredLastQuestionCorrectly, setAnsweredLastQuestionCorrectly] =
    useState(false);
  const [correctlyAnsweredQuestions, setCorrectlyAnsweredQuestions] =
    useState(0);
  const [currentProgressBarHeight, setCurrentProgressBarHeight] = useState(0);
  const [showQuestionPricePage, setShowQuestionPricePage] = useState(false);
  const [showScorePage, setShowScorePage] = useState(false);
  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    audience: true,
    phone: true,
  });

  return (
    <QuestionContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        jokers,
        setJokers,
        showQuestionPricePage,
        setShowQuestionPricePage,
        currentPrice,
        setCurrentPrice,
        answeredLastQuestionCorrectly,
        setAnsweredLastQuestionCorrectly,
        correctlyAnsweredQuestions,
        setCorrectlyAnsweredQuestions,
        currentProgressBarHeight,
        setCurrentProgressBarHeight,
        showScorePage,
        setShowScorePage,
        showStartPage,
        setShowStartPage,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionContext, QuestionContextProvider };
