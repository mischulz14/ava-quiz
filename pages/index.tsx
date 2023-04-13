import QuestionPage from '@/components/QuestionPage';
import QuestionPricePage from '@/components/QuestionPricePage';
import QuizProgressPage from '@/components/QuizProgressPage';
import ScorePage from '@/components/ScorePage';
import StartPage from '@/components/StartPage';
import {
  QuestionContext,
  QuestionContextProvider,
} from '@/context/QuestionContextProvider';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useContext } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const context = useContext(QuestionContext);
  return (
    <main className="flex min-h-screen flex-col items-center">
      {context.showStartPage ? (
        <StartPage />
      ) : (
        <>
          {!context.showQuestionPricePage && !context.showScorePage && (
            <QuestionPage />
          )}
          {context.showQuestionPricePage && <QuizProgressPage />}
          {context.showScorePage && <ScorePage />}
        </>
      )}
    </main>
  );
}
