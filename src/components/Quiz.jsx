import { useState, useCallback } from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

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

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";
            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswert(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
