import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, TrendingDown, Users, Award } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
          ⚠️ Something went wrong with the chart. Please try again later.
        </div>
      );
    }

    return this.props.children;
  }
}

const PredictMarket = () => {
  const [points, setPoints] = useState(100);
  const [prediction, setPrediction] = useState(null);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [username, setUsername] = useState("Player");
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alice", score: 250, avatar: "A" },
    { name: "Bob", score: 200, avatar: "B" },
    { name: "Charlie", score: 150, avatar: "C" },
    { name: "Player", score: 100, avatar: "P" },
  ]);
  const [gameHistory, setGameHistory] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [marketStatus, setMarketStatus] = useState("stable");
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameRound, setGameRound] = useState(1);
  const [difficultyLevel, setDifficultyLevel] = useState("easy");

  // Function to get styles based on market status
  const getMarketStatusStyles = () => {
    switch (marketStatus) {
      case "bullish":
        return "bg-green-50 border-green-300";
      case "bearish":
        return "bg-red-50 border-red-300";
      case "predicting":
        return "bg-blue-50 border-blue-300";
      default:
        return "bg-gray-50 border-gray-300";
    }
  };

  // Generate random stock data
  const generateNewStockData = () => {
    const basePrice = 150;
    const volatility =
      difficultyLevel === "easy" ? 5 : difficultyLevel === "medium" ? 8 : 12;
    const trend = Math.random() > 0.5 ? 1 : -1;

    const data = [basePrice];
    for (let i = 1; i < 6; i++) {
      const randomChange = Math.random() * volatility * trend;
      const lastPrice = data[i - 1];
      const newPrice = Math.max(50, lastPrice + randomChange);
      data.push(Math.round(newPrice * 100) / 100);
    }

    return {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
      datasets: [
        {
          label: "Stock Price",
          data: data,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          pointBorderColor: "#fff",
          pointRadius: 4,
        },
      ],
    };
  };

  // Generate market result (Up or Down)
  const generateMarketResult = () => {
    const trend = Math.random() > 0.5 ? "Up" : "Down";
    return trend;
  };

  // Update chart with the new result
  const updateChartWithResult = (marketResult) => {
    const newData = generateNewStockData();
    const lastPrice = newData.datasets[0].data[5];
    const newPrice =
      marketResult === "Up"
        ? lastPrice + Math.random() * 10
        : lastPrice - Math.random() * 10;
    newData.datasets[0].data.push(Math.round(newPrice * 100) / 100);
    newData.labels.push(`Day ${newData.labels.length + 1}`);
    return newData;
  };

  // Initialize chart data
  useEffect(() => {
    try {
      const data = generateNewStockData();
      setChartData(data);
    } catch (error) {
      console.error("Error generating chart data:", error);
      setChartData(null);
    }
  }, [difficultyLevel]);

  // Chart options with animations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  // Handle prediction logic
  const handlePrediction = (choice) => {
    setPrediction(choice);
    setMarketStatus("predicting");

    setTimeout(() => {
      try {
        const marketResult = generateMarketResult();
        const updatedChart = updateChartWithResult(marketResult);
        setChartData(updatedChart);

        setMarketStatus(marketResult === "Up" ? "bullish" : "bearish");

        let newPoints, resultText, pointsChange;

        if (marketResult === choice) {
          pointsChange = streak >= 2 ? 30 : 20;
          newPoints = points + pointsChange;
          resultText = `✅ Correct! You earned ${pointsChange} points.`;
          setStreak(streak + 1);

          if (streak >= 2) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
        } else {
          pointsChange = -10;
          newPoints = points - 10;
          resultText = "❌ Wrong! You lost 10 points.";
          setStreak(0);
        }

        setPoints(newPoints);
        setResult(resultText);

        setGameHistory((prev) => [
          {
            round: gameRound,
            prediction: choice,
            result: marketResult,
            pointsChange,
          },
          ...prev.slice(0, 4),
        ]);

        setGameRound((prev) => prev + 1);

        const updatedLeaderboard = leaderboard.map((player) =>
          player.name === username ? { ...player, score: newPoints } : player
        );
        setLeaderboard(updatedLeaderboard.sort((a, b) => b.score - a.score));
      } catch (error) {
        console.error("Error handling prediction:", error);
        setResult("⚠️ An error occurred. Please try again.");
      } finally {
        setTimeout(() => {
          setPrediction(null);
          setResult(null);
          setMarketStatus("stable");
        }, 3000);
      }
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-8 flex flex-col gap-8">
      {/* Header and Difficulty Selector */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center mb-6">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📈 Market Prediction Master
          </h1>
          <p className="text-gray-500 mb-4">
            Predict market movements and climb the leaderboard!
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={() => setDifficultyLevel("easy")}
              className={`px-4 py-2 rounded-full ${
                difficultyLevel === "easy"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Easy
            </Button>
            <Button
              onClick={() => setDifficultyLevel("medium")}
              className={`px-4 py-2 rounded-full ${
                difficultyLevel === "medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Medium
            </Button>
            <Button
              onClick={() => setDifficultyLevel("hard")}
              className={`px-4 py-2 rounded-full ${
                difficultyLevel === "hard"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Hard
            </Button>
          </div>
        </div>
      </div>

      {/* Game Section */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Card
            className={`p-6 bg-white rounded-2xl shadow-lg border-2 ${getMarketStatusStyles()} transition-all duration-500`}
          >
            {/* Stats Section */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Current Score
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">
                    {points} pts
                  </div>
                  {streak > 0 && (
                    <p className="text-xs text-emerald-500 font-medium">
                      🔥 {streak} streak!
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Leaderboard Rank
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">
                    #
                    {leaderboard.findIndex(
                      (player) => player.name === username
                    ) + 1}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Difficulty
                  </CardTitle>
                  <Award className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 capitalize">
                    {difficultyLevel}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stock Graph */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📊 Historical Stock Trend
            </h2>
            <div className="w-full h-64 mb-6">
              <ErrorBoundary>
                {chartData ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <div>Loading chart data...</div>
                )}
              </ErrorBoundary>
            </div>

            {/* Prediction Buttons */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📢 Predict: Will the stock go up or down?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl text-lg"
                onClick={() => handlePrediction("Up")}
                disabled={prediction !== null}
              >
                <TrendingUp className="mr-2 h-5 w-5" /> Up
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl text-lg"
                onClick={() => handlePrediction("Down")}
                disabled={prediction !== null}
              >
                <TrendingDown className="mr-2 h-5 w-5" /> Down
              </Button>
            </div>

            {/* Result Message */}
            {result && (
              <p className="mt-6 text-lg font-semibold text-center text-gray-800">
                {result}
              </p>
            )}
          </Card>
        </div>

        {/* Leaderboard Section */}
        <div className="lg:w-1/3">
          <Card className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              🏆 Leaderboard
            </h2>
            <ul className="space-y-3">
              {leaderboard.map((player, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    player.name === username ? "bg-blue-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-800">
                      {index + 1}. {player.name}
                    </span>
                    {player.name === username && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    {player.score} pts
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PredictMarket;