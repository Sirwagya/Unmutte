import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Bot, Phone, X, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuickAccessFABProps {
  onStartChat: () => void;
  onStartVoice: () => void;
  onStartGame?: () => void;
}

export function QuickAccessFAB({ onStartChat, onStartVoice, onStartGame }: QuickAccessFABProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 mb-4"
          >
            <Card className="p-4 shadow-2xl border-2 border-primary/20 bg-white dark:bg-slate-900">
              <div className="space-y-3">
                <p className="text-sm font-semibold mb-3 text-foreground">Quick Connect</p>
                
                <Button
                  onClick={() => {
                    onStartChat();
                    setIsOpen(false);
                  }}
                  className="w-full justify-start bg-gradient-to-r from-[#7CB9E8] to-[#BFA2DB] hover:opacity-90 text-white border-0"
                  size="sm"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  AI Chat
                </Button>

                <Button
                  onClick={() => {
                    onStartVoice();
                    setIsOpen(false);
                  }}
                  className="w-full justify-start bg-gradient-to-r from-[#F8C8DC] to-[#A8E6CF] hover:opacity-90 text-white border-0"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Voice Call
                </Button>

                {onStartGame && (
                  <>
                    <div className="border-t border-muted my-2"></div>
                    <Button
                      onClick={() => {
                        onStartGame();
                        setIsOpen(false);
                      }}
                      className="w-full justify-start bg-gradient-to-r from-[#BFA2DB] to-[#F8C8DC] hover:opacity-90 text-white border-0"
                      size="sm"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Stress Game
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full h-16 w-16 shadow-2xl gradient-sky-lavender border-0 hover:scale-110 transition-transform"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
