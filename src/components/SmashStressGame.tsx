import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackEvent } from "../lib/analytics";

interface SmashStressGameProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (results: GameResults) => void;
  isHighRisk?: boolean;
  preSessionMood?: number;
}

export interface GameResults {
  totalPops: number;
  tapSpeed: number;
  missRate: number;
  moodBefore: number;
  moodAfter: number;
  calmScore: number;
  reflectionNote?: string;
  timestamp: string;
}

interface Bubble {
  id: number;
  emoji: string;
  label: string;
  color: string;
  size: number;
  x: number;
  y: number;
  speed: number;
}

const bubbleTypes = [
  { emoji: "😠", label: "Anger", color: "#FF6B6B" },
  { emoji: "😰", label: "Worry", color: "#4ECDC4" },
  { emoji: "😩", label: "Stress", color: "#A8A4E8" },
  { emoji: "😢", label: "Sadness", color: "#89CFF0" },
  { emoji: "🤯", label: "Overthinking", color: "#C9A7EB" },
  { emoji: "😔", label: "Guilt", color: "#FFD93D" },
];

export default function SmashStressGame({ 
  isOpen, 
  onClose, 
  onComplete,
  isHighRisk = false,
  preSessionMood = 2
}: SmashStressGameProps) {
  const [gameState, setGameState] = useState<"intro" | "countdown" | "playing" | "results" | "reflection">("intro");
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [moodAfter, setMoodAfter] = useState<number | null>(null);
  const [reflectionNote, setReflectionNote] = useState("");
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const bubbleIdRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setGameState("intro");
      setCountdown(3);
      setTimeLeft(30);
      setScore(0);
      setMisses(0);
      setBubbles([]);
      setMoodAfter(null);
      setReflectionNote("");
      trackEvent("stress_game_opened", { isHighRisk });
    }
  }, [isOpen, isHighRisk]);

  useEffect(() => {
    if (gameState === "countdown" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "countdown" && countdown === 0) {
      setGameState("playing");
      trackEvent("stress_game_started");
    }
  }, [gameState, countdown]);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (gameState === "playing" && timeLeft === 0) {
      setGameState("results");
      setBubbles([]);
      // Use a ref or callback to get the latest score/misses values
      setTimeout(() => {
        trackEvent("stress_game_completed", { score, misses });
      }, 0);
    }
  }, [gameState, timeLeft]);

  // Spawn bubbles
  useEffect(() => {
    if (gameState === "playing") {
      // Wait for AnimatePresence to finish mounting the playing state
      const initTimer = setTimeout(() => {
        const spawnBubble = () => {
          const area = gameAreaRef.current;
          if (!area) {
            console.warn("⚠️ Game area not ready yet");
            return;
          }

          const bubbleType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
          const size = 90 + Math.random() * 30;
          const maxX = Math.max(0, area.clientWidth - size - 40);
          const x = 20 + Math.random() * maxX;
          const y = area.clientHeight - size - 30;

          const newBubble: Bubble = {
            id: bubbleIdRef.current++,
            emoji: bubbleType.emoji,
            label: bubbleType.label,
            color: bubbleType.color,
            size,
            x,
            y,
            speed: 2.5 + Math.random() * 1.5,
          };

          setBubbles(prev => [...prev, newBubble]);
        };

        // Try spawning immediately and then every 700ms
        spawnBubble();
        const interval = setInterval(spawnBubble, 700);

        return () => clearInterval(interval);
      }, 200); // Wait longer for AnimatePresence

      return () => clearTimeout(initTimer);
    }
  }, [gameState]);

  // Move bubbles UP
  useEffect(() => {
    if (gameState === "playing") {
      const moveInterval = setInterval(() => {
        setBubbles(prev => 
          prev
            .map(bubble => ({ ...bubble, y: bubble.y - bubble.speed }))
            .filter(bubble => bubble.y > -150)
        );
      }, 16);

      return () => clearInterval(moveInterval);
    }
  }, [gameState]);

  const handleBubbleClick = (e: React.MouseEvent, bubbleId: number) => {
    e.stopPropagation();
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    setScore(s => s + 1);
    trackEvent("bubble_popped", { score: score + 1 });
  };

  const handleGameAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMisses(m => m + 1);
    }
  };

  const handleStartGame = () => {
    setGameState("countdown");
  };

  const handleReflectionComplete = () => {
    const results: GameResults = {
      totalPops: score,
      tapSpeed: score / 30,
      missRate: misses / (score + misses) || 0,
      moodBefore: preSessionMood,
      moodAfter: moodAfter || preSessionMood,
      calmScore: Math.min(100, (score / 30) * 100),
      reflectionNote,
      timestamp: new Date().toISOString(),
    };

    trackEvent("stress_game_reflection_completed", { moodAfter, results });
    onComplete?.(results);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      style={{ zIndex: 9999 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {gameState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border-2 border-purple-200 dark:border-purple-500/50"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </Button>

            <div className="text-center space-y-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                😤
              </motion.div>

              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Smash Your Stress
              </h2>

              <p className="text-lg text-gray-900 dark:text-gray-100 max-w-md mx-auto font-medium">
                Pop as many stress bubbles as you can in 30 seconds!
              </p>

              <Button
                onClick={handleStartGame}
                size="lg"
                className="mt-8 px-12 py-6 text-xl font-bold rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-xl border-0 overflow-visible"
              >
                Start Game
              </Button>
            </div>
          </motion.div>
        )}

        {gameState === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="text-center"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-9xl font-bold text-white"
            >
              {countdown}
            </motion.div>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md z-10 border-b-2 border-purple-200 dark:border-purple-500/50">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ⏱️ {timeLeft}s
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                🎯 {score}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setGameState("results");
                  setBubbles([]);
                }}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold"
              >
                Skip
              </Button>
            </div>

            {/* Game Area */}
            <div
              ref={gameAreaRef}
              onClick={handleGameAreaClick}
              className="absolute inset-0 top-20 overflow-hidden cursor-crosshair"
              style={{ zIndex: 1 }}
            >
              {/* Bubbles */}
              {bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  onClick={(e) => handleBubbleClick(e, bubble.id)}
                  className="transition-transform hover:scale-110 active:scale-95"
                  style={{
                    position: "absolute",
                    left: `${bubble.x}px`,
                    top: `${bubble.y}px`,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    backgroundColor: bubble.color,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: `${bubble.size * 0.5}px`,
                    cursor: "pointer",
                    boxShadow: `0 0 20px ${bubble.color}aa`,
                    border: "4px solid rgba(255, 255, 255, 0.9)",
                    zIndex: 100,
                    pointerEvents: "auto",
                  }}
                >
                  {bubble.emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border-2 border-purple-200 dark:border-purple-500/50"
          >
            <div className="text-center space-y-6">
              <div className="text-8xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Great Job!</h2>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 border border-purple-200 dark:border-gray-700">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">{score}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-2 font-medium">Bubbles Popped</div>
                </div>
                <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 border border-blue-200 dark:border-gray-700">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{misses}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-2 font-medium">Missed Taps</div>
                </div>
              </div>

              <Button
                onClick={() => setGameState("reflection")}
                size="lg"
                className="mt-8 px-12 py-6 text-xl font-bold rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-xl border-0 overflow-visible"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {gameState === "reflection" && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border-2 border-purple-200 dark:border-purple-500/50"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                How do you feel now?
              </h2>

              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setMoodAfter(mood)}
                    className={`text-5xl transition-transform hover:scale-110 ${
                      moodAfter === mood ? "scale-125" : "scale-100 opacity-50"
                    }`}
                  >
                    {mood === 1 && "😢"}
                    {mood === 2 && "😟"}
                    {mood === 3 && "😐"}
                    {mood === 4 && "🙂"}
                    {mood === 5 && "😊"}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Anything else you'd like to share? (Optional)
                </label>
                <Textarea
                  value={reflectionNote}
                  onChange={(e) => setReflectionNote(e.target.value)}
                  placeholder="How did this game make you feel?"
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={handleReflectionComplete}
                disabled={!moodAfter}
                size="lg"
                className="w-full py-6 text-lg font-bold rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-xl border-0 overflow-visible disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
