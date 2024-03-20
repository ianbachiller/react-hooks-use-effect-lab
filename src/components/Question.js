import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  let timer

  // add useEffect code
  useEffect(() => {
    timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if(prevTime === 0){
          clearInterval(timer)
          onAnswered(false)
          return 10
        } else {
          return prevTime - 1
        }
      })
    }, 1000)
    return () => clearTimeout(timer) 
  }, [question, onAnswered])



  function handleAnswer(isCorrect) {
    clearInterval(timer)
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
