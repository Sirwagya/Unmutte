import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Heart, Wind, Phone, BookOpen, ExternalLink, PlayCircle, PauseCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SmashStressGame, type GameResults } from "../SmashStressGame";
import { toast } from "sonner@2.0.3";

export function ResourcesPage() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [showGame, setShowGame] = useState(false);
  
  // Check if user is high-risk from screening
  const isHighRisk = localStorage.getItem("unmutte_high_risk") === "true";

  useEffect(() => {
    if (!breathingActive) return;

    const phases = [
      { name: "inhale" as const, duration: 4000, text: "Breathe In" },
      { name: "hold" as const, duration: 4000, text: "Hold" },
      { name: "exhale" as const, duration: 4000, text: "Breathe Out" },
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
  }, [breathingActive, breathingPhase]);

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

        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="game">Stress Game</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Help</TabsTrigger>
            <TabsTrigger value="selfcare">Self-Care</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          {/* Breathing Exercise */}
          <TabsContent value="breathing">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-6 h-6 text-primary" />
                  Guided Breathing Exercise
                </CardTitle>
                <CardDescription>
                  4-4-4 breathing technique to calm your mind and reduce stress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={breathingPhase}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-64 h-64 rounded-full flex items-center justify-center relative"
                      style={{
                        background: breathingActive
                          ? breathingPhase === "inhale"
                            ? "linear-gradient(135deg, #7CB9E8 0%, #BFA2DB 100%)"
                            : breathingPhase === "hold"
                            ? "linear-gradient(135deg, #BFA2DB 0%, #F8C8DC 100%)"
                            : "linear-gradient(135deg, #F8C8DC 0%, #A8E6CF 100%)"
                          : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: breathingActive && breathingPhase === "inhale" ? [1, 1.2] : 1,
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-center"
                      >
                        <div className="text-6xl mb-4">🌬️</div>
                        {breathingActive && (
                          <div className="text-white">
                            <p className="text-2xl mb-2 capitalize">{breathingPhase}</p>
                            <p className="text-sm opacity-90">
                              {breathingPhase === "inhale" && "Breathe in slowly..."}
                              {breathingPhase === "hold" && "Hold your breath..."}
                              {breathingPhase === "exhale" && "Breathe out slowly..."}
                            </p>
                          </div>
                        )}
                        {!breathingActive && (
                          <p className="text-muted-foreground">Click Start to begin</p>
                        )}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {breathingActive && (
                    <div className="w-full max-w-md mt-8">
                      <Progress value={breathingProgress} className="h-2" />
                    </div>
                  )}

                  <Button
                    size="lg"
                    onClick={() => setBreathingActive(!breathingActive)}
                    className="mt-8 gradient-sky-lavender border-0"
                  >
                    {breathingActive ? (
                      <>
                        <PauseCircle className="w-5 h-5 mr-2" />
                        Stop Exercise
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5 mr-2" />
                        Start Exercise
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h4 className="mb-3">How it works:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Breathe in slowly for 4 seconds</li>
                    <li>• Hold your breath for 4 seconds</li>
                    <li>• Breathe out slowly for 4 seconds</li>
                    <li>• Repeat for 5-10 minutes or until you feel calm</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stress Game */}
          <TabsContent value="game">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Smash the Stress Game
                </CardTitle>
                <CardDescription>
                  A 30-second interactive game to help you release emotions and reset your mind
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center py-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center mb-6"
                  >
                    <Sparkles className="w-16 h-16 text-white" />
                  </motion.div>
                  
                  <h3 className="mb-3 text-center">Release your stress in a fun way</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Tap floating emotion bubbles to pop them! This playful exercise helps you physically 
                    release stress while tracking your emotional progress.
                  </p>

                  <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-3xl mb-2">⚡</p>
                      <p className="text-sm">Quick Reset</p>
                      <p className="text-xs text-muted-foreground">Just 30 seconds</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-3xl mb-2">🎯</p>
                      <p className="text-sm">Track Progress</p>
                      <p className="text-xs text-muted-foreground">See your calm score</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-3xl mb-2">🎮</p>
                      <p className="text-sm">Fun & Safe</p>
                      <p className="text-xs text-muted-foreground">Playful release</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-3xl mb-2">💭</p>
                      <p className="text-sm">Mood Check</p>
                      <p className="text-xs text-muted-foreground">Before & after</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={() => setShowGame(true)}
                    className="gradient-sky-lavender border-0"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Game
                  </Button>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h4 className="mb-3">How it works:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Emotion bubbles float up from the bottom of your screen</li>
                    <li>• Tap them to "pop" and release that emotion (Anger, Worry, Stress, etc.)</li>
                    <li>• Game lasts 30 seconds with real-time encouragement</li>
                    <li>• Get your results with calm score and mood improvement metrics</li>
                    <li>• Optionally reflect on how you feel after playing</li>
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <p className="text-sm text-center">
                    <strong>Note:</strong> This is a quick mood-reset tool, not a replacement for professional support. 
                    Use it anytime you need a brief emotional release.
                  </p>
                </div>
              </CardContent>
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
        isHighRisk={isHighRisk}
        preSessionMood={2}
      />
    </div>
  );
}
