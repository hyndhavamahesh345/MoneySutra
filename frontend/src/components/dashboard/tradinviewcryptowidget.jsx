import React, { useEffect } from 'react';

const TradingViewCryptoWidget = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: 550,
      defaultColumn: 'overview',
      screener_type: 'crypto_mkt',
      displayCurrency: 'USD',
      colorTheme: 'light',
      locale: 'en',
    });

    // Append the script to the widget container
    const widgetContainer = document.getElementById('tradingview-widget-container');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    // Cleanup function to remove the script on unmount
    return () => {
      if (widgetContainer && script.parentNode) {
        widgetContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default TradingViewCryptoWidget;