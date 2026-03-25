"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Sparkles,
  Wand2,
  BookOpen,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  Upload,
  FileText,
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Database,
  Brain,
  X,
  Check,
  Loader2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

// Sample prediction data for charts
const predictionData = [
  { month: "Jan", actual: 65, predicted: 62, confidence: 95 },
  { month: "Feb", actual: 72, predicted: 70, confidence: 97 },
  { month: "Mar", actual: 68, predicted: 71, confidence: 94 },
  { month: "Apr", actual: 85, predicted: 82, confidence: 96 },
  { month: "May", actual: 91, predicted: 88, confidence: 97 },
  { month: "Jun", actual: 88, predicted: 90, confidence: 98 },
];

const modelPerformance = [
  { name: "Random Forest", accuracy: 94.2, speed: 85 },
  { name: "Neural Network", accuracy: 96.8, speed: 72 },
  { name: "XGBoost", accuracy: 95.5, speed: 88 },
];

const growthArchive = [
  {
    title: "Sales Forecast",
    date: "2024-01-15",
    model: "Random Forest",
    accuracy: "94.2%",
  },
  {
    title: "Customer Churn",
    date: "2024-01-12",
    model: "Neural Network",
    accuracy: "96.8%",
  },
  {
    title: "Revenue Prediction",
    date: "2024-01-10",
    model: "XGBoost",
    accuracy: "95.5%",
  },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProspexMLPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<{
    predictions: number[];
    confidence: number;
    model: string;
  } | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("Random Forest");
  const [datasetPreview, setDatasetPreview] = useState<string[][]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);
    setPredictionResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", selectedModel);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setUploadedFile(file);
      setDatasetPreview(data.preview || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, [selectedModel]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith(".csv") || file.name.endsWith(".json"))) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handlePredict = async () => {
    if (!uploadedFile) return;

    setIsPredicting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("model", selectedModel);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setIsPredicting(false);
    }
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setDatasetPreview([]);
    setPredictionResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide broken video; CSS fallback background takes over
            (e.target as HTMLVideoElement).style.display = "none";
          }}
        >
          <source
            src="/bg.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - 52% */}
        <div className="w-full lg:w-[52%] min-h-screen p-4 lg:p-6 relative">
          {/* Glass overlay container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="liquid-glass-strong absolute inset-4 lg:inset-6 rounded-3xl flex flex-col overflow-visible"
          >
            {/* Navigation */}
            <nav className="flex items-center justify-between p-4 lg:p-6">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Prospex ML" className="w-8 h-8" />
                <span className="text-white font-semibold text-2xl tracking-tighter">
                  prospex ml
                </span>
              </div>
              <button className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
                <Menu className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-sm">Menu</span>
              </button>
            </nav>

            {/* Hero Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="text-center max-w-2xl"
              >
                {/* Logo */}
                <motion.div
                  variants={fadeInUp}
                  className="mb-8 flex justify-center"
                >
                  <div className="w-20 h-20 rounded-2xl liquid-glass-strong flex items-center justify-center">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl lg:text-7xl tracking-[-0.05em] text-white font-medium leading-tight mb-8"
                >
                  Innovating the{" "}
                  <em className="font-serif text-white/80 italic">
                    spirit of prediction
                  </em>
                </motion.h1>

                {/* File Upload Area */}
                <motion.div variants={fadeInUp} className="mb-8">
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className="liquid-glass rounded-2xl p-8 cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      className="hidden"
                    />
                    {uploadedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-6 h-6 text-white/80" />
                        <span className="text-white/80">{uploadedFile.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearUpload();
                          }}
                          className="ml-2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <X className="w-4 h-4 text-white/80" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="w-8 h-8 text-white/60" />
                        <span className="text-white/60">
                          Drop your dataset here (CSV/JSON)
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={fadeInUp} className="mb-6">
                  <button
                    onClick={handlePredict}
                    disabled={!uploadedFile || isPredicting}
                    className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-3 mx-auto hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPredicting ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                        <Download className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="text-white font-medium">
                      {isPredicting ? "Processing..." : "Run Prediction"}
                    </span>
                  </button>
                </motion.div>

                {/* Model Pills */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap justify-center gap-3 mb-8"
                >
                  {["Random Forest", "Neural Network", "XGBoost"].map((model) => (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`liquid-glass px-4 py-2 rounded-full text-xs transition-all hover:scale-105 ${
                        selectedModel === model
                          ? "text-white ring-1 ring-white/30"
                          : "text-white/80"
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </motion.div>

                {/* Prediction Result */}
                <AnimatePresence>
                  {predictionResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="liquid-glass rounded-2xl p-6 text-left"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Check className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">
                          Prediction Complete
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-white/50 text-xs uppercase tracking-wider">
                            Model Used
                          </span>
                          <p className="text-white">{predictionResult.model}</p>
                        </div>
                        <div>
                          <span className="text-white/50 text-xs uppercase tracking-wider">
                            Confidence
                          </span>
                          <p className="text-white">
                            {(predictionResult.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="liquid-glass rounded-2xl p-4 text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Bottom Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 lg:p-8"
            >
              <p className="text-xs tracking-widest uppercase text-white/50 mb-4">
                Visionary Design
              </p>
              <blockquote className="text-white/80 text-lg mb-4">
                "Turning data into{" "}
                <em className="font-serif italic">future certainty</em>."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-white/60 text-xs tracking-wider">
                  MARCUS AURELIO
                </span>
                <div className="flex-1 h-px bg-white/20" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Panel - 48% (Desktop Only) */}
        <div className="hidden lg:flex w-[48%] min-h-screen p-6 flex-col">
          {/* Top Bar */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInRight}
            className="flex items-center justify-between mb-6"
          >
            <div className="liquid-glass px-4 py-2 rounded-full flex items-center gap-4">
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <ArrowRight className="w-4 h-4 text-white/60" />
            </div>
            <button className="liquid-glass px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">Account</span>
            </button>
          </motion.div>

          {/* Community Card */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInRight}
            className="liquid-glass w-56 rounded-2xl p-4 mb-6"
          >
            <h3 className="text-white font-medium mb-2">Enter our ecosystem</h3>
            <p className="text-white/60 text-sm">
              Join 10,000+ data scientists leveraging ML predictions
            </p>
          </motion.div>

          {/* Prediction Chart */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInRight}
            className="liquid-glass rounded-3xl p-6 mb-6 flex-1"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Prediction Accuracy
              </h3>
              <span className="text-white/50 text-xs">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="95%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.8)",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="rgba(255,255,255,0.8)"
                  fillOpacity={1}
                  fill="url(#colorActual)"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="rgba(255,255,255,0.4)"
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Model Performance */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInRight}
            className="liquid-glass-strong rounded-[2.5rem] p-6 mt-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Model Performance</h3>
              <Zap className="w-4 h-4 text-white/60" />
            </div>

            {/* Two side-by-side cards */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="liquid-glass rounded-3xl p-4">
                <Wand2 className="w-5 h-5 text-white/60 mb-2" />
                <h4 className="text-white font-medium mb-1">Processing</h4>
                <p className="text-white/60 text-xs">
                  Real-time ML inference with GPU acceleration
                </p>
              </div>
              <div className="liquid-glass rounded-3xl p-4">
                <BookOpen className="w-5 h-5 text-white/60 mb-2" />
                <h4 className="text-white font-medium mb-1">Growth Archive</h4>
                <p className="text-white/60 text-xs">
                  Historical predictions and model improvements
                </p>
              </div>
            </div>

            {/* Model Performance Chart */}
            <div className="liquid-glass rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={modelPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={10}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="rgba(255,255,255,0.5)"
                    fontSize={10}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.8)",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="accuracy" fill="rgba(255,255,255,0.3)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Archive List */}
            <div className="mt-4">
              <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">
                Recent Predictions
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                {growthArchive.map((item, index) => (
                  <div
                    key={index}
                    className="liquid-glass rounded-xl p-3 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Database className="w-4 h-4 text-white/60" />
                      <div>
                        <p className="text-white text-sm">{item.title}</p>
                        <p className="text-white/50 text-xs">{item.model}</p>
                      </div>
                    </div>
                    <span className="text-white/80 text-sm">{item.accuracy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Feature Card */}
            <div className="liquid-glass rounded-2xl p-4 mt-4 flex items-center gap-4">
              <div className="w-24 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white/60" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">
                  Advanced Prediction Analytics
                </h4>
                <p className="text-white/60 text-xs">
                  Deep insights into your ML model performance
                </p>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-white text-xl">+</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
