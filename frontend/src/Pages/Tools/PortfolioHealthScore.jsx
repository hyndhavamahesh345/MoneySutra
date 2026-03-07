import React, { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Heart, Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, ChevronRight } from "lucide-react";

function computeScore(holdings, funds) {
    const numStocks = Object.keys(holdings).length;
    const totalFunds = funds;

    // Score dimensions (0-100)
    const diversification = Math.min(100, numStocks * 12); // max at ~8 stocks
    const liquidity = Math.min(100, (totalFunds / 50000) * 50); // cash cushion
    const activity = numStocks > 0 ? 70 : 20;
    const risk = numStocks > 5 ? 80 : numStocks > 2 ? 60 : 30;
    const growth = Math.min(100, numStocks * 15);

    const overall = Math.round((diversification + liquidity + activity + risk + growth) / 5);

    return {
        overall,
        dimensions: [
            { subject: "Diversification", score: diversification, fullMark: 100 },
            { subject: "Liquidity", score: liquidity, fullMark: 100 },
            { subject: "Activity", score: activity, fullMark: 100 },
            { subject: "Risk Mgmt", score: risk, fullMark: 100 },
            { subject: "Growth", score: growth, fullMark: 100 },
        ],
        insights: generateInsights(numStocks, totalFunds, diversification, liquidity),
    };
}

function generateInsights(numStocks, funds, div, liq) {
    const insights = [];
    if (numStocks === 0) {
        insights.push({ type: "warning", text: "You have no holdings. Start by buying at least 3-5 stocks to build a diversified portfolio." });
    } else if (numStocks < 3) {
        insights.push({ type: "warning", text: `You only hold ${numStocks} stock(s). Consider diversifying into at least 5 different sectors.` });
    } else {
        insights.push({ type: "success", text: `Great! You hold ${numStocks} stocks. A well-diversified portfolio.` });
    }
    if (funds > 50000) {
        insights.push({ type: "success", text: `Good liquidity: ₹${funds.toLocaleString("en-IN")} cash available. You're prepared for opportunities.` });
    } else if (funds > 10000) {
        insights.push({ type: "info", text: `₹${funds.toLocaleString("en-IN")} cash on hand. Consider keeping 20% in cash for market dips.` });
    } else {
        insights.push({ type: "warning", text: "Low cash reserves. Add funds so you can capitalize on market opportunities." });
    }
    if (numStocks > 0) {
        insights.push({ type: "info", text: "Tip: Review your sector concentration. Avoid having more than 30% in a single sector." });
        insights.push({ type: "success", text: "You've completed your first paper trade — great start on your investment journey!" });
    }
    return insights;
}

const ScoreRing = ({ score }) => {
    const color = score >= 70 ? "#22c55e" : score >= 45 ? "#facc15" : "#ef4444";
    const label = score >= 70 ? "Excellent" : score >= 45 ? "Fair" : "Needs Work";
    const emoji = score >= 70 ? "💪" : score >= 45 ? "📈" : "⚠️";
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-36 h-36">
                <svg className="transform -rotate-90" width="144" height="144">
                    <circle cx="72" cy="72" r="54" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
                    <circle
                        cx="72" cy="72" r="54"
                        stroke={color}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black" style={{ color }}>{score}</span>
                    <span className="text-xs text-gray-500 font-bold">/ 100</span>
                </div>
            </div>
            <p className="text-lg font-black mt-2" style={{ color }}>{emoji} {label}</p>
        </div>
    );
};

