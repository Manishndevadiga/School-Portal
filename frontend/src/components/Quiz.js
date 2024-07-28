import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const { id } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Mock quizzes data
  const quizzes = [
    {
      id: 1,
      questions: [
        { question: 'What is the output of the following code?\n```javascript\nconsole.log(typeof null);\n```', options: ['"null"', '"object"', '"undefined"', '"number"'], answer: '"object"' },
        { question: 'What is the purpose of the `Array.prototype.map` method in JavaScript?', options: ['To iterate over an array and return a new array with modified elements', 'To filter elements in an array', 'To find an element in an array', 'To reduce the array to a single value'], answer: 'To iterate over an array and return a new array with modified elements' },
        { question: 'What is the difference between `let` and `var` in JavaScript?', options: ['`let` is block-scoped while `var` is function-scoped', '`var` is block-scoped while `let` is function-scoped', 'Both are block-scoped', 'Both are function-scoped'], answer: '`let` is block-scoped while `var` is function-scoped' },
      ],
    },
    {
      id: 2,
      questions: [
        { question: 'What does the following function return?\n```javascript\nfunction add(a, b) {\n  return a + b;\n}\nadd(2, "3");\n```', options: ['5', '"23"', 'NaN', 'undefined'], answer: '"23"' },
        { question: 'How do you create a class in JavaScript?', options: ['Using the `class` keyword', 'Using the `function` keyword', 'Using the `object` keyword', 'Using the `new` keyword'], answer: 'Using the `class` keyword' },
        { question: 'What is the output of the following code?\n```javascript\nlet x = 10;\nif (true) {\n  let x = 20;\n  console.log(x);\n}\nconsole.log(x);\n```', options: ['10 and 20', '20 and 10', '20 and 20', '10 and 10'], answer: '20 and 10' },
      ],
    },
    {
      id: 3,
      questions: [
        { question: 'What is the output of the following code?\n```javascript\nconsole.log([1, 2, 3] + [4, 5, 6]);\n```', options: ['"1,2,34,5,6"', '"1,2,3,4,5,6"', '"1,2,3undefined4,5,6"', '"1,2,34,5,6"'], answer: '"1,2,34,5,6"' },
        { question: 'What is a closure in JavaScript?', options: ['A function having access to its own scope only', 'A function having access to the global scope only', 'A function having access to its own scope and the scope of the outer function', 'A function having access to the global scope and block scope'], answer: 'A function having access to its own scope and the scope of the outer function' },
        { question: 'What is the purpose of the `Promise` object in JavaScript?', options: ['To handle synchronous code', 'To handle asynchronous operations', 'To define new types of objects', 'To create loops'], answer: 'To handle asynchronous operations' },
      ],
    },
  ];

  // Find the quiz based on id from URL params
  const quiz = quizzes.find(q => q.id === parseInt(id));

  // Function to handle checkbox selection
  const handleOptionChange = (questionIndex, option) => {
    const updatedAnswers = { ...selectedAnswers };
    if (updatedAnswers[questionIndex]?.includes(option)) {
      updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter(item => item !== option);
    } else {
      updatedAnswers[questionIndex] = updatedAnswers[questionIndex] ? [...updatedAnswers[questionIndex], option] : [option];
    }
    setSelectedAnswers(updatedAnswers);
  };

  // Function to show results
  const handleShowResults = () => {
    setShowResults(true);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz</h1>
      <ul>
        {quiz.questions.map((q, index) => (
          <li key={index} className="question-box">
            <div className="question-text">
              <pre>{q.question}</pre>
            </div>
            <ul className="options-list">
              {q.options.map((option, optionIndex) => (
                <li key={optionIndex} className="option">
                  <label className="option-label">
                    <input
                      type="checkbox"
                      className="option-checkbox"
                      value={option}
                      checked={selectedAnswers[index]?.includes(option)}
                      onChange={() => handleOptionChange(index, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            {showResults && (
              <div className="answer-display">
                <strong>Correct Answer: </strong>{q.answer}
                {selectedAnswers[index]?.includes(q.answer) ? ' (Correct)' : ' (Incorrect)'}
              </div>
            )}
          </li>
        ))}
      </ul>
      {!showResults && (
        <button className="show-results-btn" onClick={handleShowResults}>Show Results</button>
      )}
    </div>
  );
};

export default Quiz;
