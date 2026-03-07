import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaxBar from "../ITR/TaxBar";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Wallet, ShieldCheck, HelpCircle } from "lucide-react";

function AboutTaxes() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 pb-20">
      <TaxBar />

      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl ml-auto lg:mr-20 xl:mr-32"
      >

        {/* Blog Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <img
                src="/logo.svg"
                alt="moneymitra"
                className="w-8 h-8"
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tighter">MoneyMitra</span>
              <div className="text-sm text-gray-500">Wealth Intelligence Unit</div>
            </div>
          </div>
          <div className="text-sm font-mono text-gray-500 uppercase tracking-widest">March 07, 2026</div>
        </div>

        <hr className="mb-10 border-white/5" />

        {/* Blog Title */}
        <div className="mb-12">
          <span className="text-green-500 font-bold uppercase tracking-widest text-xs mb-4 block">Education Series</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
            A BEGINNER'S GUIDE <br /> TO <span className="text-gray-500">TAXES</span>
          </h1>
        </div>

        {/* Blog Content */}
        <div className="space-y-12 text-lg leading-relaxed text-gray-300">
          {/* Section 1: What are taxes? */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
              <HelpCircle className="text-green-500" /> What are taxes?
            </h2>
            <p>
              Taxes are compulsory financial contributions imposed by governments on individuals and businesses
              to fund public expenditures. These range from infrastructure development to social welfare programs,
              education, and healthcare. Understanding them is the first step toward true financial freedom.
            </p>
          </div>

          {/* Section 2: Types of Taxes */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <Wallet className="text-green-500" /> Core Tax Classifications
            </h3>
            <div className="grid gap-6">
              {[
                { title: "Income Tax", desc: "Levied on individual and business earnings. Brackets scale with your success." },
                { title: "Sales Tax", desc: "Consumption-based tax collected at the point of sale for goods and services." },
                { title: "Property Tax", desc: "Based on real estate value. Primarily funds local schools and infrastructure." },
                { title: "Corporate Tax", desc: "Imposed on business profits, significantly impacting company growth strategies." }
              ].map((tax, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group">
                  <div className="text-3xl font-black text-gray-700 group-hover:text-green-500 transition-colors">0{i + 1}</div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{tax.title}</h4>
                    <p className="text-gray-400 text-base">{tax.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Resources */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Advanced Learning Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Tax Dynamics", icon: <BookOpen className="text-blue-400" />, path: "/tax/info" },
                { title: "ITR Blueprint", icon: <ArrowRight className="text-green-500" />, path: "/tax/itrfiling" },
                { title: "Savings Alpha", icon: <ShieldCheck className="text-yellow-400" />, path: "/tax/savetax" }
              ].map((item, i) => (
                <Card key={i} className="p-6 bg-white/5 border-white/10 rounded-2xl hover:border-green-500/30 transition-all group">
                  <div className="mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <Button
                    className="mt-4 w-full h-10 rounded-xl border-white/10 text-white bg-transparent hover:bg-white/10"
                    variant="outline"
                    onClick={() => navigate(item.path)}
                  >
                    Start Module
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Footer */}
        <hr className="my-12 border-white/5" />
        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.svg"
              alt="moneymitra"
              className="w-10 h-10"
            />
            <span className="text-2xl font-black tracking-tighter italic">MoneyMitra</span>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-8 h-12 border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black transition-all"
            onClick={() => navigate("/tax/types")}
          >
            Next Lesson
          </Button>
        </div>
      </motion.section>
    </div>
  );
}

export default AboutTaxes;
