/**
 * Audio Manager Utility
 * Handles audio playback and management throughout the application
 */

// Define audio sources
export const AUDIO_SOURCES = {
  whyAreYouGay: "https://www.myinstants.com/media/sounds/why-are-you-gay_2.mp3",
  buttonClick: "https://www.soundjay.com/button/sounds/button-1.mp3",
  success: "https://www.soundjay.com/button/sounds/button-3.mp3",
  transition: "https://www.soundjay.com/button/sounds/button-10.mp3"
};

// Audio context singleton to ensure we only create one audio context
let audioContext: AudioContext | null = null;

/**
 * Initialize the audio context
 * This should be called on user interaction to unlock audio on iOS/Safari
 */
export const initAudioContext = (): void => {
  if (!audioContext) {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContext = new AudioContextClass();
    } catch (error) {
      console.error('Web Audio API is not supported in this browser', error);
    }
  }
};

/**
 * Unlock audio context on iOS/Safari
 * This needs to be called on a user interaction event
 */
export const unlockAudioContext = (): void => {
  if (audioContext && audioContext.state === 'suspended') {
    const unlock = () => {
      audioContext?.resume();
      
      // Create and play a silent buffer to unlock the audio context
      const buffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
      
      // Remove the event listeners once unlocked
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('touchend', unlock);
      document.removeEventListener('click', unlock);
    };
    
    document.addEventListener('touchstart', unlock, false);
    document.addEventListener('touchend', unlock, false);
    document.addEventListener('click', unlock, false);
  }
};

/**
 * Preload audio files to ensure they're ready to play
 * @param sources Array of audio URLs to preload
 */
export const preloadAudio = (sources: string[]): void => {
  sources.forEach(src => {
    const audio = new Audio();
    audio.src = src;
    audio.preload = 'auto';
    // Just load it, don't play it
    audio.load();
  });
};

/**
 * Play an audio file
 * @param src Audio source URL
 * @param volume Volume level (0.0 to 1.0)
 * @param loop Whether to loop the audio
 * @returns The Audio element for further control
 */
export const playAudio = (
  src: string, 
  volume: number = 1.0, 
  loop: boolean = false
): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.loop = loop;
  
  // Try to play and handle any errors
  audio.play().catch(error => {
    console.warn(`Failed to play audio: ${src}`, error);
  });
  
  return audio;
};

/**
 * Stop an audio element
 * @param audio The Audio element to stop
 */
export const stopAudio = (audio: HTMLAudioElement): void => {
  audio.pause();
  audio.currentTime = 0;
};

export default {
  AUDIO_SOURCES,
  initAudioContext,
  unlockAudioContext,
  preloadAudio,
  playAudio,
  stopAudio
};