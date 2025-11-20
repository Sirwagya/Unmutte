import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { BookOpen, Plus, Edit, Trash2, Search, Calendar, Smile, Meh, Frown, Heart, AlertCircle, CheckCircle, Download, Upload, TrendingUp, TrendingDown, Minus, BarChart3, Activity, Mic, MicOff, Languages } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: "great" | "good" | "okay" | "sad" | "anxious";
  date: string;
  timestamp: number;
}

const moodOptions = [
  { value: "great", label: "Great", icon: Smile, color: "bg-green-500", emoji: "😊" },
  { value: "good", label: "Good", icon: CheckCircle, color: "bg-blue-500", emoji: "🙂" },
  { value: "okay", label: "Okay", icon: Meh, color: "bg-yellow-500", emoji: "😐" },
  { value: "sad", label: "Sad", icon: Frown, color: "bg-orange-500", emoji: "😢" },
  { value: "anxious", label: "Anxious", icon: AlertCircle, color: "bg-red-500", emoji: "😰" },
];

export function MoodJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState<string>("all");
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<JournalEntry["mood"]>("okay");
  
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("unmutte_journal_entries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.maxAlternatives = 1;
      
      // Set default language but allow browser to detect others
      recognitionInstance.lang = 'en-US';
      
      setRecognition(recognitionInstance);
      
      console.log('Voice recognition initialized successfully');
    } else {
      console.warn('Voice recognition not supported in this browser');
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("unmutte_journal_entries", JSON.stringify(entries));
    }
  }, [entries]);

  const handleAddEntry = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    if (editingEntry) {
      // Update existing entry
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, title, content, mood, date: new Date().toISOString().split('T')[0] || "" }
          : entry
      ));
      toast.success("Journal entry updated successfully!");
    } else {
      // Add new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title,
        content,
        mood,
        date: new Date().toISOString().split('T')[0] || "",
        timestamp: Date.now(),
      };
      setEntries([newEntry, ...entries]);
      toast.success("Journal entry added successfully!");
    }

    resetForm();
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setIsDialogOpen(true);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success("Journal entry deleted");
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("okay");
    setEditingEntry(null);
    setIsDialogOpen(false);
    setDetectedLanguage(null);
    if (isRecording && recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  // Mock AI translation function (simulates translation from various languages to English)
  const translateToEnglish = async (text: string, sourceLang: string): Promise<string> => {
    // In production, this would call an actual translation API
    // For demo purposes, we'll simulate translation delay and return the text
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsProcessing(false);

    // Mock translations for common phrases in different languages
    const mockTranslations: Record<string, Record<string, string>> = {
      hi: {
        "मैं आज बहुत खुश हूं": "I am very happy today",
        "मुझे चिंता हो रही है": "I am feeling anxious",
        "आज का दिन अच्छा था": "Today was a good day",
        "मैं उदास महसूस कर रहा हूं": "I am feeling sad",
        "मैं अच्छा महसूस कर रहा हूं": "I am feeling good",
        "आज मैं बहुत परेशान हूं": "Today I am very worried",
        "मुझे खुशी हो रही है": "I am feeling happy",
      },
      es: {
        "estoy muy feliz hoy": "I am very happy today",
        "me siento ansioso": "I am feeling anxious",
        "hoy fue un buen día": "today was a good day",
        "me siento triste": "I am feeling sad",
      },
      fr: {
        "je suis très heureux aujourd'hui": "I am very happy today",
        "je me sens anxieux": "I am feeling anxious",
        "aujourd'hui était une bonne journée": "today was a good day",
      },
      de: {
        "ich bin heute sehr glücklich": "I am very happy today",
        "ich fühle mich ängstlich": "I am feeling anxious",
      },
      it: {
        "sono molto felice oggi": "I am very happy today",
        "mi sento ansioso": "I am feeling anxious",
      },
      pt: {
        "estou muito feliz hoje": "I am very happy today",
        "estou me sentindo ansioso": "I am feeling anxious",
      },
    };

    // Check if we have a mock translation
    const langTranslations = mockTranslations[sourceLang];
    if (langTranslations) {
      const lowercaseText = text.toLowerCase().trim();
      if (langTranslations[lowercaseText]) {
        return langTranslations[lowercaseText];
      }
    }

    // If no mock translation or already in English, return original text
    // In production, this would call the translation API
    return text;
  };

  const startVoiceRecording = () => {
    if (!recognition) {
      toast.error("Voice recognition is not supported in this browser", {
        description: "Please try using Chrome, Edge, or Safari"
      });
      return;
    }

    // Stop any existing recognition
    try {
      recognition.stop();
    } catch (e) {
      // Ignore errors if recognition isn't running
    }

    try {
      // Configure recognition for multi-language support
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setIsRecording(true);
        toast.success("🎤 Microphone Active", {
          description: "Speak naturally in any language. Click mic to stop."
        });
      };

      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            // Detect language
            const detectedLang = detectLanguage(transcript);
            setDetectedLanguage(detectedLang);
            
            // Process translation
            (async () => {
              let translatedText = transcript;
              if (detectedLang !== 'en' && detectedLang !== 'unknown') {
                toast.info(`🌐 ${getLanguageName(detectedLang)} detected`, {
                  description: "Translating to English..."
                });
                translatedText = await translateToEnglish(transcript, detectedLang);
              }
              
              // Append to content
              setContent(prev => {
                const separator = prev.trim() ? ' ' : '';
                return prev + separator + translatedText.trim();
              });
            })();
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        if (event.error === 'no-speech') {
          toast.warning("No speech detected", {
            description: "Try speaking louder or check your microphone"
          });
        } else if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          toast.error("Microphone access denied", {
            description: "Please allow microphone access in your browser settings"
          });
        } else if (event.error === 'aborted') {
          // Normal stop, don't show error
        } else {
          toast.error("Voice recognition error: " + event.error, {
            description: "Please try again"
          });
        }
      };

      recognition.onend = () => {
        if (isRecording) {
          setIsRecording(false);
          toast.info("Recording stopped");
        }
      };

      // Start recognition
      recognition.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      toast.error("Failed to start voice recording", {
        description: "Please check your microphone permissions"
      });
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    if (recognition && isRecording) {
      try {
        recognition.stop();
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recognition:', error);
        setIsRecording(false);
      }
    }
  };

  // Enhanced language detection based on character patterns and common words
  const detectLanguage = (text: string): string => {
    // Devanagari script (Hindi, Marathi, Sanskrit, Nepali)
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    
    // Chinese characters (Simplified and Traditional)
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
    
    // Arabic script (Arabic, Urdu, Persian)
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    
    // Japanese (Hiragana, Katakana, Kanji)
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';
    
    // Korean (Hangul)
    if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';
    
    // Bengali script
    if (/[\u0980-\u09FF]/.test(text)) return 'bn';
    
    // Tamil script
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';
    
    // Telugu script
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te';
    
    // Gujarati script
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu';
    
    // Punjabi script (Gurmukhi)
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa';
    
    // Spanish common words and patterns
    if (/\b(estoy|muy|hoy|me|siento|tengo|día|bueno|malo|feliz|triste|soy|está|que)\b/i.test(text)) return 'es';
    
    // French common words
    if (/\b(je|suis|très|aujourd'hui|mon|ma|mes|avec|être|avoir|bon|mauvais)\b/i.test(text)) return 'fr';
    
    // German common words
    if (/\b(ich|bin|sehr|heute|mein|mit|gut|schlecht|aber|und|der|die|das)\b/i.test(text)) return 'de';
    
    // Italian common words
    if (/\b(sono|molto|oggi|mio|con|buono|cattivo|ma|che|il|la|lo)\b/i.test(text)) return 'it';
    
    // Portuguese common words
    if (/\b(estou|muito|hoje|meu|com|bom|ruim|mas|que|o|a|os|as)\b/i.test(text)) return 'pt';
    
    // Russian common words or Cyrillic script
    if (/[\u0400-\u04FF]/.test(text) || /\b(я|это|очень|сегодня|мой|хорошо|плохо)\b/i.test(text)) return 'ru';
    
    // Default to English if only Latin characters
    if (/^[a-zA-Z\s.,!?'"]+$/.test(text)) return 'en';
    
    return 'unknown';
  };

  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      en: 'English',
      hi: 'Hindi',
      es: 'Spanish',
      fr: 'French',
      zh: 'Chinese',
      ar: 'Arabic',
      ja: 'Japanese',
      ko: 'Korean',
      bn: 'Bengali',
      ta: 'Tamil',
      te: 'Telugu',
      gu: 'Gujarati',
      pa: 'Punjabi',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
    };
    return languages[code] || 'Unknown';
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = filterMood === "all" || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  const getMoodData = (moodValue: string) => {
    return moodOptions.find(option => option.value === moodValue);
  };

  const handleExportEntries = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `unmutte-journal-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Journal entries exported successfully!");
  };

  const handleImportEntries = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedEntries = JSON.parse(e.target?.result as string);
        setEntries([...importedEntries, ...entries]);
        toast.success(`Imported ${importedEntries.length} entries successfully!`);
      } catch (error) {
        toast.error("Failed to import entries. Please check the file format.");
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset input
  };

  // Calculate statistics
  const calculateStats = () => {
    if (entries.length === 0) return null;

    // Mood distribution
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent trend (last 7 days vs previous 7 days)
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

    const recentEntries = entries.filter(e => e.timestamp > sevenDaysAgo);
    const previousEntries = entries.filter(e => e.timestamp > fourteenDaysAgo && e.timestamp <= sevenDaysAgo);

    const getMoodScore = (mood: string) => {
      const scores = { great: 5, good: 4, okay: 3, sad: 2, anxious: 1 };
      return scores[mood as keyof typeof scores] || 3;
    };

    const recentAvg = recentEntries.length > 0
      ? recentEntries.reduce((sum, e) => sum + getMoodScore(e.mood), 0) / recentEntries.length
      : 0;

    const previousAvg = previousEntries.length > 0
      ? previousEntries.reduce((sum, e) => sum + getMoodScore(e.mood), 0) / previousEntries.length
      : 0;

    let trend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentAvg > previousAvg + 0.3) trend = 'improving';
    else if (recentAvg < previousAvg - 0.3) trend = 'declining';

    // Streak calculation
    const sortedDates = [...new Set(entries.map(e => e.date))].sort().reverse();
    let streak = 0;
    let currentDate = new Date();
    
    for (const date of sortedDates) {
      const entryDate = new Date(date);
      const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else if (diffDays > streak) {
        break;
      }
    }

    // Weekly distribution
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const weeklyData = last7Days.map(date => {
      const dayEntries = entries.filter(e => e.date === date);
      const avgMood = dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + getMoodScore(e.mood), 0) / dayEntries.length
        : 0;
      
      return {
        date: new Date(date || "").toLocaleDateString('en-US', { weekday: 'short' }),
        count: dayEntries.length,
        mood: avgMood,
      };
    });

    return {
      totalEntries: entries.length,
      moodCounts,
      trend,
      trendValue: recentAvg - previousAvg,
      streak,
      recentEntries: recentEntries.length,
      weeklyData,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h1 className="mb-4 text-gray-900">Mood Journal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your emotional journey. Writing helps you process feelings and identify patterns in your emotional wellbeing.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterMood} onValueChange={setFilterMood}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Moods</SelectItem>
                    {moodOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.emoji} {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportEntries}
                    className="hidden"
                    id="import-journal"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("import-journal")?.click()}
                    disabled={false}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExportEntries}
                    disabled={entries.length === 0}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gradient-sky-lavender border-0" onClick={() => resetForm()}>
                        <Plus className="w-5 h-5 mr-2" />
                        New Entry
                      </Button>
                    </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingEntry ? "Edit Entry" : "New Journal Entry"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="mood">How are you feeling?</Label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                          {moodOptions.map(option => (
                            <button
                              key={option.value}
                              onClick={() => setMood(option.value as JournalEntry["mood"])}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                mood === option.value
                                  ? "border-primary bg-primary/10 scale-105"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="text-3xl mb-1">{option.emoji}</div>
                              <div className="text-xs">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="Give your entry a title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="content">Your thoughts...</Label>
                          <div className="flex items-center gap-2">
                            {detectedLanguage && detectedLanguage !== 'en' && (
                              <Badge variant="outline" className="text-xs gap-1">
                                <Languages className="w-3 h-3" />
                                {getLanguageName(detectedLanguage)} → English
                              </Badge>
                            )}
                            {isProcessing && (
                              <Badge variant="outline" className="text-xs">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                  Translating...
                                </div>
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <Textarea
                            id="content"
                            placeholder="Write or speak freely about your feelings, thoughts, and experiences..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={`min-h-[250px] resize-none pr-14 transition-all ${
                              isRecording ? "ring-2 ring-red-500 ring-offset-2" : ""
                            }`}
                          />
                          {isRecording && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute top-3 left-3 flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs shadow-lg"
                            >
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-2 h-2 bg-white rounded-full"
                              />
                              <span>Listening...</span>
                            </motion.div>
                          )}
                          <div className="absolute right-3 bottom-3 flex flex-col gap-2">
                            <motion.button
                              type="button"
                              whileHover={{ scale: recognition ? 1.05 : 1 }}
                              whileTap={{ scale: recognition ? 0.95 : 1 }}
                              onClick={recognition ? (isRecording ? stopVoiceRecording : startVoiceRecording) : undefined}
                              disabled={!recognition}
                              className={`p-3 rounded-full transition-all shadow-lg relative ${
                                !recognition
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : isRecording
                                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/50 animate-pulse"
                                  : "bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] hover:from-[#6AA8D7] hover:to-[#AE91CA] text-white"
                              }`}
                              title={!recognition ? "Voice input not supported in this browser" : isRecording ? "Stop recording" : "Start voice recording"}
                            >
                              {isRecording ? (
                                <>
                                  <MicOff className="w-5 h-5 relative z-10" />
                                  <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="absolute inset-0 rounded-full bg-red-400"
                                  />
                                </>
                              ) : (
                                <Mic className="w-5 h-5" />
                              )}
                            </motion.button>
                          </div>
                        </div>
                        {recognition ? (
                          <div className="mt-2 p-3 rounded-lg bg-gradient-to-r from-[#7CB9E8]/10 to-[#BFA2DB]/10 border border-primary/20">
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                              <Languages className="w-3 h-3" />
                              <span>
                                <strong>AI Voice Journaling Active:</strong> Click the microphone and speak in any language (Hindi, English, Spanish, etc.). 
                                Your speech will be automatically transcribed and translated to English.
                              </span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" />
                            Voice journaling is not available in this browser. Please use Chrome, Edge, or Safari for voice features.
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={resetForm}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddEntry} className="gradient-sky-lavender border-0">
                          {editingEntry ? "Update Entry" : "Save Entry"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
                </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journal Tracker & Statistics */}
        {entries.length > 0 && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                    <CardTitle>Journal Tracker & Progress</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-1">
                    {stats.totalEntries} {stats.totalEntries === 1 ? 'Entry' : 'Entries'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {/* Streak Card */}
                  <Card className="bg-gradient-to-br from-[#7CB9E8]/10 to-[#BFA2DB]/10 border-[#7CB9E8]/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Activity className="w-5 h-5 text-[#7CB9E8]" />
                        <span className="text-2xl">🔥</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                      <p className="text-2xl">{stats.streak} {stats.streak === 1 ? 'day' : 'days'}</p>
                    </CardContent>
                  </Card>

                  {/* This Week Card */}
                  <Card className="bg-gradient-to-br from-[#A8E6CF]/10 to-[#7CB9E8]/10 border-[#A8E6CF]/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-5 h-5 text-[#A8E6CF]" />
                        <span className="text-2xl">📝</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">This Week</p>
                      <p className="text-2xl">{stats.recentEntries} {stats.recentEntries === 1 ? 'entry' : 'entries'}</p>
                    </CardContent>
                  </Card>

                  {/* Mood Trend Card */}
                  <Card className="bg-gradient-to-br from-[#F8C8DC]/10 to-[#BFA2DB]/10 border-[#F8C8DC]/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        {stats.trend === 'improving' ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : stats.trend === 'declining' ? (
                          <TrendingDown className="w-5 h-5 text-orange-500" />
                        ) : (
                          <Minus className="w-5 h-5 text-blue-500" />
                        )}
                        <span className="text-2xl">
                          {stats.trend === 'improving' ? '📈' : stats.trend === 'declining' ? '📉' : '➡️'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Mood Trend</p>
                      <p className={`text-lg capitalize ${
                        stats.trend === 'improving' ? 'text-green-600' :
                        stats.trend === 'declining' ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        {stats.trend}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Most Common Mood */}
                  <Card className="bg-gradient-to-br from-[#BFA2DB]/10 to-[#F8C8DC]/10 border-[#BFA2DB]/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Heart className="w-5 h-5 text-[#BFA2DB]" />
                        <span className="text-2xl">
                          {moodOptions.find(m => m.value === Object.keys(stats.moodCounts).reduce((a, b) => 
                            (stats.moodCounts[a] || 0) > (stats.moodCounts[b] || 0) ? a : b
                          ))?.emoji}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Common Mood</p>
                      <p className="text-lg capitalize">
                        {Object.keys(stats.moodCounts).reduce((a, b) => 
                          (stats.moodCounts[a] || 0) > (stats.moodCounts[b] || 0) ? a : b
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Weekly Activity Chart */}
                  <div>
                    <h4 className="mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      7-Day Activity
                    </h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="date" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="count" fill="#7CB9E8" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Mood Distribution */}
                  <div>
                    <h4 className="mb-4 flex items-center gap-2">
                      <Smile className="w-5 h-5 text-primary" />
                      Mood Distribution
                    </h4>
                    <div className="space-y-3">
                      {moodOptions.map(mood => {
                        const count = stats.moodCounts[mood.value] || 0;
                        const percentage = stats.totalEntries > 0 
                          ? ((count / stats.totalEntries) * 100).toFixed(0)
                          : 0;
                        
                        return (
                          <div key={mood.value} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <span className="text-lg">{mood.emoji}</span>
                                <span>{mood.label}</span>
                              </span>
                              <span className="text-muted-foreground">
                                {count} ({percentage}%)
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${mood.color} transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Improvement Message */}
                {stats.trend === 'improving' && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-green-900 mb-1">
                          Great progress! 🎉
                        </p>
                        <p className="text-sm text-green-700">
                          Your mood has been trending upward over the past week. Keep up the great work on your emotional wellness journey!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {stats.streak >= 7 && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-blue-900 mb-1">
                          Amazing streak! 🔥
                        </p>
                        <p className="text-sm text-blue-700">
                          You've journaled for {stats.streak} days in a row! Regular journaling helps build emotional awareness and resilience.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Entries List */}
        {filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-12">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="mb-2 text-muted-foreground">No entries yet</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || filterMood !== "all" 
                    ? "No entries match your search criteria" 
                    : "Start your emotional wellness journey by creating your first entry"}
                </p>
                {!searchTerm && filterMood === "all" && (
                  <Button 
                    onClick={() => setIsDialogOpen(true)}
                    className="gradient-sky-lavender border-0"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Entry
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry, index) => {
                const moodData = getMoodData(entry.mood);
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={`${moodData?.color} text-white border-0`}>
                                {moodData?.emoji} {moodData?.label}
                              </Badge>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(entry.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                            <CardTitle className="text-xl">{entry.title}</CardTitle>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEditEntry(entry)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your journal entry.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteEntry(entry.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{entry.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
