import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Heart, Target, Eye, Users, Sparkles } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">About Unmutte</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to create a world where everyone feels heard, understood,
              and supported — by bridging technology and human compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-[rgba(41,39,39,0)]">
                <h2 className="mb-6 text-[24px] font-bold not-italic no-underline text-gray-900">Our Story</h2>
                <div className="space-y-4 text-muted-foreground bg-[rgba(0,0,0,0)]">
                  <p className="text-gray-900 font-bold font-normal">
                    Unmutte was born from a simple yet powerful realization: too many people
                    feel unheard, judged, or alone with their emotions. In a world that's more
                    connected than ever, genuine emotional support remains surprisingly hard to find.
                  </p>
                  <p className="text-gray-900">
                    We believe that everyone deserves a safe space to express themselves freely,
                    without fear of judgment or stigma. That's why we created Unmutte — a platform
                    that combines the instant availability of AI with the irreplaceable warmth of
                    human connection.
                  </p>
                  <p className="text-gray-900">
                    Our hybrid approach means you can start with AI support anytime, day or night,
                    and seamlessly transition to a real human listener when you're ready for that
                    deeper connection. Whether through text, voice, or video, we're here to listen.
                  </p>
                  <p className="text-gray-900">
                    Unmutte isn't just a platform — it's a movement toward emotional openness,
                    authenticity, and healing. Because when you find the courage to speak your truth,
                    beautiful things happen.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <Card className="overflow-hidden border-0 shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1646733786036-4486cb27a6db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBhdGh5JTIwc3VwcG9ydCUyMGxpc3RlbmluZ3xlbnwxfHx8fDE3NjA2MzY0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Empathy and support"
                    className="w-full h-[400px] object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 gradient-soft p-8 rounded-2xl bg-[rgba(15,15,15,0)]">
              <Card className="p-10 border-0 bg-white#1E1E2E]#2A2A3A] shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B088F9] to-[#D8B4FE] flex items-center justify-center mb-6 bg-[rgba(0,0,0,0.02)]">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-gray-900 font-bold text-[20px]">Our Mission</h3>
                <p className="text-gray-900 leading-relaxed">
                  To empower people to express their emotions freely and feel truly heard,
                  by providing a safe, judgment-free space that combines empathetic AI
                  technology with authentic human connection.
                </p>
              </Card>

              <Card className="p-10 border-0 bg-[rgb(251,251,251)]#1E1E2E]#2A2A3A] shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] flex items-center justify-center mb-6 bg-[rgba(0,0,0,0.08)]">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-gray-900 font-bold text-[20px]">Our Vision</h3>
                <p className="text-gray-900 leading-relaxed">
                  A world where emotional wellness is accessible to everyone, where seeking
                  support is celebrated, and where technology and human compassion work
                  together to create meaningful change.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-soft px-[0px] py-[80px]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-[rgb(23,24,25)]">Our Core Values</h2>
              <p className="text-lg text-[rgb(21,21,22)] max-w-2xl mx-auto">
                These principles guide everything we do at Unmutte.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <h4 className="mb-2">Empathy First</h4>
                <p className="text-sm text-muted-foreground">
                  Every interaction is rooted in genuine care and understanding.
                </p>
              </Card>

              <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BFA2DB] to-[#F8C8DC] flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="mb-2">Inclusivity</h4>
                <p className="text-sm text-muted-foreground">
                  A welcoming space for everyone, regardless of background.
                </p>
              </Card>

              <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="mb-2">Innovation</h4>
                <p className="text-sm text-muted-foreground">
                  Leveraging technology to enhance, not replace, human connection.
                </p>
              </Card>

              <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A8E6CF] to-[#7CB9E8] flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h4 className="mb-2">Transparency</h4>
                <p className="text-sm text-muted-foreground">
                  Clear about our methods, limitations, and commitments.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6">Built with Care</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unmutte is designed by a diverse team of mental health advocates, AI researchers,
              and compassionate technologists who believe in the power of being heard.
            </p>
            <Card className="p-8 bg-white#1E1E2E]#2A2A3A] border-0 shadow-lg">
              <p className="text-gray-700 italic">
                "We're not just building technology — we're creating a movement toward
                emotional openness and authentic human connection. Every feature, every interaction,
                is designed with one goal in mind: helping you feel truly heard."
              </p>
              <p className="mt-4 text-[#7CB9E8]">— The Unmutte Team</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
