import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Award,
  Timer,
  Brain,
  TrendingUp,
  HelpCircle,
  User,
  Users,
  Rocket,
  CheckCircle,
} from "lucide-react";

const EnhancedInvestmentQuiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [points, setPoints] = useState(0);
  const [explanation, setExplanation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [username, setUsername] = useState("Player");
  const [activeTab, setActiveTab] = useState("quiz");
  const [showConfetti, setShowConfetti] = useState(false);

  // Static quiz questions with enhanced content
  const questions = [
    {
      question: "📉 What does a 'bull market' mean?",
      options: [
        "A declining stock market",
        "A rising stock market",
        "A stable market",
        "Only tech stocks rising",
      ],
      correct: 1,
      explanation:
        "A bull market means prices are generally rising, indicating investor confidence. 📈 Bull markets typically last for months or years.",
      difficulty: "Easy",
    },
    {
      question: "💰 What is 'diversification' in investing?",
      options: [
        "Investing in multiple assets",
        "Buying only one type of stock",
        "Holding cash",
        "Short selling",
      ],
      correct: 0,
      explanation:
        "Diversification spreads risk by investing in different assets. 🔄 This strategy helps protect your portfolio during market downturns.",
      difficulty: "Easy",
    },
    {
      question: "📊 What does 'P/E ratio' stand for?",
      options: [
        "Profit/Earnings",
        "Price/Earnings",
        "Potential/Evaluation",
        "Portfolio Equity",
      ],
      correct: 1,
      explanation:
        "The Price-to-Earnings (P/E) ratio helps assess a company's valuation. 💹 Lower P/E may indicate an undervalued stock, while higher P/E might suggest high growth expectations.",
      difficulty: "Medium",
    },
    {
      question: "💵 What is a 'dividend'?",
      options: [
        "A loan taken by a company",
        "A portion of a company's profits paid to shareholders",
        "A type of stock market index",
        "A government bond",
      ],
      correct: 1,
      explanation:
        "A dividend is a portion of a company's profits distributed to shareholders. 💰 Companies that regularly pay dividends are often well-established with stable cash flows.",
      difficulty: "Easy",
    },
    {
      question: "📈 What is 'compound interest'?",
      options: [
        "Interest earned only on the principal amount",
        "Interest earned on both the principal and accumulated interest",
        "A type of stock market investment",
        "A government tax on investments",
      ],
      correct: 1,
      explanation:
        "Compound interest is interest earned on both the principal and previously earned interest. 🚀 It's often called the eighth wonder of the world due to its exponential growth potential.",
      difficulty: "Medium",
    },
    {
      question: "🏦 What is an 'ETF'?",
      options: [
        "Electronic Trading Fund",
        "Exchange-Traded Fund",
        "Equity Transfer Fee",
        "Extended Tax Filing",
      ],
      correct: 1,
      explanation:
        "An ETF (Exchange-Traded Fund) is a basket of securities that trades on an exchange like a stock. 📊 ETFs offer diversification with the trading flexibility of stocks.",
      difficulty: "Medium",
    },
    {
      question: "💱 What is 'forex' trading?",
      options: [
        "Trading in foreign stocks",
        "Trading in foreign exchange markets",
        "A type of retirement account",
        "Trading in commodities",
      ],
      correct: 1,
      explanation:
        "Forex trading involves buying and selling currencies in the foreign exchange market. 🌐 It's the largest financial market in the world with trillions traded daily.",
      difficulty: "Hard",
    },
    {
      question: "📝 What is an 'IPO'?",
      options: [
        "International Payment Option",
        "Initial Public Offering",
        "Investment Portfolio Optimization",
        "Interest Payment Obligation",
      ],
      correct: 1,
      explanation:
        "An Initial Public Offering (IPO) is when a private company first offers shares to the public. 🔔 This process allows companies to raise capital from public investors.",
      difficulty: "Medium",
    },
    {
      question: "🔄 What is 'dollar-cost averaging'?",
      options: [
        "Investing all your money at once",
        "Investing a fixed amount at regular intervals",
        "Converting all investments to dollars",
        "Tracking the average cost of the dollar",
      ],
      correct: 1,
      explanation:
        "Dollar-cost averaging involves investing a fixed amount at regular intervals, regardless of price. ⏱️ This strategy reduces the impact of volatility on investments.",
      difficulty: "Hard",
    },
    {
      question: "📋 What is a 'bond yield'?",
      options: [
        "The price of a bond",
        "The return an investor realizes on a bond",
        "The face value of a bond",
        "The maturity date of a bond",
      ],
      correct: 1,
      explanation:
        "Bond yield is the return an investor realizes on a bond. 📝 It's expressed as a percentage and can be calculated in several ways including current yield and yield to maturity.",
      difficulty: "Hard",
    },
  ];

  // Static leaderboard data
  const leaderboardData = [
    { name: "Alice", score: 183, rank: 1 },
    { name: "Bob", score: 165, rank: 2 },
    { name: "Charlie", score: 154, rank: 3 },
    { name: "David", score: 142, rank: 4 },
    { name: "Emma", score: 129, rank: 5 },
    { name: username, score: points, rank: "?" },
  ];

  // Timer countdown
  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !quizComplete) {
      handleTimeUp();
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft, quizComplete]);

  const handleTimeUp = () => {
    setStreak(0);
    handleNextQuestion();
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setIsActive(false);

    if (index === questions[questionIndex].correct) {
      // Calculate points - more points for faster answers and harder questions
      const basePoints = 10;
      const timeBonus = Math.ceil(timeLeft * 0.5);
      const difficultyMultiplier =
        questions[questionIndex].difficulty === "Easy"
          ? 1
          : questions[questionIndex].difficulty === "Medium"
          ? 1.5
          : 2;

      const earnedPoints = Math.ceil(
        (basePoints + timeBonus) * difficultyMultiplier
      );
      setPoints(points + earnedPoints);
      setStreak(streak + 1);

      // Show confetti for correct answers
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStreak(0);
    }

    setExplanation(questions[questionIndex].explanation);

    setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setExplanation(null);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTimeLeft(15);
      setIsActive(true);
    } else {
      setQuizComplete(true);
      setActiveTab("results");
    }
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setPoints(0);
    setExplanation(null);
    setTimeLeft(15);
    setIsActive(true);
    setQuizComplete(false);
    setStreak(0);
    setActiveTab("quiz");
  };

  // Calculate correct answers
  const calculateCorrectAnswers = () => {
    if (quizComplete) {
      // In a real app, you'd track this during the quiz
      return Math.floor(points / 15); // Rough estimate based on points
    }
    return 0;
  };

  const renderQuizSection = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-white shadow-md border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Current Score
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{points} pts</div>
            <p className="text-xs text-gray-500">
              {streak > 0 && (
                <span className="text-emerald-500 font-medium">
                  🔥 {streak} question streak!
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Time Remaining
            </CardTitle>
            <Timer className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {timeLeft} sec
            </div>
            <Progress
              value={(timeLeft / 15) * 100}
              className="h-2 mt-2 bg-gray-100"
              indicatorClassName="bg-blue-500"
            />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Question Difficulty
            </CardTitle>
            <Brain className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                questions[questionIndex].difficulty === "Easy"
                  ? "text-emerald-500"
                  : questions[questionIndex].difficulty === "Medium"
                  ? "text-amber-500"
                  : "text-rose-500"
              }`}
            >
              {questions[questionIndex].difficulty}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Progress
            </CardTitle>
            <Rocket className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {questionIndex + 1}/{questions.length}
            </div>
            <Progress
              value={((questionIndex + 1) / questions.length) * 100}
              className="h-2 mt-2 bg-gray-100"
              indicatorClassName="bg-indigo-500"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden bg-white shadow-lg border-none">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-gray-800">
              Question {questionIndex + 1}
            </CardTitle>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {Math.round((questionIndex / questions.length) * 100)}% Complete
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            {questions[questionIndex].question}
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            {questions[questionIndex].options.map((option, idx) => (
              <Button
                key={idx}
                className={`py-4 px-5 h-auto text-left justify-start transition-all duration-300 shadow-sm ${
                  selectedAnswer === idx
                    ? idx === questions[questionIndex].correct
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-rose-500 hover:bg-rose-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200"
                }`}
                variant="ghost"
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 text-sm ${
                    selectedAnswer === idx
                      ? "bg-white text-gray-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </Button>
            ))}
          </div>

          {explanation && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="flex items-center text-gray-800">
                <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                <span>{explanation}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderResultsSection = () => (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg border-none overflow-hidden">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-center text-2xl text-gray-800">
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-10">
          <Award className="h-24 w-24 text-amber-500 mb-6" />
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {points} Points
          </div>
          <p className="text-lg text-gray-600 mb-6">
            You answered {calculateCorrectAnswers()} out of {questions.length}{" "}
            questions correctly!
          </p>
          <Button
            onClick={resetQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Restart Quiz
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg border-none">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-xl text-gray-800">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="space-y-3">
            {leaderboardData.map((entry, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  entry.name === username ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-800">
                    {entry.name}
                  </span>
                  {entry.name === username && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                      You
                    </span>
                  )}
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  {entry.score} pts
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="max-w-6xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="results" disabled={!quizComplete}>
            Results
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quiz">{renderQuizSection()}</TabsContent>
        <TabsContent value="results">{renderResultsSection()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedInvestmentQuiz;
