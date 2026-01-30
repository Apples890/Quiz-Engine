import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { QuizRound } from '@/data/quizData';
import NeonPanel from './ui/NeonPanel';
import { audioSystem } from '@/lib/audioSystem';

interface QuestionScreenProps {
  round: QuizRound;
  roundNumber: number;
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

export default function QuestionScreen({ round, roundNumber, onAnswer, disabled }: QuestionScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const fullText = round.question;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (disabled) return;
      
      const keyMap: { [key: string]: string } = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D'
      };

      if (keyMap[e.key]) {
        handleAnswer(keyMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [disabled]);

  const handleAnswer = (answer: string) => {
    if (disabled || selectedOption) return;
    
    setSelectedOption(answer);
    audioSystem.playClick();
    
    setTimeout(() => {
      onAnswer(answer);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/940159/2026-01-29/93680123-01bb-462d-b894-4974334da6e9.png"
          alt="Cyberpunk City"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-cyan-400 font-share-tech text-sm mb-2">
            ROUND {roundNumber} • {round.title}
          </div>
          <div className="text-yellow-400 text-xl">
            {round.difficulty}
          </div>
        </motion.div>

        {/* Question */}
        <NeonPanel className="mb-8" glowColor="cyan">
          <div className="text-2xl md:text-3xl font-rajdhani font-semibold text-white text-center min-h-[80px] flex items-center justify-center">
            {displayedText}
            <motion.span
              className="inline-block w-3 h-8 bg-cyan-400 ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </NeonPanel>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {round.options.map((option, index) => (
            <motion.button
              key={option.label}
              onClick={() => handleAnswer(option.label)}
              disabled={disabled || selectedOption !== null}
              className={`relative p-6 border-2 transition-all duration-300 ${
                selectedOption === option.label
                  ? 'border-pink-500 bg-pink-500/20 shadow-[0_0_30px_rgba(255,0,110,0.6)]'
                  : 'border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              } ${disabled || selectedOption !== null ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={!disabled && !selectedOption ? { scale: 1.02 } : {}}
              whileTap={!disabled && !selectedOption ? { scale: 0.98 } : {}}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              <div className="flex items-center gap-4">
                <div className="text-3xl font-orbitron font-bold text-cyan-400">
                  {option.label}
                </div>
                <div className="text-xl font-rajdhani font-semibold text-white flex-1 text-left">
                  {option.text}
                </div>
              </div>

              {/* Keyboard hint */}
              <div className="absolute top-2 right-2 text-xs text-cyan-400/50 font-share-tech">
                [{index + 1}]
              </div>
            </motion.button>
          ))}
        </div>

        {/* Hint */}
        <motion.div
          className="text-center mt-6 text-cyan-400/60 font-share-tech text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CLICK OR PRESS 1-4 TO ANSWER
        </motion.div>
      </div>
    </div>
  );
}