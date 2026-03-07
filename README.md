<div align="center">

<img src="./logo_readme.png" alt="MoneySutra Logo" width="120" height="120" />

# MoneySutra 🚀

### *Your AI-Powered Financial Companion for Modern India*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)

**[Live Demo](#)** · **[Report Bug](https://github.com/yourusername/MoneySutra/issues)** · **[Request Feature](https://github.com/yourusername/MoneySutra/issues)**

</div>

---

## 📖 Overview

**MoneySutra** is a full-stack, AI-powered personal finance platform purpose-built for the modern Indian investor. Trade stocks virtually, simulate SIP returns, get an AI health score for your portfolio, manage budgets, and learn through curated e-books — all in one beautifully designed dark-mode interface.

> *"Sutra" (सूत्र) in Sanskrit means a guiding thread or formula — MoneySutra is your formula for financial freedom.*

---

## ✨ Key Features

### 💹 Paper Trading
Simulate real NSE stock trades with ₹1,00,000 in virtual cash. Buy and sell using live Yahoo Finance price data, track your holdings, and review transaction history — zero risk, maximum learning.

### 📊 SIP Simulator
Interactively project wealth growth across NIFTY 50, SENSEX, Gold ETF, and Fixed Deposits. Adjust monthly SIP amount (₹500–₹1L) and time horizon (1–30 years) with instant chart updates.

### 🏆 Beat The Index Challenge
Compete against NIFTY 50 on a live 30-day leaderboard. Use your virtual portfolio to try and outperform the index — the ultimate test of your investment strategy.

### 🩺 Portfolio Health Score
AI-powered analysis of your portfolio across 5 dimensions — **Diversification, Liquidity, Activity, Risk Management, and Growth** — rendered on a dynamic radar chart with personalized recommendations.

### 📈 Dashboard & Portfolio Tracker
A full analytics dashboard showing portfolio value, recent transactions, expense breakdowns, and savings overview in real-time.

### 💰 Budget & Expense Management
Set monthly budgets by category, log expenses, and track spending habits with interactive charts and visual breakdowns.

### 📚 Investment Education
Access curated e-books and guides on Mutual Funds, Stock Fundamentals, SIP strategies, and more.

### 🧾 Tax Guidance
Comprehensive sections on Indian income tax, types of taxes, ITR filing, tax planning, and how to read tax notices.

### 🤝 Advisor Connect
Connect with certified financial advisors, request consultations, and get expert guidance — all within the app.

### 🌐 Multi-Language Support
Built-in Google Translate integration for regional language accessibility across India.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite 6, Tailwind CSS v4, ShadCN UI |
| **Animations** | GSAP, ScrollTrigger, Lenis Smooth Scroll |
| **Charts** | Recharts, Chart.js |
| **Backend** | Python 3.10+, Flask 3.x, Flask-CORS |
| **Database** | Firebase Firestore (+ MockFirestore for local dev) |
| **Auth** | Firebase Auth + bcrypt password hashing |
| **Stock Data** | yfinance (Yahoo Finance API) |
| **AI/ML** | Custom rule-based scoring engine (expandable to Gemini API) |
| **Icons** | Lucide React |
| **PDF/Files** | Google Drive API integration |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- **Python** 3.10+
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MoneySutra.git
cd MoneySutra
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo FIREBASE_CREDENTIALS=path/to/serviceAccountKey.json > .env

# Run the backend
python app.py
```

> **Note:** For local development without Firebase, the app automatically uses `MockFirestore` — no credentials needed.

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the App

| Service | URL |
|---------|-----|
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend API | [http://localhost:5000](http://localhost:5000) |

### 🔑 Demo Login Credentials

```
Email:    sample@gmail.com
Password: 123456789
```

---

## 📁 Project Structure

```
MoneySutra/
├── backend/                  # Flask API server
│   ├── app.py                # Main Flask app & route registration
│   ├── config/
│   │   └── firebase.py       # Firestore client (+ MockFirestore)
│   ├── controllers/          # Business logic controllers
│   ├── models/               # Data models (User, StockData, etc.)
│   ├── routes/               # API route blueprints
│   └── static/
│       └── TickerList.csv    # NSE stock ticker list
│
├── frontend/                 # React + Vite application
│   ├── public/
│   │   ├── logo.png          # Rupee Rocket brand logo
│   │   └── favicon.png       # Browser favicon
│   ├── src/
│   │   ├── App.jsx           # Root router & layout
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── home/         # Landing page
│   │   │   ├── dashboard/    # Dashboard widgets
│   │   │   └── papertrading/ # Paper trading sub-components
│   │   └── Pages/            # Route-level page components
│   │       ├── Dashboard/
│   │       ├── Games/        # Paper Trading, Quiz, Predict
│   │       ├── Tools/        # SIP Simulator, Beat Index, Health Score
│   │       ├── Budget/
│   │       ├── Portfolio/
│   │       ├── ITR/          # Tax-related pages
│   │       └── Advisor/
│   └── index.html
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login & return user profile |

### Paper Trading
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/funds?uid=` | Get virtual wallet balance |
| `POST` | `/add_funds` | Add virtual funds |
| `GET` | `/holdings?uid=` | Get stock holdings |
| `POST` | `/buy_stock` | Buy a stock |
| `POST` | `/sell_stock` | Sell a stock |
| `GET` | `/transactions?uid=` | Get trade history |

### Stocks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stocks` | Get all NSE tickers |
| `GET` | `/get_stock_prices` | Get real-time prices |
| `POST` | `/stock/historical` | Get historical chart data |

### Finance
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/expenses` | Log an expense |
| `GET` | `/expenses` | Get all expenses |
| `POST` | `/budget` | Set budget |
| `GET` | `/budget` | Get budget summary |

---

## 🗺️ Roadmap

- [ ] Real-time WebSocket price streaming
- [ ] Gemini AI integration for conversational financial advice
- [ ] Mobile app (React Native)
- [ ] Mutual Fund NAV tracking via MFI API
- [ ] UPI payment simulation for paper trading
- [ ] Personalised goal-based investment plans
- [ ] WhatsApp-style financial journal
- [ ] Export portfolio as PDF report

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) and open a pull request.

```bash
# Fork the repo, then:
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
# Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👥 Team

Built with ❤️ for the modern Indian investor.

---

<div align="center">

**⭐ Star this repo if MoneySutra helped you on your financial journey!**

*MoneySutra — Track · Trade · Grow*

</div>
