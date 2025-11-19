import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Heart, MessageSquare, BookOpen, Activity, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen welcome before
    const hasSeenWelcome = localStorage.getItem("unmutte_welcome_shown");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("unmutte_welcome_shown", "true");
    setIsOpen(false);
    onClose();
  };

  const steps = [
    {
      icon: Heart,
      title: "Welcome to Unmutte",
      description: "A safe, judgment-free space where feelings find freedom. Let us show you around.",
      color: "from-[#7CB9E8] to-[#BFA2DB]",
    },
    {
      icon: MessageSquare,
      title: "Talk Anytime",
      description: "Start a conversation with our AI listener, or connect with real human listeners through voice or video calls.",
      color: "from-[#BFA2DB] to-[#F8C8DC]",
    },
    {
      icon: BookOpen,
      title: "Journal Your Feelings",
      description: "Write freely in your private mood journal. Track your thoughts and emotions over time.",
      color: "from-[#F8C8DC] to-[#A8E6CF]",
    },
    {
      icon: Activity,
      title: "Track Your Mood",
      description: "Log your daily mood and see patterns emerge. Understand your emotional wellbeing with beautiful visualizations.",
      color: "from-[#A8E6CF] to-[#7CB9E8]",
    },
    {
      icon: Sparkles,
      title: "You're Ready!",
      description: "Your data stays private on your device. You can export it anytime. Let's begin your journey to emotional freedom.",
      color: "from-[#7CB9E8] to-[#BFA2DB]",
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleClose();
      }
    }}>
      <DialogContent className="max-w-md">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentStep.color} flex items-center justify-center mx-auto mb-4`}>
              <Icon className="w-10 h-10 text-gray-900 fill-gray-900" />
            </div>
            <DialogTitle className="text-center text-2xl">{currentStep.title}</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {currentStep.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8">
            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === step
                      ? "w-8 bg-primary"
                      : index < step
                      ? "w-2 bg-primary/50"
                      : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 gradient-sky-lavender border-0"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleClose}
                  className="flex-1 gradient-sky-lavender border-0"
                >
                  Get Started
                </Button>
              )}
            </div>

            {step === 0 && (
              <Button
                variant="ghost"
                onClick={handleClose}
                className="w-full mt-2 text-muted-foreground"
              >
                Skip Tutorial
              </Button>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
