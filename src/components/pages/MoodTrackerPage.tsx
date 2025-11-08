import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, Calendar as CalendarIcon, Smile, Meh, Frown, AlertCircle, CheckCircle, Heart, Download, Upload, Zap, Users, Coffee, Moon, Droplets, Wind, Sun, CloudRain } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { trackEvent } from "../../lib/analytics";

interface MoodEntry {
  date: string;
  mood: number; // 1-5 scale
  moodLabel: string;
  energyLevel: number; // 1-5 scale
  sleepQuality: number; // 1-5 scale
  stressLevel: number; // 1-5 scale
  physicalActivity: number; // 1-5 scale
  socialInteraction: number; // 1-5 scale
  physicalSymptoms: string[];
  gratitude?: string;
  notes?: string;
  timestamp: number;
}

const moodOptions = [
  { value: 5, label: "Great", icon: Smile, color: "#22c55e", emoji: "😊" },
  { value: 4, label: "Good", icon: CheckCircle, color: "#3b82f6", emoji: "🙂" },
  { value: 3, label: "Okay", icon: Meh, color: "#eab308", emoji: "😐" },
  { value: 2, label: "Sad", icon: Frown, color: "#f97316", emoji: "😢" },
  { value: 1, label: "Anxious", icon: AlertCircle, color: "#ef4444", emoji: "😰" },
];

const physicalSymptomOptions = [
  { value: "headache", label: "Headache", icon: "🤕" },
  { value: "fatigue", label: "Fatigue", icon: "😴" },
  { value: "tension", label: "Muscle Tension", icon: "💪" },
  { value: "stomach", label: "Stomach Issues", icon: "🤢" },
  { value: "pain", label: "Chronic Pain", icon: "⚡" },
  { value: "restlessness", label: "Restlessness", icon: "😰" },
  { value: "none", label: "No Symptoms", icon: "✅" },
];

