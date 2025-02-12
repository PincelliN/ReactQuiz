import { useState, useCallback } from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";

export default function Quiz() {
  const [answerState, setAnswersState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  const handleSelectAnswert = useCallback(
    function handleSelectAnswert(selectAnswer) {
      setAnswersState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectAnswer];
      });
      setTimeout(() => {
        if (selectAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswersState("correct");
        } else {
          setAnswersState("wrong");
        }
        setTimeout(() => {
          setAnswersState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswert(null),
    [handleSelectAnswert]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="quiz complete" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswert}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
