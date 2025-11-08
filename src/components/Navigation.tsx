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

const NAV_ITEMS = [
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

export function Navigation({
  currentPage,
  onNavigate,
  onStartTalking,
  isLoggedIn,
  isDarkMode,
  onToggleTheme,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const NavLinks = ({ isMobile = false }) => (
    <>
      {NAV_ITEMS.map((item) => (
        <a
          key={item.value}
          href={`#${item.value}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate(item.value);
          }}
          className={
            isMobile
              ? `text-left py-2 px-4 rounded-lg transition-colors ${
                  currentPage === item.value
                    ? "bg-gradient-to-r from-primary-accent to-secondary-accent text-white"
                    : "hover:bg-muted"
                }`
              : `transition-all duration-200 ${
                  currentPage === item.value
                    ? "text-primary-accent dark:text-secondary-accent font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary-accent dark:hover:text-secondary-accent"
                }`
          }
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <NavLinks />
          </div>

          <div className="flex items-center gap-3">
            {onToggleTheme && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                className="rounded-full hover:bg-purple-500/20 transition-all duration-300"
                aria-label={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("account")}
              className="rounded-full"
              aria-label={isLoggedIn ? "My Account" : "Login / Sign Up"}
            >
              <User className="w-5 h-5" />
            </Button>

            <Button
              onClick={() =>
                onStartTalking ? onStartTalking() : onNavigate("connect")
              }
              className="hidden md:flex gradient-sky-lavender border-0"
            >
              Start Talking
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  <Logo />
                  <div className="flex flex-col gap-4">
                    <NavLinks isMobile />
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

                  {onToggleTheme && (
                    <Button
                      variant="outline"
                      onClick={onToggleTheme}
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
