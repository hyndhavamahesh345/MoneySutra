import { useEffect, useState, useRef } from "react";

const TradingViewWidget = () => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const [widgetKey, setWidgetKey] = useState(0);

  // Function to load the TradingView script
  const loadTradingViewScript = () => {
    // Remove any existing script to prevent duplicates
    if (scriptRef.current) {
      scriptRef.current.remove();
    }

    // Create new script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      isTransparent: false,
      displayMode: "regular",
      width: "100%",
      height: 550,
      colorTheme: "light",
      locale: "en"
    });

    // Add script to container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
      scriptRef.current = script;
    }
  };

  // Initial load and handle window resize
  useEffect(() => {
    // Load script initially
    loadTradingViewScript();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWidgetKey(prev => prev + 1);
      }, 300); // 300ms debounce
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // When widgetKey changes, reload the script
  useEffect(() => {
    loadTradingViewScript();
  }, [widgetKey]);

  return (
    <div className="w-full h-full">
      <div key={widgetKey} className="tradingview-widget-container w-full">
        <div 
          className="tradingview-widget-container__widget w-full"
          ref={containerRef}
        ></div>
        <div className="tradingview-widget-copyright text-center my-2">
          {/* <a
            href="https://www.tradingview.com/"
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="text-blue-500"
          >
            Track all markets on TradingView
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default TradingViewWidget;