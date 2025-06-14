
import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Initializing Vault...');

  useEffect(() => {
    const messages = [
      'Initializing Vault...',
      'Verifying Credentials...',
      'Decrypting Vault Key...',
      'Welcome, Legend.'
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        
        // Update message based on progress
        if (newProgress > 75) setCurrentMessage(messages[3]);
        else if (newProgress > 50) setCurrentMessage(messages[2]);
        else if (newProgress > 25) setCurrentMessage(messages[1]);
        
        return newProgress;
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
            <Lock className="w-16 h-16 text-white animate-bounce" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-purple-300 rounded-full animate-spin border-t-transparent"></div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CrypDNA Vault
          </h1>
          <p className="text-xl text-gray-600 font-medium">{currentMessage}</p>
        </div>
        
        <div className="w-80 mx-auto">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <div 
              className="h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
