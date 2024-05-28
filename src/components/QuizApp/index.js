import React, { useState } from "react";
import questions from "./constants/questions";
import "./styles.css";
import Question from "./Question/question";
import Result from "./Result";

export const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setuserAnswers] = useState([]);

  const handleNextQuestion = (isCorrect) => {
    setCurrentQuestion(currentQuestion + 1);
    setuserAnswers([...userAnswers, isCorrect]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setuserAnswers([]);
  };

  return (
    <div className="quiz">
      <h1>World Quiz</h1>
      {/* Question comp */}
      {currentQuestion < questions.length && (
        <Question
          question={questions[currentQuestion]}
          onAnswerClick={handleNextQuestion}
        />
      )}

      {currentQuestion === questions.length && (
        <Result
          userAnswers={userAnswers}
          questions={questions}
          resetQuiz={resetQuiz}
        />
      )}
    </div>
  );
};

export default QuizApp;
