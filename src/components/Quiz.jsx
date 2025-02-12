import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswert(selectAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectAnswer];
    });
  }

  return (
    <div id="question">
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
          return (
            <li key={answer} className="answer">
              <button onClick={()=>handleSelectAnswert(answer)}>{answer}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
