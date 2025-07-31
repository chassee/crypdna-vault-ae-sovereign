import React, { useEffect, useState } from 'react';

interface CinematicWelcomeProps {
  userName: string;
  onComplete: () => void;
}

const CinematicWelcome: React.FC<CinematicWelcomeProps> = ({ userName, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Play welcome voice prompt
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Welcome back, Legend ${userName}. Your vault awaits.`);
      utterance.voice = speechSynthesis.getVoices().find(voice => 
        voice.name.includes('Microsoft David') || voice.name.includes('Alex') || voice.lang.includes('en-US')
      ) || speechSynthesis.getVoices()[0];
      utterance.rate = 0.8;
      utterance.pitch = 0.8;
      speechSynthesis.speak(utterance);
    }

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [userName, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
          <span className="text-3xl font-bold text-white">C</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome back, Legend
          </h1>
          <p className="text-xl text-white/80">{userName}</p>
          <p className="text-sm text-white/60">Your vault awaits...</p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default CinematicWelcome;