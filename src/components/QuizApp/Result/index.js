import React from "react";

const Result = (props) => {
  const { userAnswers, questions, resetQuiz } = props;

  const correctAnswer = userAnswers.filter((answer) => answer).length;

  console.log(questions);

  return (
    <div className="results">
      <h2>Results</h2>
      <p>
        You answered {correctAnswer} out of {questions.length} questions
        <span onClick={resetQuiz}>Click here to Retry</span>
      </p>
      <ul>
        {questions.map((question, index) => {
          return (
            <li key={index} data-correct={userAnswers[index]}>
              Q{index + 1}. {question.question}{" "}
              {!userAnswers[index] &&
                question.answerOptions.map((el) => {
                  if (el.isCorrect) {
                    return (
                      <span className="correct">Correct Answer: {el.text}</span>
                    );
                  }
                })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Result;
