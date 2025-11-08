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
                <button
                  onClick={() => onNavigate("home")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("features")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("journal")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Mood Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("tracker")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Mood Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("resources")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("community")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Community
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-gray-900">Connect</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("connect")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Start Talking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contact Us
                </button>
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
            <button
              onClick={() => onNavigate("privacy")}
              className="hover:text-primary transition-colors"
              aria-label="View Privacy Policy"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate("terms")}
              className="hover:text-primary transition-colors"
              aria-label="View Terms of Service"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate("cookies")}
              className="hover:text-primary transition-colors"
              aria-label="View Cookie Policy"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
