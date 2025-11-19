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
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { 
  Shield, 
  Heart, 
  Info,
  CheckCircle2,
  Lock,
  Phone,
  MessageSquare,
  User
} from "lucide-react";
import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AgeConsentModalProps {
  onConsent: () => void;
}

export function AgeConsentModal({ onConsent }: AgeConsentModalProps) {
  const [checkedItems, setCheckedItems] = useState({
    age: false,
    understand: false,
    guidelines: false,
    notCrisis: false,
    terms: false,
  });
  const [showError, setShowError] = useState(false);

  const allChecked = Object.values(checkedItems).every(Boolean);

  const handleCheckChange = (key: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    setShowError(false);
  };

  const handleContinue = () => {
    if (allChecked) {
      localStorage.setItem("unmutte_age_consent", "true");
      onConsent();
    } else {
      setShowError(true);
    }
  };

  const consentItems = [
    {
      key: "age" as const,
      icon: User,
      text: "I am 18 years or older.",
      color: "#7CB9E8"
    },
    {
      key: "understand" as const,
      icon: Heart,
      text: "I understand Unmutte is for emotional expression, not medical or therapy advice.",
      color: "#F8C8DC"
    },
    {
      key: "guidelines" as const,
      icon: Shield,
      text: "I agree to follow the safety and privacy guidelines during my session.",
      color: "#BFA2DB"
    },
    {
      key: "notCrisis" as const,
      icon: CheckCircle2,
      text: "I confirm I am not in immediate crisis or severe distress.",
      color: "#A8E6CF"
    },
    {
      key: "terms" as const,
      icon: Lock,
      text: "I accept the Terms & Waiver.",
      color: "#7CB9E8"
    },
  ];

  return (
    <Dialog open={true}>
      <DialogContent 
        className="sm:max-w-[680px] max-h-[95vh] overflow-y-auto border-0 shadow-2xl p-0 bg-white" 
        hideClose
      >
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -30, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
            >
              {i % 2 === 0 ? (
                <Heart className="w-8 h-8 text-[#F8C8DC]" fill="currentColor" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#BFA2DB] to-[#7CB9E8] opacity-50" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-100,195,209,0.1)] rounded-t-3xl overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#C9A7EB] to-[#A88FEF]#B088F9]#D8B4FE]"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="px-2 pt-2 pb-1">
          <p className="text-xs text-center text-gray-600#BFC3D1]">Step 1 of 2 — Safety Check</p>
        </div>

        {/* Main content card */}
        <div className="bg-white rounded-3xl shadow-lg,0,0,0.4)] mx-4 mb-4 p-8 relative z-10">
          <DialogHeader className="space-y-4">
            {/* Header with icon */}
            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A7EB] to-[#A88FEF] flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-gray-900 fill-gray-900" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DialogTitle className="text-center text-3xl flex items-center justify-center gap-2 flex-wrap">
                <span className="bg-gradient-to-r from-[#7CB9E8] via-[#BFA2DB] to-[#F8C8DC]#BCA7FF]#A5B4FC]#F8C8DC] bg-clip-text text-transparent">
                  Welcome to Unmutte — Age Verification & Consent
                </span>
              </DialogTitle>
              <DialogDescription id="consent-description" className="text-center text-base pt-2 text-gray-700#E3E6F0]">
                Where Feelings Find Freedom. Let's make sure you're safe and ready before we begin.
              </DialogDescription>
            </motion.div>

            {/* Security badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-600#BFC3D1]"
            >
              <Lock className="w-4 h-4 text-[#7CB9E8]#A5B4FC]" />
              <span>Your safety and privacy are our top priorities.</span>
            </motion.div>
          </DialogHeader>

          <div className="py-8 space-y-6">
            {/* Title with tooltip */}
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-center text-gray-900">Please confirm the following before continuing:</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="text-[#7CB9E8] hover:text-[#BFA2DB] transition-colors cursor-help inline-flex items-center justify-center"
                      tabIndex={0}
                      role="button"
                      aria-label="Information about consent requirements"
                    >
                      <Info className="w-5 h-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      We ask this to make sure you're emotionally safe and that Unmutte follows ethical guidelines.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Consent checkboxes */}
            <div className="space-y-3">
              {consentItems.map((item, index) => {
                const Icon = item.icon;
                const isChecked = checkedItems[item.key];
                
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div 
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isChecked 
                          ? 'border-[#A88FEF]#B088F9] bg-gradient-to-br from-[#EAD9FF]/30 to-[#FFF0F5]/30#B088F9]/20#A5B4FC]/15 shadow-md,136,249,0.2)]' 
                          : 'border-gray-200,195,209,0.2)] hover:border-[#C9A7EB]/50#B088F9]/40 hover:bg-gradient-to-br hover:from-[#EAD9FF]/10 hover:to-[#FFF0F5]/10#B088F9]/10#A5B4FC]/5'
                      }`}
                      onClick={() => handleCheckChange(item.key)}
                    >
                      <Checkbox
                        id={item.key}
                        checked={isChecked}
                        onCheckedChange={() => handleCheckChange(item.key)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <Label
                          htmlFor={item.key}
                          className="text-sm cursor-pointer leading-relaxed pt-1 text-gray-900"
                        >
                          {item.text}
                        </Label>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Error message */}
            {showError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
              >
                <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">
                  Please confirm all items above to continue. Your safety is important to us.
                </p>
              </motion.div>
            )}

            {/* Information for minors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="p-5 bg-gradient-to-br from-[#E8F1FF] to-[#F0F9FF]#1E2535]/50#253545]/50 rounded-xl border-2 border-[#7CB9E8]/30#A5B4FC]/30 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#7CB9E8]#A5B4FC]" />
                <h4 className="text-[#7CB9E8]#A5B4FC]">If you are under 18 or need support, please contact:</h4>
              </div>
              <div className="space-y-2 ml-7">
                <div className="flex items-center gap-2 text-sm text-gray-800#E3E6F0]">
                  <Phone className="w-4 h-4 text-[#7CB9E8]#A5B4FC]" />
                  <span><strong>Childline India:</strong> <a href="tel:1098" className="text-[#7CB9E8]#A5B4FC] hover:underline">1098</a></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-800#E3E6F0]">
                  <MessageSquare className="w-4 h-4 text-[#7CB9E8]#A5B4FC]" />
                  <span><strong>Crisis Text Line:</strong> Text HOME to 741741</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-800#E3E6F0]">
                  <User className="w-4 h-4 text-[#7CB9E8]#A5B4FC]" />
                  <span>School counselor or trusted adult</span>
                </div>
              </div>
            </motion.div>
          </div>

          <DialogFooter>
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button
                onClick={handleContinue}
                disabled={!allChecked}
                className="w-full h-14 text-base rounded-full shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                style={{
                  background: allChecked 
                    ? 'linear-gradient(135deg, #C9A7EB 0%, #A88FEF 100%)' 
                    : 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)',
                }}
              >
                {allChecked && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" fill="white" />
                  Yes, I'm Ready to Begin
                </span>
              </Button>
            </motion.div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
