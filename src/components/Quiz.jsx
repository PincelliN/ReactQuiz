import { useState, useCallback } from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

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
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswert}
        />
      </div>
    </div>
  );
}
