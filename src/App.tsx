import { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { QuickAccessFAB } from "./components/QuickAccessFAB";
import { WelcomeModal } from "./components/WelcomeModal";
import { AIChatInterface } from "./components/chat/AIChatInterface";
import { VoiceCallInterface } from "./components/chat/VoiceCallInterface";
import SmashStressGame, { type GameResults } from "./components/SmashStressGame";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

const HomePage = lazy(() =>
  import("./components/pages/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);
const AboutPage = lazy(() =>
  import("./components/pages/AboutPage").then((module) => ({
    default: module.AboutPage,
  }))
);
const FeaturesPage = lazy(() =>
  import("./components/pages/FeaturesPage").then((module) => ({
    default: module.FeaturesPage,
  }))
);
const MoodJournalPage = lazy(() =>
  import("./components/pages/MoodJournalPage").then((module) => ({
    default: module.MoodJournalPage,
  }))
);
const MoodTrackerPage = lazy(() =>
  import("./components/pages/MoodTrackerPage").then((module) => ({
    default: module.MoodTrackerPage,
  }))
);
const ResourcesPage = lazy(() =>
  import("./components/pages/ResourcesPage").then((module) => ({
    default: module.ResourcesPage,
  }))
);
const CommunityPage = lazy(() =>
  import("./components/pages/CommunityPage").then((module) => ({
    default: module.CommunityPage,
  }))
);
const ConnectPage = lazy(() =>
  import("./components/pages/ConnectPage").then((module) => ({
    default: module.ConnectPage,
  }))
);
const ContactPage = lazy(() =>
  import("./components/pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  }))
);
const AccountPage = lazy(() =>
  import("./components/pages/AccountPage").then((module) => ({
    default: module.AccountPage,
  }))
);
const PrivacyPolicyPage = lazy(() =>
  import("./components/pages/PrivacyPolicyPage").then((module) => ({
    default: module.PrivacyPolicyPage,
  }))
);
const TermsOfServicePage = lazy(() =>
  import("./components/pages/TermsOfServicePage").then((module) => ({
    default: module.TermsOfServicePage,
  }))
);
const CookiePolicyPage = lazy(() =>
  import("./components/pages/CookiePolicyPage").then((module) => ({
    default: module.CookiePolicyPage,
  }))
);

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeInterface, setActiveInterface] = useState<
    "none" | "chat" | "voice" | "game"
  >("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStressGame, setShowStressGame] = useState(false);
  const isHighRisk =
    localStorage.getItem("unmutte_high_risk") === "true";

  useEffect(() => {
    // Ensure dark mode class is removed
    document.documentElement.classList.remove("dark");
  }, []);

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
      case "privacy":
        return <PrivacyPolicyPage />;
      case "terms":
        return <TermsOfServicePage />;
      case "cookies":
        return <CookiePolicyPage />;
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
    <div className="min-h-screen flex flex-col bg-white">
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