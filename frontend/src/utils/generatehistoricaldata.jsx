export const generateHistoricalData = (timeframe, startPrice) => {
    const data = [];
    let currentPrice = startPrice;
    const days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90;
  
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      currentPrice += (Math.random() - 0.5) * 2;
      data.unshift({
        date: date.toISOString().split('T')[0],
        price: parseFloat(currentPrice.toFixed(2)),
      });
    }
  
    return data;
  };