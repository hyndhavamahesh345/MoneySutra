import React, { useState, useEffect } from "react";
import { Trophy, TrendingUp, TrendingDown, Award, Flame, Star, Users, BarChart2 } from "lucide-react";

// Simulated leaderboard data
const MOCK_LEADERBOARD = [
    { rank: 1, name: "Arjun S.", avatar: "🦁", pnl: 34200, pnlPct: 34.2, beats: true },
    { rank: 2, name: "Priya M.", avatar: "🦊", pnl: 28750, pnlPct: 28.75, beats: true },
    { rank: 3, name: "Ravi K.", avatar: "🐯", pnl: 21100, pnlPct: 21.1, beats: true },
    { rank: 4, name: "Sneha P.", avatar: "🦋", pnl: 14800, pnlPct: 14.8, beats: true },
    { rank: 5, name: "Kiran T.", avatar: "🐺", pnl: 9300, pnlPct: 9.3, beats: false },
    { rank: 6, name: "Divya L.", avatar: "🦅", pnl: 6120, pnlPct: 6.12, beats: false },
    { rank: 7, name: "Rohit B.", avatar: "🐬", pnl: 4870, pnlPct: 4.87, beats: false },
    { rank: 8, name: "Demo User", avatar: "⭐", pnl: 0, pnlPct: 0, beats: false, isYou: true },
];

const NIFTY_RETURN = 8.5; // Simulated Nifty 30-day return %
const SENSEX_RETURN = 7.9;

const RankBadge = ({ rank }) => {
    const configs = {
        1: { bg: "bg-yellow-500/20 border-yellow-500/40", text: "text-yellow-400", icon: "🥇" },
        2: { bg: "bg-gray-400/20 border-gray-400/40", text: "text-gray-300", icon: "🥈" },
        3: { bg: "bg-orange-500/20 border-orange-500/40", text: "text-orange-400", icon: "🥉" },
    };
    const cfg = configs[rank] || { bg: "bg-white/5 border-white/10", text: "text-gray-400", icon: null };
    return (
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm ${cfg.bg} ${cfg.text}`}>
            {cfg.icon || `#${rank}`}
        </div>
    );
};

const IndexCard = ({ name, pct, color }) => (
    <div className={`bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between`}>
        <div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{name}</p>
            <p className="text-2xl font-black text-white mt-0.5">{pct}%</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
            <TrendingUp className="h-6 w-6" />
        </div>
    </div>
);

