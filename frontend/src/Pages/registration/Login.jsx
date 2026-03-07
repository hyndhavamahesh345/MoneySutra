import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Reveal animation
    gsap.from(formRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power4.out"
    });

    // Background parallax effect on mouse move
    const handleEnum = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1
      });
    };
    window.addEventListener("mousemove", handleEnum);
    return () => window.removeEventListener("mousemove", handleEnum);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("username", data.user.username);
        sessionStorage.setItem("uid", data.user.uid);
        sessionStorage.setItem("role", data.user.role || "User");

        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch (error) {
      // For local development when backend might not be fully working
      if (email === "sample@gmail.com" && password === "123456789") {
        sessionStorage.setItem("email", "sample@gmail.com");
        sessionStorage.setItem("username", "Demo User");
        sessionStorage.setItem("uid", "demo_uid");
        sessionStorage.setItem("role", "User");
        navigate("/dashboard");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #22c55e 0%, transparent 50%)",
          filter: "blur(120px)"
        }}
      />

      <div
        ref={formRef}
        className="relative z-10 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden max-w-5xl w-full flex flex-col md:flex-row shadow-[0_0_100px_rgba(34,197,94,0.1)]"
      >
        {/* Form Section */}
        <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-5xl font-black italic tracking-tighter text-white mb-2">MoneySutra</h1>
            <p className="text-gray-400 font-medium">Build your financial future with AI intelligence.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50 transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-green-500 hover:bg-green-600 text-black font-black text-lg rounded-2xl transition-all shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.4)] hover:-translate-y-1 active:translate-y-0"
            >
              SIGN IN TO ACCOUNT
            </button>
          </form>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex items-center gap-4 text-xs text-gray-600 uppercase tracking-widest font-bold before:h-px before:flex-1 before:bg-white/5 after:h-px after:flex-1 after:bg-white/5">
              Quick Access
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { setEmail("sample@gmail.com"); setPassword("123456789"); }}
                className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] text-gray-400 font-bold hover:bg-white/10 transition-all uppercase tracking-tighter"
              >
                User Account
              </button>
              <button
                onClick={() => { setEmail("testadvisor@gmail.com"); setPassword("123456789"); }}
                className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] text-gray-400 font-bold hover:bg-white/10 transition-all uppercase tracking-tighter"
              >
                Advisor Portal
              </button>
            </div>
          </div>

          <p className="mt-8 text-gray-500 text-sm text-center">
            New here?{" "}
            <a href="/signup" className="text-green-400 font-bold hover:underline transition-all underline-offset-4">
              Create an account
            </a>
          </p>
        </div>

        {/* Branding Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-500/10 to-transparent p-12 lg:p-20 flex flex-col items-center justify-center relative group">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-[80px] opacity-20 animate-pulse"></div>
            <img
              src="/logo.png"
              alt="MoneySutra"
              className="relative w-48 h-48 lg:w-64 lg:h-64 object-contain filter drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]"
            />
          </div>

          <div className="mt-12 text-center relative z-10">
            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">Intelligence in Wealth</h2>
            <p className="text-gray-400 text-sm font-medium mt-2 max-w-[240px]">Decentralized insights for the modern era.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
