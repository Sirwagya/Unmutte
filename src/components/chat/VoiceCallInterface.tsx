import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MoreVertical,
} from "lucide-react";
import { motion } from "motion/react";
import { PostSessionFeedbackModal, type FeedbackData } from "../PostSessionFeedbackModal";
import { toast } from "sonner@2.0.3";

interface VoiceCallInterfaceProps {
  onClose: () => void;
  listenerName?: string;
}

export function VoiceCallInterface({
  onClose,
  listenerName = "Listener #A247",
}: VoiceCallInterfaceProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [volume, setVolume] = useState([80]);
  const [callStatus, setCallStatus] = useState<"connecting" | "connected">("connecting");
  const [showFeedback, setShowFeedback] = useState(false);

  // Simulate call connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus("connected");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Call duration timer
  useEffect(() => {
    if (callStatus !== "connected") return;

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    setShowFeedback(true);
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md p-8 shadow-2xl bg-white dark:bg-black border-2">
        {/* Status */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 dark:bg-white/20 dark:text-white dark:border-white/30">
            {callStatus === "connecting" ? "Connecting..." : "Voice Call"}
          </Badge>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              scale: callStatus === "connecting" ? [1, 1.05, 1] : 1,
            }}
            transition={{
              repeat: callStatus === "connecting" ? Infinity : 0,
              duration: 1.5,
            }}
            className="relative"
          >
            <Avatar className="w-32 h-32 border-4 border-gray-200 dark:border-white/30">
              <AvatarFallback className="bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] text-white text-3xl">
                {listenerName.charAt(9)}
              </AvatarFallback>
            </Avatar>
            {callStatus === "connected" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
              >
                <Phone className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Info */}
        <div className="text-center mb-8">
          <h2 className="mb-2 text-gray-900 dark:text-white">{listenerName}</h2>
          <p className="text-gray-600 dark:text-white/80">Anxiety & Stress Specialist</p>
          {callStatus === "connected" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl mt-4 text-gray-700 dark:text-white/90"
            >
              {formatDuration(callDuration)}
            </motion.p>
          )}
        </div>

        {/* Volume Control */}
        {callStatus === "connected" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-gray-100 dark:bg-white/10 backdrop-blur rounded-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <Volume2 className="w-5 h-5 text-gray-700 dark:text-white" />
              <span className="text-sm text-gray-600 dark:text-white/90">Volume</span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            size="icon"
            variant={isMuted ? "destructive" : "secondary"}
            onClick={() => setIsMuted(!isMuted)}
            className="w-16 h-16 rounded-full"
            disabled={callStatus === "connecting"}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            size="icon"
            variant={!isSpeakerOn ? "secondary" : "default"}
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className="w-16 h-16 rounded-full"
            disabled={callStatus === "connecting"}
          >
            {isSpeakerOn ? (
              <Volume2 className="w-6 h-6" />
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* End Call */}
        <Button
          onClick={handleEndCall}
          variant="destructive"
          size="lg"
          className="w-full rounded-full bg-red-500 hover:bg-red-600"
        >
          <PhoneOff className="w-5 h-5 mr-2" />
          End Call
        </Button>

        {/* Info text */}
        <p className="text-center text-sm text-gray-500 dark:text-white/70 mt-6">
          This is a simulated call. In production, this would use WebRTC for real-time audio.
        </p>
      </Card>

      {/* Post-Session Feedback Modal */}
      <PostSessionFeedbackModal
        isOpen={showFeedback}
        onClose={() => {
          setShowFeedback(false);
          onClose();
        }}
        onComplete={(data: FeedbackData) => {
          setShowFeedback(false);
          toast.success("Thank you for your feedback!", {
            description: "Your emotional check-in has been recorded. Try the Smash Stress game in Resources to reset.",
          });
          onClose();
        }}
        onEmergency={() => {
          setShowFeedback(false);
          toast.error("Emergency Support Triggered", {
            description: "Connecting you to crisis resources immediately.",
          });
          window.location.href = "/#/connect";
        }}
      />
    </motion.div>
  );
}