export function MoodTrackerPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  
  // Form state
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [physicalActivity, setPhysicalActivity] = useState<number>(3);
  const [socialInteraction, setSocialInteraction] = useState<number>(3);
  const [physicalSymptoms, setPhysicalSymptoms] = useState<string[]>([]);
  const [gratitude, setGratitude] = useState("");
  const [notes, setNotes] = useState("");

  // Load mood entries from localStorage on mount
  useEffect(() => {
    const savedMoods = localStorage.getItem("unmutte_mood_tracker");
    if (savedMoods) {
      setMoodEntries(JSON.parse(savedMoods));
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    if (moodEntries.length > 0) {
      localStorage.setItem("unmutte_mood_tracker", JSON.stringify(moodEntries));
    }
  }, [moodEntries]);

  // Check if mood is logged for today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = moodEntries.find(entry => entry.date === today);
    if (todayEntry) {
      setTodayMood(todayEntry.mood);
      setSelectedMood(todayEntry.mood);
      setEnergyLevel(todayEntry.energyLevel);
      setSleepQuality(todayEntry.sleepQuality);
      setStressLevel(todayEntry.stressLevel);
      setPhysicalActivity(todayEntry.physicalActivity);
      setSocialInteraction(todayEntry.socialInteraction);
      setPhysicalSymptoms(todayEntry.physicalSymptoms);
      setGratitude(todayEntry.gratitude || "");
      setNotes(todayEntry.notes || "");
    }
  }, [moodEntries]);

  const handleQuickLogMood = (moodValue: number) => {
    setSelectedMood(moodValue);
    setShowDetailedForm(true);
    trackEvent('mood_quick_select', { moodValue });
  };

  const handleSubmitDetailedLog = () => {
    const today = new Date().toISOString().split('T')[0];
    const moodData = moodOptions.find(option => option.value === selectedMood);
    
    const existingIndex = moodEntries.findIndex(entry => entry.date === today);
    
    const newEntry: MoodEntry = {
      date: today,
      mood: selectedMood,
      moodLabel: moodData?.label || "",
      energyLevel,
      sleepQuality,
      stressLevel,
      physicalActivity,
      socialInteraction,
      physicalSymptoms,
      gratitude,
      notes,
      timestamp: Date.now(),
    };

    if (existingIndex >= 0) {
      // Update existing entry
      const updated = [...moodEntries];
      updated[existingIndex] = newEntry;
      setMoodEntries(updated);
      toast.success("Mood updated for today!");
      trackEvent('mood_log_update', { date: today, mood: selectedMood });
    } else {
      // Create new entry
      setMoodEntries([...moodEntries, newEntry].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
      toast.success("Mood logged successfully!");
      trackEvent('mood_log_create', { date: today, mood: selectedMood });
    }
    
    setTodayMood(selectedMood);
    setShowDetailedForm(false);
  };

  const toggleSymptom = (symptom: string) => {
    if (symptom === "none") {
      setPhysicalSymptoms(["none"]);
    } else {
      const filtered = physicalSymptoms.filter(s => s !== "none");
      if (physicalSymptoms.includes(symptom)) {
        setPhysicalSymptoms(filtered.filter(s => s !== symptom));
      } else {
        setPhysicalSymptoms([...filtered, symptom]);
      }
    }
  };

  // Prepare data for charts
  const getLast7DaysData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const entry = moodEntries.find(e => e.date === dateStr);
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        mood: entry?.mood || 0,
        energy: entry?.energyLevel || 0,
        stress: entry?.stressLevel ? 6 - entry.stressLevel : 0,
        moodLabel: entry?.moodLabel || "No data",
      });
    }
    return last7Days;
  };

  const getLast30DaysData = () => {
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const entry = moodEntries.find(e => e.date === dateStr);
      
      last30Days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: entry?.mood || 0,
      });
    }
    return last30Days;
  };

  const getMoodDistribution = () => {
    const distribution = moodOptions.map(option => ({
      name: option.label,
      value: moodEntries.filter(entry => entry.mood === option.value).length,
      color: option.color,
    }));
    return distribution.filter(item => item.value > 0);
  };

  const getStatistics = () => {
    if (moodEntries.length === 0) {
      return {
        average: 0,
        mostCommon: "No data",
        totalLogs: 0,
        currentStreak: 0,
        avgEnergy: 0,
        avgSleep: 0,
        avgStress: 0,
      };
    }

    const average = (moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length).toFixed(1);
    const avgEnergy = (moodEntries.reduce((sum, entry) => sum + (entry.energyLevel || 0), 0) / moodEntries.length).toFixed(1);
    const avgSleep = (moodEntries.reduce((sum, entry) => sum + (entry.sleepQuality || 0), 0) / moodEntries.length).toFixed(1);
    const avgStress = (moodEntries.reduce((sum, entry) => sum + (entry.stressLevel || 0), 0) / moodEntries.length).toFixed(1);
    
    const moodCounts = moodEntries.reduce((acc, entry) => {
      acc[entry.moodLabel] = (acc[entry.moodLabel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "No data";

    // Calculate current streak
    let streak = 0;
    const sortedEntries = [...moodEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (sortedEntries[i]?.date === expectedDateStr) {
        streak++;
      } else {
        break;
      }
    }

    return {
      average: parseFloat(average),
      mostCommon,
      totalLogs: moodEntries.length,
      currentStreak: streak,
      avgEnergy: parseFloat(avgEnergy),
      avgSleep: parseFloat(avgSleep),
      avgStress: parseFloat(avgStress),
    };
  };

  const stats = getStatistics();
  const last7DaysData = getLast7DaysData();
  const last30DaysData = getLast30DaysData();
  const moodDistribution = getMoodDistribution();

  const handleExportData = () => {
    const dataStr = JSON.stringify(moodEntries, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `unmutte-mood-tracker-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Mood data exported successfully!");
    trackEvent('mood_export', { count: moodEntries.length });
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setMoodEntries([...importedData, ...moodEntries]);
        toast.success(`Imported ${importedData.length} mood entries successfully!`);
        trackEvent('mood_import_success', { imported: importedData.length });
      } catch (error) {
        toast.error("Failed to import data. Please check the file format.");
        trackEvent('mood_import_fail');
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset input
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Activity className="w-12 h-12 text-primary" />
            </motion.div>
          </motion.div>
          <h1 className="mb-4">Mood Tracker</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your daily mood and discover patterns in your emotional wellbeing over time.
          </p>
        </motion.div>

        {/* Quick Log Mood */}
        <AnimatePresence mode="wait">
          {!showDetailedForm ? (
            <motion.div
              key="quick-log"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>How are you feeling today?</CardTitle>
                      <CardDescription>
                        {todayMood ? "You've logged your mood today. You can update it below." : "Log your mood for today"}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                        id="import-mood-data"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("import-mood-data")?.click()}
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Import
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportData}
                        disabled={moodEntries.length === 0}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {moodOptions.map((option, index) => {
                      const Icon = option.icon;
                      const isSelected = todayMood === option.value;
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleQuickLogMood(option.value)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-lg"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <motion.div 
                            className="text-4xl mb-3"
                            animate={isSelected ? { 
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {option.emoji}
                          </motion.div>
                          <div className="space-y-1">
                            <Icon className="w-5 h-5 mx-auto" style={{ color: option.color }} />
                            <div className="text-sm">{option.label}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="detailed-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Mood Log</CardTitle>
                  <CardDescription>
                    Add more details to better understand your emotional patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Energy Level */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Energy Level: {energyLevel}/5
                      </Label>
                      <Badge variant="outline">{
                        energyLevel === 5 ? "Energized" :
                        energyLevel === 4 ? "Good Energy" :
                        energyLevel === 3 ? "Moderate" :
                        energyLevel === 2 ? "Low" : "Exhausted"
                      }</Badge>
                    </div>
                    <Slider
                      value={[energyLevel]}
                      onValueChange={(val) => setEnergyLevel(val[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Sleep Quality */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2">
                        <Moon className="w-5 h-5 text-indigo-500" />
                        Sleep Quality: {sleepQuality}/5
                      </Label>
                      <Badge variant="outline">{
                        sleepQuality === 5 ? "Excellent" :
                        sleepQuality === 4 ? "Good" :
                        sleepQuality === 3 ? "Fair" :
                        sleepQuality === 2 ? "Poor" : "Very Poor"
                      }</Badge>
                    </div>
                    <Slider
                      value={[sleepQuality]}
                      onValueChange={(val) => setSleepQuality(val[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Stress Level */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2">
                        <Wind className="w-5 h-5 text-red-500" />
                        Stress Level: {stressLevel}/5
                      </Label>
                      <Badge variant="outline">{
                        stressLevel === 5 ? "Very High" :
                        stressLevel === 4 ? "High" :
                        stressLevel === 3 ? "Moderate" :
                        stressLevel === 2 ? "Low" : "Very Low"
                      }</Badge>
                    </div>
                    <Slider
                      value={[stressLevel]}
                      onValueChange={(val) => setStressLevel(val[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Physical Activity */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-500" />
                        Physical Activity: {physicalActivity}/5
                      </Label>
                      <Badge variant="outline">{
                        physicalActivity === 5 ? "Very Active" :
                        physicalActivity === 4 ? "Active" :
                        physicalActivity === 3 ? "Moderate" :
                        physicalActivity === 2 ? "Light" : "Sedentary"
                      }</Badge>
                    </div>
                    <Slider
                      value={[physicalActivity]}
                      onValueChange={(val) => setPhysicalActivity(val[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Social Interaction */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Social Interaction: {socialInteraction}/5
                      </Label>
                      <Badge variant="outline">{
                        socialInteraction === 5 ? "Very Social" :
                        socialInteraction === 4 ? "Social" :
                        socialInteraction === 3 ? "Moderate" :
                        socialInteraction === 2 ? "Limited" : "Isolated"
                      }</Badge>
                    </div>
                    <Slider
                      value={[socialInteraction]}
                      onValueChange={(val) => setSocialInteraction(val[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </motion.div>

                  {/* Physical Symptoms */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Label className="mb-3 block">Physical Symptoms</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {physicalSymptomOptions.map((symptom, index) => (
                        <motion.button
                          key={symptom.value}
                          type="button"
                          onClick={() => toggleSymptom(symptom.value)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg border-2 transition-all text-sm ${
                            physicalSymptoms.includes(symptom.value)
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="text-2xl mb-1">{symptom.icon}</div>
                          <div>{symptom.label}</div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Gratitude */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Label htmlFor="gratitude" className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-pink-500" />
                      Something I'm grateful for today
                    </Label>
                    <Textarea
                      id="gratitude"
                      placeholder="What brought you joy or peace today?"
                      value={gratitude}
                      onChange={(e) => setGratitude(e.target.value)}
                      rows={2}
                    />
                  </motion.div>

                  {/* Notes */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Label htmlFor="notes" className="mb-2 block">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any other thoughts or observations about today?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex gap-3 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      onClick={handleSubmitDetailedLog}
                      className="flex-1 gradient-sky-lavender border-0"
                    >
                      Save Mood Log
                    </Button>
                    <Button
                      onClick={() => setShowDetailedForm(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8"
        >
          {[
            { label: "Avg Mood", value: stats.average, suffix: "/5", icon: Smile, color: "text-primary" },
            { label: "Avg Energy", value: stats.avgEnergy, suffix: "/5", icon: Zap, color: "text-yellow-500" },
            { label: "Avg Sleep", value: stats.avgSleep, suffix: "/5", icon: Moon, color: "text-indigo-500" },
            { label: "Avg Stress", value: stats.avgStress, suffix: "/5", icon: Wind, color: "text-red-500" },
            { label: "Most Common", value: stats.mostCommon, icon: TrendingUp, color: "text-green-500", isText: true },
            { label: "Total Logs", value: stats.totalLogs, icon: Activity, color: "text-blue-500" },
            { label: "Streak", value: `${stats.currentStreak} 🔥`, icon: CheckCircle, color: "text-orange-500", isText: true },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center gap-1">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={stat.isText ? "text-xl" : "text-3xl"}>
                      {stat.isText ? stat.value : (Number(stat.value) > 0 ? stat.value : "—")}
                      {!stat.isText && stat.suffix}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Mood Insights</CardTitle>
              <CardDescription>Visualize your emotional patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="week" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="week">Last 7 Days</TabsTrigger>
                  <TabsTrigger value="month">Last 30 Days</TabsTrigger>
                  <TabsTrigger value="distribution">Distribution</TabsTrigger>
                </TabsList>
                
                <TabsContent value="week">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={last7DaysData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 rounded-lg shadow-lg border">
                                  <p className="text-sm">{payload[0].payload.date}</p>
                                  <p className="font-semibold" style={{ color: payload[0].color }}>
                                    Mood: {payload[0].payload.moodLabel}
                                  </p>
                                  {payload[1] && (
                                    <p className="text-sm" style={{ color: payload[1].color }}>
                                      Energy: {payload[1].value}/5
                                    </p>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#7CB9E8" 
                          strokeWidth={3}
                          dot={{ fill: "#7CB9E8", r: 6 }}
                          activeDot={{ r: 8 }}
                          name="Mood"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="energy" 
                          stroke="#eab308" 
                          strokeWidth={2}
                          dot={{ fill: "#eab308", r: 4 }}
                          name="Energy"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="month">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={last30DaysData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
                        <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                        <Tooltip />
                        <Bar dataKey="mood" fill="#BFA2DB" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="distribution">
                  {moodDistribution.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={moodDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {moodDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col justify-center space-y-4">
                        <h3 className="mb-2">Mood Breakdown</h3>
                        {moodDistribution.map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span>{item.name}</span>
                            </div>
                            <Badge variant="secondary">{item.value} days</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No mood data to display yet</p>
                        <p className="text-sm">Start logging your daily mood to see insights</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-[#7CB9E8]/10 via-[#BFA2DB]/10 to-[#F8C8DC]/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-6 h-6 text-primary shrink-0 mt-1" />
                </motion.div>
                <div>
                  <h3 className="mb-2">Tips for Better Mood Tracking</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Log your mood at the same time each day for consistency</li>
                    <li>• Be honest with yourself - this is a judgment-free space</li>
                    <li>• Track additional factors like sleep, energy, and stress for better insights</li>
                    <li>• Note physical symptoms to identify mind-body connections</li>
                    <li>• Practice gratitude - it can improve your overall wellbeing</li>
                    <li>• Look for patterns in your mood over time</li>
                    <li>• Celebrate your streaks and progress!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
