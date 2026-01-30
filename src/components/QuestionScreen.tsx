import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { QuizRound } from '@/data/quizData';
import FramePanel from './ui/FramePanel';
import { audioSystem } from '@/lib/audioSystem';
import { cinematicSlideIn, cinematicSlideInLeft, cinematicSlideInRight } from '@/lib/animations';

interface QuestionScreenProps {
  round: QuizRound;
  roundNumber: number;
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

export default function QuestionScreen({ round, roundNumber, onAnswer, disabled }: QuestionScreenProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const controls = useAnimation();
  const isSplash = round.roundType === 'SPLASH_GUESS';
  const fullText = round.question;
  const isLocked = disabled || selectedOption !== null;

  const revealDuration = round.revealDurationMs ?? 4000;
  const startZoom = round.startZoom ?? 1.8;
  const startBlur = round.startBlurPx ?? 0;

  const splashAnimation = useMemo(() => ({
    scale: [startZoom, 1],
    filter: [`blur(${startBlur}px)`, 'blur(0px)'],
    transition: { duration: revealDuration / 1000, ease: 'easeOut' },
  }), [startBlur, startZoom, revealDuration]);

  useEffect(() => {
    let currentIndex = 0;
    if (isSplash) {
      setDisplayedText(fullText);
      controls.start(splashAnimation);
      return () => controls.stop();
    }

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [fullText, controls, splashAnimation, isSplash]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isLocked) return;

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
  }, [isLocked]);

  const handleAnswer = (answer: string) => {
    if (isLocked) return;

    setSelectedOption(answer);
    audioSystem.playClick();

    if (isSplash) {
      controls.stop();
      controls.start({ scale: 1, filter: 'blur(0px)', transition: { duration: 0.2 } });
    }

    setTimeout(() => {
      onAnswer(answer);
    }, 250);
  };

  return (
    <div className="min-h-screen mlbb-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(98,214,232,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,rgba(245,196,81,0.1),transparent_50%)]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={cinematicSlideIn}
      >
        <div className="text-center mb-8">
          <div className="text-[var(--mlbb-muted)] font-share-tech text-sm tracking-[0.4em] mb-2">
            ROUND {roundNumber}
          </div>
          <div className="text-2xl md:text-3xl font-orbitron font-bold text-[var(--mlbb-gold)]">
            {round.title}
          </div>
          <div className="text-[var(--mlbb-teal)] text-lg md:text-xl font-rajdhani mt-2">
            {round.difficulty}
          </div>
        </div>

        <FramePanel className="mb-10 text-center">
          {isSplash ? (
            <div className="mlbb-splash-wrap">
              <motion.div
                className="mlbb-splash-image"
                animate={controls}
                initial={{ scale: startZoom, filter: `blur(${startBlur}px)` }}
                style={{ backgroundImage: `url(${round.splashImageUrl})` }}
              />
              <div className="mlbb-splash-overlay" aria-hidden />
            </div>
          ) : (
            <div className="text-xl md:text-3xl font-rajdhani font-semibold text-[var(--mlbb-text)] min-h-[90px] flex items-center justify-center">
              {displayedText}
              <motion.span
                className="inline-block w-3 h-7 bg-[var(--mlbb-gold)] ml-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </div>
          )}
        </FramePanel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {round.options.map((option, index) => (
            <motion.button
              key={option.label}
              onClick={() => handleAnswer(option.label)}
              disabled={isLocked}
              className={`mlbb-focus-ring group relative overflow-hidden rounded-xl border px-5 py-5 md:px-6 md:py-6 text-left transition-all duration-300 ${
                selectedOption === option.label
                  ? 'border-[rgba(245,196,81,0.8)] bg-[rgba(245,196,81,0.15)] shadow-[0_0_30px_rgba(245,196,81,0.45)]'
                  : 'border-[rgba(98,214,232,0.35)] bg-[rgba(8,14,32,0.75)] hover:border-[rgba(245,196,81,0.7)] hover:shadow-[0_0_24px_rgba(98,214,232,0.4)]'
              } ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              initial="hidden"
              animate="visible"
              variants={index % 2 === 0 ? cinematicSlideInLeft : cinematicSlideInRight}
              whileHover={!isLocked ? { y: -4 } : {}}
              whileTap={!isLocked ? { scale: 0.98 } : {}}
            >
              <div className="absolute inset-0 mlbb-sweep opacity-0 group-hover:opacity-40 transition-opacity duration-300" aria-hidden />
              <div className="flex items-start gap-4">
                <div className="text-3xl font-orbitron font-black text-[var(--mlbb-gold)]">
                  {option.label}
                </div>
                <div className="text-lg md:text-xl font-rajdhani font-semibold text-[var(--mlbb-text)] flex-1">
                  {option.text}
                </div>
              </div>
              <div className="absolute top-3 right-3 text-xs text-[var(--mlbb-muted)] font-share-tech">
                [{index + 1}]
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          className="text-center mt-6 text-[var(--mlbb-muted)] font-share-tech text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          TAP OR PRESS 1-4 TO ANSWER
        </motion.div>
      </motion.div>
    </div>
  );
}
