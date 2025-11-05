import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { 
  Heart, 
  TrendingUp, 
  MessageCircle,
  Battery,
  Moon,
  AlertTriangle,
  Calendar,
  Sparkles
} from "lucide-react";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";

interface PostSessionFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: FeedbackData) => void;
  onEmergency: () => void;
}

export interface FeedbackData {
  currentMood: number;
  comparisonToPrevious: string;
  helpfulness: string;
  stressRelease: string;
  energyLevel: string;
  sleepQuality: string;
  selfHarmThoughts: string;
  wantFollowUp: string;
  timestamp: string;
}

const moodEmojis = [
  { value: 1, emoji: "😞", label: "Low" },
  { value: 2, emoji: "😐", label: "Neutral" },
  { value: 3, emoji: "🙂", label: "Good" },
  { value: 4, emoji: "😄", label: "Very good" }
];

export function PostSessionFeedbackModal({ 
  isOpen, 
  onClose, 
  onComplete,
  onEmergency
}: PostSessionFeedbackModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<FeedbackData>>({});
  const [showThankYou, setShowThankYou] = useState(false);

  const questions = [
    {
      id: "currentMood",
      question: "How are you feeling right now?",
      icon: Heart,
      type: "emoji" as const,
    },
    {
      id: "comparisonToPrevious",
      question: "Compared to your previous session, how do you feel today?",
      icon: TrendingUp,
      type: "radio" as const,
      options: ["A bit worse", "Same", "A bit better", "Much better"]
    },
    {
      id: "helpfulness",
      question: "Did today's conversation help you feel lighter or clearer?",
      icon: MessageCircle,
      type: "radio" as const,
      options: ["Yes, a lot", "Somewhat", "Not really", "Made me feel worse"]
    },
    {
      id: "stressRelease",
      question: "Do you feel like talking helped you release your stress?",
      icon: Sparkles,
      type: "radio" as const,
      options: ["Yes", "Partly", "Not at all"]
    },
    {
      id: "energyLevel",
      question: "How is your energy level right now?",
      icon: Battery,
      type: "radio" as const,
      options: ["Low", "Okay", "Good", "Very high"]
    },
    {
      id: "sleepQuality",
      question: "How has your sleep been since the last session?",
      icon: Moon,
      type: "radio" as const,
      options: ["Poor", "Average", "Good", "Excellent"]
    },
    {
      id: "selfHarmThoughts",
      question: "Have you had any moments of feeling hopeless or wanting to hurt yourself since our last call?",
      icon: AlertTriangle,
      type: "critical" as const,
      options: ["No", "Not sure", "Yes — I'd like to talk to someone now"]
    },
    {
      id: "wantFollowUp",
      question: "Would you like us to schedule another conversation soon?",
      icon: Calendar,
      type: "radio" as const,
      options: ["Yes, tomorrow", "In a few days", "No, I'm okay"]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const QuestionIcon = currentQ.icon;

  const handleAnswer = (questionId: string, answer: string | number) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Check for emergency response
    if (questionId === "selfHarmThoughts" && answer === "Yes — I'd like to talk to someone now") {
      // Save partial data
      const feedbackData: FeedbackData = {
        currentMood: newAnswers.currentMood as number || 0,
        comparisonToPrevious: newAnswers.comparisonToPrevious as string || "",
        helpfulness: newAnswers.helpfulness as string || "",
        stressRelease: newAnswers.stressRelease as string || "",
        energyLevel: newAnswers.energyLevel as string || "",
        sleepQuality: newAnswers.sleepQuality as string || "",
        selfHarmThoughts: answer as string,
        wantFollowUp: "",
        timestamp: new Date().toISOString()
      };
      
      // Store data
      const existingData = JSON.parse(localStorage.getItem("unmutte_feedback_history") || "[]");
      existingData.push(feedbackData);
      localStorage.setItem("unmutte_feedback_history", JSON.stringify(existingData));
      
      onEmergency();
      return;
    }

    // Move to next question
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    } else {
      // Complete feedback
      const feedbackData: FeedbackData = {
        currentMood: newAnswers.currentMood as number,
        comparisonToPrevious: newAnswers.comparisonToPrevious as string,
        helpfulness: newAnswers.helpfulness as string,
        stressRelease: newAnswers.stressRelease as string,
        energyLevel: newAnswers.energyLevel as string,
        sleepQuality: newAnswers.sleepQuality as string,
        selfHarmThoughts: newAnswers.selfHarmThoughts as string,
        wantFollowUp: answer as string,
        timestamp: new Date().toISOString()
      };
      
      // Store feedback history
      const existingData = JSON.parse(localStorage.getItem("unmutte_feedback_history") || "[]");
      existingData.push(feedbackData);
      localStorage.setItem("unmutte_feedback_history", JSON.stringify(existingData));
      
      setShowThankYou(true);
      setTimeout(() => {
        onComplete(feedbackData);
      }, 2000);
    }
  };

  const handleSkip = () => {
    toast.info("Feedback skipped", {
      description: "You can provide feedback anytime from your profile."
    });
    onClose();
  };

  if (showThankYou) {
    return (
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[500px]" hideClose>
          <DialogHeader className="sr-only">
            <DialogTitle>Thank You</DialogTitle>
            <DialogDescription>Feedback submitted successfully</DialogDescription>
          </DialogHeader>
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-3">
              <h2>Thank you for sharing 🌼</h2>
              <p className="text-lg text-muted-foreground">
                Every emotion you feel is valid — we're proud of you for checking in.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" hideClose>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-primary" />
            <DialogTitle>Before you go... just a quick emotional check 💛</DialogTitle>
          </div>
          <DialogDescription>
            Your feelings matter to us — this helps us support you better.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10 rounded-lg">
              <QuestionIcon className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="mb-2">{currentQ.question}</h3>
              </div>
            </div>

            {/* Emoji Options */}
            {currentQ.type === "emoji" && (
              <div className="grid grid-cols-4 gap-3">
                {moodEmojis.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleAnswer(currentQ.id, mood.value)}
                    className="flex flex-col items-center gap-3 p-6 border-2 rounded-lg hover:border-primary transition-all hover:shadow-lg active:scale-95"
                  >
                    <span className="text-4xl">{mood.emoji}</span>
                    <span className="text-sm">{mood.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Radio Options */}
            {(currentQ.type === "radio" || currentQ.type === "critical") && (
              <RadioGroup
                value={answers[currentQ.id as keyof FeedbackData] as string || ""}
                onValueChange={(value) => handleAnswer(currentQ.id, value)}
                className="space-y-3"
              >
                {currentQ.options?.map((option, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer ${
                      currentQ.type === "critical" && option.includes("Yes —") 
                        ? "hover:border-red-500 border-red-200" 
                        : ""
                    }`}
                  >
                    <RadioGroupItem value={option} id={`${currentQ.id}-${index}`} />
                    <Label 
                      htmlFor={`${currentQ.id}-${index}`} 
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          {currentQ.type === "critical" && (
            <Alert className="border-red-500/50 bg-red-50 dark:bg-red-900/10">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-sm text-red-900 dark:text-red-300">
                If you're experiencing thoughts of self-harm, please know that help is available 24/7.
                Selecting "Yes" will immediately connect you with crisis support resources.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="w-full sm:w-auto"
          >
            Skip for now
          </Button>
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
