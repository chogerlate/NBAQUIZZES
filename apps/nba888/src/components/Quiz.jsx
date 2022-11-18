import { useContext ,useEffect,useState} from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";
import axios from "axios"
const Quiz = () => {
  const [quiz,setQuiz]=useState([
  ])
  const [quizIndex,setQuizIndex] = useState(0);
  const [score,setScore] = useState(0);
  async function getQuiz(){
    await FetchQuiz();
  }
  function FetchQuiz(){
    const quizAmount = 5;
    for(let i=0;i<quizAmount;i++){
      axios.get("http://localhost:3008/quiz_question",{params:{quizAmount}}).then(response =>{
      setQuiz(quiz=> [...quiz,response.data])
    })
    }
  }
  function NextQuiz(){
    if(quizIndex+1<quiz.length){
      setQuizIndex(quizIndex+1);
    }
    if(quizIndex+1 == quiz.length){
      setQuizIndex(0);
    }
  }
  
  function OnQuizSubmitAnswer(answer){
    let solution = quiz[quizIndex].choice_answer;
    if(answer == solution){
      setScore(score+1);
    }
    NextQuiz();
  }

  return(
    <div>
      <h1>{score}</h1>
      <button onClick={getQuiz}>START</button>
          {quiz.length>0 ? 
          <div>
          <h1>{quiz[quizIndex].question}</h1>
          <img src={quiz[quizIndex].image_url}/>
          
          <h2 onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_1)}}>{quiz[quizIndex].choice_1}</h2>
          <h2 onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_2)}}>{quiz[quizIndex].choice_2}</h2>
          <h2 onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_3)}}>{quiz[quizIndex].choice_3}</h2>
          <h2 onClick={()=>{OnQuizSubmitAnswer(quiz[quizIndex].choice_4)}}>{quiz[quizIndex].choice_4}</h2>
        </div>:<div>HELLO</div>}
    </div>
  )
};

export default Quiz;
