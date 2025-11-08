import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Heart, Wind, Phone, BookOpen, ExternalLink, PlayCircle, PauseCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SmashStressGame, { type GameResults } from "../SmashStressGame";
import { toast } from "sonner@2.0.3";

export function ResourcesPage() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [breathingDuration, setBreathingDuration] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Check if user is high-risk from screening
  const isHighRisk = localStorage.getItem("unmutte_high_risk") === "true";

  useEffect(() => {
    if (!breathingActive) return;

    const phaseDuration = breathingDuration * 1000;
    const phases = [
      { name: "inhale" as const, duration: phaseDuration, text: "Breathe In" },
      { name: "hold" as const, duration: phaseDuration, text: "Hold" },
      { name: "exhale" as const, duration: phaseDuration, text: "Breathe Out" },
    ];

    let currentPhaseIndex = 0;
    let startTime = Date.now();
    let animationFrame: number;

    const updateBreathing = () => {
      const currentPhase = phases[currentPhaseIndex];
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / currentPhase.duration) * 100, 100);

      setBreathingProgress(progress);

      if (progress >= 100) {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        setBreathingPhase(phases[currentPhaseIndex].name);
        startTime = Date.now();
      }

      animationFrame = requestAnimationFrame(updateBreathing);
    };

    animationFrame = requestAnimationFrame(updateBreathing);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [breathingActive, breathingPhase, breathingDuration]);

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support",
      country: "USA",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free 24/7 crisis support via text",
      country: "USA",
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Substance abuse and mental health services",
      country: "USA",
    },
    {
      name: "International Association for Suicide Prevention",
      number: "Visit iasp.info",
      description: "Find resources worldwide",
      country: "Global",
    },
  ];

  const selfCareActivities = [
    {
      title: "5-4-3-2-1 Grounding",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
      icon: "👁️",
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and relax each muscle group, starting from your toes to your head.",
      icon: "💪",
    },
    {
      title: "Mindful Walking",
      description: "Take a slow walk, focusing on each step and your breath.",
      icon: "🚶",
    },
    {
      title: "Gratitude Journaling",
      description: "Write down 3 things you're grateful for today.",
      icon: "📝",
    },
    {
      title: "Cold Water Splash",
      description: "Splash cold water on your face to reset your nervous system.",
      icon: "💧",
    },
    {
      title: "Deep Breathing",
      description: "Use the breathing exercise below to calm your mind.",
      icon: "🌬️",
    },
  ];

  const articles = [
    {
      title: "Understanding Anxiety",
      description: "Learn about anxiety symptoms and coping strategies",
      url: "#",
    },
    {
      title: "Building Emotional Resilience",
      description: "Techniques to strengthen your mental wellness",
      url: "#",
    },
    {
      title: "The Power of Active Listening",
      description: "How being heard can transform your wellbeing",
      url: "#",
    },
    {
      title: "Managing Stress Daily",
      description: "Practical tips for everyday stress management",
      url: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h1 className="mb-4">Wellness Resources</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools, exercises, and resources to support your emotional wellbeing journey
          </p>
        </motion.div>

        <Tabs defaultValue="breathing" className="w-full overflow-visible">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="game">Stress Game</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Help</TabsTrigger>
            <TabsTrigger value="selfcare">Self-Care</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          {/* Breathing Exercise */}
          <TabsContent value="breathing">
            <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-blue-950/20">
              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <motion.div
                      animate={{ 
                        rotate: breathingActive ? 360 : 0,
                        scale: breathingActive ? [1, 1.2, 1] : 1
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: breathingActive ? Infinity : 0, ease: "linear" },
                        scale: { duration: 4, repeat: breathingActive ? Infinity : 0, ease: "easeInOut" }
                      }}
                    >
                      <Wind className="w-10 h-10 text-blue-400" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white">Guided Breathing</h2>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                    Find your calm with rhythmic breathing
                  </p>
                </motion.div>
                <div className="flex flex-col items-center">
                  {/* Main Breathing Circle */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex items-center justify-center w-96 h-96 md:w-[450px] md:h-[450px] mb-8"
                  >
                    {/* Animated Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
                      {/* Background ring */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="rgba(200, 200, 220, 0.2)"
                        strokeWidth="4"
                      />
                      {/* Progress ring */}
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="url(#breathingGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}%`}
                        animate={{
                          strokeDashoffset: breathingActive 
                            ? `${2 * Math.PI * 45 * (1 - breathingProgress / 100)}%`
                            : `${2 * Math.PI * 45}%`
                        }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        style={{
                          filter: "drop-shadow(0 0 8px rgba(124, 185, 232, 0.6))"
                        }}
                      />
                      <defs>
                        <linearGradient id="breathingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={
                            breathingPhase === "inhale" ? "#7CB9E8" :
                            breathingPhase === "hold" ? "#BFA2DB" : "#A8E6CF"
                          } />
                          <stop offset="100%" stopColor={
                            breathingPhase === "inhale" ? "#BFA2DB" :
                            breathingPhase === "hold" ? "#F8C8DC" : "#9BE4D8"
                          } />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Outer glow rings */}
                    {breathingActive && (
                      <>
                        <motion.div
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.4, 0, 0.4],
                          }}
                          transition={{ 
                            duration: breathingDuration * 3, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="absolute inset-0 w-full h-full rounded-full pointer-events-none"
                          style={{
                            background: breathingPhase === "inhale"
                              ? "radial-gradient(circle, rgba(124, 185, 232, 0.3) 0%, rgba(124, 185, 232, 0) 70%)"
                              : breathingPhase === "hold"
                              ? "radial-gradient(circle, rgba(191, 162, 219, 0.3) 0%, rgba(191, 162, 219, 0) 70%)"
                              : "radial-gradient(circle, rgba(168, 230, 207, 0.3) 0%, rgba(168, 230, 207, 0) 70%)",
                          }}
                        />
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ 
                            duration: breathingDuration * 3, 
                            repeat: Infinity, 
                            ease: "easeInOut", 
                            delay: breathingDuration * 0.5 
                          }}
                          className="absolute inset-0 w-full h-full rounded-full pointer-events-none"
                          style={{
                            background: breathingPhase === "inhale"
                              ? "radial-gradient(circle, rgba(124, 185, 232, 0.2) 0%, rgba(124, 185, 232, 0) 70%)"
                              : breathingPhase === "hold"
                              ? "radial-gradient(circle, rgba(191, 162, 219, 0.2) 0%, rgba(191, 162, 219, 0) 70%)"
                              : "radial-gradient(circle, rgba(168, 230, 207, 0.2) 0%, rgba(168, 230, 207, 0) 70%)",
                          }}
                        />
                      </>
                    )}

                    {/* Main Breathing Circle with Content */}
                    <motion.div
                      className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center z-10"
                      animate={{
                        scale: breathingActive ? (
                          breathingPhase === "inhale" ? [1, 1.15] :
                          breathingPhase === "hold" ? 1.15 :
                          [1.15, 1]
                        ) : 1
                      }}
                      transition={{
                        duration: breathingDuration,
                        ease: "easeInOut",
                        repeat: breathingActive ? Infinity : 0
                      }}
                      style={{
                        background: breathingActive
                          ? breathingPhase === "inhale"
                            ? "linear-gradient(135deg, #7CB9E8 0%, #BFA2DB 100%)"
                            : breathingPhase === "hold"
                            ? "linear-gradient(135deg, #BFA2DB 0%, #F8C8DC 100%)"
                            : "linear-gradient(135deg, #A8E6CF 0%, #9BE4D8 100%)"
                          : "linear-gradient(135deg, #e5e7eb 0%, #cbd5e1 100%)",
                        boxShadow: breathingActive
                          ? "0 25px 70px rgba(124, 185, 232, 0.5), inset 0 0 100px rgba(255, 255, 255, 0.3)"
                          : "0 15px 50px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={breathingPhase + String(breathingActive)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5 }}
                          className="text-center px-6"
                        >
                          {/* Breathing Icon */}
                          <motion.div
                            animate={{
                              scale: breathingActive ? [1, 1.15, 1] : 1,
                              rotate: breathingActive ? [0, 5, -5, 0] : 0
                            }}
                            transition={{
                              duration: breathingDuration,
                              repeat: breathingActive ? Infinity : 0,
                              ease: "easeInOut"
                            }}
                            className="text-5xl md:text-6xl mb-4 drop-shadow-2xl"
                          >
                            {breathingActive ? (
                              breathingPhase === "inhale" ? "💨" :
                              breathingPhase === "hold" ? "⏸️" : "🌬️"
                            ) : "🧘"}
                          </motion.div>

                          {/* Phase Text */}
                          {breathingActive ? (
                            <div className="text-white space-y-2">
                              <motion.p
                                key={breathingPhase}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-2xl md:text-3xl font-light capitalize tracking-wider drop-shadow-lg"
                              >
                                {breathingPhase === "inhale" ? "Breathe In" :
                                 breathingPhase === "hold" ? "Hold" : "Breathe Out"}
                              </motion.p>
                              <motion.p
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-sm md:text-base font-light"
                              >
                                {breathingDuration} seconds
                              </motion.p>
                            </div>
                          ) : (
                            <div className="text-gray-600 dark:text-gray-300 space-y-2">
                              <p className="text-lg md:text-xl font-light">Ready to begin?</p>
                              <p className="text-xs md:text-sm opacity-70">Find a comfortable position</p>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  {/* Main Control Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-8"
                  >
                    <Button
                      size="lg"
                      onClick={() => setBreathingActive(!breathingActive)}
                      className="px-10 py-6 text-base md:text-lg font-light rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 overflow-visible"
                      style={{
                        background: breathingActive
                          ? "linear-gradient(135deg, #F8C8DC 0%, #BFA2DB 100%)"
                          : "linear-gradient(135deg, #7CB9E8 0%, #BFA2DB 100%)",
                        boxShadow: breathingActive
                          ? "0 10px 40px rgba(248, 200, 220, 0.4)"
                          : "0 10px 40px rgba(124, 185, 232, 0.4)",
                      }}
                      aria-label={breathingActive ? "Pause breathing exercise" : "Start breathing exercise"}
                    >
                      <motion.div
                        animate={{ scale: breathingActive ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: 2, repeat: breathingActive ? 0 : Infinity }}
                        className="flex items-center gap-3"
                      >
                        {breathingActive ? (
                          <>
                            <PauseCircle className="w-6 h-6" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-6 h-6" />
                            <span>Begin</span>
                          </>
                        )}
                      </motion.div>
                    </Button>
                  </motion.div>

                  {/* Duration Settings */}
                  {!breathingActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="mt-6 flex flex-wrap items-center justify-center gap-3"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-light">Duration:</span>
                      {[3, 4, 5, 6].map((duration) => (
                        <motion.button
                          key={duration}
                          onClick={() => setBreathingDuration(duration)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-5 py-2.5 rounded-full text-sm font-light transition-all ${
                            breathingDuration === duration
                              ? "bg-blue-400 text-white shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 shadow"
                          }`}
                          aria-label={`Set breathing duration to ${duration} seconds`}
                        >
                          {duration}s
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Instructions Toggle */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-6"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowInstructions(!showInstructions)}
                      className="text-sm font-light text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      aria-expanded={showInstructions}
                      aria-controls="breathing-instructions"
                    >
                      <Wind className="w-4 h-4 mr-2" />
                      {showInstructions ? "Hide" : "Show"} Instructions
                    </Button>
                  </motion.div>
                </div>

                {/* Collapsible Instructions */}
                <AnimatePresence>
                  {showInstructions && (
                    <motion.div
                      id="breathing-instructions"
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="mt-8 overflow-hidden"
                    >
                      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-gray-700">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Inhale */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20"
                          >
                            <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <span className="text-3xl">💨</span>
                            </div>
                            <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Inhale</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                              Breathe in slowly through your nose for {breathingDuration} seconds
                            </p>
                          </motion.div>

                          {/* Hold */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20"
                          >
                            <div className="w-16 h-16 rounded-full bg-purple-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <span className="text-3xl">⏸️</span>
                            </div>
                            <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Hold</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                              Hold your breath gently for {breathingDuration} seconds
                            </p>
                          </motion.div>

                          {/* Exhale */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20"
                          >
                            <div className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <span className="text-3xl">🌬️</span>
                            </div>
                            <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Exhale</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                              Breathe out slowly through your mouth for {breathingDuration} seconds
                            </p>
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg text-center"
                        >
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                            💡 Continue for 5-10 minutes or until you feel calm and centered
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </TabsContent>

          {/* Stress Game - Immersive Redesign */}
          <TabsContent value="game" className="overflow-visible">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50/90 via-blue-50/90 to-pink-50/90 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-pink-900/40 overflow-visible">
              <div className="p-4 md:p-8 lg:p-12">
                {/* Header Section with Breathing Space */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12 space-y-4"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="inline-block mb-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 flex items-center justify-center shadow-2xl">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 dark:from-purple-300 dark:via-blue-300 dark:to-pink-300 bg-clip-text text-transparent">
                    Smash the Stress Game
                  </h2>
                  
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light italic max-w-2xl mx-auto">
                    "Release, relax, and reset your mind" 🌸
                  </p>
                  
                  <p className="text-base text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
                    A therapeutic 30-second interactive game designed to help you release emotions and find your calm
                  </p>
                </motion.div>

                {/* Divider */}
                <div className="relative mb-12">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-purple-200 to-transparent dark:via-purple-800"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-purple-50/80 dark:bg-purple-900/30">
                      ✨
                    </span>
                  </div>
                </div>

                <div className="space-y-12">
                  {/* Central Animated Stress Ball */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="flex justify-center mb-16"
                  >
                    <div className="relative">
                      {/* Pulsing Glow Ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 via-blue-400/30 to-pink-400/30 blur-2xl"
                      />
                      
                      {/* Main Stress Ball */}
                      <motion.div
                        animate={{
                          scale: [1, 1.08, 1],
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-pink-400 flex items-center justify-center shadow-2xl"
                        style={{
                          boxShadow: "0 25px 70px rgba(168, 85, 247, 0.5), inset 0 0 100px rgba(255, 255, 255, 0.3)"
                        }}
                      >
                        {/* Rotating Inner Sparkle */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-24 h-24 md:w-28 md:h-28 text-white drop-shadow-2xl" />
                        </motion.div>
                        
                        {/* Floating Emotion Bubbles */}
                        {[
                          { emoji: "😠", delay: 0, x: -60, y: -40 },
                          { emoji: "😰", delay: 0.5, x: 60, y: -40 },
                          { emoji: "😩", delay: 1, x: 70, y: 20 },
                          { emoji: "💭", delay: 1.5, x: -70, y: 20 }
                        ].map((bubble, i) => (
                          <motion.div
                            key={i}
                            animate={{ 
                              y: [0, -15, 0],
                              opacity: [0.6, 1, 0.6],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              delay: bubble.delay,
                              ease: "easeInOut"
                            }}
                            className="absolute text-3xl md:text-4xl drop-shadow-xl"
                            style={{
                              left: `calc(50% + ${bubble.x}px)`,
                              top: `calc(50% + ${bubble.y}px)`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            {bubble.emoji}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Feature Cards Grid - Glassmorphic with Hover Effects */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-5xl mx-auto">
                    {[
                      { 
                        icon: "⚡", 
                        title: "Quick Reset", 
                        desc: "Just 30 seconds",
                        gradient: "from-yellow-100 to-orange-100 dark:from-yellow-800/50 dark:to-orange-800/50",
                        delay: 0.4
                      },
                      { 
                        icon: "🎯", 
                        title: "Track Progress", 
                        desc: "See your calm score",
                        gradient: "from-blue-100 to-cyan-100 dark:from-blue-800/50 dark:to-cyan-800/50",
                        delay: 0.5
                      },
                      { 
                        icon: "🎮", 
                        title: "Fun & Safe", 
                        desc: "Playful release",
                        gradient: "from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50",
                        delay: 0.6
                      },
                      { 
                        icon: "💭", 
                        title: "Mood Check", 
                        desc: "Before & after",
                        gradient: "from-green-100 to-teal-100 dark:from-green-800/50 dark:to-teal-800/50",
                        delay: 0.7
                      }
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: card.delay, duration: 0.6 }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -8,
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                        }}
                        className={`relative p-6 md:p-7 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-md border border-white/50 dark:border-gray-600/50 shadow-xl text-center overflow-hidden group cursor-pointer`}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        <motion.p 
                          className="text-5xl mb-4"
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {card.icon}
                        </motion.p>
                                                        <p className="text-sm md:text-base font-bold mb-1.5 text-gray-900 dark:text-white">
                          {card.title}
                        </p>
                        <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-light">
                          {card.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Central CTA Button - Focal Point with Pulsing Glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex justify-center mb-16 px-4"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 30px rgba(168, 85, 247, 0.3)",
                          "0 0 60px rgba(168, 85, 247, 0.6)",
                          "0 0 30px rgba(168, 85, 247, 0.3)",
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="rounded-full"
                    >
                      <Button
                        size="lg"
                        onClick={() => {
                          console.log("Starting game, showGame:", showGame);
                          setShowGame(true);
                          console.log("Game should be showing now");
                        }}
                        className="relative px-8 md:px-12 py-6 md:py-8 text-lg md:text-2xl font-bold rounded-full border-0 shadow-2xl overflow-visible group whitespace-nowrap"
                        style={{
                          background: "linear-gradient(135deg, #A78BFA 0%, #60A5FA 50%, #F472B6 100%)",
                        }}
                      >
                        {/* Animated Gradient Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 rounded-full"
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-white drop-shadow-lg">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="flex-shrink-0"
                          >
                            <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                          </motion.div>
                          <span className="font-bold">Start Smashing Stress</span>
                          <motion.div
                            animate={{ 
                              x: [0, 5, 0],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex-shrink-0"
                          >
                            →
                          </motion.div>
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Divider */}
                  <div className="relative mb-10">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-purple-200/50 dark:border-purple-700/50"></div>
                    </div>
                  </div>

                  {/* Collapsible "How it Works" Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                  >
                    <details className="group" open>
                      <summary className="flex items-center justify-between p-6 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-2 border-purple-200 dark:border-purple-500/50 shadow-lg cursor-pointer list-none hover:shadow-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            How it Works
                          </h4>
                        </div>
                        <motion.div
                          animate={{ rotate: 0 }}
                          className="text-2xl text-purple-500 dark:text-purple-400 group-open:rotate-180 transition-transform"
                        >
                          ↓
                        </motion.div>
                      </summary>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 p-8 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-purple-100 dark:border-gray-700 shadow-lg"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            { 
                              emoji: "🫧", 
                              title: "Floating Bubbles", 
                              desc: "Emotion bubbles float up from the bottom with smooth animations",
                              color: "from-blue-500 to-cyan-500"
                            },
                            { 
                              emoji: "👆", 
                              title: "Quick Taps", 
                              desc: "Tap them quickly to pop and release your stress instantly",
                              color: "from-purple-500 to-pink-500"
                            },
                            { 
                              emoji: "📊", 
                              title: "Calm Score", 
                              desc: "Get personalized feedback based on your performance and mood",
                              color: "from-green-500 to-teal-500"
                            },
                            { 
                              emoji: "✨", 
                              title: "Track & Reflect", 
                              desc: "Save your progress and reflect on your emotional journey",
                              color: "from-yellow-500 to-orange-500"
                            }
                          ].map((step, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.2 + i * 0.1 }}
                              className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors group/item"
                            >
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                                <span className="text-2xl">{step.emoji}</span>
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white mb-1">
                                  {step.title}
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {step.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </details>
                  </motion.div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Crisis Resources */}
          <TabsContent value="crisis">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Phone className="w-6 h-6" />
                  Crisis Support
                </CardTitle>
                <CardDescription>
                  If you're in crisis or need immediate support, please reach out to these resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {crisisResources.map((resource, index) => (
                    <Card key={index} className="p-6 border-2 border-red-200 dark:border-red-800">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <h4>{resource.name}</h4>
                            <Badge variant="secondary">{resource.country}</Badge>
                          </div>
                          <p className="text-2xl mb-2 text-red-600 dark:text-red-400">
                            {resource.number}
                          </p>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-red-300 dark:border-red-700">
                  <p className="text-center">
                    <strong className="text-red-600 dark:text-red-400">
                      Remember:
                    </strong>{" "}
                    If you're experiencing a life-threatening emergency, please call your local
                    emergency services (911 in the US) immediately.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Self-Care Activities */}
          <TabsContent value="selfcare">
            <div className="grid gap-4">
              {selfCareActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{activity.icon}</div>
                      <div className="flex-grow">
                        <h4 className="mb-2">{activity.title}</h4>
                        <p className="text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="mt-8 p-6 border-0 bg-gradient-to-r from-[#7CB9E8]/10 via-[#BFA2DB]/10 to-[#F8C8DC]/10">
              <div className="text-center">
                <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="mb-2">Remember: Self-Care is Not Selfish</h4>
                <p className="text-muted-foreground">
                  Taking care of your mental health is just as important as your physical health.
                  Try one of these activities today.
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Articles */}
          <TabsContent value="articles">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                    <BookOpen className="w-8 h-8 text-primary mb-4" />
                    <h4 className="mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-muted-foreground mb-4">{article.description}</p>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-all">
                      Read More <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="mt-8 p-8 border-0 shadow-lg text-center">
              <h3 className="mb-3">Looking for More Resources?</h3>
              <p className="text-muted-foreground mb-6">
                We're constantly adding new articles, guides, and tools to support your wellness journey.
              </p>
              <Button className="gradient-sky-lavender border-0">
                Subscribe for Updates
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Smash Stress Game Modal */}
      <SmashStressGame
        isOpen={showGame}
        onClose={() => setShowGame(false)}
        onComplete={(results: GameResults) => {
          toast.success("Great job!", {
            description: `You smashed ${results.totalPops} emotions! Your calm score is ${results.calmScore}.`,
          });
          setShowGame(false);
        }}
        isHighRisk={false}
        preSessionMood={2}
      />
    </div>
  );
}
