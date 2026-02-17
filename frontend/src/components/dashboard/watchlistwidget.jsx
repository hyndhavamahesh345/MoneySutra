import React, { useEffect } from 'react';

const TradingViewMarketOverview = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: '500',
      height: '400',
      plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
      plotLineColorFalling: 'rgba(41, 98, 255, 1)',
      gridLineColor: 'rgba(42, 46, 57, 0)',
      scaleFontColor: 'rgba(219, 219, 219, 1)',
      belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
      belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
      symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
      tabs: [
        {
          title: 'Indian Stocks',
          symbols: [
            { s: 'BSE:RELIANCE', d: 'Reliance Industries' },
            { s: 'BSE:TCS', d: 'Tata Consultancy Services' },
            { s: 'BSE:INFY', d: 'Infosys' },
            { s: 'BSE:HDFCBANK', d: 'HDFC Bank' },
            { s: 'BSE:ICICIBANK', d: 'ICICI Bank' },
          ],
          originalTitle: 'Indian Stocks',
        },
        {
          title: 'Indian Indices',
          symbols: [
            { s: 'BSE:NIFTY', d: 'Nifty 50' },
            { s: 'BSE:SEBSEX', d: 'SeBSEx' },
          ],
          originalTitle: 'Indian Indices',
        },
        {
          title: 'Forex',
          symbols: [
            { s: 'FX:USDINR', d: 'USD to INR' },
            { s: 'FX:EURINR', d: 'EUR to INR' },
            { s: 'FX:GBPINR', d: 'GBP to INR' },
          ],
          originalTitle: 'Forex',
        },
      ],
    });

    const widgetContainer = document.getElementById('tradingview-market-overview');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    return () => {
      if (widgetContainer && script.parentNode) {
        widgetContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-market-overview">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default TradingViewMarketOverview;