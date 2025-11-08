import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Users,
  Video,
  Phone,
  MessageSquare,
  Lock,
  BookOpen,
  BarChart3,
  Shield,
  Clock,
  Heart,
  Zap,
  CheckCircle2,
} from "lucide-react";
import CustomBotIcon from "../icons/CustomBotIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white#0E0E16]">
      {/* Hero */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary text-white">Features</Badge>
            <h1 className="mb-6 text-gray-900">Everything You Need to Feel Heard</h1>
            <p className="text-xl text-gray-600">
              Powerful tools and thoughtful features designed to support your emotional wellbeing journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
                <TabsTrigger value="ai">AI Listener</TabsTrigger>
                <TabsTrigger value="human">Human Listeners</TabsTrigger>
                <TabsTrigger value="calls">Voice & Video</TabsTrigger>
              </TabsList>

              {/* AI Listener Tab */}
              <TabsContent value="ai" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center">
                        <CustomBotIcon size={32} color="#ffffff" secondaryColor="#ffffff" />
                      </div>
                      <div>
                        <h2 className="text-gray-900 font-semibold tracking-tight">AI-Powered Empathy</h2>
                        <p className="text-gray-600 text-sm">Powered by AI</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      Our advanced AI listener provides instant, empathetic responses whenever you need
                      someone to talk to — day or night.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">24/7 Availability</h4>
                          <p className="text-sm text-muted-foreground">
                            Get support anytime, anywhere. No appointments needed.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Context-Aware Responses</h4>
                          <p className="text-sm text-muted-foreground">
                            AI remembers your conversation and adapts to your needs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Emotional Intelligence</h4>
                          <p className="text-sm text-muted-foreground">
                            Trained to recognize and respond to emotional nuances.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Judgment-Free Zone</h4>
                          <p className="text-sm text-muted-foreground">
                            Share anything without fear. Your secrets are safe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card className="p-8 border-0 shadow-2xl bg-white#1C1C2A]#2A2A3A]">
                    <div className="space-y-4">
                      <div className="bg-gray-50#2A2A3A] p-4 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">You</p>
                        <p className="text-gray-900">I'm feeling really anxious about tomorrow's presentation...</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#7CB9E8] via-[#BFA2DB] to-[#F8C8DC] p-4 rounded-xl shadow-sm text-white">
                        <p className="text-sm mb-1 opacity-90">AI Listener</p>
                        <p>I hear you. Feeling anxious before a big presentation is completely normal. Would you like to talk about what's making you most nervous? Sometimes breaking it down helps.</p>
                      </div>
                      <div className="bg-gray-50#2A2A3A] p-4 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">You</p>
                        <p className="text-gray-900">I'm worried I'll forget what to say or mess up in front of everyone...</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Human Listeners Tab */}
              <TabsContent value="human" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] flex items-center justify-center">
                        <Users className="w-8 h-8 text-white fill-white" />
                      </div>
                      <div>
                        <h2>Real Human Connection</h2>
                        <p className="text-muted-foreground">Trained & Verified</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6">
                      Connect with trained, empathetic human listeners who provide genuine care,
                      understanding, and authentic emotional support.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Trained Professionals</h4>
                          <p className="text-sm text-muted-foreground">
                            All listeners complete empathy training and background checks.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Genuine Understanding</h4>
                          <p className="text-sm text-muted-foreground">
                            Human empathy, warmth, and real-world perspective.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Flexible Scheduling</h4>
                          <p className="text-sm text-muted-foreground">
                            Book sessions that work for your schedule.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Choose Your Listener</h4>
                          <p className="text-sm text-muted-foreground">
                            Browse profiles and find someone who feels right for you.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card className="p-8 border-0 shadow-2xl">
                    <h4 className="mb-6">What Our Listeners Provide:</h4>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Heart className="w-8 h-8 text-secondary shrink-0" />
                        <div>
                          <h4 className="mb-1">Active Listening</h4>
                          <p className="text-sm text-muted-foreground">
                            Full attention and presence during your conversation.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Shield className="w-8 h-8 text-secondary shrink-0" />
                        <div>
                          <h4 className="mb-1">Non-Judgmental Support</h4>
                          <p className="text-sm text-muted-foreground">
                            A safe space to share without criticism.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Zap className="w-8 h-8 text-secondary shrink-0" />
                        <div>
                          <h4 className="mb-1">Thoughtful Perspectives</h4>
                          <p className="text-sm text-muted-foreground">
                            Gentle insights that help you see things differently.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Voice & Video Tab */}
              <TabsContent value="calls" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7CB9E8] to-[#A8E6CF] flex items-center justify-center">
                        <Video className="w-8 h-8 text-white fill-white" />
                      </div>
                      <div>
                        <h2>Live Voice & Video Calls</h2>
                        <p className="text-muted-foreground">Deeper Connection</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6">
                      Sometimes text isn't enough. Connect with listeners through voice or video
                      for more meaningful, personal conversations.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Voice Calls</h4>
                          <p className="text-sm text-muted-foreground">
                            Talk it out when you need to hear a human voice.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Video Sessions</h4>
                          <p className="text-sm text-muted-foreground">
                            Face-to-face connection while staying anonymous if you choose.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Instant or Scheduled</h4>
                          <p className="text-sm text-muted-foreground">
                            Join immediately if available, or book for later.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                          <h4 className="mb-1">Secure & Private</h4>
                          <p className="text-sm text-muted-foreground">
                            Encrypted connections using WebRTC technology.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6 border-0 shadow-xl bg-white#1C1C2A]#2A2A3A]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B088F9] to-[#BFA2DB] flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-gray-900">Voice Call</h4>
                          <p className="text-sm text-gray-600">Audio only</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Perfect for when you want to talk things through without the pressure
                        of video. Just you and a caring voice.
                      </p>
                    </Card>

                    <Card className="p-6 border-0 shadow-xl bg-white#1C1C2A]#2A2A3A]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F8C8DC] to-[#9BE4D8] flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-gray-900">Video Call</h4>
                          <p className="text-sm text-gray-600">Face-to-face</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Experience the warmth of a face-to-face conversation. See genuine
                        empathy and feel truly connected.
                      </p>
                    </Card>

                    <Card className="p-6 border-0 shadow-xl bg-white#1C1C2A]#2A2A3A]">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8EA7E9] to-[#9BE4D8] flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-gray-900">Hybrid Mode</h4>
                          <p className="text-sm text-gray-600">Chat + Call</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Start with chat, then upgrade to voice or video when you feel
                        comfortable. Total flexibility.
                      </p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4">More Features to Support You</h2>
              <p className="text-lg text-muted-foreground">
                Additional tools designed for your emotional wellbeing journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <BookOpen className="w-10 h-10 text-primary mb-4" />
                <h4 className="mb-2">Mood Journal</h4>
                <p className="text-sm text-muted-foreground">
                  Track your emotional journey with private journaling.
                </p>
              </Card>

              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <BarChart3 className="w-10 h-10 text-secondary mb-4" />
                <h4 className="mb-2">Mood Tracker</h4>
                <p className="text-sm text-muted-foreground">
                  Visualize patterns and understand your emotional trends.
                </p>
              </Card>

              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <Lock className="w-10 h-10 text-accent mb-4" />
                <h4 className="mb-2">End-to-End Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  All conversations are fully encrypted and secure.
                </p>
              </Card>

              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <Clock className="w-10 h-10 text-[#A8E6CF] mb-4" />
                <h4 className="mb-2">Wellness Tips</h4>
                <p className="text-sm text-muted-foreground">
                  AI-curated daily tips for emotional wellbeing.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-[#B5DDF7] via-[#E0D4F0] to-[#FCEEF5] text-center">
              <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-gray-900" />
              </div>
              <h2 className="mb-4 text-gray-900">Your Privacy & Safety Come First</h2>
              <p className="text-lg text-gray-800 mb-6">
                All conversations are 100% secure and encrypted. We never store personal
                information, and you're always in control of what you share.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-white/40 text-gray-900 border-white/50 backdrop-blur-sm">
                  End-to-End Encrypted
                </Badge>
                <Badge className="bg-white/40 text-gray-900 border-white/50 backdrop-blur-sm">
                  HIPAA Compliant
                </Badge>
                <Badge className="bg-white/40 text-gray-900 border-white/50 backdrop-blur-sm">
                  Anonymous by Default
                </Badge>
                <Badge className="bg-white/40 text-gray-900 border-white/50 backdrop-blur-sm">
                  Zero Data Selling
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
