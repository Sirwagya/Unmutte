import { Logo } from "./Logo";
import { Heart, Mail, Instagram, Twitter, Linkedin } from "lucide-react";
import { Separator } from "./ui/separator";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-600 max-w-md">
              A safe, judgment-free space where people can share their thoughts and feelings openly,
              and receive empathetic responses powered by AI and real human listeners.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-primary">
              <Heart className="w-4 h-4 fill-current" />
              <span className="italic">"Speak your heart. We're listening."</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("home");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("about");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("features");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#journal"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("journal");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Mood Journal
                </a>
              </li>
              <li>
                <a
                  href="#tracker"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("tracker");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Mood Tracker
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("resources");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#community"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("community");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-gray-900">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#connect"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("connect");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Start Talking
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("contact");
                  }}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  Become a Listener
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-all" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-all" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-all" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-[rgba(191,195,209,0.2)]" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© 2025 Unmutte. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("privacy");
              }}
              className="hover:text-primary transition-colors"
              aria-label="View Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("terms");
              }}
              className="hover:text-primary transition-colors"
              aria-label="View Terms of Service"
            >
              Terms of Service
            </a>
            <a
              href="#cookies"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("cookies");
              }}
              className="hover:text-primary transition-colors"
              aria-label="View Cookie Policy"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
