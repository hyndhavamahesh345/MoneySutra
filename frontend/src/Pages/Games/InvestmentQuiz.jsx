import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gsap from "gsap";
import {
  Trophy,
  Award,
  Timer,
  Brain,
  Rocket,
  HelpCircle,
  Lightbulb,
  ChevronRight,
  Zap
} from "lucide-react";

const EnhancedInvestmentQuiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [points, setPoints] = useState(0);
  const [explanation, setExplanation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [username] = useState(sessionStorage.getItem("username") || "Player");
  const [activeTab, setActiveTab] = useState("quiz");
  const containerRef = useRef(null);

  const questions = [
    {
      question: "What does a 'Bull Market' signify in financial markets?",
      options: [
        "A period of declining prices",
        "A period of rising stock prices",
        "A market dominated by fixed income",
        "Market stagnation"
      ],
      correct: 1,
      explanation: "A Bull Market indicates rising prices and high investor confidence. 📈",
      difficulty: "Beginner"
    },
    {
      question: "Which term describes spreading investments to reduce risk?",
      options: [
        "Aggregation",
        "Concentration",
        "Diversification",
        "Speculation"
      ],
      correct: 2,
      explanation: "Diversification helps mitigating risk by allocating capital across various assets. 🔄",
      difficulty: "Beginner"
    },
    {
      question: "What is the primary indicator of a company's valuation relative to earnings?",
      options: [
        "ROI",
        "P/E Ratio",
        "Debt-to-Equity",
        "EBITDA"
      ],
      correct: 1,
      explanation: "The Price-to-Earnings (P/E) ratio compares market price per share to its earnings per share. 📊",
      difficulty: "Intermediate"
    },
    {
      question: "What refers to interest earned on both principal and accumulated interest?",
      options: [
        "Simple Interest",
        "Compound Interest",
        "Variable Interest",
        "Fixed Interest"
      ],
      correct: 1,
      explanation: "Compound interest accelerates wealth growth through exponential returns. 🚀",
      difficulty: "Intermediate"
    }
  ];

  const leaderboardData = [
    { name: "Alice", score: 280, rank: 1 },
    { name: "Bob", score: 245, rank: 2 },
    { name: "Charlie", score: 210, rank: 3 },
    { name: username, score: points, rank: "?" },
  ];

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      });
    }
  }, []);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !quizComplete) {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, quizComplete]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setIsActive(false);

    if (index === questions[questionIndex].correct) {
      const earned = Math.ceil((10 + timeLeft * 0.5) * (questions[questionIndex].difficulty === "Beginner" ? 1 : 1.5));
      setPoints(p => p + earned);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setExplanation(questions[questionIndex].explanation);
    setTimeout(() => handleNextQuestion(), 3000);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setExplanation(null);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(i => i + 1);
      setTimeLeft(15);
      setIsActive(true);
    } else {
      setQuizComplete(true);
      setActiveTab("results");
    }
  };

  const renderQuizSection = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Trophy, label: "XP Points", value: points, color: "text-yellow-500", detail: `${streak} Streak` },
          { icon: Timer, label: "Time Left", value: `${timeLeft}s`, color: "text-blue-400", isProgress: true },
          { icon: Brain, label: "Difficulty", value: questions[questionIndex].difficulty, color: "text-purple-400" },
          { icon: Rocket, label: "Mastery", value: `${questionIndex + 1}/${questions.length}`, color: "text-indigo-400" }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-white italic">{stat.value}</p>
            {stat.isProgress && (
              <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>
            )}
            {stat.detail && <p className="text-[10px] font-bold text-green-400 uppercase mt-2">{stat.detail}</p>}
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-green-500/20"></div>
        <div className="p-10 md:p-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="bg-green-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Level {questionIndex + 1}</span>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase">{questions[questionIndex].question}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[questionIndex].options.map((option, idx) => (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(idx)}
                className={`p-6 rounded-3xl text-left font-bold text-lg transition-all border-2 flex items-center justify-between group ${selectedAnswer === idx
                    ? idx === questions[questionIndex].correct
                      ? "bg-green-500 border-green-500 text-black"
                      : "bg-red-500 border-red-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-green-500/50 hover:text-white"
                  }`}
              >
                <span className="flex items-center gap-4 uppercase tracking-tighter">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs ${selectedAnswer === idx ? 'bg-black/20' : 'bg-white/10'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </span>
                <ChevronRight className={`h-5 w-5 opacity-0 group-hover:opacity-100 transition-all ${selectedAnswer === idx ? 'opacity-100' : ''}`} />
              </button>
            ))}
          </div>

          {explanation && (
            <div className="mt-10 p-8 bg-green-500/10 border border-green-500/20 rounded-[30px] flex gap-4 items-start animate-fade-in">
              <Lightbulb className="h-6 w-6 text-green-400 flex-shrink-0" />
              <p className="text-green-100/80 font-medium leading-relaxed">{explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderResultsSection = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-3xl p-16 text-center shadow-2xl">
        <div className="relative inline-block mb-10">
          <div className="absolute inset-0 bg-yellow-500 blur-[60px] opacity-20"></div>
          <div className="relative w-32 h-32 bg-white/5 rounded-[40px] flex items-center justify-center border border-white/10">
            <Award className="h-16 w-16 text-yellow-500" />
          </div>
        </div>
        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase mb-4">Elite Certification</h2>
        <p className="text-gray-400 text-xl font-medium mb-10">You've earned <span className="text-green-400 font-black">{points} XP</span> based on your financial intelligence.</p>

        <div className="grid grid-cols-2 gap-6 mb-12 max-w-sm mx-auto">
          <div className="bg-black/40 p-6 rounded-3xl border border-white/10">
            <p className="text-[10px] font-black text-gray-600 uppercase mb-2">Accuracy</p>
            <p className="text-2xl font-black text-white">{Math.round((points / 80) * 100)}%</p>
          </div>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/10">
            <p className="text-[10px] font-black text-gray-600 uppercase mb-2">Status</p>
            <p className="text-2xl font-black text-green-400">PRO</p>
          </div>
        </div>

        <Button
          onClick={() => window.location.reload()}
          className="px-12 py-8 bg-green-500 hover:bg-green-600 text-black font-black text-xl rounded-2xl transition-all shadow-[0_10px_30px_rgba(34,197,94,0.3)]"
        >
          RETAKE ASSESSMENT
        </Button>
      </Card>

      <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
        <h3 className="text-xl font-black italic text-white uppercase mb-8 tracking-tighter flex items-center gap-3">
          <Trophy className="h-6 w-6 text-yellow-500" /> Financial Hall of Fame
        </h3>
        <div className="space-y-4">
          {leaderboardData.map((user, idx) => (
            <div key={idx} className={`flex justify-between items-center p-5 rounded-3xl transition-all ${user.name === username ? 'bg-green-500 text-black' : 'bg-black/40 border border-white/5'}`}>
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black ${user.name === username ? 'bg-black/20' : 'bg-white/10'}`}>{idx + 1}</span>
                <p className="font-extrabold uppercase text-sm">{user.name}</p>
              </div>
              <p className="font-black italic text-lg">{user.score} XP</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/10 p-4 rounded-3xl border border-green-500/20">
              <Brain className="h-10 w-10 text-green-400" />
            </div>
          </div>
          <h1 className="text-6xl font-black italic tracking-tighter text-white uppercase leading-none">Intelligence. <span className="text-green-500">Wealth.</span></h1>
          <p className="text-gray-500 font-medium text-lg uppercase tracking-widest">MoneyMitra Knowledge Assessment</p>
        </header>

        <Tabs value={activeTab} className="w-full">
          <TabsContent value="quiz" className="mt-0 outline-none">{renderQuizSection()}</TabsContent>
          <TabsContent value="results" className="mt-0 outline-none">{renderResultsSection()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedInvestmentQuiz;
