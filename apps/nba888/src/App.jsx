import { useState,useEffect, createContext, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Quizz1 from "./pages/Quizz1.jsx";
import Quizz2 from "./pages/Quizz2";
import Nopage from "./pages/Nopage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz.jsx";
import { QuizProvider } from "./contexts/quiz.jsx";
import axios from "axios"

export const UserContext = createContext();

export default function App() {
  useEffect(() => {
    setPlayerName(window.localStorage.getItem("playerName"));
  }, [])
  const [playerName,setPlayerName] = useState("");
  return (
    <>
      <UserContext.Provider value={{playerName,setPlayerName}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Quizz1" element={<Quizz1/>} />
            <Route path="Quizz2" element={<Quizz2 />} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

