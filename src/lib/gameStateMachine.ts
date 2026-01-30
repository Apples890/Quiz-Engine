export type GameState = 
  | 'BOOT'
  | 'NAME_ENTRY'
  | 'MAIN_HUB'
  | 'ROUND_INTRO'
  | 'QUESTION'
  | 'ANSWER_REVEAL'
  | 'GAME_OVER'
  | 'VICTORY';

export interface GameContext {
  playerName: string;
  currentRoundIndex: number;
  score: number;
  totalRounds: number;
  selectedAnswer: string | null;
  isCorrect: boolean;
}

export const initialGameContext: GameContext = {
  playerName: '',
  currentRoundIndex: 0,
  score: 0,
  totalRounds: 6,
  selectedAnswer: null,
  isCorrect: false
};