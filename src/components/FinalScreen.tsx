import React, { useEffect, useRef, useState } from 'react';
import { Music, RefreshCw, Volume2, VolumeX, Share2 } from 'lucide-react';
import { AUDIO_SOURCES, playAudio, stopAudio, preloadAudio } from '../utils/audioManager';

interface FinalScreenProps {
  resetQuestionnaire: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ resetQuestionnaire }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentGif, setCurrentGif] = useState(0);
  
  const gifs = [
    "https://media.giphy.com/media/eyfmfTMgx5WYE/giphy.gif",
    "https://media.giphy.com/media/l4HnKwiJJaJQB04Zq/giphy.gif",
    "https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy.gif",
    "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif"
  ];
  
  useEffect(() => {
    // Preload all audio files
    preloadAudio([
      AUDIO_SOURCES.whyAreYouGay,
      AUDIO_SOURCES.buttonClick,
      AUDIO_SOURCES.success
    ]);
    
    // Play a dummy sound at low volume to unlock audio on iOS/Safari
    const dummySound = playAudio(AUDIO_SOURCES.buttonClick, 0.1);
    
    // Play the main "Why are you gay?" sound
    audioRef.current = playAudio(AUDIO_SOURCES.whyAreYouGay, 1.0);
    
    // If audio fails to play, update the UI state
    audioRef.current.addEventListener('error', () => {
      setIsPlaying(false);
    });
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        stopAudio(audioRef.current);
      }
      stopAudio(dummySound);
    };
  }, []);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const changeGif = () => {
    // Play a transition sound when changing GIFs
    playAudio(AUDIO_SOURCES.transition, 0.3);
    setCurrentGif((currentGif + 1) % gifs.length);
  };
  
  const shareResult = () => {
    // Play a success sound when sharing
    playAudio(AUDIO_SOURCES.success, 0.5);
    
    if (navigator.share) {
      navigator.share({
        title: 'The Ultimate Project Predictor',
        text: 'I just took this hilarious quiz! Check it out!',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Sharing is not available on your device. But we appreciate the thought!');
    }
  };

  return (
    <div className="text-center animate-fadeIn">
      <h2 className="text-3xl font-bold text-peach-600 mb-6 animate-bounce">
        And finally... Why are you gay? 🤨
      </h2>
      
      <div className="mb-8 overflow-hidden rounded-lg border-4 border-peach-300 shadow-lg relative">
        <img 
          src={gifs[currentGif]} 
          alt="Funny reaction gif" 
          className="w-full h-auto"
        />
        <button 
          onClick={changeGif}
          className="absolute bottom-2 right-2 bg-white/80 p-2 rounded-full text-peach-600 hover:bg-white transition-colors"
        >
          Next GIF
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={toggleAudio}
          className="bg-gradient-to-r from-peach-500 to-peach-600 hover:from-peach-600 hover:to-peach-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
        >
          {isPlaying ? <VolumeX className="mr-2" size={18} /> : <Volume2 className="mr-2" size={18} />}
          {isPlaying ? 'Mute Sound' : 'Play Sound'}
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={resetQuestionnaire}
            className="bg-white border-2 border-peach-500 hover:bg-peach-50 text-peach-600 font-bold py-3 px-6 rounded-full transition-colors flex items-center"
          >
            <RefreshCw className="mr-2" size={18} />
            Start Over
          </button>
          
          <button
            onClick={shareResult}
            className="bg-white border-2 border-peach-500 hover:bg-peach-50 text-peach-600 font-bold py-3 px-6 rounded-full transition-colors flex items-center"
          >
            <Share2 className="mr-2" size={18} />
            Share
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-peach-50 rounded-lg border border-peach-200">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-peach-600">Disclaimer:</span> This was for entertainment purposes only. No offense intended! 😄
        </p>
        <p className="text-sm text-gray-700 mt-2">
          
        </p>
      </div>
    </div>
  );
};

export default FinalScreen;