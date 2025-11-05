import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, User, Sun, Moon } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onStartTalking?: () => void;
  isLoggedIn?: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export function Navigation({ currentPage, onNavigate, onStartTalking, isLoggedIn, isDarkMode, onToggleTheme }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Features", value: "features" },
    { label: "Journal", value: "journal" },
    { label: "Tracker", value: "tracker" },
    { label: "Resources", value: "resources" },
    { label: "Community", value: "community" },
    { label: "Connect", value: "connect" },
    { label: "Contact", value: "contact" },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[rgba(14,14,22,0.85)] backdrop-blur-lg border-b border-gray-200 dark:border-[rgba(191,195,209,0.1)] shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="hover:opacity-80 transition-opacity">
            <Logo />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`transition-all duration-200 ${
                  currentPage === item.value
                    ? "text-[#7CB9E8] dark:text-[#BCA7FF] font-semibold"
                    : "text-gray-700 dark:text-[#E3E6F0] hover:text-[#7CB9E8] dark:hover:text-[#BCA7FF]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {onToggleTheme && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                className="rounded-full hover:bg-purple-500/20 transition-all duration-300"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </Button>
            )}

            {/* Account Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("account")}
              className="rounded-full"
              title={isLoggedIn ? "My Account" : "Login / Sign Up"}
            >
              <User className="w-5 h-5" />
            </Button>

            {/* CTA Button */}
            <Button
              onClick={() => onStartTalking ? onStartTalking() : onNavigate("connect")}
              className="hidden md:flex gradient-sky-lavender border-0"
            >
              Start Talking
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  <Logo />
                  <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleNavigate(item.value)}
                        className={`text-left py-2 px-4 rounded-lg transition-colors ${
                          currentPage === item.value
                            ? "bg-gradient-to-r from-[#B088F9] to-[#D8B4FE] text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      if (onStartTalking) {
                        onStartTalking();
                        setMobileMenuOpen(false);
                      } else {
                        handleNavigate("connect");
                      }
                    }}
                    className="gradient-sky-lavender border-0 w-full"
                  >
                    Start Talking
                  </Button>

                  {/* Theme Toggle in Mobile Menu */}
                  {onToggleTheme && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        onToggleTheme();
                      }}
                      className="w-full justify-start border-purple-500/30 hover:bg-purple-500/20"
                    >
                      {isDarkMode ? (
                        <>
                          <Sun className="w-5 h-5 mr-2 text-yellow-400" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5 mr-2 text-indigo-600" />
                          Dark Mode
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
