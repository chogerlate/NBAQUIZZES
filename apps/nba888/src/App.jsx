import { useState, useEffect, createContext, useMemo } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Quizz1 from "./pages/Quizz1";
import Quizz2 from "./pages/Quizz2";
import Nopage from "./pages/Nopage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import QuizResult from "./pages/QuizResult";
import QuizResultNBA from "./pages/QuizResultNBA";
import { AudioStore } from "./components/AudioStore";
import Quiz2 from "./components/Quiz2";
import Quiz3 from "./components/Quiz3";
import QuizResultVDO from "./pages/QuizResultVDO";

export const UserContext = createContext();

export default function App() {
  useEffect(() => {
    setPlayerName(window.localStorage.getItem("playerName"));
    setProfileAvatarIndex(window.localStorage.getItem("playerAvatar"));
  }, []);
  const [playerName, setPlayerName] = useState("");
  const [profileAvatarIndex, setProfileAvatarIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userAnswer,setUserAnswer] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [answerOrder, setAnswerOrder] = useState([]);
  const [countdownQuizTime,setCountdownQuizTime] = useState([]);
  const [quizIndex, setQuizIndex] = useState(-1);
  const [timer,setTimer] = useState(0);
  const [timerAnimation,setTimerAnimation] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [toggleSolution,setToggleSolution] = useState([]);
  const[countdownStartGame, setCountdownStartGame] = useState(5);
  const [isCanStart, setIscanStart] = useState(false);
  const [isPlaying,setIsPlaying] = useState(false);
  const [isPlayingHomeMusic, setIsPlayingHomeMusic] = useState(true);
  const [nbaPlayerStat_Physical, setNbaPlayerStat_Physical] = useState([]);
  const [nbaPlayerStat_SoftSkill, setNbaPlayerStat_SoftSkill] = useState([]);
  const [predictQuestion, setPredictQuestion] = useState([]);
  const [userFillPredict, setUserFillPredict] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [playerResult,setPlayerResult] = useState("");
  const [isAnalyse, setIsAnalyse] = useState(false);
  const [playerResultStat, setPlayerResultStat] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  useEffect(()=>{
    setTimeout(function () {
      //new Audio(AudioStore[0].path).play();
  }, 1000);
  },[])
  return (
    <>
      <UserContext.Provider
        value={{
          playerName,
          setPlayerName,
          profileAvatarIndex,
          setProfileAvatarIndex,
          score,
          setScore,
          totalScore,
          setTotalScore,
          userAnswer,
          setUserAnswer,
          quiz,setQuiz,
          answerOrder,setAnswerOrder,
          countdownQuizTime,setCountdownQuizTime,
          timer,setTimer,
          quizIndex,setQuizIndex,
          timerAnimation,setTimerAnimation,
          isMute,setIsMute,
          toggleSolution, setToggleSolution,
          countdownStartGame, setCountdownStartGame,
          isCanStart, setIscanStart,
          isPlaying,setIsPlaying,
          isPlayingHomeMusic, setIsPlayingHomeMusic,
          nbaPlayerStat_Physical, setNbaPlayerStat_Physical,
          nbaPlayerStat_SoftSkill, setNbaPlayerStat_SoftSkill,
          predictQuestion, setPredictQuestion,
          userFillPredict, setUserFillPredict,
          playerList, setPlayerList,
          playerResult,setPlayerResult,
          isAnalyse, setIsAnalyse,
          playerResultStat, setPlayerResultStat,
          playerInfo, setPlayerInfo
        }}
      >

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Quiz1" element={<Quizz1 />} />
            <Route path="Quiz2" element={<Quiz2/>} />
            <Route path="Quiz3" element={<Quiz3/>} />
            <Route path="Quiz1_Result" element={<QuizResult />} />
            <Route path="Quiz2_Result" element={<QuizResultNBA/>} />
            <Route path="Quiz3_Result" element={<QuizResultVDO/>} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}
