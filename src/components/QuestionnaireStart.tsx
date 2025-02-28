import React from 'react';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';

interface QuestionnaireStartProps {
  onStart: () => void;
}

const QuestionnaireStart: React.FC<QuestionnaireStartProps> = ({ onStart }) => {
  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-24 h-24 bg-peach-100 rounded-full flex items-center justify-center">
          <Rocket size={48} className="text-peach-500" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-peach-600 mb-4 flex items-center justify-center">
        <Sparkles className="mr-2" size={20} />
        Welcome to the Fun Zone!
        <Sparkles className="ml-2" size={20} />
      </h2>
      
      <p className="mb-6 text-gray-700">
        Answer these totally serious and highly scientific questions to discover the perfect project idea for you! 
        <span className="block mt-2">No pressure, just pure fun ahead!</span>
      </p>
      
      <div className="flex justify-center">
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-peach-500 to-peach-600 hover:from-peach-600 hover:to-peach-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
        >
          Let's Begin <ArrowRight className="ml-2" size={18} />
        </button>
      </div>
      
      <div className="mt-8 text-sm text-gray-500 italic bg-peach-50 p-3 rounded-lg border border-peach-200">
        <p className="font-medium text-peach-600">⚠️ Fun Warning:</p>
        <p>*Results may vary. Seriousness not guaranteed. Side effects may include uncontrollable laughter and questioning your life choices.</p>
      </div>
    </div>
  );
};

export default QuestionnaireStart;