import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameState, GameContext, initialGameContext } from '@/lib/gameStateMachine';
import { quizRounds, shuffleRounds, QuizRound } from '@/data/quizData';
import { audioSystem } from '@/lib/audioSystem';
import BootScreen from '@/components/BootScreen';
import NameEntry from '@/components/NameEntry';
import MainHub from '@/components/MainHub';
import RoundIntro from '@/components/RoundIntro';
import QuestionScreen from '@/components/QuestionScreen';
import AnswerReveal from '@/components/AnswerReveal';
import GameOver from '@/components/GameOver';
import Victory from '@/components/Victory';
import ScanlineOverlay from '@/components/ui/ScanlineOverlay';

export default function Index() {
  const [gameState, setGameState] = useState<GameState>('BOOT');
  const [context, setContext] = useState<GameContext>(initialGameContext);
  const [shuffledRounds, setShuffledRounds] = useState<QuizRound[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Initialize shuffled rounds on mount
    setShuffledRounds(shuffleRounds(quizRounds));
  }, []);

  const currentRound = shuffledRounds[context.currentRoundIndex];

  const handleBootComplete = () => {
    audioSystem.playTransition();
    setGameState('NAME_ENTRY');
  };

  const handleNameSubmit = (name: string) => {
    audioSystem.playTransition();
    setContext({ ...context, playerName: name });
    setGameState('MAIN_HUB');
  };

  const handleStartGame = () => {
    audioSystem.playTransition();
    // Reshuffle rounds for new game
    setShuffledRounds(shuffleRounds(quizRounds));
    setContext({ ...initialGameContext, playerName: context.playerName });
    setGameState('ROUND_INTRO');
  };

  const handleRoundIntroComplete = () => {
    audioSystem.playTransition();
    setGameState('QUESTION');
  };

  const handleAnswer = (answer: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const isCorrect = answer === currentRound.correctAnswer;

    setContext(prev => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect
    }));

    if (isCorrect) {
      audioSystem.playSuccess();
      setTimeout(() => {
        setGameState('ANSWER_REVEAL');
        setIsProcessing(false);
      }, 500);
    } else {
      audioSystem.playError();
      setTimeout(() => {
        setGameState('GAME_OVER');
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handleNextRound = () => {
    audioSystem.playTransition();
    const newScore = context.score + 1;
    const newRoundIndex = context.currentRoundIndex + 1;

    setContext(prev => ({
      ...prev,
      score: newScore,
      currentRoundIndex: newRoundIndex,
      selectedAnswer: null,
      isCorrect: false
    }));

    if (newRoundIndex >= context.totalRounds) {
      setGameState('VICTORY');
    } else {
      setGameState('ROUND_INTRO');
    }
  };

  const handleRetry = () => {
    audioSystem.playTransition();
    handleStartGame();
  };

  const handleMainHub = () => {
    audioSystem.playTransition();
    setGameState('MAIN_HUB');
  };

  return (
    <div className="relative">
      <ScanlineOverlay />
      
      <AnimatePresence mode="wait">
        {gameState === 'BOOT' && (
          <BootScreen key="boot" onComplete={handleBootComplete} />
        )}

        {gameState === 'NAME_ENTRY' && (
          <NameEntry key="name-entry" onSubmit={handleNameSubmit} />
        )}

        {gameState === 'MAIN_HUB' && (
          <MainHub 
            key="main-hub" 
            playerName={context.playerName}
            onStart={handleStartGame}
          />
        )}

        {gameState === 'ROUND_INTRO' && currentRound && (
          <RoundIntro
            key={`round-intro-${context.currentRoundIndex}`}
            round={currentRound}
            roundNumber={context.currentRoundIndex + 1}
            totalRounds={context.totalRounds}
            onComplete={handleRoundIntroComplete}
          />
        )}

        {gameState === 'QUESTION' && currentRound && (
          <QuestionScreen
            key={`question-${context.currentRoundIndex}`}
            round={currentRound}
            roundNumber={context.currentRoundIndex + 1}
            onAnswer={handleAnswer}
            disabled={isProcessing}
          />
        )}

        {gameState === 'ANSWER_REVEAL' && currentRound && (
          <AnswerReveal
            key={`answer-reveal-${context.currentRoundIndex}`}
            round={currentRound}
            onNext={handleNextRound}
          />
        )}

        {gameState === 'GAME_OVER' && (
          <GameOver
            key="game-over"
            playerName={context.playerName}
            score={context.score}
            totalRounds={context.totalRounds}
            onRetry={handleRetry}
            onMainHub={handleMainHub}
          />
        )}

        {gameState === 'VICTORY' && (
          <Victory
            key="victory"
            playerName={context.playerName}
            totalRounds={context.totalRounds}
            onPlayAgain={handleRetry}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
