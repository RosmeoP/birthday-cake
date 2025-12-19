import { useState } from "react";
import type { Quiz as QuizType } from "./EasterEgg";

type QuizComponentProps = {
  quiz: QuizType;
};

export function QuizComponent({ quiz }: QuizComponentProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowResult(true);
  };

  const selectedAnswer = selectedOption !== null ? quiz.options[selectedOption] : null;

  return (
    <div className="quiz-container">
      <h3 className="quiz-question">{quiz.question}</h3>
      <div className="quiz-options">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`quiz-option ${
              showResult
                ? option.isCorrect
                  ? "correct"
                  : selectedOption === index
                  ? "incorrect"
                  : ""
                : ""
            }`}
            disabled={showResult}
            type="button"
          >
            {option.text}
          </button>
        ))}
      </div>
      {showResult && selectedAnswer && (
        <div
          className={`quiz-result ${selectedAnswer.isCorrect ? "correct" : "incorrect"}`}
        >
          {selectedAnswer.isCorrect ? (
            <>
              <span className="result-icon">✅</span>
              <span>{selectedAnswer.response || "¡Correcto!"}</span>
            </>
          ) : (
            <>
              <span className="result-icon">❌</span>
              <span>{selectedAnswer.response || "Intenta de nuevo"}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
