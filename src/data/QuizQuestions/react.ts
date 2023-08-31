import { stringify } from 'querystring';
import { Topic } from '.'
import { fetchApiData } from './check';

interface OriginalQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ConvertedQuestion {
  question: string;
  choices: string[];
  type: string;
  correctAnswers: string[];
  score: number;
}
interface Received {
    "response_code": number,
    "results":Topic[]
}

function convertJsonFormat(originalData: OriginalQuestion): ConvertedQuestion {
  const convertedData: ConvertedQuestion = {
    question: originalData.question,
    choices: [originalData.correct_answer, ...originalData.incorrect_answers],
    type: originalData.type,
    correctAnswers: [originalData.correct_answer],
    score:10,
  };
// console.log(convertedData);

  return convertedData;

}
const obj = {
  category: "Geography",
  type: "boolean",
  difficulty: "medium",
  question: "Which state of the United States is the smallest?",
  correct_answer: "Rhode Island ",
  incorrect_answers: [
    "Maine",
    "Vermont",
    "Massachusetts"
  ]
}

const react:Topic = 
  {
      topic: 'React',
      level: 'Intermediate',
      totalQuestions: 15,
      totalScore: 150,
      totalTime: 180,
      questions: [
    ]
  }
  fetchApiData().then((res)=> {
    const result = JSON.parse(res);
    const entries = result.results;
    for(const ele of entries){
      react.questions.push(convertJsonFormat(ele));
    }
  });
  if(react.questions.length === 0 ) console.log('zeo');
  
  export default react