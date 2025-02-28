import React, { useState } from 'react';
import { QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  onAnswer,
  questionNumber,
  totalQuestions
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const handleOptionClick = (index: number, answer: string) => {
    setSelectedOption(index);
    
    // Delay the transition to the next question for a better UX
    setTimeout(() => {
      onAnswer(answer);
      setSelectedOption(null);
    }, 400);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium text-peach-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((questionNumber / totalQuestions) * 100)}% complete
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-peach-400 to-peach-600 h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        ></div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-3xl mr-3">{question.emoji}</span>
        {question.text}
      </h2>
      
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index, option.text)}
            className={`bg-white border-2 ${
              selectedOption === index 
                ? 'border-peach-500 bg-peach-50 shadow-md' 
                : 'border-peach-300 hover:border-peach-500 hover:bg-peach-50'
            } rounded-lg p-4 text-left transition-all duration-200 flex items-center transform ${
              selectedOption === index ? 'scale-[1.02]' : 'hover:scale-[1.01]'
            }`}
            disabled={selectedOption !== null}
          >
            <div className="text-3xl mr-3 transform transition-transform duration-300 hover:scale-125">
              {option.emoji}
            </div>
            <span className="text-gray-800">{option.text}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 text-center text-sm text-peach-600 italic">
        {question.funFact && (
          <div className="bg-peach-50 p-3 rounded-lg">
            <p className="font-medium">Fun Fact:</p>
            <p>{question.funFact}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;