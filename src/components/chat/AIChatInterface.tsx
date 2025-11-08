import React, { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  Bot,
  Send,
  X,
  Minimize2,
  Volume2,
  Phone,
  Video,
  MoreVertical,
  Mic,
  MicOff,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PostSessionFeedbackModal, type FeedbackData } from "../PostSessionFeedbackModal";
import { toast } from "sonner";
import { trackEvent } from "../../lib/analytics";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  onClose: () => void;
  onUpgradeToVoice?: () => void;
}

export function AIChatInterface({ onClose, onUpgradeToVoice }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm here to listen. This is a safe, judgment-free space. What's on your mind today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking');
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    let t: number | undefined;
    if (scrollViewportRef.current) {
      t = window.setTimeout(() => {
        const viewport = scrollViewportRef.current!.querySelector('[data-slot="scroll-area-viewport"]');
        if (viewport) {
          // Smoothly jump to bottom after render
          viewport.scrollTop = viewport.scrollHeight;
        }
      }, 50);
    }
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [messages, isTyping]);

  // Track initial mount of chat interface (once)
  useEffect(() => {
    trackEvent('chat_interface_open', { initialMessageCount: messages.length });
    return () => {
      trackEvent('chat_interface_close', { finalMessageCount: messages.length });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check microphone permission on mount
  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setMicPermission(result.state as 'granted' | 'denied' | 'prompt');
        
        // Listen for permission changes
        result.onchange = () => {
          setMicPermission(result.state as 'granted' | 'denied' | 'prompt');
        };
      } else {
        // Fallback for browsers that don't support permissions API
        setMicPermission('prompt');
      }
    } catch (error) {
      console.error('Error checking microphone permission:', error);
      setMicPermission('prompt');
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Permission granted, stop the stream
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
      toast.success("Microphone access granted!", {
        description: "You can now use voice recording.",
      });
      return true;
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
      setMicPermission('denied');
      toast.error("Microphone access denied", {
        description: "Please enable microphone in your browser settings to use voice recording.",
      });
      return false;
    }
  };

  // Local fallback AI Response patterns (used if server call fails)
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Anxiety/worry patterns
    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety") || lowerMessage.includes("worried") || lowerMessage.includes("nervous")) {
      return "I hear that you're feeling anxious. That's a completely valid emotion. Would you like to talk about what's making you feel this way? Sometimes naming our worries helps us understand them better.";
    }

    // Sad/depressed patterns
    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down") || lowerMessage.includes("unhappy")) {
      return "I'm sorry you're feeling this way. Your feelings are valid, and it's brave of you to share them. You don't have to go through this alone. What's been weighing on you?";
    }

    // Stress patterns
    if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelmed") || lowerMessage.includes("too much") || lowerMessage.includes("pressure")) {
      return "It sounds like you're carrying a lot right now. Feeling overwhelmed is a sign that you're dealing with a lot, not a sign of weakness. What feels most pressing to you at the moment?";
    }

    // Relationship patterns
    if (lowerMessage.includes("relationship") || lowerMessage.includes("friend") || lowerMessage.includes("partner") || lowerMessage.includes("family")) {
      return "Relationships can be really complex and emotionally challenging. It takes courage to work through these feelings. Would you like to share more about what's happening?";
    }

    // Work/career patterns
    if (lowerMessage.includes("work") || lowerMessage.includes("job") || lowerMessage.includes("career") || lowerMessage.includes("boss")) {
      return "Work challenges can really affect our wellbeing. It's important to acknowledge how this is impacting you. What aspect of this situation feels most difficult right now?";
    }

    // Loneliness patterns
    if (lowerMessage.includes("lonely") || lowerMessage.includes("alone") || lowerMessage.includes("isolated")) {
      return "Feeling lonely can be really painful. I want you to know that reaching out here shows strength. You're taking a step to connect, and that matters. What would feeling less alone look like for you?";
    }

    // Gratitude/positive patterns
    if (lowerMessage.includes("thank") || lowerMessage.includes("better") || lowerMessage.includes("helpful") || lowerMessage.includes("appreciate")) {
      return "I'm glad I could help, even if just a little. Remember, you're doing the important work here by being open and honest. How are you feeling right now?";
    }

    // Question patterns
    if (lowerMessage.includes("what should i") || lowerMessage.includes("what do i")) {
      return "I wish I could tell you exactly what to do, but the truth is you know yourself best. What I can do is help you explore your options and feelings. What feels right to you in your gut?";
    }

    // Default empathetic responses
    const defaultResponses = [
      "Thank you for sharing that with me. It takes courage to be this open. Tell me more about how this makes you feel.",
      "I'm listening, and I hear you. Your feelings are completely valid. What's been the hardest part of this for you?",
      "That sounds really difficult. You're not alone in feeling this way. What support do you feel you need right now?",
      "I appreciate you trusting me with this. How long have you been carrying these feelings?",
      "Your experience matters, and so do your feelings. What would help you feel a bit better right now?",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  async function fetchGeminiResponse(prompt: string, history: Message[]): Promise<any> {
    // Map history to minimal format for the function
    const mapped = history.map((m) => ({ role: m.sender === 'ai' ? 'model' : 'user', text: m.text }));

    // Timeout guard so hung requests don't block future sends
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ prompt, history: mapped }),
    }).finally(() => clearTimeout(timeout));
    if (!res.ok) {
      const detailText = await res.text().catch(() => '');
      let detailJson: any = undefined;
      try { detailJson = JSON.parse(detailText); } catch {}
      const apiError = detailJson?.error;
      const detail = apiError?.message || detailJson?.detail || detailText || 'Unknown error';
      const err = new Error(`Gemini API error: ${res.status} ${detail}`);
      // Attach hints for the UI layer
      // @ts-expect-error augment
      err.__status = apiError?.code || res.status;
      // @ts-expect-error augment
      err.__detail = detail;
      // @ts-expect-error augment
      err.__statusText = apiError?.status;
      throw err;
    }
    const data = await res.json();
    return data;
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping || isRecording) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    // Optimistically append the user message
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Track send event
      trackEvent('chat_send', { textLength: userMessage.text.length, historyLength: messages.length });

      // Use up-to-date history including the user's new message
      const recentHistory = [...messages, userMessage].slice(-10);
      const result = await fetchGeminiResponse(userMessage.text, recentHistory);
      // result may include { text, provider, model, raw }
      const replyText = result?.text ?? result?.raw?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText || getAIResponse(userMessage.text),
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, aiResponse]);

      // Track receive event with provider/model when available
      trackEvent('chat_receive', { provider: result?.provider, model: result?.model });
    } catch (err: any) {
      console.error('Gemini request failed:', err?.message || err);
      const status = err?.__status as number | undefined;
      const detail = String(err?.__detail || '');
      trackEvent('chat_error', { status, detail });
      if (detail.includes('GEMINI_API_KEY')) {
        toast.error('AI response failed', { description: 'Server is missing GEMINI_API_KEY. Set it in Netlify env and redeploy.' });
      } else if (/invalid api key|api key not valid|invalid key/i.test(detail)) {
        toast.error('Invalid API key', { description: 'Check .env and Netlify env. Remove quotes and restart dev.' });
      } else if (status === 404 || status === 400) {
        toast.error('AI model not available', { description: 'Falling back to local reply. You can set GEMINI_MODEL to a supported model.' });
      } else if (status === 403) {
        toast.error('AI access denied', { description: 'Check billing/region access for your key, or try GEMINI_MODEL=gemini-1.5-flash.' });
      } else if (status === 404 && location.hostname === 'localhost') {
        toast.error('Function not found', { description: 'Run via Netlify Dev: netlify dev (to enable /api/chat locally).' });
      } else {
        toast.error('AI response failed', { description: 'Using a local fallback reply.' });
      }
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: getAIResponse(userMessage.text),
        timestamp: new Date(),
      };
  setMessages((prev: Message[]) => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    // Check permission first
    if (micPermission === 'denied') {
      toast.error("Microphone blocked", {
        description: "Please enable microphone access in your browser settings.",
      });
      return;
    }

    // Request permission if not granted
    if (micPermission !== 'granted') {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
    }

    // Check if Web Speech API is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition not supported", {
        description: "Your browser doesn't support voice transcription. Please use Chrome or Edge.",
      });
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let finalTranscript = '';
      let interimTranscript = '';

      recognition.onstart = () => {
        setIsRecording(true);
        setIsTranscribing(true);
        toast.success("Recording started", {
          description: "Speak now. I'm listening...",
        });
      };

      recognition.onresult = (event: any) => {
        interimTranscript = '';
        finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        // Update input value with transcription (show interim results)
        const fullText = (finalTranscript + interimTranscript).trim();
        if (fullText) {
          setInputValue(fullText);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsTranscribing(false);
        
        let errorMessage = "Voice recognition failed";
        let description = "Please try again.";
        
        if (event.error === 'no-speech') {
          errorMessage = "No speech detected";
          description = "Please speak louder or check your microphone.";
        } else if (event.error === 'network') {
          errorMessage = "Network error";
          description = "Please check your internet connection.";
        } else if (event.error === 'not-allowed') {
          errorMessage = "Microphone blocked";
          description = "Please enable microphone access in your browser settings.";
          setMicPermission('denied');
        }
        
        toast.error(errorMessage, { description });
      };

      recognition.onend = () => {
        setIsRecording(false);
        setIsTranscribing(false);
        
        if (inputValue.trim()) {
          toast.success("Voice recorded!", {
            description: "Your voice has been transcribed. Edit if needed, then send.",
          });
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setMicPermission('denied');
      toast.error("Microphone access failed", {
        description: "Unable to access your microphone. Please check your browser settings.",
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className="gradient-sky-lavender border-0 shadow-2xl rounded-full h-16 px-6"
        >
          <Bot className="w-6 h-6 mr-2" />
          AI Chat ({messages.length})
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!showFeedback && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={(e) => {
                e.stopPropagation();
                setShowFeedback(true);
              }}
            />
            
            {/* Chat Window */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:bottom-4 md:right-4 md:w-[450px] md:h-[700px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
        <Card className="h-full flex flex-col shadow-2xl border-2 border-primary/20 p-0 overflow-hidden">
        {/* Header */}
        <div className="gradient-sky-lavender p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white">AI Listener</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft"></div>
                <p className="text-xs text-white/90">Active & listening</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <Minimize2 className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowFeedback(true)}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Upgrade options */}
        <div className="p-3 bg-gradient-soft border-b flex items-center gap-2">
          <p className="text-sm text-muted-foreground flex-grow">
            Need voice support?
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={onUpgradeToVoice}
            className="text-xs"
          >
            <Phone className="w-3 h-3 mr-1" />
            Voice Call
          </Button>
        </div>

        {/* Messages */}
  <ScrollArea className="flex-grow min-h-0 p-4" ref={scrollViewportRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback
                      className={
                        message.sender === "ai"
                          ? "bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] text-white"
                          : "bg-muted"
                      }
                    >
                      {message.sender === "ai" ? <Bot className="w-4 h-4" /> : "You"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-3"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-soft"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-soft"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse-soft"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          {isTranscribing && (
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span>Listening and transcribing...</span>
            </div>
          )}
          <div className="flex gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="resize-none min-h-[60px] max-h-[120px]"
              disabled={isTyping || isRecording}
            />
            <div className="flex flex-col gap-2 shrink-0">
              <div className="relative">
                <Button
                  onClick={toggleRecording}
                  disabled={isTyping || micPermission === 'checking'}
                  className={isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse-soft" : "gradient-sky-lavender"}
                  size="icon"
                  variant={isRecording ? "destructive" : "default"}
                  title={
                    micPermission === 'granted' 
                      ? 'Click to record voice message' 
                      : micPermission === 'denied'
                      ? 'Microphone access blocked'
                      : 'Click to enable microphone'
                  }
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                {micPermission === 'denied' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" title="Microphone blocked" />
                )}
                {micPermission === 'granted' && !isRecording && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="Microphone ready" />
                )}
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || isRecording}
                className="gradient-sky-lavender border-0"
                size="icon"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isRecording ? (
              <span className="text-red-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-soft"></span>
                Recording... Click mic to stop
              </span>
            ) : micPermission === 'denied' ? (
              <span className="text-red-500">Microphone blocked. Enable in browser settings to use voice.</span>
            ) : micPermission === 'checking' ? (
              <span>Checking microphone access...</span>
            ) : (
              <>
                Press Enter to send • Shift + Enter for new line
                {micPermission === 'granted' ? (
                  <span className="text-green-600"> • 🎤 Voice ready</span>
                ) : (
                  <span> • Click mic to enable voice</span>
                )}
              </>
            )}
          </p>
        </div>
      </Card>
      </motion.div>
          </>
        )}
      </AnimatePresence>

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
          // In production, this would trigger actual emergency protocol
          window.location.href = "/#/connect";
        }}
      />
    </>
  );
}
