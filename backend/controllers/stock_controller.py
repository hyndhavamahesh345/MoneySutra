from flask import jsonify
from models.stocks import StockData
# from utils.csv_utils import read_csv, is_file_up_to_date
import os
import pandas as pd
import datetime

def read_csv(file_path):
    """Read a CSV file and return a DataFrame."""
    return pd.read_csv(file_path)

def is_file_up_to_date(file_path):
    """Check if a file was last modified today."""
    if not os.path.exists(file_path):
        return False
    file_date = datetime.datetime.fromtimestamp(os.path.getmtime(file_path)).date()
    return file_date == datetime.date.today()
class StockController:
    @staticmethod
    def get_available_tickers():
        """Get a list of available ticker symbols and company names from the static CSV file."""
        try:
            print("Fetching available tickers...")
            # Determine path to CSV
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            file_path = os.path.join(base_dir, "static", "TickerList.csv")
            print(f"File path: {file_path}")
            
            if not os.path.exists(file_path):
                return jsonify({"error": f"Ticker list not found at {file_path}"}), 404

            # Read the CSV file
            df = pd.read_csv(file_path)

            # Ensure column names are stripped of whitespace
            df.columns = df.columns.str.strip()

            # Extract SYMBOL and NAME OF COMPANY columns
            if "SYMBOL" not in df.columns or "NAME OF COMPANY" not in df.columns:
                return jsonify({"error": f"Required columns missing. Found: {list(df.columns)}"}), 500
                
            tickers = df[["SYMBOL", "NAME OF COMPANY"]].rename(
                columns={"SYMBOL": "symbol", "NAME OF COMPANY": "name"}
            )

            # Convert to a list of dictionaries
            tickers_list = tickers.to_dict(orient="records")

            return jsonify({"tickers": tickers_list}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def fetch_historical_data(ticker):
        """Fetch historical data for a given ticker symbol."""
        try:
            # We must return file_content as base64 so frontend can parse it
            stock = StockData(ticker)
            response = stock.get_historical_data()
            if "error" in response:
                return jsonify(response), 404
            return jsonify(response), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def fetch_stock_info(ticker):
        """Fetch general stock information."""
        stock = StockData(ticker)
        response = stock.get_stock_info()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_dividends(ticker):
        """Fetch dividend history."""
        stock = StockData(ticker)
        response = stock.get_dividends()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_splits(ticker):
        """Fetch stock split history."""
        stock = StockData(ticker)
        response = stock.get_splits()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_earnings_dates(ticker):
        """Fetch earnings dates."""
        stock = StockData(ticker)
        response = stock.get_earnings_dates()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_analyst_recommendations(ticker):
        """Fetch analyst recommendations."""
        stock = StockData(ticker)
        response = stock.get_analyst_recommendations()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_institutional_holders(ticker):
        """Fetch institutional holders."""
        stock = StockData(ticker)
        response = stock.get_institutional_holders()
        return jsonify(response), (200 if "error" not in response else 500)

    @staticmethod
    def fetch_sustainability(ticker):
        """Fetch sustainability data."""
        stock = StockData(ticker)
        response = stock.get_sustainability()
        return jsonify(response), (200 if "error" not in response else 500)