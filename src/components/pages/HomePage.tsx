import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
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
  const prefersReducedMotion = useReducedMotion();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section - Full Width Centered */}
      <section className="bg-white#0E0E16] py-20 md:py-32 relative overflow-hidden">
        {/* 3D Animated Background Elements */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Circles */}
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10 blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ top: "10%", left: "5%" }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-[#F8C8DC]/10 to-[#A8E6CF]/10 blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ top: "20%", right: "5%" }}
            />
            <motion.div
              className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#BFA2DB]/10 to-[#7CB9E8]/10 blur-3xl"
              animate={{
                x: [0, 60, 0],
                y: [0, -80, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ bottom: "10%", left: "15%" }}
            />

            {/* Floating Hearts */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute"
                initial={{
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: -100,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "linear",
                }}
              >
                <Heart
                  className="text-[#F8C8DC]"
                  style={{
                    width: 20 + Math.random() * 30,
                    height: 20 + Math.random() * 30,
                  }}
                  fill="currentColor"
                />
              </motion.div>
            ))}

            {/* Sparkles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                <Sparkles
                  className="text-[#7CB9E8]"
                  style={{
                    width: 15 + Math.random() * 20,
                    height: 15 + Math.random() * 20,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        <div className="container mx-auto px-4 relative z-0">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {!prefersReducedMotion && (
                  <>
                    {/* Animated Background Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#7CB9E8]/20 via-[#BFA2DB]/20 to-[#F8C8DC]/20 blur-3xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Sweeping Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{
                        maskImage:
                          "linear-gradient(to right, transparent, white, transparent)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent, white, transparent)",
                      }}
                      animate={{
                        x: ["-200%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                    />
                  </>
                )}

                {/* "Where" - Fade and slide from left */}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -50, rotateX: 90 }}
                  animate={{ opacity: 1, x: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 80,
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={
                      !prefersReducedMotion ? { y: [0, -8, 0] } : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0,
                    }}
                  >
                    Where
                  </motion.span>
                </motion.span>{" "}
                {/* "Feelings" - Multiple colors wave through */}
                <motion.span
                  className="inline-block relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <motion.span
                    className="inline-block bg-gradient-to-r from-[#7CB9E8] via-[#BFA2DB] to-[#F8C8DC] bg-clip-text text-transparent"
                    animate={
                      !prefersReducedMotion
                        ? {
                            y: [0, -8, 0],
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      },
                      backgroundPosition: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Feelings
                  </motion.span>
                </motion.span>{" "}
                {/* "Find" - Rotate in */}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, rotateY: 180 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 80,
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={
                      !prefersReducedMotion ? { y: [0, -8, 0] } : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                  >
                    Find
                  </motion.span>
                </motion.span>{" "}
                {/* "Freedom" - Grand entrance with particles */}
                <motion.span
                  className="inline-block relative"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.1,
                    type: "spring",
                    stiffness: 60,
                  }}
                >
                  {/* Particle effects around Freedom */}
                  {!prefersReducedMotion &&
                    [...Array(12)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${
                            i % 3 === 0
                              ? "#7CB9E8"
                              : i % 3 === 1
                              ? "#BFA2DB"
                              : "#F8C8DC"
                          }, ${
                            i % 2 === 0 ? "#A8E6CF" : "#F8C8DC"
                          })`,
                          left: "50%",
                          top: "50%",
                        }}
                        animate={{
                          x: [
                            0,
                            Math.cos((i * 30 * Math.PI) / 180) * 60,
                          ],
                          y: [
                            0,
                            Math.sin((i * 30 * Math.PI) / 180) * 60,
                          ],
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: 1.5 + i * 0.1,
                          ease: "easeOut",
                        }}
                      />
                    ))}

                  <motion.span
                    className="inline-block bg-gradient-to-r from-[#7CB9E8] via-[#BFA2DB] to-[#F8C8DC] bg-clip-text text-transparent relative"
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                    animate={
                      !prefersReducedMotion
                        ? {
                            y: [0, -10, 0],
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                            filter: [
                              "drop-shadow(0 0 20px rgba(124, 185, 232, 0.5))",
                              "drop-shadow(0 0 40px rgba(191, 162, 219, 0.8))",
                              "drop-shadow(0 0 60px rgba(248, 200, 220, 0.6))",
                              "drop-shadow(0 0 40px rgba(168, 230, 207, 0.7))",
                              "drop-shadow(0 0 20px rgba(124, 185, 232, 0.5))",
                            ],
                            scale: [1, 1.05, 1],
                          }
                        : {}
                    }
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.9,
                      },
                      backgroundPosition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      filter: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    Freedom
                  </motion.span>
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl italic text-gray-700#E3E6F0] mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                "You don't have to stay silent anymore."
              </motion.p>

              <motion.p
                className="text-lg md:text-xl text-gray-600#BFC3D1] mb-12 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                A safe, judgment-free space where you can share your
                thoughts and feelings openly. Get instant empathy from AI
                or connect with real human listeners.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <Button
                  size="lg"
                  onClick={handleStartTalking}
                  className="gradient-sky-lavender border-0 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  Start Talking Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("about")}
                  className="text-lg px-10 py-6 border-2"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Unmutte Helps You Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">How Unmutte Helps You</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A unique blend of AI technology and human compassion
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Side */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={!prefersReducedMotion ? { y: -10 } : {}}
              >
                <Card className="p-8 text-center border-0 shadow-lg hover:shadow-2xl transition-all bg-white#1E1E2E]#2A2A3A] interactive-card">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B088F9] to-[#D8B4FE] flex items-center justify-center mb-6 mx-auto shadow-[0_0_20px_rgba(176,136,249,0.4)]"
                    whileHover={
                      !prefersReducedMotion
                        ? { scale: 1.1, rotate: 360 }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="mb-3 text-gray-900#FFFFFF]">
                    AI Listener
                  </h3>
                  <p className="text-gray-600#BFC3D1] mb-4">
                    Instant empathy, available 24/7
                  </p>
                  <Button
                    onClick={handleStartTalking}
                    variant="outline"
                    className="border-[#7CB9E8] text-[#7CB9E8]#BCA7FF]#BCA7FF] hover:bg-gradient-to-r hover:from-[#B088F9] hover:to-[#D8B4FE] hover:text-white"
                  >
                    Try AI Chat
                  </Button>
                </Card>
              </motion.div>

              {/* Hybrid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={!prefersReducedMotion ? { y: -10 } : {}}
              >
                <Card className="p-8 text-center border-2 border-[#B088F9] shadow-xl hover:shadow-2xl shadow-[0_8px_40px_rgba(176,136,249,0.3)] bg-white#1E1E2E]#2A2A3A] relative overflow-hidden transition-all interactive-card">
                  <motion.div
                    animate={
                      !prefersReducedMotion
                        ? { scale: [1, 1.05, 1] }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#B088F9] to-[#D8B4FE] text-white">
                      Popular
                    </Badge>
                  </motion.div>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B088F9] to-[#D8B4FE] flex items-center justify-center"
                      animate={
                        !prefersReducedMotion ? { rotate: 360 } : {}
                      }
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex flex-col gap-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[#B088F9]"
                        animate={
                          !prefersReducedMotion
                            ? { scale: [1, 1.5, 1] }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[#BFA2DB]"
                        animate={
                          !prefersReducedMotion
                            ? { scale: [1, 1.5, 1] }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[#F8C8DC]"
                        animate={
                          !prefersReducedMotion
                            ? { scale: [1, 1.5, 1] }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F8C8DC] to-[#9BE4D8] flex items-center justify-center"
                      animate={
                        !prefersReducedMotion
                          ? { scale: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </motion.div>
                  </div>
                  <h3 className="mb-3 text-gray-900#FFFFFF]">
                    Hybrid Support
                  </h3>
                  <p className="text-gray-600#BFC3D1] mb-4">
                    Start with AI, upgrade to human
                  </p>
                  <Button
                    onClick={() => onNavigate("connect")}
                    className="gradient-sky-lavender border-0 w-full text-white font-semibold shadow-md hover:shadow-lg transition-all overflow-visible"
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>

              {/* Human Side */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={!prefersReducedMotion ? { y: -10 } : {}}
              >
                <Card className="p-8 text-center border-0 shadow-lg hover:shadow-2xl transition-all bg-white#1E1E2E]#2A2A3A] interactive-card">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F8C8DC] to-[#9BE4D8] flex items-center justify-center mb-6 mx-auto"
                    whileHover={
                      !prefersReducedMotion
                        ? { scale: 1.1, rotate: -360 }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="mb-3 text-gray-900#FFFFFF]">
                    Human Listener
                  </h3>
                  <p className="text-gray-600#BFC3D1] mb-4">
                    Real connection, genuine care
                  </p>
                  <Button
                    onClick={() => onNavigate("connect")}
                    variant="outline"
                    className="border-2 border-[#7CB9E8] text-[#7CB9E8]#BFA2DB]#BFA2DB] hover:bg-gradient-to-r hover:from-[#BFA2DB] hover:to-[#F8C8DC] hover:text-white hover:border-transparent font-semibold transition-all overflow-visible"
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
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Choose Unmutte?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine the best of technology and human compassion to
              create a truly supportive environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                gradient: "from-[#7CB9E8] to-[#BFA2DB]",
                title: "100% Anonymous",
                desc: "No names, no profiles. Your identity is completely protected. Share freely without fear of judgment.",
              },
              {
                icon: MessageCircle,
                gradient: "from-[#BFA2DB] to-[#F8C8DC]",
                title: "AI-Powered Empathy",
                desc: "Our advanced AI provides instant, thoughtful responses that help you process your emotions.",
              },
              {
                icon: Users,
                gradient: "from-[#F8C8DC] to-[#A8E6CF]",
                title: "Real Human Listeners",
                desc: "Connect with trained, empathetic listeners who genuinely care and understand.",
              },
              {
                icon: Video,
                gradient: "from-[#7CB9E8] to-[#A8E6CF]",
                title: "Voice & Video Calls",
                desc: "Sometimes text isn't enough. Connect through voice or video for deeper, more meaningful conversations.",
              },
              {
                icon: Lock,
                gradient: "from-[#BFA2DB] to-[#7CB9E8]",
                title: "Encrypted & Secure",
                desc: "All conversations are end-to-end encrypted. Your privacy and safety are our top priorities.",
              },
              {
                icon: Heart,
                gradient: "from-[#F8C8DC] to-[#7CB9E8]",
                title: "Judgment-Free Zone",
                desc: "Express yourself authentically. This is a safe space built on compassion and understanding.",
                fill: true,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={
                    !prefersReducedMotion
                      ? { y: -8, scale: 1.02 }
                      : {}
                  }
                >
                  <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-white#1E1E2E]#2A2A3A] h-full interactive-card">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                      whileHover={
                        !prefersReducedMotion
                          ? {
                              rotate: [0, -10, 10, -10, 0],
                              scale: 1.1,
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Icon
                        className={`w-8 h-8 text-white ${
                          feature.fill ? "fill-white" : ""
                        }`}
                      />
                    </motion.div>
                    <h3 className="mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.desc}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wellness Tools Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Track Your Emotional Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our mood tracking and journaling tools to understand
              your emotions better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border border-purple-100 shadow-lg hover:shadow-xl transition-shadow bg-white#1E1E2E]#2A2A3A]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B088F9] to-[#D8B4FE] flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3 text-gray-900#FFFFFF]">
                Mood Journal
              </h3>
              <p className="text-gray-600#BFC3D1] mb-6">
                Write freely about your feelings and experiences. Track
                your emotional journey with our private, secure journal.
              </p>
              <Button
                onClick={() => onNavigate("journal")}
                variant="outline"
                className="border-[#BCA7FF] text-[#BCA7FF] hover:bg-gradient-to-r hover:from-[#B088F9] hover:to-[#D8B4FE] hover:text-white"
              >
                Start Journaling
              </Button>
            </Card>

            <Card className="p-8 border border-pink-100 shadow-lg hover:shadow-xl transition-shadow bg-white#1E1E2E]#2A2A3A]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8C8DC] to-[#9BE4D8] flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3 text-gray-900#FFFFFF]">
                Mood Tracker
              </h3>
              <p className="text-gray-600#BFC3D1] mb-6">
                Log your daily mood and visualize patterns over time.
                Discover insights about your emotional wellbeing.
              </p>
              <Button
                onClick={() => onNavigate("tracker")}
                variant="outline"
                className="border-[#BFA2DB] text-[#BFA2DB] hover:bg-gradient-to-r hover:from-[#BFA2DB] hover:to-[#F8C8DC] hover:text-white"
              >
                Track Your Mood
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-gray-900">
              People Are Finding Their Voice
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands who have found comfort and connection
              through Unmutte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow bg-white#1E1E2E]"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#7CB9E8] text-[#7CB9E8]"
                    />
                  ))}
                </div>
                <p className="text-gray-800 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <p className="text-sm text-gray-500">
                  — {testimonial.author}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border border-purple-100 shadow-lg bg-white#1E1E2E]#2A2A3A]">
              <h3 className="text-center mb-6 text-gray-900#FFFFFF]">
                Quick Tips for Getting Started
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">💬</div>
                  <h4 className="mb-2 text-gray-900#FFFFFF]">
                    Start Simple
                  </h4>
                  <p className="text-sm text-gray-600#BFC3D1]">
                    Begin with AI chat to organize your thoughts before
                    connecting with a human listener
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📓</div>
                  <h4 className="mb-2 text-gray-900#FFFFFF]">
                    Journal Daily
                  </h4>
                  <p className="text-sm text-gray-600#BFC3D1]">
                    Write a few sentences each day to track your
                    emotional journey over time
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="mb-2 text-gray-900#FFFFFF]">
                    Track Patterns
                  </h4>
                  <p className="text-sm text-gray-600#BFC3D1]">
                    Use mood tracker to identify what affects your
                    wellbeing most
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="mb-6 text-gray-900">
              Join the Unmutte Community
            </h2>
            <p className="text-xl mb-8 text-gray-700">
              Your feelings matter. Your voice deserves to be heard.
              Start your journey to emotional freedom today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleStartTalking}
                className="bg-gradient-to-r from-[#7CB9E8] to-[#BFA2DB] hover:from-[#6AA9D8] hover:to-[#AF92CB] text-white shadow-lg hover:shadow-xl transition-all text-lg px-10 py-6 border-0 overflow-visible"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("journal")}
                className="bg-transparent text-gray-900 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all text-lg px-10 py-6 overflow-visible"
              >
                Start Journaling
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
