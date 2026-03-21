import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  MessageSquare, 
  Search, 
  Upload, 
  Loader2, 
  Download, 
  Maximize2, 
  Minimize2, 
  Send, 
  MapPin, 
  Zap, 
  Bot, 
  FileSearch, 
  Trash2,
  ChevronRight,
  Settings,
  X,
  Check,
  AlertCircle,
  History,
  RotateCcw,
  Save,
  Clock
} from "lucide-react";
import { AIService } from "../services/aiService";
import Markdown from "react-markdown";

type ToolType = "image" | "video" | "chat" | "analyze" | "maps";

export default function AIPlayground() {
  const [activeTool, setActiveTool] = useState<ToolType>("image");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string>("");
  const [imageConfig, setImageConfig] = useState({
    size: "1K" as "1K" | "2K" | "4K",
    aspectRatio: "1:1",
    model: "flash" as "flash" | "pro",
    quality: "standard" as "standard" | "high",
    negativePrompt: ""
  });
  const [videoConfig, setVideoConfig] = useState({
    aspectRatio: "16:9" as "16:9" | "9:16"
  });
  const [videoEditConfig, setVideoEditConfig] = useState({
    startTime: 0,
    endTime: 10, // Default max duration for Veo is usually around 5-10s
    playbackSpeed: 1,
    filter: "none" as "none" | "grayscale" | "sepia" | "invert" | "warm" | "cool"
  });
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string; timestamp?: number }[]>([]);
  const [fastMode, setFastMode] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "fetching" | "granted" | "denied" | "manual">("idle");
  const [historyStatus, setHistoryStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load chat history on mount
  useEffect(() => {
    const saved = localStorage.getItem("merinova_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setChatHistory(parsed);
        }
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
  }, []);

  // Auto-save chat history
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("merinova_chat_history", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("merinova_chat_history");
    setHistoryStatus("Chat cleared");
    setTimeout(() => setHistoryStatus(null), 3000);
  };

  const loadPreviousConversations = () => {
    const saved = localStorage.getItem("merinova_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatHistory(parsed);
        setHistoryStatus("History loaded");
      } catch (e) {
        setError("Failed to load history");
      }
    } else {
      setHistoryStatus("No history found");
    }
    setTimeout(() => setHistoryStatus(null), 3000);
  };

  useEffect(() => {
    if (activeTool === "maps") {
      if (navigator.geolocation) {
        setLocationStatus("fetching");
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setLocationStatus("granted");
          },
          (err) => {
            console.warn("Location access denied or error:", err);
            setLocationStatus("denied");
            // Fallback to Addis Ababa
            if (!location) {
              setLocation({ lat: 9.03, lng: 38.74 });
            }
          }
        );
      } else {
        setLocationStatus("denied");
        if (!location) {
          setLocation({ lat: 9.03, lng: 38.74 });
        }
      }
    }
  }, [activeTool]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(reader.result as string);
        setFileMimeType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setFileMimeType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAction = async () => {
    if (!prompt && activeTool !== "maps") {
      setError("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      switch (activeTool) {
        case "image":
          if (imageConfig.model === "flash") {
            const img = await AIService.generateImageFlash(
              prompt, 
              uploadedFile || undefined,
              imageConfig.size,
              imageConfig.aspectRatio
            );
            setResult(img);
          } else {
            const img = await AIService.generateImagePro(
              prompt, 
              imageConfig.size, 
              imageConfig.aspectRatio,
              imageConfig.quality,
              imageConfig.negativePrompt
            );
            setResult(img);
          }
          break;
        case "video":
          setVideoEditConfig({
            startTime: 0,
            endTime: 10,
            playbackSpeed: 1,
            filter: "none"
          });
          const vid = await AIService.generateVideo(prompt, uploadedFile || undefined, videoConfig.aspectRatio);
          setResult(vid);
          break;
        case "chat":
          const userMsg = { role: "user", text: prompt, timestamp: Date.now() };
          setChatHistory(prev => [...prev, userMsg]);
          setPrompt("");
          const botResponse = fastMode 
            ? await AIService.fastResponse(prompt)
            : await AIService.chat(prompt);
          setChatHistory(prev => [...prev, { role: "model", text: botResponse, timestamp: Date.now() }]);
          break;
        case "analyze":
          if (!uploadedFile) {
            setError("Please upload an image or video to analyze.");
            break;
          }
          const analysis = await AIService.analyzeMultimodal(prompt, uploadedFile, fileMimeType);
          setResult(analysis);
          break;
        case "maps":
          const mapRes = await AIService.searchWithMaps(prompt || "What's interesting around me?", location?.lat, location?.lng);
          setResult(mapRes);
          break;
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      if (err.message?.includes("Requested entity was not found")) {
        // Reset key selection if needed
        await AIService.checkAndOpenKeySelector();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const tools = [
    { id: "image", name: "Image Lab", icon: ImageIcon, desc: "Generate & Edit Images" },
    { id: "video", name: "Video Studio", icon: VideoIcon, desc: "Animate with Veo" },
    { id: "chat", name: "AI Assistant", icon: MessageSquare, desc: "Smart Chatbot" },
    { id: "analyze", name: "Analyzer", icon: FileSearch, desc: "Understand Media" },
    { id: "maps", name: "Smart Search", icon: Search, desc: "Maps Grounding" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-brand-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Playground</h1>
          </motion.div>
          <p className="text-xl text-gray-400 max-w-2xl">
            Explore the cutting edge of generative AI. Test image generation, video animation, smart search, and multimodal analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id as ToolType);
                  setResult(null);
                  setError(null);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left border ${
                  activeTool === tool.id 
                    ? "bg-brand-accent/10 border-brand-accent text-white" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                <tool.icon className={`w-5 h-5 ${activeTool === tool.id ? "text-brand-accent" : ""}`} />
                <div>
                  <p className="font-bold text-sm">{tool.name}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">{tool.desc}</p>
                </div>
                {activeTool === tool.id && <ChevronRight className="w-4 h-4 ml-auto text-brand-accent" />}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 min-h-[600px] flex flex-col">
            {/* Tool Specific Controls */}
            <div className="flex-1">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {tools.find(t => t.id === activeTool)?.name}
                  {activeTool === "chat" && fastMode && <Zap className="w-4 h-4 text-brand-accent" />}
                </h2>
                
                {/* Settings / Configs */}
                <div className="flex items-center gap-3">
                  {activeTool === "image" && (
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                      <button 
                        onClick={() => setImageConfig(prev => ({ ...prev, model: "flash" }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${imageConfig.model === "flash" ? "bg-brand-accent text-white" : "text-gray-400 hover:text-white"}`}
                      >
                        Flash
                      </button>
                      <button 
                        onClick={() => setImageConfig(prev => ({ ...prev, model: "pro" }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${imageConfig.model === "pro" ? "bg-brand-accent text-white" : "text-gray-400 hover:text-white"}`}
                      >
                        Pro
                      </button>
                    </div>
                  )}
                  {activeTool === "chat" && (
                    <button 
                      onClick={() => setFastMode(!fastMode)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${fastMode ? "bg-brand-accent/20 border-brand-accent text-brand-accent" : "bg-white/5 border-white/10 text-gray-400"}`}
                    >
                      <Zap className="w-4 h-4" />
                      Fast Mode
                    </button>
                  )}
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-6">
                {/* File Upload for Image/Video tools */}
                {(activeTool === "image" || activeTool === "video" || activeTool === "analyze") && (
                  <div className="relative group">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept={activeTool === "video" || activeTool === "analyze" ? "image/*,video/*" : "image/*"}
                      className="hidden"
                    />
                    {uploadedFile ? (
                      <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                        {fileMimeType.startsWith("video") ? (
                          <video src={uploadedFile} className="w-full h-full object-contain" controls />
                        ) : (
                          <img src={uploadedFile} className="w-full h-full object-contain" alt="Uploaded" />
                        )}
                        <button 
                          onClick={clearFile}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-red-500 transition-colors border border-white/10"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video md:aspect-[21/9] rounded-2xl border-2 border-dashed border-white/10 hover:border-brand-accent/40 hover:bg-brand-accent/5 transition-all flex flex-col items-center justify-center gap-4 group"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8 text-gray-400 group-hover:text-brand-accent" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold">Upload {activeTool === "analyze" ? "Media" : "Reference Image"}</p>
                          <p className="text-xs text-gray-500 mt-1">Drag and drop or click to browse</p>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* Prompt Input */}
                {activeTool !== "chat" && (
                  <div className="space-y-4">
                    {activeTool === "maps" && (
                      <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-5 h-5 ${locationStatus === "granted" ? "text-emerald-500" : locationStatus === "fetching" ? "text-brand-accent animate-pulse" : "text-gray-500"}`} />
                          <span className="text-sm font-medium">
                            {locationStatus === "fetching" ? "Fetching location..." : 
                             locationStatus === "granted" ? "Location detected" : 
                             locationStatus === "denied" ? "Location access denied (using fallback)" : 
                             "Manual location set"}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 ml-auto">
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Lat</label>
                            <input 
                              type="number" 
                              value={location?.lat || ""} 
                              onChange={(e) => {
                                setLocation(prev => ({ ...prev!, lat: parseFloat(e.target.value) }));
                                setLocationStatus("manual");
                              }}
                              className="w-20 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-brand-accent"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Lng</label>
                            <input 
                              type="number" 
                              value={location?.lng || ""} 
                              onChange={(e) => {
                                setLocation(prev => ({ ...prev!, lng: parseFloat(e.target.value) }));
                                setLocationStatus("manual");
                              }}
                              className="w-20 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-brand-accent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={
                          activeTool === "maps" ? "Search for places, restaurants, or landmarks..." :
                          activeTool === "image" ? "Describe the image you want to create or edit..." :
                          activeTool === "video" ? "Describe the animation or scene..." :
                          "Ask a question about the uploaded media..."
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-brand-accent transition-colors min-h-[120px] resize-none text-lg"
                      />
                      
                      {activeTool === "image" && imageConfig.model === "pro" && (
                        <div className="mt-4">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Negative Prompt (Optional)</p>
                          <input 
                            type="text"
                            value={imageConfig.negativePrompt}
                            onChange={(e) => setImageConfig(prev => ({ ...prev, negativePrompt: e.target.value }))}
                            placeholder="What to exclude from the image (e.g., 'blur, low quality, distorted')..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors text-sm"
                          />
                        </div>
                      )}

                      <div className="absolute bottom-4 right-4 flex items-center gap-3">
                        {activeTool === "image" && (
                          <div className="flex items-center gap-3 mr-4 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-2xl">
                            {imageConfig.model === "pro" && (
                              <div className="flex flex-col gap-1">
                                <span className="text-[8px] uppercase tracking-tighter text-gray-400 font-bold px-1">Quality</span>
                                <select 
                                  value={imageConfig.quality}
                                  onChange={(e) => setImageConfig(prev => ({ ...prev, quality: e.target.value as any }))}
                                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold outline-none hover:bg-white/10 transition-colors"
                                  title="Generation Quality"
                                >
                                  <option value="standard">Standard</option>
                                  <option value="high">High Quality</option>
                                </select>
                              </div>
                            )}
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] uppercase tracking-tighter text-gray-400 font-bold px-1">Ratio</span>
                              <select 
                                value={imageConfig.aspectRatio}
                                onChange={(e) => setImageConfig(prev => ({ ...prev, aspectRatio: e.target.value }))}
                                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold outline-none hover:bg-white/10 transition-colors"
                                title="Aspect Ratio"
                              >
                                {["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"].map(ar => (
                                  <option key={ar} value={ar}>{ar}</option>
                                ))}
                              </select>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] uppercase tracking-tighter text-gray-400 font-bold px-1">Size</span>
                              <select 
                                value={imageConfig.size}
                                onChange={(e) => setImageConfig(prev => ({ ...prev, size: e.target.value as any }))}
                                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold outline-none hover:bg-white/10 transition-colors"
                                title="Image Size"
                              >
                                {["1K", "2K", "4K"].map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        {activeTool === "video" && (
                          <div className="flex items-center gap-3 mr-4 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-2xl">
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] uppercase tracking-tighter text-gray-400 font-bold px-1">Ratio</span>
                              <select 
                                value={videoConfig.aspectRatio}
                                onChange={(e) => setVideoConfig(prev => ({ ...prev, aspectRatio: e.target.value as any }))}
                                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold outline-none hover:bg-white/10 transition-colors"
                              >
                                <option value="16:9">16:9 Landscape</option>
                                <option value="9:16">9:16 Portrait</option>
                              </select>
                            </div>
                          </div>
                        )}
                        <button
                          onClick={handleAction}
                          disabled={isLoading || (!prompt && activeTool !== "maps")}
                          className="bg-brand-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-accent/90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-brand-accent/20"
                        >
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                          {activeTool === "image" ? "Generate" : activeTool === "video" ? "Animate" : activeTool === "maps" ? "Search" : "Analyze"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Interface */}
                {activeTool === "chat" && (
                  <div className="flex flex-col h-[500px]">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={loadPreviousConversations}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                        >
                          <History className="w-3 h-3" />
                          Load History
                        </button>
                        <button 
                          onClick={clearChatHistory}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                          Clear
                        </button>
                      </div>
                      <AnimatePresence>
                        {historyStatus && (
                          <motion.span 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[10px] font-bold uppercase tracking-widest text-brand-accent flex items-center gap-2"
                          >
                            <Check className="w-3 h-3" />
                            {historyStatus}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar mb-6">
                      {chatHistory.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <Bot className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="font-bold">AI Assistant Ready</p>
                            <p className="text-sm">Ask me anything about Merikeb's portfolio or AI capabilities.</p>
                          </div>
                        </div>
                      )}
                      {chatHistory.map((msg, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                        >
                          <div className={`max-w-[80%] p-4 rounded-2xl ${
                            msg.role === "user" 
                              ? "bg-brand-accent text-white rounded-tr-none" 
                              : "bg-white/10 text-gray-200 rounded-tl-none border border-white/10"
                          }`}>
                            <div className="markdown-body text-sm">
                              <Markdown>{msg.text}</Markdown>
                            </div>
                          </div>
                          {msg.timestamp && (
                            <span className="text-[9px] text-gray-600 mt-1 px-1 flex items-center gap-1">
                              <Clock className="w-2 h-2" />
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </motion.div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="relative">
                      <input 
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAction()}
                        placeholder="Type your message..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-brand-accent transition-colors"
                      />
                      <button 
                        onClick={handleAction}
                        disabled={isLoading || !prompt}
                        className="absolute right-2 top-2 w-12 h-12 rounded-xl bg-brand-accent text-white flex items-center justify-center hover:bg-brand-accent/90 transition-all disabled:opacity-50"
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Results Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  {result && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <Check className="text-emerald-500 w-5 h-5" />
                          Generated Result
                        </h3>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setResult(null)}
                            className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
                          >
                            Clear
                          </button>
                          {activeTool === "video" && (
                            <button 
                              onClick={() => {
                                setVideoEditConfig({
                                  startTime: 0,
                                  endTime: (document.getElementById('preview-video') as HTMLVideoElement)?.duration || 10,
                                  playbackSpeed: 1,
                                  filter: "none"
                                });
                                const video = document.getElementById('preview-video') as HTMLVideoElement;
                                if (video) video.playbackRate = 1;
                              }}
                              className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
                            >
                              Reset Edits
                            </button>
                          )}
                          {typeof result === "string" && (result.startsWith("data:") || result.startsWith("blob:")) && (
                            <a 
                              href={result} 
                              download={`generated-${activeTool}-${Date.now()}`}
                              className="flex items-center gap-2 text-xs font-bold text-brand-accent hover:underline"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/40">
                        {activeTool === "image" && typeof result === "string" && (
                          <img src={result} className="w-full h-auto" alt="Generated" />
                        )}
                        {activeTool === "video" && typeof result === "string" && (
                          <div className="space-y-4">
                            <div className="relative group">
                              <video 
                                id="preview-video"
                                src={result} 
                                className="w-full h-auto transition-all duration-500" 
                                style={{ 
                                  filter: videoEditConfig.filter === "grayscale" ? "grayscale(100%)" :
                                          videoEditConfig.filter === "sepia" ? "sepia(100%)" :
                                          videoEditConfig.filter === "invert" ? "invert(100%)" :
                                          videoEditConfig.filter === "warm" ? "sepia(30%) saturate(140%) hue-rotate(-10deg)" :
                                          videoEditConfig.filter === "cool" ? "brightness(110%) saturate(120%) hue-rotate(180deg)" : "none"
                                }}
                                controls 
                                autoPlay 
                                loop 
                                onLoadedMetadata={(e) => {
                                  const video = e.currentTarget;
                                  setVideoEditConfig(prev => ({ ...prev, endTime: video.duration }));
                                }}
                                onTimeUpdate={(e) => {
                                  const video = e.currentTarget;
                                  if (video.currentTime < videoEditConfig.startTime) {
                                    video.currentTime = videoEditConfig.startTime;
                                  }
                                  if (video.currentTime > videoEditConfig.endTime) {
                                    video.currentTime = videoEditConfig.startTime;
                                  }
                                }}
                              />
                            </div>

                            <div className="p-6 bg-white/5 border-t border-white/10 space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Trimming Controls */}
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Trim Clip</p>
                                    <span className="text-[10px] font-mono text-brand-accent">
                                      {videoEditConfig.startTime.toFixed(1)}s - {videoEditConfig.endTime.toFixed(1)}s
                                    </span>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex flex-col gap-1">
                                      <label className="text-[10px] text-gray-500">Start Time</label>
                                      <input 
                                        type="range" 
                                        min="0" 
                                        max={videoEditConfig.endTime} 
                                        step="0.1"
                                        value={videoEditConfig.startTime}
                                        onChange={(e) => setVideoEditConfig(prev => ({ ...prev, startTime: parseFloat(e.target.value) }))}
                                        className="w-full accent-brand-accent"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <label className="text-[10px] text-gray-500">End Time</label>
                                      <input 
                                        type="range" 
                                        min={videoEditConfig.startTime} 
                                        max={document.getElementById('preview-video')?.getAttribute('duration') || 10} 
                                        step="0.1"
                                        value={videoEditConfig.endTime}
                                        onChange={(e) => setVideoEditConfig(prev => ({ ...prev, endTime: parseFloat(e.target.value) }))}
                                        className="w-full accent-brand-accent"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Playback & Filters */}
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Playback & Filters</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] text-gray-500">Speed</label>
                                      <select 
                                        value={videoEditConfig.playbackSpeed}
                                        onChange={(e) => {
                                          const speed = parseFloat(e.target.value);
                                          setVideoEditConfig(prev => ({ ...prev, playbackSpeed: speed }));
                                          const video = document.getElementById('preview-video') as HTMLVideoElement;
                                          if (video) video.playbackRate = speed;
                                        }}
                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                                      >
                                        <option value="0.5">0.5x Slow</option>
                                        <option value="1">1.0x Normal</option>
                                        <option value="1.5">1.5x Fast</option>
                                        <option value="2">2.0x Double</option>
                                      </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] text-gray-500">Filter</label>
                                      <select 
                                        value={videoEditConfig.filter}
                                        onChange={(e) => setVideoEditConfig(prev => ({ ...prev, filter: e.target.value as any }))}
                                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                                      >
                                        <option value="none">Original</option>
                                        <option value="grayscale">Grayscale</option>
                                        <option value="sepia">Vintage</option>
                                        <option value="invert">Invert</option>
                                        <option value="warm">Warm</option>
                                        <option value="cool">Cool</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTool === "analyze" && (
                          <div className="p-8 markdown-body text-gray-200">
                            <Markdown>{result}</Markdown>
                          </div>
                        )}
                        {activeTool === "maps" && (
                          <div className="p-8 space-y-6">
                            <div className="markdown-body text-gray-200">
                              <Markdown>{result.text}</Markdown>
                            </div>
                            {result.grounding && result.grounding.length > 0 && (
                              <div className="pt-6 border-t border-white/10">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Sources & Locations</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                  {result.grounding.map((chunk: any, idx: number) => (
                                    chunk.web && (
                                      <a 
                                        key={idx}
                                        href={chunk.web.uri}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                                          <MapPin className="w-4 h-4 text-brand-accent group-hover:text-white" />
                                        </div>
                                        <div className="overflow-hidden">
                                          <p className="text-xs font-bold truncate">{chunk.web.title || "Location Source"}</p>
                                          <p className="text-[10px] text-gray-500 truncate">{chunk.web.uri}</p>
                                        </div>
                                      </a>
                                    )
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
