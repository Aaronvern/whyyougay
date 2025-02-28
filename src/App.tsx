import React, { useState, useEffect } from 'react';
import { Music, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import QuestionnaireStart from './components/QuestionnaireStart';
import Question from './components/Question';
import FinalScreen from './components/FinalScreen';
import Confetti from './components/Confetti';
import { questions } from './data/questions';
import { initAudioContext, unlockAudioContext, playAudio, AUDIO_SOURCES } from './utils/audioManager';

function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  // Initialize audio context on component mount
  useEffect(() => {
    initAudioContext();
    unlockAudioContext();
    
    // Preload all audio files
    const audioSources = Object.values(AUDIO_SOURCES);
    audioSources.forEach(src => {
      const audio = new Audio();
      audio.src = src;
      audio.preload = 'auto';
    });
  }, []);
  
  const handleAnswer = (answer: string) => {
    // Play a sound when answering a question
    playAudio(AUDIO_SOURCES.buttonClick, 0.2);
    
    setAnswers([...answers, answer]);
    setCurrentStep(currentStep + 1);
    
    // Show confetti when reaching the final screen
    if (currentStep === questions.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  const resetQuestionnaire = () => {
    // Play a sound when resetting
    playAudio(AUDIO_SOURCES.transition, 0.3);
    
    setCurrentStep(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-100 to-peach-200 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-5xl animate-bounce">🎯</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-pulse">🎪</div>
      <div className="absolute top-1/4 right-10 text-4xl animate-spin-slow">🎡</div>
      <div className="absolute bottom-1/4 left-10 text-4xl animate-float">🎨</div>
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        <div className="bg-gradient-to-r from-peach-500 to-peach-600 p-4 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center">
            <Sparkles className="mr-2" size={20} />
            The Ultimate Project Predictor 🎯
          </h1>
          {currentStep > 0 && (
            <button 
              onClick={resetQuestionnaire}
              className="p-2 rounded-full hover:bg-peach-600/50 transition-colors"
            >
              <RefreshCw size={20} />
            </button>
          )}
        </div>
        
        <div className="p-6 relative">
          {currentStep === 0 && (
            <QuestionnaireStart onStart={() => {
              playAudio(AUDIO_SOURCES.success, 0.3);
              setCurrentStep(1);
            }} />
          )}
          
          {currentStep > 0 && currentStep <= questions.length && (
            <Question 
              question={questions[currentStep - 1]} 
              onAnswer={handleAnswer}
              questionNumber={currentStep}
              totalQuestions={questions.length}
            />
          )}
          
          {currentStep > questions.length && (
            <FinalScreen resetQuestionnaire={resetQuestionnaire} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;