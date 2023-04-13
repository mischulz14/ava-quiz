import '@/styles/globals.css';
import { QuestionContextProvider } from '@/context/QuestionContextProvider';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QuestionContextProvider>
      <Component {...pageProps} />
    </QuestionContextProvider>
  );
}
