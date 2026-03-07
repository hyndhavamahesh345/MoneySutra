import React, { useState, useEffect } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, ReferenceLine
} from "recharts";
import { TrendingUp, Calculator, BarChart2, Calendar, IndianRupee } from "lucide-react";

const SIP_PRESETS = [
    { label: "NIFTY 50", ticker: "^NSEI", color: "#22c55e", annualReturn: 12.5 },
    { label: "SENSEX", ticker: "^BSESN", color: "#38bdf8", annualReturn: 12.1 },
    { label: "Gold ETF", ticker: "GOLDBEES.BO", color: "#facc15", annualReturn: 9.5 },
    { label: "Fixed Deposit", ticker: null, color: "#f97316", annualReturn: 7.0 },
];

function calculateSIP(monthlyAmount, annualReturn, years) {
    const r = annualReturn / 100 / 12;
    const n = years * 12;
    const invested = monthlyAmount * n;
    const futureValue = monthlyAmount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const returns = futureValue - invested;
    return { invested, futureValue, returns, data: buildChartData(monthlyAmount, r, n, years) };
}

function buildChartData(monthlyAmount, r, n, years) {
    const data = [];
    const startYear = new Date().getFullYear() - years;
    for (let month = 0; month <= n; month += 12) {
        const invested = monthlyAmount * month;
        const fv = month === 0 ? 0 : monthlyAmount * (((Math.pow(1 + r, month) - 1) / r) * (1 + r));
        data.push({
            year: startYear + Math.floor(month / 12),
            invested: Math.round(invested),
            value: Math.round(fv),
        });
    }
    return data;
}

const fmt = (n) =>
    n >= 1e7
        ? `₹${(n / 1e7).toFixed(2)} Cr`
        : n >= 1e5
            ? `₹${(n / 1e5).toFixed(2)} L`
            : `₹${n.toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#111] border border-white/10 rounded-2xl p-4 text-sm shadow-2xl">
                <p className="text-gray-400 font-bold mb-2">{label}</p>
                {payload.map((p) => (
                    <p key={p.name} style={{ color: p.color }} className="font-semibold">
                        {p.name === "invested" ? "Invested" : "Portfolio Value"}: {fmt(p.value)}
                    </p>
                ))}
                {payload.length === 2 && (
                    <p className="text-green-400 font-bold mt-1">
                        Gain: {fmt(payload[1].value - payload[0].value)}
                    </p>
                )}
            </div>
        );
    }
    return null;
};

const SIPSimulator = () => {
    const [monthly, setMonthly] = useState(5000);
    const [years, setYears] = useState(10);
    const [selectedPreset, setSelectedPreset] = useState(0);
    const [results, setResults] = useState(null);

    useEffect(() => {
        const preset = SIP_PRESETS[selectedPreset];
        const res = calculateSIP(monthly, preset.annualReturn, years);
        setResults(res);
    }, [monthly, years, selectedPreset]);

    const preset = SIP_PRESETS[selectedPreset];

    return (
        <div className="min-h-screen bg-[#050505] text-white px-4 md:px-8 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                            <TrendingUp className="h-5 w-5 text-green-400" />
                        </div>
                        <span className="text-xs font-black text-green-400 uppercase tracking-widest">SIP Simulator</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                        What Could Your SIP<br />
                        <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Be Worth Today?</span>
                    </h1>
                    <p className="text-gray-400 mt-3 max-w-xl">
                        See the real power of compounding. Adjust the sliders and watch your wealth grow.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        {/* Instrument Selector */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Investment Instrument</p>
                            <div className="space-y-2">
                                {SIP_PRESETS.map((p, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedPreset(i)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all text-sm font-bold ${selectedPreset === i
                                                ? "border-green-500/50 bg-green-500/10 text-green-400"
                                                : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                                            }`}
                                    >
                                        <span>{p.label}</span>
                                        <span className="text-xs opacity-70">{p.annualReturn}% p.a.</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Monthly SIP */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Monthly SIP</p>
                                <span className="text-xl font-black text-white">{fmt(monthly)}</span>
                            </div>
                            <input
                                type="range" min={500} max={100000} step={500}
                                value={monthly}
                                onChange={(e) => setMonthly(Number(e.target.value))}
                                className="w-full accent-green-500"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                                <span>₹500</span><span>₹1L</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {[1000, 5000, 10000].map(v => (
                                    <button key={v} onClick={() => setMonthly(v)}
                                        className="py-1.5 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:bg-white/10 transition-all">
                                        {fmt(v)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Time Period</p>
                                <span className="text-xl font-black text-white">{years} Yrs</span>
                            </div>
                            <input
                                type="range" min={1} max={30} step={1}
                                value={years}
                                onChange={(e) => setYears(Number(e.target.value))}
                                className="w-full accent-green-500"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                                <span>1 Yr</span><span>30 Yrs</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {[5, 10, 15, 20].map(v => (
                                    <button key={v} onClick={() => setYears(v)}
                                        className="py-1.5 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:bg-white/10 transition-all">
                                        {v}Y
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chart & Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {results && (
                            <>
                                {/* Summary Cards */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: "Total Invested", value: results.invested, color: "text-blue-400", icon: "💰" },
                                        { label: "Est. Returns", value: results.returns, color: "text-green-400", icon: "📈" },
                                        { label: "Portfolio Value", value: results.futureValue, color: "text-yellow-400", icon: "🏆" },
                                    ].map((card) => (
                                        <div key={card.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                            <div className="text-2xl mb-1">{card.icon}</div>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{card.label}</p>
                                            <p className={`text-lg font-black ${card.color}`}>{fmt(card.value)}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Gain % Badge */}
                                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                                    <p className="text-gray-400 text-sm">
                                        Your ₹{monthly.toLocaleString("en-IN")}/month investment in{" "}
                                        <strong className="text-white">{preset.label}</strong> over{" "}
                                        <strong className="text-white">{years} years</strong> would have grown by{" "}
                                        <strong className="text-green-400">
                                            {((results.returns / results.invested) * 100).toFixed(1)}%
                                        </strong>{" "}
                                        with an estimated value of{" "}
                                        <strong className="text-yellow-400">{fmt(results.futureValue)}</strong>
                                    </p>
                                </div>

                                {/* Chart */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                    <p className="font-black text-sm text-gray-400 uppercase tracking-widest mb-6">Wealth Growth Over Time</p>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <LineChart data={results.data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 11, fontWeight: "bold" }} />
                                            <YAxis tickFormatter={(v) => fmt(v)} tick={{ fill: "#6b7280", fontSize: 10, fontWeight: "bold" }} width={80} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend formatter={(v) => <span className="text-xs font-bold text-gray-400 uppercase">{v === "invested" ? "Invested" : "Portfolio"}</span>} />
                                            <Line type="monotone" dataKey="invested" stroke="#38bdf8" strokeWidth={2} dot={false} name="invested" />
                                            <Line type="monotone" dataKey="value" stroke={preset.color} strokeWidth={3} dot={false} name="value" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIPSimulator;
