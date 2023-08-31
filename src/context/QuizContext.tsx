import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { quiz } from '../data/QuizQuestions'
import { QuizContextTypes, Result, ScreenTypes } from '../types'

const initialState: QuizContextTypes = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: 'Josh',
  selectQuizTopic: () => {},
  questions: [],
  setQuestions: () => {},
  result: new Array<Result>(10),
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  quizDetails: {
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: 'Josh',
  },
}

export const QuizContext = createContext<QuizContextTypes>(initialState)

export function useQuiz() {
  return useContext(QuizContext)
}

type QuizProviderProps = {
  children: ReactNode
}

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [timer, setTimer] = useState<number>(initialState.timer)
  const [endTime, setEndTime] = useState<number>(initialState.endTime)
  const [quizTopic, setQuizTopic] = useState<string>(initialState.quizTopic)
  const [result, setResult] = useState<Result[]>(initialState.result)
  const [currentScreen, setCurrentScreen] = useState<ScreenTypes>(
    initialState.currentScreen
  )

  const [questions, setQuestions] = useState((quiz)?quiz[initialState.quizTopic].questions:[])

  const {
    questions: quizQuestions,
    totalQuestions,
    totalTime,
    totalScore,
  } = (quiz)? quiz[quizTopic]:{questions:[],totalQuestions:15,totalTime:180,totalScore:150}

  const selectQuizTopic = (topic: string) => {
    setQuizTopic(topic)
  }

  useEffect(() => {
    setTimer(totalTime)
    setQuestions(quizQuestions)
  },[questions])

  const quizDetails = {
    totalQuestions,
    totalScore,
    totalTime,
    selectedQuizTopic: quizTopic,
  }

  const quizContextValue: QuizContextTypes = {
    currentScreen,
    setCurrentScreen,
    quizTopic,
    selectQuizTopic,
    questions,
    setQuestions,
    result,
    setResult,
    quizDetails,
    timer,
    setTimer,
    endTime,
    setEndTime,
  }

  return <QuizContext.Provider value={quizContextValue}>{children}</QuizContext.Provider>
}
export default QuizProvider
