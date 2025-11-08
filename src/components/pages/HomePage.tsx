import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
import {
  MessageCircle,
  Users,
  Shield,
  Heart,
  Sparkles,
  Video,
  Phone,
  Lock,
  Star,
  BookOpen,
  Activity,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onStartTalking?: () => void;
}

export function HomePage({ onNavigate, onStartTalking }: HomePageProps) {
  const testimonials = [
    {
      quote: "I finally felt heard. Unmutte gave me the courage to open up.",
      author: "Anonymous User",
      rating: 5,
    },
    {
      quote: "The AI listener is surprisingly empathetic. It helped me process my feelings.",
      author: "Anonymous User",
      rating: 5,
    },
    {
      quote: "Talking to a real human listener changed my perspective. Thank you.",
      author: "Anonymous User",
      rating: 5,
    },
  ];

  const handleStartTalking = () => {
    if (onStartTalking) {
      onStartTalking();
    } else {
      onNavigate("connect");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-transparent">
      {/* Hero Section - Full Width Centered */}
      <section className="bg-white dark:bg-[#0E0E16] py-20 md:py-32 relative overflow-hidden">
        {/* Simplified Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "15%", left: "10%" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-[#F8C8DC]/10 to-[#A8E6CF]/10 blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "15%", right: "10%" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                Where Feelings Find Freedom
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                A safe, judgment-free space to share your thoughts and feelings openly.
                Connect with AI or real listeners, anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleStartTalking}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all rounded-full"
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Start Talking Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("about")}
                  className="text-lg px-8 py-6 border-2 rounded-full text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Unmutte Helps You Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                How Unmutte Helps You
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A unique blend of AI technology and human compassion, providing support that fits your needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Listener Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-6 mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">AI Listener</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Instant, confidential, and available 24/7. Perfect for when you need to talk right away.
                  </p>
                  <Button
                    onClick={handleStartTalking}
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
                  >
                    Try AI Chat
                  </Button>
                </Card>
              </motion.div>

              {/* Hybrid Support Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full flex flex-col border-2 border-purple-500 relative">
                  <Badge className="absolute top-4 right-4 bg-purple-500 text-white">Popular</Badge>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center mb-6 mx-auto">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-8 h-8 text-white" />
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Hybrid Support</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    The best of both worlds. Start with our AI and seamlessly transition to a human listener if you need to.
                  </p>
                  <Button
                    onClick={() => onNavigate("connect")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full rounded-full"
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>

              {/* Human Listener Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center mb-6 mx-auto">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Human Listener</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Connect with a real, empathetic person for genuine understanding and deep connection.
                  </p>
                  <Button
                    onClick={() => onNavigate("connect")}
                    variant="outline"
                    className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full"
                  >
                    Connect Now
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Unmutte Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Unmutte?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We combine the best of technology and human compassion to create a truly supportive and secure environment for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "100% Anonymous", desc: "Share freely without fear of judgment. Your identity is completely protected." },
              { icon: MessageCircle, title: "AI-Powered Empathy", desc: "Our advanced AI provides instant, thoughtful responses 24/7." },
              { icon: Users, title: "Real Human Listeners", desc: "Connect with trained, empathetic listeners who genuinely care." },
              { icon: Video, title: "Voice & Video Calls", desc: "Connect through voice or video for deeper, more meaningful conversations." },
              { icon: Lock, title: "Encrypted & Secure", desc: "All conversations are end-to-end encrypted. Your privacy is our priority." },
              { icon: Heart, title: "Judgment-Free Zone", desc: "Express yourself authentically in a space built on compassion.", fill: true },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl h-full text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 mx-auto">
                      <Icon className={`w-8 h-8 text-white ${feature.fill ? 'fill-white' : ''}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wellness Tools Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Track Your Emotional Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Use our mood tracking and journaling tools to understand your emotions better and gain valuable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full flex flex-col">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Mood Journal</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  Write freely about your feelings and experiences. Track your emotional journey with our private, secure journal.
                </p>
                <Button
                  onClick={() => onNavigate("journal")}
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-full"
                >
                  Start Journaling
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full flex flex-col">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center mb-6">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Mood Tracker</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  Log your daily mood and visualize patterns over time. Discover insights about your emotional wellbeing.
                </p>
                <Button
                  onClick={() => onNavigate("tracker")}
                  variant="outline"
                  className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full"
                >
                  Track Your Mood
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">People Are Finding Their Voice</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands who have found comfort and connection through Unmutte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl h-full flex flex-col">
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic flex-grow">"{testimonial.quote}"</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">— {testimonial.author}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border border-purple-100 dark:border-0 shadow-lg bg-white dark:bg-gradient-to-br dark:from-[#1E1E2E] dark:to-[#2A2A3A]">
              <h3 className="text-center mb-6 text-gray-900 dark:text-[#FFFFFF]">Quick Tips for Getting Started</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">💬</div>
                  <h4 className="mb-2 text-gray-900 dark:text-[#FFFFFF]">Start Simple</h4>
                  <p className="text-sm text-gray-600 dark:text-[#BFC3D1]">
                    Begin with AI chat to organize your thoughts before connecting with a human listener
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📓</div>
                  <h4 className="mb-2 text-gray-900 dark:text-[#FFFFFF]">Journal Daily</h4>
                  <p className="text-sm text-gray-600 dark:text-[#BFC3D1]">
                    Write a few sentences each day to track your emotional journey over time
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="mb-2 text-gray-900 dark:text-[#FFFFFF]">Track Patterns</h4>
                  <p className="text-sm text-gray-600 dark:text-[#BFC3D1]">
                    Use mood tracker to identify what affects your wellbeing most
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="mb-6 text-gray-900 dark:text-white">Join the Unmutte Community</h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-white/90">
              Your feelings matter. Your voice deserves to be heard.
              Start your journey to emotional freedom today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleStartTalking}
                className="bg-gradient-to-r from-[#7CB9E8] to-[#BFA2DB] text-white hover:opacity-90 text-lg px-10 py-6 border-0"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("journal")}
                className="bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 text-lg px-10 py-6"
              >
                Start Journaling
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