const BeatTheIndex = () => {
    const [activeTab, setActiveTab] = useState("leaderboard");
    const uid = sessionStorage.getItem("uid") || "demo_user";
    const username = sessionStorage.getItem("username") || "Demo User";

    // Inject the logged-in user into leaderboard
    const leaderboard = MOCK_LEADERBOARD.map(p =>
        p.isYou ? { ...p, name: username } : p
    );

    const youEntry = leaderboard.find(p => p.isYou);
    const niftyBeaters = leaderboard.filter(p => p.pnlPct > NIFTY_RETURN).length;

    return (
        <div className="min-h-screen bg-[#050505] text-white px-4 md:px-8 py-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                            <Trophy className="h-5 w-5 text-yellow-400" />
                        </div>
                        <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">30-Day Challenge</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Can You Beat<br />
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">The Market?</span>
                    </h1>
                    <p className="text-gray-400 mt-3 max-w-xl">
                        Use paper trading to outperform NIFTY 50 in 30 days. Compete with traders across India.
                    </p>
                </div>

                {/* Index Benchmarks */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <IndexCard name="NIFTY 50 (30D)" pct={NIFTY_RETURN} color="bg-green-500/10 text-green-400" />
                    <IndexCard name="SENSEX (30D)" pct={SENSEX_RETURN} color="bg-blue-500/10 text-blue-400" />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: "Active Traders", value: "2,847", icon: <Users className="h-4 w-4" />, color: "text-blue-400" },
                        { label: "Beat the Index", value: `${niftyBeaters}/8`, icon: <Award className="h-4 w-4" />, color: "text-green-400" },
                        { label: "Top Gain", value: "+34.2%", icon: <Flame className="h-4 w-4" />, color: "text-yellow-400" },
                    ].map((s) => (
                        <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <div className={`flex justify-center mb-2 ${s.color}`}>{s.icon}</div>
                            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 mb-6 w-fit">
                    {["leaderboard", "your rank", "how it works"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Leaderboard */}
                {activeTab === "leaderboard" && (
                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                            <p className="font-black text-sm text-gray-400 uppercase tracking-widest">🏆 Global Leaderboard</p>
                            <span className="text-xs text-gray-600 font-bold">Resets in 12d 4h</span>
                        </div>
                        <div className="divide-y divide-white/5">
                            {leaderboard.map((player) => (
                                <div
                                    key={player.rank}
                                    className={`flex items-center gap-4 px-6 py-4 transition-all ${player.isYou ? "bg-green-500/5 border-l-2 border-green-500" : "hover:bg-white/5"
                                        }`}
                                >
                                    <RankBadge rank={player.rank} />
                                    <div className="text-2xl">{player.avatar}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className={`font-black text-sm ${player.isYou ? "text-green-400" : "text-white"}`}>
                                                {player.name} {player.isYou && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30 ml-1">YOU</span>}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="h-1.5 rounded-full bg-white/10 flex-1 max-w-[200px] overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${player.pnlPct > NIFTY_RETURN ? "bg-green-500" : "bg-gray-600"}`}
                                                    style={{ width: `${Math.min(100, (player.pnlPct / 40) * 100)}%` }}
                                                />
                                            </div>
                                            {player.beats && (
                                                <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                                                    <Star className="h-3 w-3" /> Beat Index
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-black text-lg ${player.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {player.pnl >= 0 ? "+" : ""}{player.pnlPct.toFixed(2)}%
                                        </p>
                                        <p className="text-xs text-gray-600 font-bold">
                                            {player.pnl >= 0 ? "+" : ""}₹{player.pnl.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Your Rank */}
                {activeTab === "your rank" && (
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
                            <div className="text-6xl mb-4">⭐</div>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Your Current Rank</p>
                            <p className="text-7xl font-black text-white mb-2">#8</p>
                            <p className="text-gray-400 mb-6">Start paper trading to climb the leaderboard!</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/5 rounded-2xl p-4">
                                    <p className="text-2xl font-black text-white">0%</p>
                                    <p className="text-xs text-gray-500 font-bold uppercase mt-1">Your Return</p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4">
                                    <p className="text-2xl font-black text-red-400">-8.5%</p>
                                    <p className="text-xs text-gray-500 font-bold uppercase mt-1">vs Nifty</p>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4">
                                    <p className="text-2xl font-black text-gray-400">7</p>
                                    <p className="text-xs text-gray-500 font-bold uppercase mt-1">Ahead Of You</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <a href="/game/paper-trading"
                                className="inline-block bg-green-500 hover:bg-green-600 text-black font-black px-8 py-4 rounded-2xl transition-all shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:-translate-y-1">
                                Start Trading Now →
                            </a>
                        </div>
                    </div>
                )}

                {/* How it Works */}
                {activeTab === "how it works" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: "01", icon: "💰", title: "Get ₹1,00,000 Virtual Cash", desc: "Every challenger starts with ₹1 Lakh in virtual money. No real money at risk." },
                            { step: "02", icon: "📈", title: "Trade Real NSE Stocks", desc: "Buy and sell real NSE-listed stocks using live price data from Yahoo Finance." },
                            { step: "03", icon: "🏆", title: "Beat NIFTY 50 in 30 Days", desc: "If your portfolio return exceeds NIFTY 50's 30-day return, you WIN the challenge!" },
                        ].map((s) => (
                            <div key={s.step} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-black text-gray-600 uppercase">Step {s.step}</span>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>
                                <div className="text-3xl mb-3">{s.icon}</div>
                                <h3 className="font-black text-white text-lg mb-2">{s.title}</h3>
                                <p className="text-gray-400 text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeatTheIndex;
