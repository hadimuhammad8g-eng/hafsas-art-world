import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, MessageSquare, Search, Download, Play, Send, Loader as Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface Note {
  id: string;
  subject: string;
  topic: string;
  description: string;
  pdf_url: string;
  uploaded_at: string;
}

interface VideoLecture {
  id: string;
  title: string;
  subject: string;
  duration: string;
  thumbnail_url: string;
  video_url: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const subjects = ["All Subjects", "Mathematics", "Physics", "Chemistry", "Computer Science", "Statistics"];

const StudyVault = () => {
  const [activeSection, setActiveSection] = useState<"notes" | "videos" | "chat">("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("uploaded_at", { ascending: false });
      if (error) throw error;
      return data as Note[];
    },
  });

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ["video_lectures"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("video_lectures")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as VideoLecture[];
    },
  });

  const filteredNotes = notes?.filter((note) => {
    const matchesSearch = note.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All Subjects" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const filteredVideos = videos?.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All Subjects" || video.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isSending) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { message: userMessage },
      });

      if (error) throw error;

      setChatMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error: any) {
      toast.error("Failed to get response. Please try again.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const scrollToSection = (section: "notes" | "videos" | "chat") => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                StudyVault
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("notes")}
                className={`text-sm font-medium transition-colors ${
                  activeSection === "notes" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => scrollToSection("videos")}
                className={`text-sm font-medium transition-colors ${
                  activeSection === "videos" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Video Lectures
              </button>
              <button
                onClick={() => scrollToSection("chat")}
                className={`text-sm font-medium transition-colors ${
                  activeSection === "chat" ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                AI Assistant
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
          >
            Study Smarter<br />Not Harder
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Access comprehensive study notes, video lectures, and get instant answers to your questions with our AI assistant
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => scrollToSection("notes")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Notes Section */}
      <section id="notes" className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Study Notes</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {notesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes?.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {note.subject}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(note.uploaded_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{note.topic}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{note.description}</p>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-md transition-all">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Lectures Section */}
      <section id="videos" className="py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <Video className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Video Lectures</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {videosLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos?.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-video bg-gray-900">
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
                      {video.subject}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{video.title}</h3>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-md transition-all">
                      <Play className="w-4 h-4" />
                      Watch Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI Chat Section */}
      <section id="chat" className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Ask AI Assistant</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Ask me anything about your studies!</p>
                  <p className="text-sm text-gray-400 mt-2">I'm here to help you understand concepts better</p>
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))
              )}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isSending}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isSending || !chatInput.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">StudyVault</h3>
              </div>
              <p className="text-gray-400 text-sm">Your comprehensive study companion for academic success</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#notes" className="hover:text-white transition-colors">Study Notes</a></li>
                <li><a href="#videos" className="hover:text-white transition-colors">Video Lectures</a></li>
                <li><a href="#chat" className="hover:text-white transition-colors">AI Assistant</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Subjects</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Mathematics</li>
                <li>Physics</li>
                <li>Chemistry</li>
                <li>Computer Science</li>
                <li>Statistics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 StudyVault. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudyVault;
