import { QuestionContext } from '@/context/QuestionContextProvider';
import Image from 'next/image';
import { useContext } from 'react';

export default function StartPage() {
  const context = useContext(QuestionContext);
  return (
    <div className="h-[100vh] flex flex-col gap-14 justify-center items-center">
      <div className="animate-bounce  p-6 pt-8 border-2 border-gray-200 bg-white/10 rounded-full">
        <Image src="/ava-logo-new.png" width={250} height={250} alt={''} />
      </div>
      <button
        className="px-8 py-4 border-2 text-2xl font-bold border-white rounded-md text-white hover:bg-gray-700 transition-all duration-300 ease-in-out hover:scale-105"
        onClick={() => {
          context.setShowStartPage(false);
        }}
      >
        Starte Sensi Quiz
      </button>
    </div>
  );
}
