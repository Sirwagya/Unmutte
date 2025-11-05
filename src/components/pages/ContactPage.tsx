import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Mail,
  Send,
  Heart,
  Users,
  Headphones,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "../ui/sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [listenerForm, setListenerForm] = useState({
    name: "",
    email: "",
    experience: "",
    motivation: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleListenerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted!", {
      description: "Thank you for your interest. We'll review your application and be in touch soon.",
    });
    setListenerForm({ name: "", email: "", experience: "", motivation: "" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed to newsletter!", {
      description: "You'll receive updates about Unmutte's launch and features.",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0E0E16]">
      <Toaster />

      {/* Hero */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary text-white">Get in Touch</Badge>
            <h1 className="mb-6 text-gray-900 dark:text-white">We'd Love to Hear From You</h1>
            <p className="text-xl text-gray-600 dark:text-white/80">
              Whether you have questions, feedback, or want to join our community of listeners,
              we're here to connect.
            </p>
          </div>
        </div>
      </section>

      {/* Early Access Form */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 border-0 shadow-2xl bg-gradient-to-r from-[#7CB9E8] via-[#BFA2DB] to-[#F8C8DC]">
              <div className="text-center mb-8 text-white">
                <Heart className="w-12 h-12 mx-auto mb-4 fill-white" />
                <h2 className="mb-4 text-white">Join the Unmutte Community</h2>
                <p className="text-white/90">
                  Be among the first to experience the platform when we launch.
                  Get early access and exclusive updates.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="bg-white dark:bg-[#2A2A3A] border-border text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-white dark:bg-[#2A2A3A] border-border text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button type="submit" size="lg" className="bg-gradient-to-br from-[#B088F9] to-[#D8B4FE] text-white hover:from-[#C8A4FF] hover:to-[#E5C9FF]">
                    Get Early Access
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Become a Listener */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] flex items-center justify-center">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2>Become a Volunteer Listener</h2>
                    <p className="text-muted-foreground">Make a real difference</p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  Join our community of compassionate listeners and help people feel heard.
                  All you need is empathy, patience, and a genuine desire to support others.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="mb-1">Free Training Provided</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn active listening, empathy skills, and crisis awareness.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="mb-1">Flexible Schedule</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose when and how often you want to be available.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="mb-1">Ongoing Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to supervisor support and listener community.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="mb-1">Make an Impact</h4>
                      <p className="text-sm text-muted-foreground">
                        Be the support someone desperately needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-8 border-0 shadow-xl bg-white dark:bg-gradient-to-br dark:from-[#1C1C2A] dark:to-[#2A2A3A]">
                <h3 className="mb-6">Listener Application</h3>
                <form onSubmit={handleListenerSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="listener-name">Full Name</Label>
                    <Input
                      id="listener-name"
                      type="text"
                      placeholder="Your name"
                      value={listenerForm.name}
                      onChange={(e) =>
                        setListenerForm({ ...listenerForm, name: e.target.value })
                      }
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="listener-email">Email Address</Label>
                    <Input
                      id="listener-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={listenerForm.email}
                      onChange={(e) =>
                        setListenerForm({ ...listenerForm, email: e.target.value })
                      }
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="listener-experience">
                      Relevant Experience (Optional)
                    </Label>
                    <Textarea
                      id="listener-experience"
                      placeholder="Tell us about any relevant experience with mental health support, counseling, or active listening..."
                      value={listenerForm.experience}
                      onChange={(e) =>
                        setListenerForm({ ...listenerForm, experience: e.target.value })
                      }
                      className="mt-2 min-h-[100px] resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="listener-motivation">
                      Why do you want to be a listener?
                    </Label>
                    <Textarea
                      id="listener-motivation"
                      placeholder="Share your motivation for wanting to support others through Unmutte..."
                      value={listenerForm.motivation}
                      onChange={(e) =>
                        setListenerForm({ ...listenerForm, motivation: e.target.value })
                      }
                      required
                      className="mt-2 min-h-[120px] resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-peach-mint border-0">
                    Submit Application
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="mb-4">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground">
                Have questions or feedback? We're all ears.
              </p>
            </div>

            <Card className="p-8 border-0 shadow-xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="mt-2 min-h-[150px] resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center border-0 shadow-lg bg-white dark:bg-gradient-to-br dark:from-[#1C1C2A] dark:to-[#2A2A3A]">
                <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="mb-2">Email Us</h4>
                <p className="text-sm text-muted-foreground">support@unmutte.com</p>
              </Card>

              <Card className="p-8 text-center border-0 shadow-lg bg-white dark:bg-gradient-to-br dark:from-[#1C1C2A] dark:to-[#2A2A3A]">
                <Users className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h4 className="mb-2">Join Community</h4>
                <p className="text-sm text-muted-foreground">50,000+ active users</p>
              </Card>

              <Card className="p-8 text-center border-0 shadow-lg bg-white dark:bg-gradient-to-br dark:from-[#1C1C2A] dark:to-[#2A2A3A]">
                <Heart className="w-10 h-10 text-accent mx-auto mb-4" />
                <h4 className="mb-2">Response Time</h4>
                <p className="text-sm text-muted-foreground">Within 24 hours</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
