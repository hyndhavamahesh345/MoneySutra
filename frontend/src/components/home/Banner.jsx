import React from "react";
import { Button } from "@/components/ui/button"; // Importing button from shadcn/ui
import { ArrowRight } from "lucide-react";

function Banner() {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden m-0 p-0">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        style={{ opacity: 0.75 }}
      >
        <source src="/public/banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Static Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
    Optimize Your Investments with <br />
    <span className="text-blue-400">AI & Data Analytics</span>
  </h1>
  <p className="text-lg text-gray-300 max-w-[600px] mt-4">
    Leverage AI-driven insights and real-time data analytics to make informed investment decisions and maximize returns.
  </p>

  {/* Buttons */}
  <div className="mt-6 flex flex-wrap justify-center gap-4">
    <Button
      size="lg"
      className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
    >
      Get Started <ArrowRight className="h-4 w-4" />
    </Button>
    <Button
      variant="outline"
      size="lg"
      className="border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white"
    >
      Learn More
    </Button>
  </div>
</div>

    </div>
  );
}

export default Banner;
