export interface QuizRound {
  id: number;
  title: string;
  difficulty: string;
  difficultyStars: number;
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  heroName: string;
  heroSubtitle: string;
  proTip: string;
  imageUrl?: string;
  splashImageUrl?: string;
  roundType?: 'STANDARD' | 'SPLASH_GUESS';
  revealDurationMs?: number;
  startZoom?: number;
  startBlurPx?: number;
}

export const quizRounds: QuizRound[] = [
  {
    id: 1,
    title: "HERO IDENTITY",
    difficulty: "★★★☆☆",
    difficultyStars: 3,
    question: "Which hero has the passive skill 'Cat's Eye'?",
    options: [
      { label: "A", text: "Natalia" },
      { label: "B", text: "Karina" },
      { label: "C", text: "Selena" },
      { label: "D", text: "Fanny" }
    ],
    correctAnswer: "A",
    heroName: "NATALIA",
    heroSubtitle: "The Bright Claw",
    proTip: "Natalia's Cat's Eye passive gives her increased movement speed & invisibility when near grass!",
    imageUrl: "https://cdn.oneesports.gg/cdn-data/wp-content/uploads/2020/03/MLBB_Natalia.jpg"
  },
  {
    id: 2,
    title: "SKILL MASTERY",
    difficulty: "★★★★☆",
    difficultyStars: 4,
    question: "Which hero's ultimate can revive themselves after death with increased stats?",
    options: [
      { label: "A", text: "Pharsa" },
      { label: "B", text: "Aldous" },
      { label: "C", text: "Odette" },
      { label: "D", text: "Yve" }
    ],
    correctAnswer: "C",
    heroName: "ODETTE",
    heroSubtitle: "Swan Song",
    proTip: "Never ult first in teamfights. Wait for enemy CC to be used, or hide in bush/fog. One knock-up = wasted ult.",
    imageUrl: "https://cdn.oneesports.gg/cdn-data/2021/09/MLBB_Odette.jpg"
  },
  {
    id: 3,
    title: "DAMAGE CALCULATION",
    difficulty: "★★★★★",
    difficultyStars: 5,
    question: "Which marksman has the highest base attack speed at level 1 in the game?",
    options: [
      { label: "A", text: "Claude" },
      { label: "B", text: "Karrie" },
      { label: "C", text: "Moskov" },
      { label: "D", text: "Wanwan" }
    ],
    correctAnswer: "B",
    heroName: "KARRIE",
    heroSubtitle: "Lost Star",
    proTip: "Karrie's fast attack speed + true damage makes her perfect for melting tanks & high HP enemies!",
    imageUrl: "https://cdn.oneesports.gg/cdn-data/2023/06/MLBB_Karrie.jpg"
  },
  {
    id: 4,
    title: "LORE & TRIVIA",
    difficulty: "★★★★☆",
    difficultyStars: 4,
    question: "Which two heroes are siblings in the Mobile Legends lore?",
    options: [
      { label: "A", text: "Gusion & Guinevere" },
      { label: "B", text: "Ling & Wanwan" },
      { label: "C", text: "Miya & Alucard" },
      { label: "D", text: "Claude & Dexter" }
    ],
    correctAnswer: "B",
    heroName: "LING & WANWAN",
    heroSubtitle: "The Oriental Fighters",
    proTip: "Ling & Wanwan are siblings from the Oriental Fighters family, masters of ancient combat arts!",
    imageUrl: "https://i.pinimg.com/564x/fc/c2/76/fcc2767b87f953db50ab2b2e95a68384.jpg"
  },
  {
    id: 5,
    title: "GUESS BY EMOJI",
    difficulty: "★★★★☆",
    difficultyStars: 4,
    question: "3️⃣ 🐺🌕⚡",
    options: [
      { label: "A", text: "Aldous" },
      { label: "B", text: "Roger" },
      { label: "C", text: "Balmond" },
      { label: "D", text: "Pharsa" }
    ],
    correctAnswer: "B",
    heroName: "ROGER",
    heroSubtitle: "AUUUUUUU",
    proTip: "Roger transforms into a werewolf with enhanced abilities under moonlight!",
    imageUrl: "https://gamingonphone.com/wp-content/uploads/2022/01/Mobile-Legends-Roger-Guide-Cover.jpg"
  },
  {
    id: 6,
    title: "SPLASH ART MYSTERY",
    difficulty: "★★★☆☆",
    difficultyStars: 3,
    question: "Guess the hero from the splash art",
    options: [
      { label: "A", text: "Fanny" },
      { label: "B", text: "Kaja" },
      { label: "C", text: "Lancelot" },
      { label: "D", text: "Hayabusa" }
    ],
    correctAnswer: "B",
    heroName: "KAJA",
    heroSubtitle: "Divine Descendant",
    proTip: "Dive with Flicker+Ult to displace priority targets. Keep your passive stacks up before engaging.",
    imageUrl: "https://cdn.oneesports.gg/cdn-data/2023/08/MLBB-Skyblocker-Kaja.jpeg",
    splashImageUrl: "https://cdn.oneesports.gg/cdn-data/2023/08/MLBB-Skyblocker-Kaja.jpeg",
    roundType: "SPLASH_GUESS",
    revealDurationMs: 4500,
    startZoom: 2.4,
    startBlurPx: 10
  }
];

export function shuffleRounds(rounds: QuizRound[]): QuizRound[] {
  const shuffled = [...rounds];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
