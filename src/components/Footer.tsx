import { Logo } from "./Logo";
import { Mail, Instagram, Twitter, Linkedin } from "lucide-react";
import { Separator } from "./ui/separator";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              A safe, judgment-free space to share your thoughts and feelings openly.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", page: "about" },
                { label: "Features", page: "features" },
                { label: "Resources", page: "resources" },
                { label: "Journal", page: "journal" },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white transition-colors">
                  Become a Listener
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-gray-800" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Unmutte. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-blue-500 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500 dark:hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
