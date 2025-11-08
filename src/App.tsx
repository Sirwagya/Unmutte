import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { QuickAccessFAB } from "./components/QuickAccessFAB";
import { WelcomeModal } from "./components/WelcomeModal";
import { AIChatInterface } from "./components/chat/AIChatInterface";
import { VoiceCallInterface } from "./components/chat/VoiceCallInterface";
import SmashStressGame, {
  type GameResults,
} from "./components/SmashStressGame";
import { toast } from "sonner@2.0.3";
import { HomePage } from "./components/pages/HomePage";
import { AboutPage } from "./components/pages/AboutPage";
import { FeaturesPage } from "./components/pages/FeaturesPage";
import { MoodJournalPage } from "./components/pages/MoodJournalPage";
import { MoodTrackerPage } from "./components/pages/MoodTrackerPage";
import { ResourcesPage } from "./components/pages/ResourcesPage";
import { CommunityPage } from "./components/pages/CommunityPage";
import { ConnectPage } from "./components/pages/ConnectPage";
import { ContactPage } from "./components/pages/ContactPage";
import { AccountPage } from "./components/pages/AccountPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeInterface, setActiveInterface] = useState<
    "none" | "chat" | "voice" | "game"
  >("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showStressGame, setShowStressGame] = useState(false);
  const isHighRisk =
    localStorage.getItem("unmutte_high_risk") === "true";

  // Handle theme mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("unmutte_theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("unmutte_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("unmutte_theme", "light");
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const userEmail = localStorage.getItem(
      "unmutte_user_email",
    );
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartChat = () => {
    setActiveInterface("chat");
  };

  const handleStartVoice = () => {
    setActiveInterface("voice");
  };

  const handleStartGame = () => {
    setShowStressGame(true);
  };

  const handleCloseInterface = () => {
    setActiveInterface("none");
  };

  const handleGameComplete = (results: GameResults) => {
    console.log("Game results:", results);
    toast.success(
      `Great job! You popped ${results.totalPops} bubbles! 🎉`,
    );
    setShowStressGame(false);
  };

  const handleLogin = (email: string) => {
    localStorage.setItem("unmutte_user_email", email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("unmutte_user_email");
    setIsLoggedIn(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            onStartTalking={handleStartChat}
          />
        );
      case "about":
        return <AboutPage />;
      case "features":
        return <FeaturesPage />;
      case "journal":
        return <MoodJournalPage />;
      case "tracker":
        return <MoodTrackerPage />;
      case "resources":
        return <ResourcesPage />;
      case "community":
        return <CommunityPage />;
      case "connect":
        return <ConnectPage />;
      case "contact":
        return <ContactPage />;
      case "account":
        return (
          <AccountPage
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onStartTalking={handleStartChat}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0E0E16]">
      {/* Welcome Modal for first-time visitors */}
      <WelcomeModal onClose={() => {}} />

      {/* Global Interfaces */}
      {activeInterface === "chat" && (
        <AIChatInterface
          onClose={handleCloseInterface}
          onUpgradeToVoice={handleStartVoice}
        />
      )}

      {activeInterface === "voice" && (
        <VoiceCallInterface
          onClose={handleCloseInterface}
        />
      )}

      {showStressGame && (
        <SmashStressGame
          isOpen={showStressGame}
          onClose={() => setShowStressGame(false)}
          onComplete={handleGameComplete}
          isHighRisk={isHighRisk}
        />
      )}

      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onStartTalking={handleStartChat}
        isLoggedIn={isLoggedIn}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-grow">{renderPage()}</main>

      <Footer onNavigate={handleNavigate} />

      {/* Quick Access FAB - only show when not in connect page and no active interface */}
      {currentPage !== "connect" &&
        activeInterface === "none" &&
        !showStressGame && (
          <QuickAccessFAB
            onStartChat={handleStartChat}
            onStartVoice={handleStartVoice}
            onStartGame={handleStartGame}
          />
        )}

      {/* Toast Notifications */}
      <Toaster richColors position="top-right" />
    </div>
  );
}