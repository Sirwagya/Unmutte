import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { 
  CreditCard, 
  Shield, 
  CheckCircle2, 
  Lock,
  ArrowLeft,
  Smartphone
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface CheckoutPageProps {
  serviceType: "chat" | "voice" | "video";
  serviceName: string;
  price: number;
  onComplete: () => void;
  onCancel: () => void;
}

const serviceDetails = {
  chat: {
    title: "AI Chat Session",
    description: "Instant empathetic support via text chat",
    features: ["24/7 availability", "Instant connection", "Private & secure"],
  },
  voice: {
    title: "Voice Call Session",
    description: "Real human listener via voice call",
    features: ["Human connection", "Audio only", "Anonymous"],
  },
  video: {
    title: "Video Call Session",
    description: "Face-to-face support via video call",
    features: ["Visual connection", "Optional camera", "Most personal"],
  },
};

export function CheckoutPage({ 
  serviceType, 
  serviceName, 
  price, 
  onComplete, 
  onCancel 
}: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");

  const details = serviceDetails[serviceType];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment info
    if (paymentMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        toast.error("Please fill in all card details");
        return;
      }
      if (cardNumber.length !== 19) {
        toast.error("Please enter a valid card number");
        return;
      }
    } else {
      if (!upiId) {
        toast.error("Please enter your UPI ID");
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful!", {
        description: `Your ${details.title.toLowerCase()} is ready to begin.`,
      });
      
      // Store payment info in localStorage for demo
      const paymentRecord = {
        serviceType,
        serviceName,
        amount: price,
        date: new Date().toISOString(),
        paymentMethod,
      };
      
      const existingPayments = JSON.parse(localStorage.getItem("unmutte_payments") || "[]");
      localStorage.setItem("unmutte_payments", JSON.stringify([...existingPayments, paymentRecord]));
      
      // Complete checkout and start session
      onComplete();
    }, 2500);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    setCardNumber(formatted);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      setExpiryDate(cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4));
    } else {
      setExpiryDate(cleaned);
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={onCancel}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="mb-2">Secure Checkout</h1>
            <p className="text-muted-foreground">
              Complete your payment to start your session
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Service</span>
                    </div>
                    <h4 className="mb-1">{details.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {details.description}
                    </p>
                    
                    <div className="space-y-2">
                      {details.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Price</span>
                      <span>₹{price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Total</span>
                      <span className="text-2xl text-primary">₹{price}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm">Secure Payment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handlePayment}>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>
                      Choose your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Payment Method Selection */}
                    <div>
                      <Label className="mb-3 block">Payment Method</Label>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value as "card" | "upi")}
                        className="grid grid-cols-2 gap-4"
                      >
                        <Label
                          htmlFor="card"
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            paymentMethod === "card"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value="card" id="card" />
                          <CreditCard className="w-5 h-5" />
                          <span>Credit/Debit Card</span>
                        </Label>

                        <Label
                          htmlFor="upi"
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            paymentMethod === "upi"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value="upi" id="upi" />
                          <Smartphone className="w-5 h-5" />
                          <span>UPI</span>
                        </Label>
                      </RadioGroup>
                    </div>

                    {/* Card Payment Form */}
                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => formatCardNumber(e.target.value)}
                            maxLength={19}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => formatExpiryDate(e.target.value)}
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              type="password"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* UPI Payment Form */}
                    {paymentMethod === "upi" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="username@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            required
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            Enter your UPI ID (e.g., yourname@paytm, yourname@gpay)
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Security Notice */}
                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="mb-1">Your payment is protected</p>
                        <p className="text-xs text-muted-foreground">
                          All transactions are encrypted with 256-bit SSL security. This is a demo
                          environment - no real charges will be made.
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-sky-lavender border-0"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Pay ₹{price} & Start Session
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By completing this purchase, you agree to Unmutte's{" "}
                      <span className="text-primary cursor-pointer hover:underline">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary cursor-pointer hover:underline">
                        Privacy Policy
                      </span>
                    </p>
                  </CardContent>
                </Card>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
