import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { 
  Zap, 
  Heart, 
  Trophy,
  TrendingUp,
  Target,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  id: string;
  type: "anger" | "sadness" | "worry" | "guilt" | "overthinking" | "stress";
  emoji: string;
  label: string;
  color: string;
  size: number;
  x: number;
  y: number;
  speed: number;
}

const bubbleTypes = [
  { type: "anger" as const, emoji: "🔥", label: "Anger", color: "#FF6B6B" },
  { type: "sadness" as const, emoji: "💧", label: "Sadness", color: "#4ECDC4" },
  { type: "worry" as const, emoji: "🤔", label: "Worry", color: "#95E1D3" },
  { type: "guilt" as const, emoji: "⚖️", label: "Guilt", color: "#F7DC6F" },
  { type: "overthinking" as const, emoji: "💭", label: "Overthinking", color: "#BB8FCE" },
  { type: "stress" as const, emoji: "⚡", label: "Stress", color: "#F8B739" },
];

const encouragingPhrases = [
  "Nice pop!",
  "You got this!",
  "Stress losing power.",
  "Keep going!",
  "Excellent!",
  "Feel it release!"
];

export function SmashStressGame({ 
  isOpen, 
  onClose, 
  onComplete,
  isHighRisk = false,
  preSessionMood = 2
}: SmashStressGameProps) {
  const [gameState, setGameState] = useState<"intro" | "countdown" | "playing" | "results" | "reflection" | "breathing">("intro");
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [encouragement, setEncouragement] = useState("");
  const [postGameMood, setPostGameMood] = useState<number | null>(null);
  const [reflectionNote, setReflectionNote] = useState("");
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const nextBubbleId = useRef(0);

  // High-risk safety: show breathing exercise instead
  useEffect(() => {
    if (isOpen && isHighRisk) {
      setGameState("breathing");
    }
  }, [isOpen, isHighRisk]);

  // Countdown logic
  useEffect(() => {
    if (gameState === "countdown" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "countdown" && countdown === 0) {
      setGameState("playing");
      setTimeLeft(30);
    }
  }, [gameState, countdown]);

  // Game timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "playing" && timeLeft === 0) {
      setGameState("results");
      setBubbles([]);
    }
  }, [gameState, timeLeft]);

  // Spawn bubbles
  useEffect(() => {
    if (gameState === "playing" && bubbles.length < 10) {
      const spawnInterval = setInterval(() => {
        if (Math.random() > 0.4) {
          spawnBubble();
        }
      }, 800);
      return () => clearInterval(spawnInterval);
    }
  }, [gameState, bubbles.length]);

  // Move bubbles
  useEffect(() => {
    if (gameState === "playing") {
      const moveInterval = setInterval(() => {
        setBubbles(prev => 
          prev
            .map(bubble => ({ ...bubble, y: bubble.y - bubble.speed }))
            .filter(bubble => bubble.y > -bubble.size)
        );
      }, 50);
      return () => clearInterval(moveInterval);
    }
  }, [gameState]);

  const spawnBubble = () => {
    if (!gameAreaRef.current) return;
    
    const bubbleType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
    const sizes = [48, 72, 96];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const rect = gameAreaRef.current.getBoundingClientRect();
    
    const newBubble: Bubble = {
      id: `bubble-${nextBubbleId.current++}`,
      ...bubbleType,
      size,
      x: Math.random() * (rect.width - size),
      y: rect.height,
      speed: size === 48 ? 6 : size === 72 ? 4.5 : 3.5,
    };
    
    setBubbles(prev => [...prev, newBubble]);
  };

  const handleBubblePop = (bubbleId: string) => {
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    setScore(prev => prev + 1);
    setTotalTaps(prev => prev + 1);
    
    // Show encouragement
    if (score % 3 === 0) {
      const phrase = encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)];
      setEncouragement(phrase);
      setTimeout(() => setEncouragement(""), 800);
    }
  };

  const handleMiss = () => {
    setMisses(prev => prev + 1);
    setTotalTaps(prev => prev + 1);
  };

  const handleStartGame = () => {
    setGameState("countdown");
    setCountdown(3);
    setScore(0);
    setMisses(0);
    setTotalTaps(0);
    setBubbles([]);
  };

  const handlePlayAgain = () => {
    handleStartGame();
  };

  const calculateResults = (): GameResults => {
    const tapSpeed = score / 30;
    const missRate = totalTaps > 0 ? misses / totalTaps : 0;
    const moodDelta = (postGameMood || preSessionMood) - preSessionMood;
    const calmScore = Math.min(100, Math.max(0, ((moodDelta + 2) * 25) + (score * 0.5)));
    
    return {
      totalPops: score,
      tapSpeed: parseFloat(tapSpeed.toFixed(2)),
      missRate: parseFloat((missRate * 100).toFixed(1)),
      moodBefore: preSessionMood,
      moodAfter: postGameMood || preSessionMood,
      calmScore: Math.round(calmScore),
      reflectionNote,
      timestamp: new Date().toISOString()
    };
  };

  const handleComplete = () => {
    const results = calculateResults();
    
    // Store results
    const existingData = JSON.parse(localStorage.getItem("unmutte_game_history") || "[]");
    existingData.push(results);
    localStorage.setItem("unmutte_game_history", JSON.stringify(existingData));
    
    if (onComplete) {
      onComplete(results);
    }
    onClose();
  };

  const moodEmojis = [
    { value: 1, emoji: "😔", label: "Low" },
    { value: 2, emoji: "😐", label: "Okay" },
    { value: 3, emoji: "🙂", label: "Good" },
    { value: 4, emoji: "😄", label: "Great" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[600px] max-h-[90vh] overflow-hidden p-0" 
        hideClose={gameState === "playing"}
      >
        {/* Intro Screen */}
        {gameState === "intro" && (
          <div className="p-6 space-y-6">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <DialogTitle>Let it out one last time!</DialogTitle>
              </div>
              <DialogDescription>
                Smash your stress before you go — This is a short, safe exercise. (30 seconds)
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-6 py-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <div className="text-center space-y-2">
                <h3>How it works</h3>
                <p className="text-muted-foreground">
                  Tap the floating emotion bubbles to pop them and release your stress.
                  It's quick, fun, and helps you reset emotionally.
                </p>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="ghost" onClick={onClose} className="w-full sm:w-auto">
                Skip for now
              </Button>
              <Button 
                onClick={handleStartGame}
                className="w-full sm:w-auto gradient-sky-lavender border-0"
              >
                Smash your stress (30s)
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Countdown Screen */}
        {gameState === "countdown" && (
          <div className="h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10">
            <motion.div
              key={countdown}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-8xl mb-4"
            >
              {countdown}
            </motion.div>
            <p className="text-lg text-muted-foreground">Ready? Breathe in… and tap.</p>
          </div>
        )}

        {/* Game Playing Screen */}
        {gameState === "playing" && (
          <div className="relative h-[600px] bg-gradient-to-br from-[#7CB9E8]/5 via-[#BFA2DB]/5 to-[#F8C8DC]/5 overflow-hidden">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
              <div className="text-sm">
                <span className="text-muted-foreground">Time: </span>
                <span className="font-mono">00:{timeLeft.toString().padStart(2, '0')}</span>
              </div>
              <div className="text-lg">
                <span className="text-primary">Score: {score}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setGameState("intro");
                  setBubbles([]);
                }}
              >
                Skip
              </Button>
            </div>

            {/* Game Area */}
            <div 
              ref={gameAreaRef}
              className="absolute inset-0 top-16"
              onClick={handleMiss}
            >
              <AnimatePresence>
                {bubbles.map((bubble) => (
                  <motion.button
                    key={bubble.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBubblePop(bubble.id);
                    }}
                    className="absolute rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform active:scale-95"
                    style={{
                      left: bubble.x,
                      bottom: bubble.y,
                      width: bubble.size,
                      height: bubble.size,
                      backgroundColor: bubble.color,
                      opacity: 0.9,
                    }}
                  >
                    <span className="text-2xl">{bubble.emoji}</span>
                    <span className="text-xs text-white mt-1">{bubble.label}</span>
                  </motion.button>
                ))}
              </AnimatePresence>

              {/* Encouragement Text */}
              <AnimatePresence>
                {encouragement && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-2xl text-primary pointer-events-none"
                  >
                    {encouragement}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Microcopy */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
              Tap the bubbles to pop them!
            </div>
          </div>
        )}

        {/* Results Screen */}
        {gameState === "results" && (
          <div className="p-6 space-y-6">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <DialogTitle>You smashed {score} emotions!</DialogTitle>
              </div>
              <DialogDescription>
                Notice how lighter you feel?
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl mb-1">{score}</p>
                <p className="text-xs text-muted-foreground">Total Pops</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Zap className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-2xl mb-1">{(score / 30).toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Pops/Second</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl mb-1">{totalTaps > 0 ? ((misses / totalTaps) * 100).toFixed(0) : 0}%</p>
                <p className="text-xs text-muted-foreground">Miss Rate</p>
              </div>
              <div className="p-4 border rounded-lg text-center bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl mb-1">{Math.round(((postGameMood || preSessionMood) - preSessionMood + 2) * 25)}</p>
                <p className="text-xs text-muted-foreground">Calm Score</p>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handlePlayAgain} className="w-full sm:w-auto">
                Play again
              </Button>
              <Button 
                onClick={() => setGameState("reflection")}
                className="w-full sm:w-auto gradient-peach-mint border-0"
              >
                Save & Reflect
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Reflection Screen */}
        {gameState === "reflection" && (
          <div className="p-6 space-y-6">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <DialogTitle>After smashing your stress, how do you feel right now?</DialogTitle>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-4 gap-3">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setPostGameMood(mood.value)}
                  className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-all hover:shadow-lg ${
                    postGameMood === mood.value ? "border-primary bg-primary/5" : "hover:border-primary"
                  }`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </button>
              ))}
            </div>

            {postGameMood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <Label>Share how you feel with a short note (optional)</Label>
                <Textarea
                  placeholder="I feel..."
                  value={reflectionNote}
                  onChange={(e) => setReflectionNote(e.target.value)}
                  rows={3}
                />
              </motion.div>
            )}

            {postGameMood && (
              <Alert className="border-primary/50 bg-primary/5">
                <Heart className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  Thank you for checking in — every small step counts.
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Skip
              </Button>
              <Button 
                onClick={handleComplete}
                disabled={!postGameMood}
                className="w-full sm:w-auto gradient-sky-lavender border-0"
              >
                Complete
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Breathing Exercise (High-Risk Alternative) */}
        {gameState === "breathing" && (
          <div className="p-6 space-y-6">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <DialogTitle>Let's take a calming breath together</DialogTitle>
              </div>
              <DialogDescription>
                We've prepared a gentle breathing exercise for you.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-6 py-8">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] opacity-50"
              />
              <div className="text-center space-y-2">
                <h3>Breathe with the circle</h3>
                <p className="text-muted-foreground">
                  Inhale as it grows, exhale as it shrinks
                </p>
              </div>
            </div>

            <Alert className="border-primary/50 bg-primary/5">
              <Heart className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                If you're feeling unsafe, would you like to speak to a listener now?
              </AlertDescription>
            </Alert>

            <DialogFooter className="flex-col gap-2">
              <Button 
                className="w-full gradient-sky-lavender border-0"
                onClick={() => {
                  // Trigger emergency support
                  window.location.href = "/#/connect";
                  onClose();
                }}
              >
                Connect with a Listener Now
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                I'm okay - Close
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
