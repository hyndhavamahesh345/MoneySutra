import React from "react";
import { motion } from "framer-motion";
import { Download, BookOpen } from "lucide-react";

const files = [
  {
    name: "7 Steps to Understanding the Stock Market",
    id: "1j9FGQCQJcNBHPmrsMqvV5a1X7SMJwGWh",
  },
  {
    name: "A Gentle Introduction To Bitcoin",
    id: "1HxmNo252_uVzo-Nf9pSULBv8FmOkpPij",
  },
  {
    name: "Beginners Guide to the Capital Markets",
    id: "1YnVr5MDRj7pe91bpmBc0asJE4GGjshwY",
  },
  {
    name: "First Steps to Investing - A Beginner's Guide",
    id: "1pYxrMDEDimWwf3lcdSz9ajd3K4adNRp-",
  },
  {
    name: "The Complete Guide to Trading",
    id: "1jLIhRLwo-i2BViHpJs8vf6Ex3Pm3nTIv",
  },
];

const DriveFilesViewer = () => {
  return (
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-black tracking-tight mb-4">
          FINANCIAL <span className="text-green-500">LIBRARY</span>
        </h1>
        <p className="text-gray-400 text-lg">Curated e-books and guides to master your wealth journey.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {files.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 hover:border-green-500/50 transition-all duration-500 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <BookOpen size={20} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold line-clamp-1 group-hover:text-green-500 transition-colors">
                {file.name}
              </h3>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-6 aspect-video">
              <iframe
                src={`https://drive.google.com/file/d/${file.id}/preview`}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <a
              href={`https://drive.google.com/uc?id=${file.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 hover:bg-green-500 hover:text-black font-bold transition-all duration-300"
            >
              <Download size={18} />
              Download PDF
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DriveFilesViewer;