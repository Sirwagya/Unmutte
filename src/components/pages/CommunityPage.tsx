import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Heart,
  MessageCircle,
  Lightbulb,
  Quote,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "../ui/sonner";

export function CommunityPage() {
  const [story, setStory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) {
      toast.error("Please share your story");
      return;
    }
    toast.success("Thank you for sharing your story with the community!");
    setStory("");
  };

  const communityStories = [
    {
      quote: "After years of bottling up my anxiety, I finally found the courage to open up through Unmutte. The AI listener helped me organize my thoughts, and when I was ready, connecting with a human listener changed everything. I'm not 'fixed,' but I'm healing.",
      category: "Mental Health Journey",
      likes: 342,
    },
    {
      quote: "I was skeptical about AI empathy at first. But after my first conversation, I was amazed at how understood I felt. It gave me the confidence to eventually talk to a real person. Now I use both regularly.",
      category: "Trust & Growth",
      likes: 267,
    },
    {
      quote: "Being able to choose between text, voice, or video is huge. Some days I just need to type. Other days, I need to hear a voice. Unmutte meets me where I am.",
      category: "Flexibility",
      likes: 198,
    },
    {
      quote: "The anonymity removed all my barriers. I could finally talk about things I've never told anyone. The weight that lifted... I can't describe it.",
      category: "Freedom to Share",
      likes: 421,
    },
    {
      quote: "I started using Unmutte during a really dark period. The 24/7 availability meant I could reach out at 3am when I needed it most. It quite literally saved me.",
      category: "Always There",
      likes: 389,
    },
    {
      quote: "As someone who struggled with therapy stigma, Unmutte was the perfect first step. It felt less intimidating, and now I'm comfortable seeking professional help too.",
      category: "First Steps",
      likes: 215,
    },
  ];

  const wellnessTips = [
    {
      icon: <Heart className="w-6 h-6" />,
      tip: "Practice self-compassion",
      description: "Treat yourself with the same kindness you'd offer a good friend.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      tip: "Celebrate small wins",
      description: "Progress isn't linear. Every step forward counts, no matter how small.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      tip: "Create a calming routine",
      description: "Even 5 minutes of mindfulness can shift your entire day.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      tip: "Express your feelings",
      description: "Bottled emotions grow heavier. Sharing them makes room for healing.",
    },
  ];

  return (
    <div className="min-h-screen bg-white#0E0E16]">
      <Toaster />

      {/* Hero */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary text-white">Community</Badge>
            <h1 className="mb-6 text-gray-900">You're Not Alone</h1>
            <p className="text-xl text-gray-600">
              Real stories from real people finding their voice and healing together.
              Your story matters, and sharing it might help someone else feel less alone.
            </p>
          </div>
        </div>
      </section>

      {/* Community Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-gray-900">Community Stories</h2>
              <p className="text-lg text-gray-600">
                Anonymous voices sharing their journey to emotional wellness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityStories.map((story, index) => (
                <Card key={index} className="p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-white#1E1E2E]">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-gray-800 mb-6 flex-grow italic leading-relaxed">
                    "{story.quote}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <Badge variant="secondary">{story.category}</Badge>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{story.likes}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 border-0 shadow-2xl bg-white#1C1C2A]#2A2A3A]">
              <div className="text-center mb-8">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="mb-4 text-gray-900">Share Your Experience</h2>
                <p className="text-gray-700">
                  Your story could inspire someone else to take their first step toward healing.
                  Share anonymously and help build a supportive community.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-[rgba(77,69,69,0)]">
                  <Label htmlFor="story" className="text-gray-900">Your Story (Optional & Anonymous)</Label>
                  <Textarea
                    id="story"
                    placeholder="Share your Unmutte experience, how it helped you, or a message for others on their journey..."
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    className="min-h-[200px] mt-2 resize-none rounded-xl border-2 border-gray-900"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Your story will be shared anonymously. No personal information is collected.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button type="submit" size="lg" className="gradient-sky-lavender border-0">
                    Share My Story Anonymously
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Wellness Tips */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="mb-4">Daily Wellness Tips</h2>
              <p className="text-lg text-muted-foreground">
                AI-curated insights to support your emotional wellbeing journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wellnessTips.map((item, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center shrink-0 text-white">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-2">{item.tip}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Image Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-6">Building a Supportive Community</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Unmutte is more than a platform — it's a movement. A community of people
                  who believe in the power of being heard, the courage of vulnerability,
                  and the strength found in shared experiences.
                </p>
                <p className="text-muted-foreground mb-6">
                  Every conversation, every story shared, every moment of connection
                  contributes to a culture of emotional openness and authentic support.
                </p>
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-3xl mb-1 text-primary">50K+</div>
                    <p className="text-sm text-muted-foreground">Active users</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-1 text-secondary">1M+</div>
                    <p className="text-sm text-muted-foreground">Conversations</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-1 text-accent">24/7</div>
                    <p className="text-sm text-muted-foreground">Support available</p>
                  </div>
                </div>
              </div>
              
              <Card className="overflow-hidden border-0 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1676629650907-d50f2f27db20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzYwNjM2NDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Community support"
                  className="w-full h-[400px] object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 border-0 shadow-lg bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10">
              <h3 className="mb-6 text-center">Community Guidelines</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Be kind, compassionate, and respectful to all community members.</span>
                </p>
                <p className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Listen without judgment. Everyone's journey is unique.</span>
                </p>
                <p className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>Maintain anonymity. Don't ask for or share personal information.</span>
                </p>
                <p className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span>If you're in crisis, please reach out to professional help immediately.</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
