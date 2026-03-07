import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, TrendingDown, Users, Award, Zap, ChevronRight } from "lucide-react";
import gsap from "gsap";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const PredictMarket = () => {
  const [points, setPoints] = useState(100);
  const [prediction, setPrediction] = useState(null);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [username, setUsername] = useState(sessionStorage.getItem("username") || "Player");
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alice", score: 250, avatar: "A" },
    { name: "Bob", score: 200, avatar: "B" },
    { name: "Charlie", score: 150, avatar: "C" },
    { name: "Player", score: 100, avatar: "P" },
  ]);
  const [gameHistory, setGameHistory] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [marketStatus, setMarketStatus] = useState("stable");
  const [gameRound, setGameRound] = useState(1);
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });
  }, []);

  const generateNewStockData = () => {
    const basePrice = 150;
    const volatility = difficultyLevel === "easy" ? 5 : difficultyLevel === "medium" ? 8 : 12;
    const trend = Math.random() > 0.5 ? 1 : -1;
    const data = [basePrice];
    for (let i = 1; i < 6; i++) {
      const randomChange = Math.random() * volatility * trend;
      const lastPrice = data[i - 1];
      const newPrice = Math.max(50, lastPrice + randomChange);
      data.push(Math.round(newPrice * 100) / 100);
    }

    return {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
      datasets: [
        {
          label: "Market Price",
          data: data,
          borderColor: "#22c55e",
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(34, 197, 94, 0.2)");
            gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
            return gradient;
          },
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#22c55e",
          pointRadius: 0,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  useEffect(() => {
    setChartData(generateNewStockData());
  }, [difficultyLevel]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#666", font: { weight: 'bold' }, callback: (v) => `₹${v}` }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#666", font: { weight: 'bold' } }
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111",
        titleFont: { size: 14, weight: "bold" },
        padding: 12,
        cornerRadius: 12,
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1
      },
    },
  };

  const handlePrediction = (choice) => {
    setPrediction(choice);
    setMarketStatus("predicting");

    setTimeout(() => {
      const trend = Math.random() > 0.5 ? "Up" : "Down";
      const newData = generateNewStockData();
      const lastPrice = newData.datasets[0].data[5];
      const newPrice = trend === "Up" ? lastPrice + Math.random() * 15 : lastPrice - Math.random() * 15;
      newData.datasets[0].data.push(Math.round(newPrice * 100) / 100);
      newData.labels.push(`Day ${newData.labels.length + 1}`);
      setChartData(newData);
      setMarketStatus(trend === "Up" ? "bullish" : "bearish");

      let pointsChange;
      if (trend === choice) {
        pointsChange = streak >= 2 ? 30 : 20;
        setPoints(p => p + pointsChange);
        setResult(`BRAVO! +${pointsChange} POINTS`);
        setStreak(s => s + 1);
      } else {
        pointsChange = -10;
        setPoints(p => Math.max(0, p - 10));
        setResult("MARKET REVERSED. -10 POINTS");
        setStreak(0);
      }

      setGameRound(r => r + 1);
      setTimeout(() => {
        setPrediction(null);
        setResult(null);
        setMarketStatus("stable");
      }, 3000);
    }, 1500);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Section */}
        <header className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h1 className="text-5xl font-black italic tracking-tighter text-white mb-2 uppercase">Market Predictor</h1>
              <p className="text-gray-400 font-medium max-w-md">Master the art of reading market sentiment. Predict movements, earn points, and dominate the elite leaderboard.</p>
            </div>

            <div className="flex bg-black/40 p-2 rounded-2xl border border-white/10">
              {['easy', 'medium', 'hard'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficultyLevel(lvl)}
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${difficultyLevel === lvl
                      ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                      : 'text-gray-500 hover:text-white'
                    }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Chart Card */}
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl relative group">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Live Simulation</p>
                  <h2 className="text-2xl font-black italic text-white uppercase flex items-center gap-3">
                    Market Pulse {marketStatus === 'predicting' && <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Round Status</p>
                  <p className={`text-xl font-black uppercase ${marketStatus === 'bullish' ? 'text-green-400' : marketStatus === 'bearish' ? 'text-red-400' : 'text-white'}`}>
                    {marketStatus === 'stable' ? 'Analyzing...' : marketStatus.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="h-[400px] w-full mb-8">
                {chartData ? <Line data={chartData} options={chartOptions} /> : <div className="h-full flex items-center justify-center text-gray-600">Initializing Core...</div>}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  disabled={prediction !== null}
                  onClick={() => handlePrediction("Up")}
                  className="group relative flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-800 disabled:opacity-50 text-black font-black text-xl py-6 rounded-3xl transition-all overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 uppercase">
                    <TrendingUp className="h-6 w-6" /> Market Up
                  </div>
                </button>
                <button
                  disabled={prediction !== null}
                  onClick={() => handlePrediction("Down")}
                  className="group relative flex-1 bg-white/5 border border-white/10 hover:bg-red-500 hover:text-white disabled:bg-gray-800/20 disabled:opacity-50 text-white font-black text-xl py-6 rounded-3xl transition-all overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 uppercase">
                    <TrendingDown className="h-6 w-6" /> Market Down
                  </div>
                </button>
              </div>

              {result && (
                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-center animate-bounce">
                  <p className="text-xl font-black italic text-green-400 tracking-tighter">{result}</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-700 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-xl">
                  {username[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-black italic text-white uppercase leading-tight">{username}</h3>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest flex items-center gap-1">Pro Analyst <ChevronRight className="h-3 w-3" /></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-6 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">XP Points</p>
                  <p className="text-3xl font-black text-white">{points}</p>
                </div>
                <div className="bg-black/40 p-6 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">Streak</p>
                  <p className="text-3xl font-black text-green-400 flex items-center gap-2">{streak} <Zap className="h-5 w-5 fill-current" /></p>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl">
              <h2 className="text-xl font-black italic text-white mb-6 uppercase tracking-tighter flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" /> Global Elites
              </h2>
              <div className="space-y-4">
                {leaderboard.map((user, idx) => (
                  <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl transition-all ${user.name === username ? 'bg-green-500 text-black border-none' : 'bg-white/5 border border-white/5 hover:border-white/10'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-black ${user.name === username ? 'text-black/50' : 'text-gray-600'}`}>#{idx + 1}</span>
                      <p className="font-bold uppercase text-sm tracking-tight">{user.name}</p>
                    </div>
                    <p className="font-black italic">{user.score} XP</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictMarket;
