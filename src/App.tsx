import { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { QuickAccessFAB } from "./components/QuickAccessFAB";
import { WelcomeModal } from "./components/WelcomeModal";
import { AIChatInterface } from "./components/chat/AIChatInterface";
import { VoiceCallInterface } from "./components/chat/VoiceCallInterface";
import { useDarkMode } from "./hooks/useDarkMode";
import { Toaster } from "./components/ui/sonner";

const HomePage = lazy(() =>
  import("./components/pages/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);
const AboutPage = lazy(() => import("./components/pages/AboutPage"));
const FeaturesPage = lazy(() => import("./components/pages/FeaturesPage"));
const MoodJournalPage = lazy(() =>
  import("./components/pages/MoodJournalPage")
);
const MoodTrackerPage = lazy(() =>
  import("./components/pages/MoodTrackerPage")
);
const ResourcesPage = lazy(() => import("./components/pages/ResourcesPage"));
const CommunityPage = lazy(() => import("./components/pages/CommunityPage"));
const ConnectPage = lazy(() => import("./components/pages/ConnectPage"));
const ContactPage = lazy(() => import("./components/pages/ContactPage"));
const AccountPage = lazy(() => import("./components/pages/AccountPage"));

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
  const { isDarkMode, toggleTheme } = useDarkMode();

  useEffect(() => {
    const userEmail = localStorage.getItem("unmutte_user_email");
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

      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>{renderPage()}</Suspense>
      </main>

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