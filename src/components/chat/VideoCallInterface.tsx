import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MoreVertical,
  Maximize2,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { PostSessionFeedbackModal, type FeedbackData } from "../PostSessionFeedbackModal";
import { toast } from "sonner@2.0.3";

interface VideoCallInterfaceProps {
  onClose: () => void;
  listenerName?: string;
}

export function VideoCallInterface({
  onClose,
  listenerName = "Listener #A247",
}: VideoCallInterfaceProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-slate-900 ${
        isFullscreen ? "" : "p-4 md:p-8"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Badge className="bg-red-500 text-white animate-pulse-soft">
                {callStatus === "connecting" ? "Connecting..." : "Live"}
              </Badge>
              {callStatus === "connected" && (
                <span className="text-sm">{formatDuration(callDuration)}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <Maximize2 className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20 rounded-full"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Video Area */}
        <div className="flex-grow relative flex items-center justify-center">
          {/* Listener Video (main) */}
          <div className="w-full h-full relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
            {callStatus === "connecting" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Avatar className="w-32 h-32 border-4 border-white/20 mb-4">
                    <AvatarFallback className="bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] text-white text-4xl">
                      {listenerName.charAt(9)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <h3 className="text-white mb-2">{listenerName}</h3>
                <p className="text-white/70">Connecting...</p>
              </div>
            ) : (
              <>
                {/* Simulated video feed with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7CB9E8]/20 via-[#BFA2DB]/20 to-[#F8C8DC]/20"></div>
                
                {/* Listener avatar (simulating video) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <Avatar className="w-48 h-48 border-4 border-white/20 mb-4 mx-auto">
                      <AvatarFallback className="bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] text-white text-6xl">
                        {listenerName.charAt(9)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="bg-green-500 text-white">
                      <Mic className="w-3 h-3 mr-1" />
                      Speaking
                    </Badge>
                  </motion.div>
                </div>

                {/* Name tag */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-lg">
                    <p className="text-white">{listenerName}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Your Video (PiP) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-20 right-4 w-48 h-36 bg-slate-800 rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl"
          >
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-2">
                    <AvatarFallback className="bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] text-white">
                      You
                    </AvatarFallback>
                  </Avatar>
                  <Badge variant="secondary" className="text-xs">
                    {isMuted ? <MicOff className="w-2 h-2" /> : <Mic className="w-2 h-2" />}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <VideoOff className="w-8 h-8 text-white/50 mb-2 mx-auto" />
                  <p className="text-xs text-white/70">Camera Off</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center gap-4">
            {/* Mute */}
            <Button
              size="icon"
              variant={isMuted ? "destructive" : "secondary"}
              onClick={() => setIsMuted(!isMuted)}
              className="w-14 h-14 rounded-full shadow-lg"
              disabled={callStatus === "connecting"}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            {/* End Call */}
            <Button
              onClick={handleEndCall}
              variant="destructive"
              size="lg"
              className="rounded-full h-14 px-8 bg-red-500 hover:bg-red-600 shadow-lg"
            >
              <PhoneOff className="w-6 h-6 mr-2" />
              End Call
            </Button>

            {/* Video Toggle */}
            <Button
              size="icon"
              variant={!isVideoOn ? "destructive" : "secondary"}
              onClick={() => setIsVideoOn(!isVideoOn)}
              className="w-14 h-14 rounded-full shadow-lg"
              disabled={callStatus === "connecting"}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>

            {/* Share Screen */}
            <Button
              size="icon"
              variant="secondary"
              className="w-14 h-14 rounded-full shadow-lg hidden md:flex"
              disabled={callStatus === "connecting"}
            >
              <Monitor className="w-6 h-6" />
            </Button>

            {/* More Options */}
            <Button
              size="icon"
              variant="secondary"
              className="w-14 h-14 rounded-full shadow-lg"
              disabled={callStatus === "connecting"}
            >
              <MoreVertical className="w-6 h-6" />
            </Button>
          </div>

          {/* Info */}
          <p className="text-center text-sm text-white/60 mt-4">
            Simulated video call • Production version would use WebRTC
          </p>
        </div>
      </div>

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
