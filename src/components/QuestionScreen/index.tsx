import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AppLogo, CheckIcon, Next, TimerIcon,Back } from '../../config/icons'
import { useQuiz } from '../../context/QuizContext'
import { useTimer } from '../../hooks'
import { device } from '../../styles/BreakPoints'
import { PageCenter } from '../../styles/Global'
import { ScreenTypes } from '../../types'

import Button from '../ui/Button'
import ModalWrapper from '../ui/ModalWrapper'
import Question from './Question'
import QuizHeader from './QuizHeader'
import './Sidebar.css';
import { theme } from '../../styles/Theme'
const QuizContainer = styled.div<{ selectedAnswer: boolean }>`
  width: 900px;
  min-height: 500px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 30px 60px 80px 60px;
  margin-bottom: 70px;
  position: relative;
  @media ${device.md} {
    width: 100%;
    padding: 15px 15px 80px 15px;
  }
  button {
    span {
      svg {
        path {
          fill: ${({ selectedAnswer, theme }) =>
            selectedAnswer ? `${theme.colors.white}` : `${theme.colors.darkGrayText}`};
        }
      }
    }
  }
`

const LogoContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${device.md} {
    margin-top: 10px;
    margin-bottom: 20px;
    svg {
      width: 185px;
      height: 80px;
    }
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 60px;
  bottom: 30px;
  display: flex;
  gap: 20px;
  @media ${device.sm} {
    justify-content: flex-end;
    width: 90%;
    right: 15px;
  }
`

const QuestionScreen: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)

  const {
    questions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
  } = useQuiz()

  const currentQuestion = questions[activeQuestion]
  const { question, type, choices, correctAnswers } = currentQuestion
  const onClickNext = () => {
    const isMatch: boolean = correctAnswers.every(
      (answer: string, index: number) => answer === selectedAnswer[index]
    )

    // adding selected answer, and if answer matches key to result array with current question
    // setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }])
    result[activeQuestion] = {...currentQuestion,selectedAnswer,isMatch}
    console.log(result);
      
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
      if(result[activeQuestion+1]) setSelectedAnswer(result[activeQuestion+1].selectedAnswer)
      else setSelectedAnswer([])
    } else {
      // how long does it take to finish the quiz
      const timeTaken = quizDetails.totalTime - timer
      setEndTime(timeTaken)
      setShowResultModal(true)
    }
  }
  const onClickPrev = () => {
    const isMatch: boolean = correctAnswers.every(
      (answer: string, index: number) => answer === selectedAnswer[index]
    )

    // adding selected answer, and if answer matches key to result array with current question
    result[activeQuestion] = {...currentQuestion,selectedAnswer,isMatch}
      console.log(result);
      
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1)
      // console.log(activeQuestion);
      if(result[activeQuestion-1]) setSelectedAnswer(result[activeQuestion-1].selectedAnswer)
      else setSelectedAnswer([])
    } 
   
  }
  const onClickQues = (number:number) => {
    const isMatch: boolean = correctAnswers.every(
      (answer: string, index: number) => answer === selectedAnswer[index]
    )
    // adding selected answer, and if answer matches key to result array with current question
    result[activeQuestion] = {...currentQuestion,selectedAnswer,isMatch}
      console.log(result);
      setActiveQuestion(number)
      console.log(number);
      
      if(result[number]) setSelectedAnswer(result[number].selectedAnswer)
      else setSelectedAnswer([])
  }




  const handleAnswerSelection = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, checked } = e.target
    if (type === 'multiple' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name])
      }
    }
  }

  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen)
    document.body.style.overflow = 'auto'
  }

  interface SidebarProps {
    numbers: number[];
  }
  
  const Sidebar: React.FC<SidebarProps> = ({ numbers }) => {
    return (
      <div className="sidebar">
          <div className='CenterBox'>
          {numbers.map((number, index) => (
             <button key={index}
             onClick={()=>onClickQues(index)}><div className="number-box"
             style={{backgroundColor : result[number]?.selectedAnswer.length?"#f3772c":"#3498db"}}
             id={"box"+index}>{number+1}</div></button>
        ))}
          </div>
      </div>
    );
  };



  // to prevent scrolling when modal is opened
  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden'
    }
  }, [showTimerModal, showResultModal])

  // timer hooks, handle conditions related to time
  useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal)

  return (
    <PageCenter>

      <LogoContainer>
        <AppLogo />
      </LogoContainer>
      <p style={{ fontSize: '20px', color: theme.colors.themeColor, textDecoration: 'none', marginTop: '10px' }}>
        <p style={{ fontSize: '20px', color:'#f3772c', marginTop: '10px' }} >Welcome </p> {localStorage.getItem("email")}
      </p>
      <Sidebar numbers={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]}/>
      
      <QuizContainer selectedAnswer={selectedAnswer.length > 0}>
        <QuizHeader
          activeQuestion={activeQuestion}
          totalQuestions={quizDetails.totalQuestions}
          timer={timer}
        />
        <Question
          question={question}
          choices={choices}
          type={type}
          handleAnswerSelection={handleAnswerSelection}
          selectedAnswer={selectedAnswer}
          completed = {result}
          currques = {activeQuestion}
        />
        <ButtonWrapper>
        <Button
            text={activeQuestion === 0 ? 'NA' : 'Previous'}
            onClick={onClickPrev}
            icon={<Back />}
            iconPosition="left"
            disabled={activeQuestion === 0}
          />
          <Button
            text={activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            onClick={onClickNext}
            icon={<Next />}
            iconPosition="right"
            disabled={false}
          />
          
        </ButtonWrapper>
      </QuizContainer>
      {/* timer or finish quiz modal*/}
      {(showTimerModal || showResultModal) && (
        <ModalWrapper
          title={showResultModal ? 'Done!' : 'Your time is up!'}
          subtitle={`You have attempted ${result.length} questions in total.`}
          onClick={handleModal}
          icon={showResultModal ? <CheckIcon /> : <TimerIcon />}
          buttonTitle="SHOW RESULT"
        />
      )}
    </PageCenter>
  )
}

export default QuestionScreen