const InsightCard = ({ type, text }) => {
    const configs = {
        success: { icon: <CheckCircle className="h-4 w-4 flex-shrink-0" />, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
        warning: { icon: <AlertTriangle className="h-4 w-4 flex-shrink-0" />, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
        info: { icon: <ChevronRight className="h-4 w-4 flex-shrink-0" />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
        danger: { icon: <XCircle className="h-4 w-4 flex-shrink-0" />, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
    };
    const cfg = configs[type] || configs.info;
    return (
        <div className={`flex items-start gap-3 p-4 rounded-2xl border ${cfg.bg}`}>
            <span className={cfg.color}>{cfg.icon}</span>
            <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
        </div>
    );
};

const PortfolioHealthScore = () => {
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [holdings, setHoldings] = useState({});
    const [funds, setFunds] = useState(0);
    const uid = sessionStorage.getItem("uid") || "demo_user";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [fundsRes, holdingsRes] = await Promise.all([
                    fetch(`/api/funds?uid=${uid}`).then(r => r.json()),
                    fetch(`/api/holdings?uid=${uid}`).then(r => r.json()),
                ]);
                const h = holdingsRes.holdings || {};
                const f = fundsRes.funds || 0;
                setHoldings(h);
                setFunds(f);
                setScore(computeScore(h, f));
            } catch (e) {
                // Demo fallback
                const h = { RELIANCE: 10, TCS: 5 };
                const f = 100000;
                setHoldings(h);
                setFunds(f);
                setScore(computeScore(h, f));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [uid]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
            </div>
        );
    }

    const gradeColor = score.overall >= 70 ? "#22c55e" : score.overall >= 45 ? "#facc15" : "#ef4444";

    return (
        <div className="min-h-screen bg-[#050505] text-white px-4 md:px-8 py-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <Heart className="h-5 w-5 text-red-400" />
                        </div>
                        <span className="text-xs font-black text-red-400 uppercase tracking-widest">AI Portfolio Doctor</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Your Portfolio<br />
                        <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Health Report</span>
                    </h1>
                    <p className="text-gray-400 mt-3 max-w-xl">
                        An AI analysis of your portfolio's diversification, liquidity, and growth potential.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Score Card */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center">
                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Overall Health Score</p>
                            <ScoreRing score={score.overall} />
                            <div className="w-full mt-6 space-y-3">
                                {score.dimensions.map((d) => (
                                    <div key={d.subject}>
                                        <div className="flex justify-between text-xs font-bold mb-1">
                                            <span className="text-gray-400">{d.subject}</span>
                                            <span style={{ color: d.score >= 70 ? "#22c55e" : d.score >= 45 ? "#facc15" : "#ef4444" }}>
                                                {d.score}/100
                                            </span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${d.score}%`,
                                                    background: d.score >= 70 ? "#22c55e" : d.score >= 45 ? "#facc15" : "#ef4444",
                                                    transition: "width 1s ease-in-out"
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Holdings summary */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Portfolio Snapshot</p>
                            <div className="space-y-2">
                                {Object.keys(holdings).length === 0 ? (
                                    <p className="text-gray-600 text-sm">No holdings yet.</p>
                                ) : (
                                    Object.entries(holdings).map(([sym, qty]) => (
                                        <div key={sym} className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="font-black text-sm text-white">{sym}</span>
                                            <span className="text-xs text-gray-500 font-bold">{qty} shares</span>
                                        </div>
                                    ))
                                )}
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm text-gray-400 font-bold">Cash Available</span>
                                    <span className="text-sm font-black text-green-400">₹{funds.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Radar Chart */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Portfolio Dimensions</p>
                            <ResponsiveContainer width="100%" height={260}>
                                <RadarChart data={score.dimensions}>
                                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: "#6b7280", fontSize: 11, fontWeight: "bold" }}
                                    />
                                    <Radar
                                        name="Score"
                                        dataKey="score"
                                        stroke={gradeColor}
                                        fill={gradeColor}
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#111",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "12px",
                                            fontSize: "12px",
                                            color: "#fff",
                                        }}
                                        formatter={(v) => [`${v}/100`, "Score"]}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* AI Insights */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                    <Shield className="h-4 w-4 text-purple-400" />
                                </div>
                                <p className="font-black text-sm text-white">AI Recommendations</p>
                            </div>
                            <div className="space-y-3">
                                {score.insights.map((insight, i) => (
                                    <InsightCard key={i} type={insight.type} text={insight.text} />
                                ))}
                                <InsightCard
                                    type="info"
                                    text="Next step: Set a financial goal (e.g., ₹10L in 2 years) and align your portfolio strategy to achieve it."
                                />
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="grid grid-cols-2 gap-4">
                            <a href="/game/paper-trading"
                                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-black py-4 px-6 rounded-2xl transition-all shadow-[0_10px_30px_rgba(34,197,94,0.2)] hover:-translate-y-1">
                                <TrendingUp className="h-4 w-4" /> Paper Trade
                            </a>
                            <a href="/tools/sip-simulator"
                                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-black py-4 px-6 rounded-2xl border border-white/10 transition-all hover:-translate-y-1">
                                <ChevronRight className="h-4 w-4" /> SIP Simulator
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioHealthScore;
