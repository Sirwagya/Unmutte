import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AIChatInterface } from "../chat/AIChatInterface";
import { VoiceCallInterface } from "../chat/VoiceCallInterface";
import { CheckoutPage } from "../CheckoutPage";
import { AgeConsentModal } from "../AgeConsentModal";
import { motion } from "motion/react";
import {
  Bot,
  Video,
  Phone,
  MessageSquare,
  Clock,
  Star,
  Shield,
  Calendar,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "../ui/sonner";

export function ConnectPage() {
  const [activeInterface, setActiveInterface] = useState<"none" | "chat" | "voice">("none");
  const [selectedListener, setSelectedListener] = useState<string>("Listener #A247");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAgeConsent, setShowAgeConsent] = useState(false);
  const [hasAgeConsent, setHasAgeConsent] = useState(false);
  const [pendingServiceType, setPendingServiceType] = useState<"chat" | "voice">("chat");
  const [servicePrice, setServicePrice] = useState(149); // Default to voice call price

  // Check age consent on mount
  useEffect(() => {
    const consent = localStorage.getItem("unmutte_age_consent");
    if (consent === "true") {
      setHasAgeConsent(true);
    }
  }, []);

  const humanListeners = [
    {
      id: 1,
      name: "Listener #A247",
      specialty: "Anxiety & Stress",
      rating: 4.9,
      sessions: 342,
      available: true,
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Listener #B891",
      specialty: "Relationships",
      rating: 5.0,
      sessions: 521,
      available: true,
      languages: ["English"],
    },
    {
      id: 3,
      name: "Listener #C156",
      specialty: "Career & Life",
      rating: 4.8,
      sessions: 287,
      available: false,
      languages: ["English", "French"],
    },
    {
      id: 4,
      name: "Listener #D493",
      specialty: "Mental Health",
      rating: 4.9,
      sessions: 456,
      available: true,
      languages: ["English", "Mandarin"],
    },
  ];

  const handleStartAI = () => {
    // Check if user has age consent
    if (!hasAgeConsent) {
      setPendingServiceType("chat");
      setShowAgeConsent(true);
      return;
    }
    
    // AI chat is free, start immediately
    setActiveInterface("chat");
  };

  const handleStartVoice = (listenerName?: string) => {
    // Check if user has age consent
    if (!hasAgeConsent) {
      if (listenerName) setSelectedListener(listenerName);
      setPendingServiceType("voice");
      setServicePrice(149);
      setShowAgeConsent(true);
      return;
    }
    
    if (listenerName) setSelectedListener(listenerName);
    setPendingServiceType("voice");
    // Set price for voice call
    setServicePrice(149);
    // Show checkout page
    setShowCheckout(true);
  };

  const handleAgeConsent = () => {
    setHasAgeConsent(true);
    setShowAgeConsent(false);
    
    // AI chat is free, start immediately without checkout
    if (pendingServiceType === "chat") {
      setActiveInterface("chat");
    } else {
      // For voice calls, proceed to checkout
      setShowCheckout(true);
    }
  };

  const handleCheckoutComplete = () => {
    setShowCheckout(false);
    setActiveInterface(pendingServiceType);
    toast.success("Session starting", {
      description: "You're all set. Connecting you now...",
    });
  };

  const handleCheckoutCancel = () => {
    setShowCheckout(false);
    setPendingServiceType("chat");
  };

  const handleConnectListener = (listenerId: number, mode: "chat" | "voice") => {
    const listener = humanListeners.find((l) => l.id === listenerId);
    if (listener) {
      setSelectedListener(listener.name);
      if (mode === "chat") {
        setActiveInterface("chat");
      } else {
        setActiveInterface("voice");
      }
    }
  };

  const handleSchedule = () => {
    toast.info("Opening scheduler...", {
      description: "This is a demo. In production, this would open a scheduling interface.",
    });
  };

  const handleCloseInterface = () => {
    setActiveInterface("none");
  };

  const getServiceName = () => {
    const names = {
      chat: "AI Chat Session",
      voice: "Voice Call with Human Listener",
      video: "Video Call with Human Listener",
    };
    return names[pendingServiceType];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E0E16]">
      <Toaster />

      {/* Age Consent Modal - Shows FIRST before payment */}
      {showAgeConsent && (
        <AgeConsentModal onConsent={handleAgeConsent} />
      )}

      {/* Checkout Page - Only shows AFTER age consent is given */}
      {!showAgeConsent && showCheckout && (
        <CheckoutPage
          serviceType={pendingServiceType}
          serviceName={getServiceName()}
          price={servicePrice}
          onComplete={handleCheckoutComplete}
          onCancel={handleCheckoutCancel}
        />
      )}

      {/* Active Interfaces */}
      {activeInterface === "chat" && (
        <AIChatInterface
          onClose={handleCloseInterface}
          onUpgradeToVoice={() => setActiveInterface("voice")}
        />
      )}

      {activeInterface === "voice" && (
        <VoiceCallInterface
          onClose={handleCloseInterface}
          listenerName={selectedListener}
        />
      )}

      {/* Hero */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Be Heard?
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Choose how you'd like to connect. Start with AI for instant support,
              or connect with a real human listener for deeper conversation.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4">
              {["100% Anonymous", "Fully Encrypted", "Judgment-Free"].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge className="bg-primary/10 text-primary border-primary/20 dark:bg-white/20 dark:text-white dark:border-white/30 backdrop-blur-sm">
                    {text}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Options */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center mb-12 text-gray-900 dark:text-white">Choose Your Connection</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AI Only */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="p-8 border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl cursor-pointer interactive-card bg-white dark:bg-[#1E1E2E] h-full">
                  <div className="text-center flex flex-col h-full">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center mx-auto mb-6"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Bot className="w-10 h-10 text-white" />
                    </motion.div>
                  <h3 className="mb-3">AI Listener</h3>
                  <div className="mb-4">
                    <p className="text-3xl text-primary mb-1">Free</p>
                    <p className="text-xs text-muted-foreground">unlimited access</p>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Instant empathetic support, available 24/7. Perfect for processing thoughts anytime.
                  </p>
                  <div className="space-y-2 mb-6 text-sm flex-grow">
                    <div className="flex items-center gap-2 justify-center text-muted-foreground">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Instant connection</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Available 24/7</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-muted-foreground">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span>Text-based chat</span>
                    </div>
                  </div>
                  <Button onClick={handleStartAI} className="w-full gradient-sky-lavender border-0">
                    Start Chatting Now
                  </Button>
                </div>
              </Card>
              </motion.div>

              {/* Human Call */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="p-8 border-2 border-primary hover:border-secondary transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden interactive-card h-full">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="absolute top-4 right-4 bg-primary text-white">Popular</Badge>
                  </motion.div>
                  <div className="text-center flex flex-col h-full">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] flex items-center justify-center mx-auto mb-6"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Phone className="w-10 h-10 text-white" />
                    </motion.div>
                  <h3 className="mb-3">Voice Call</h3>
                  <div className="mb-4">
                    <p className="text-3xl text-secondary mb-1">₹149</p>
                    <p className="text-xs text-muted-foreground">per session</p>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Talk it out with a trained human listener. Sometimes you need to hear a voice.
                  </p>
                  <div className="space-y-2 mb-6 text-sm flex-grow">
                    <div className="flex items-center gap-2 justify-center text-muted-foreground">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span>Audio only</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-muted-foreground">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span>Instant or scheduled</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-muted-foreground">
                      <Shield className="w-4 h-4 text-secondary" />
                      <span>Still anonymous</span>
                    </div>
                  </div>
                  <Button onClick={() => handleStartVoice()} className="w-full bg-secondary hover:bg-secondary/90">
                    Connect Now
                  </Button>
                </div>
              </Card>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Human Listeners */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Available Human Listeners</h2>
              <p className="text-lg text-muted-foreground">
                All listeners are trained, verified, and committed to providing empathetic support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {humanListeners.map((listener) => (
                <Card key={listener.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gradient-to-br dark:from-[#1C1C2A] dark:to-[#2A2A3A]">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarFallback className="bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] text-white text-lg">
                        {listener.name.charAt(9)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="mb-1 text-gray-900 dark:text-white">{listener.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-muted-foreground">{listener.specialty}</p>
                        </div>
                        {listener.available && (
                          <Badge className="bg-green-500 text-white">
                            Available
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{listener.rating}</span>
                        </div>
                        <div>{listener.sessions} sessions</div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {listener.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleConnectListener(listener.id, "chat")}
                          disabled={!listener.available}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleConnectListener(listener.id, "voice")}
                          disabled={!listener.available}
                          variant="outline"
                          className="flex-1"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Guidelines */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 border-0 shadow-2xl">
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="mb-4">Your Safety & Comfort</h2>
                <p className="text-lg text-muted-foreground">
                  Before you connect, here's what you should know.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="mb-4">Emotional Safety Guidelines</h4>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-muted-foreground">
                        You're in control. End the conversation anytime you need to.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-muted-foreground">
                        Share only what feels comfortable. There's no pressure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-muted-foreground">
                        All conversations are confidential and anonymous.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4">Important to Know</h4>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-muted-foreground">
                        Listeners provide support, not therapy or medical advice.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-muted-foreground">
                        In crisis? Please contact emergency services immediately.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-muted-foreground">
                        All calls use encrypted WebRTC technology for privacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10 rounded-xl">
                <p className="text-center text-muted-foreground">
                  <strong>Crisis Resources:</strong> If you're experiencing a mental health emergency,
                  please call your local emergency services or the National Suicide Prevention Lifeline at 988.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Hybrid Mode Info */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6">Try Hybrid Mode</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't decide? Start with AI to organize your thoughts, then seamlessly
              transition to a human listener when you're ready for that deeper connection.
            </p>
            <Button size="lg" onClick={handleStartAI} className="gradient-peach-mint border-0">
              Start with Hybrid Mode
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
