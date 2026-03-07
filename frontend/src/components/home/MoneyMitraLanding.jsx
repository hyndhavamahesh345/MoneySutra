import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    TrendingUp,
    Shield,
    Brain,
    BarChart3,
    BookOpen,
    Lock,
    ChevronRight,
    PieChart,
    Activity,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const MoneySutraLanding = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Smooth Scroll Initialization
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.from(".hero-title", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.2
            });

            gsap.from(".hero-subtext", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });

            gsap.from(".hero-btns", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                delay: 0.8,
                ease: "back.out(1.7)"
            });

            // Parallax Effect for Hero Icons
            gsap.to(".floating-icon-1", {
                y: -100,
                scrollTrigger: {
                    trigger: ".hero-section",
                    scrub: 1
                }
            });
            gsap.to(".floating-icon-2", {
                y: 100,
                scrollTrigger: {
                    trigger: ".hero-section",
                    scrub: 1
                }
            });

            // Feature Cards Animation - Robust Reveal
            gsap.fromTo(".feature-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".features-grid",
                        start: "top 92%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Dashboard Reveal - smoother
            gsap.from(".dashboard-reveal", {
                scrollTrigger: {
                    trigger: ".dashboard-section",
                    start: "top 90%",
                    end: "bottom center",
                    scrub: 0.5,
                },
                clipPath: "inset(15% 5% 15% 5% round 40px)",
                scale: 0.95,
                opacity: 0.8
            });

            // Section Titles - Robust Reveal
            gsap.utils.toArray(".section-title").forEach(title => {
                gsap.fromTo(title,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: title,
                            start: "top 95%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

            // Glow pulse for security
            gsap.to(".security-pulse", {
                scale: 1.4,
                opacity: 0.3,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Ensure all triggers are calculated after content renders
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

        }, containerRef);

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-green-500/30">

            {/* 1. HERO SECTION */}
            <section className="hero-section relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,_#1a3a2a_0%,_transparent_50%)] opacity-40 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/20 pointer-events-none"></div>

                {/* Floating Icons */}
                <div className="floating-icon-1 absolute top-[20%] left-[10%] opacity-20 hidden md:block">
                    <TrendingUp size={120} className="text-green-500" />
                </div>
                <div className="floating-icon-2 absolute bottom-[20%] right-[10%] opacity-20 hidden md:block">
                    <BarChart3 size={150} className="text-blue-400" />
                </div>

                <div className="relative z-10 max-w-5xl">
                    <h1 className="hero-title text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6">
                        MONEYSUTRA <br />
                        <span className="bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent">
                            THE AI FINANCIAL COMPANION
                        </span>
                    </h1>
                    <p className="hero-subtext text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 font-light">
                        Track investments, analyze risk, and grow your wealth with
                        AI-powered insights tailored for the modern investor.
                    </p>
                    <div className="hero-btns flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/register">
                            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-black font-bold h-14 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                Get Started
                            </Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 h-14 px-10 rounded-full text-lg">
                                View Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-20 animate-bounce opacity-40">
                    <div className="w-1 h-12 rounded-full bg-gradient-to-b from-green-500 to-transparent mx-auto"></div>
                </div>
            </section>

            {/* 2. FEATURES GRID */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">
                    Engineered for <span className="text-green-500">Wealth</span>
                </h2>
                <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: <TrendingUp className="text-green-500" />, title: "Portfolio Tracking", desc: "Monitor SIPs, Mutual Funds, and Stocks in real-time." },
                        { icon: <Brain className="text-blue-400" />, title: "AI-Powered Insights", desc: "Personalized recommendations based on your risk profile." },
                        { icon: <BookOpen className="text-yellow-400" />, title: "Investment Education", desc: "Access curated e-books and guides for market mastery." },
                        { icon: <Lock className="text-red-400" />, title: "Secure Data Storage", desc: "End-to-end encryption for all your financial sensitive data." },
                        { icon: <Activity className="text-purple-400" />, title: "Performance Analytics", desc: "Deep dive into your returns with interactive visualizations." },
                        { icon: <Zap className="text-orange-400" />, title: "Risk Analysis", desc: "Automated risk assessment to protect your capital." },
                    ].map((feature, i) => (
                        <div key={i} className="feature-card group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-500 backdrop-blur-sm">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. DASHBOARD PREVIEW */}
            <section className="dashboard-section py-32 bg-black/40 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="section-title text-5xl md:text-6xl font-black mb-8 leading-tight">
                            YOUR ENTIRE <br /> PORTFOLIO, <br />
                            <span className="text-blue-400">UNIFIED.</span>
                        </h2>
                        <ul className="space-y-6">
                            {[
                                "Track Detailed SIP Performance",
                                "Monitor 5000+ Mutual Funds",
                                "Manage Stocks & Corporate Bonds",
                                "Watch Fixed Deposits & Insurance",
                                "Real-time NAV Updates"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-xl text-gray-300">
                                    <ChevronRight className="text-green-500" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="dashboard-reveal rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.15)] border border-white/10 bg-gray-900">
                            <img src="/assets/dashboard.png" alt="Dashboard" className="w-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. AI INSIGHTS */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                    <h2 className="section-title text-5xl font-black mb-6">INTELLIGENT WEALTH<br /><span className="text-yellow-400">OPTIMIZATION</span></h2>
                    <p className="text-xl text-gray-400 max-w-2xl mb-16">
                        Our proprietary AI models analyze global markets and your unique goals to suggest the perfect asset allocation.
                    </p>
                    <div className="w-full h-[400px] md:h-[600px] flex justify-center">
                        <img src="/assets/ai_brain.png" alt="AI Brain" className="h-full object-contain animate-float" />
                    </div>
                </div>
            </section>

            {/* 5. EDUCATION */}
            <section className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="section-title text-5xl font-bold">EDUCATE TO <br /><span className="text-green-500">ACCUMULATE</span></h2>
                        <Link to="/lessons">
                            <Button variant="link" className="text-green-500 text-lg group">View all resources <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" /></Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Investment Basics", tag: "E-BOOK", color: "bg-green-500/20 text-green-500" },
                            { title: "Mutual Fund Guide", tag: "TUTORIAL", color: "bg-blue-500/20 text-blue-400" },
                            { title: "Stock Fundamentals", tag: "GUIDE", color: "bg-yellow-500/20 text-yellow-400" }
                        ].map((edu, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-[4/3] rounded-3xl bg-gray-800 mb-6 overflow-hidden border border-white/5 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:opacity-0 transition-opacity"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BookOpen size={64} className="opacity-20 group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block ${edu.color}`}>
                                    {edu.tag}
                                </span>
                                <h3 className="text-2xl font-bold group-hover:text-green-500 transition-colors">{edu.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. SECURITY */}
            <section className="py-32 relative">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="relative inline-block mb-10">
                        <div className="security-pulse absolute inset-0 bg-green-500/30 rounded-full blur-2xl"></div>
                        <div className="relative w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                            <Shield size={48} className="text-green-500" />
                        </div>
                    </div>
                    <h2 className="section-title text-5xl font-black mb-8">BANK-GRADE <span className="text-green-500">SECURITY</span></h2>
                    <div className="grid md:grid-cols-3 gap-10 mt-16 text-left">
                        {[
                            { icon: <Lock className="text-green-500" />, title: "End-to-End Encryption", desc: "Your financial data is encrypted even before it hits our servers." },
                            { icon: <Shield className="text-green-500" />, title: "Firebase Auth", desc: "Industry-standard identity management for your peace of mind." },
                            { icon: <Activity className="text-green-500" />, title: "Constant Monitoring", desc: "Automated systems watching for suspicious activity 24/7." },
                        ].map((s, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5">
                                <div className="mb-4">{s.icon}</div>
                                <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                                <p className="text-gray-400">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6.5 SMART TOOLS SECTION */}
            <section className="py-32 bg-black/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-xs font-black text-green-400 uppercase tracking-widest bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                            ✨ Exclusive To MoneySutra
                        </span>
                        <h2 className="section-title text-5xl font-black mt-6 mb-4">
                            TOOLS THAT GIVE YOU<br />
                            <span className="text-green-500">AN UNFAIR ADVANTAGE</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-xl">
                            Three powerful tools designed to help you learn, compete and grow — completely free.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                emoji: "📊",
                                tag: "SIMULATOR",
                                color: "from-green-500/20 to-transparent border-green-500/20",
                                tagColor: "text-green-400 bg-green-500/10 border-green-500/30",
                                title: "SIP Simulator",
                                desc: "See what ₹5,000/month invested since 2015 would be worth today. Interactive wealth projection with real historical data.",
                                cta: "Simulate Now",
                                href: "/tools/sip-simulator",
                                stats: [{ label: "Avg. Return Shown", val: "12.5% p.a." }, { label: "Time Horizons", val: "1–30 Years" }]
                            },
                            {
                                emoji: "🏆",
                                tag: "COMPETITION",
                                color: "from-yellow-500/20 to-transparent border-yellow-500/20",
                                tagColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
                                title: "Beat The Index",
                                desc: "Use ₹1 Lakh virtual cash to try and beat NIFTY 50 in 30 days. Compete on a live leaderboard with traders across India.",
                                cta: "Enter Challenge",
                                href: "/tools/beat-the-index",
                                stats: [{ label: "Virtual Capital", val: "₹1,00,000" }, { label: "Active Traders", val: "2,847+" }]
                            },
                            {
                                emoji: "🩺",
                                tag: "AI ANALYSIS",
                                color: "from-red-500/20 to-transparent border-red-500/20",
                                tagColor: "text-red-400 bg-red-500/10 border-red-500/30",
                                title: "Portfolio Health Score",
                                desc: "Get an AI-powered health score for your portfolio — covering diversification, risk, liquidity and growth potential.",
                                cta: "Check Score",
                                href: "/tools/health-score",
                                stats: [{ label: "Dimensions Tracked", val: "5 Metrics" }, { label: "AI Suggestions", val: "Personalized" }]
                            },
                        ].map((tool, i) => (
                            <div key={i} className={`group p-8 rounded-3xl bg-gradient-to-br ${tool.color} border backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-5xl">{tool.emoji}</span>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full border uppercase tracking-widest ${tool.tagColor}`}>
                                        {tool.tag}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black mb-3 text-white">{tool.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">{tool.desc}</p>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {tool.stats.map((s, j) => (
                                        <div key={j} className="bg-white/5 rounded-xl p-3">
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{s.label}</p>
                                            <p className="text-sm font-black text-white mt-0.5">{s.val}</p>
                                        </div>
                                    ))}
                                </div>
                                <Link to={tool.href}
                                    className="flex items-center gap-2 text-sm font-black text-white/80 hover:text-white group-hover:gap-3 transition-all">
                                    {tool.cta} <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FINAL CTA */}
            <section className="py-40 relative overflow-hidden text-center px-6">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#1a3a2a_0%,_transparent_70%)] opacity-30"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter">
                        READY TO <br /> <span className="text-green-500">ASCEND?</span>
                    </h2>
                    <p className="text-2xl text-gray-400 mb-12 font-light">
                        Join 50K+ investors who have chosen MoneySutra to guide their financial path.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/register">
                            <Button className="bg-green-500 hover:bg-green-600 text-black font-bold h-16 px-12 rounded-full text-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] border-none">
                                Create Account
                            </Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button className="border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 h-16 px-12 rounded-full text-xl text-white font-bold transition-all duration-300">
                                Explore Features
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                        <span className="text-2xl font-black tracking-tighter italic">MoneySutra</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} MoneySutra Financial. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">Twitter</Link>
                        <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">Instagram</Link>
                        <Link to="#" className="text-gray-400 hover:text-green-500 transition-colors">LinkedIn</Link>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default MoneySutraLanding;
