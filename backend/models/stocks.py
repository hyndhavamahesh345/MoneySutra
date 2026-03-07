import yfinance as yf
import pandas as pd
import os
import base64  # Import base64 for encoding

# Define folder to save CSV files
CSV_FOLDER = "generated_csv"
os.makedirs(CSV_FOLDER, exist_ok=True)  # Ensure the folder exists

import datetime
class StockData:
    def format_ticker( ticker):
        """Ensure ticker is uppercase and ends with .NS if missing."""
        ticker = ticker.upper()
        return ticker if ticker.endswith(".NS") else f"{ticker}.NS"

    def __init__(self, ticker_symbol):
        """Initialize StockData with a properly formatted ticker."""
        self.ticker_symbol = StockData.format_ticker(ticker_symbol)
        self.ticker = yf.Ticker(self.ticker_symbol)

    def get_historical_data(self):
        """Fetch and return historical stock data."""
        try:
            file_path = f"{CSV_FOLDER}/{self.ticker_symbol}_historical.csv"
            if os.path.exists(file_path):
                # Check if the file is up to date
                file_date = datetime.datetime.fromtimestamp(os.path.getmtime(file_path)).date()
                if file_date == datetime.date.today():
                    with open(file_path, 'rb') as file:
                        file_content = file.read()
                        # Encode the binary content to Base64
                        file_content_base64 = base64.b64encode(file_content).decode('utf-8')
                        return {
                            "message": "Data is up to date",
                            "file_path": file_path,
                            "file_content": file_content_base64  # Return Base64-encoded content
                        }

            # Fetch new data
            data = self.ticker.history(period="max")
            data.reset_index(inplace=True)
            data.to_csv(file_path, index=False)

            with open(file_path, 'rb') as file:
                file_content = file.read()
                # Encode the binary content to Base64
                file_content_base64 = base64.b64encode(file_content).decode('utf-8')
                return {
                    "message": "CSV file generated successfully",
                    "file_path": file_path,
                    "file_content": file_content_base64  # Return Base64-encoded content
                }
        except Exception as e:
            return {"error": str(e)}

    # Other methods remain the same...

    def save_to_csv(self, data, filename, columns=None):
        """Save data to CSV if valid, return file path or error."""
        if "error" in data or not data:
            return {"error": "No valid data available"}

        df = pd.DataFrame.from_dict(data) if isinstance(data, dict) else pd.DataFrame(data, columns=columns)
        file_path = os.path.join(CSV_FOLDER, filename)
        df.to_csv(file_path, index=False)

        return {"message": "CSV file generated successfully", "file_path": file_path}


    def get_stock_info(self):
        """Fetch general stock information and save as CSV."""
        try:
            data = self.ticker.info
            return self.save_to_csv(data, f"{self.ticker_symbol}_info.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_dividends(self):
        """Fetch dividend history and save it as CSV."""
        try:
            data = self.ticker.dividends.to_frame().reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_dividends.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_splits(self):
        """Fetch stock split history and save it as CSV."""
        try:
            data = self.ticker.splits.to_frame().reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_splits.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_earnings_dates(self):
        """Fetch past and future earnings dates and save as CSV."""
        try:
            data = self.ticker.get_earnings_dates().reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_earnings.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_analyst_recommendations(self):
        """Fetch analyst recommendations and save as CSV."""
        try:
            data = self.ticker.recommendations  # Corrected attribute reference

            if data is None or data.empty:  # Check if data exists
                return {"error": "No analyst recommendation data available"}

            return self.save_to_csv(data, f"{self.ticker_symbol}_analyst_recommendations.csv")

        except Exception as e:
            return {"error": str(e)}


    def get_institutional_holders(self):
        """Fetch institutional holders and save as CSV."""
        try:
            data = self.ticker.institutional_holders.reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_institutional.csv")
        except Exception as e:
            return {"error": str(e)}

    def get_sustainability(self):
        """Fetch sustainability data and save as CSV."""
        try:
            data = self.ticker.sustainability.reset_index()
            return self.save_to_csv(data, f"{self.ticker_symbol}_sustainability.csv")
        except Exception as e:
            return {"error": str(e)}
    @staticmethod
    def get_stock_prices(stock_symbols):
        try:
            # Validate input
            if not stock_symbols or not isinstance(stock_symbols, list):
                return {"error": "Stock symbols must be provided as a list"}, 400

            # Fetch stock prices using yfinance
            stock_prices = {}
            for symbol in stock_symbols:
                formatted_symbol = StockData.format_ticker(symbol)
                try:
                    stock = yf.Ticker(formatted_symbol)
                    
                    # Try getting price from fast_info first (most efficient)
                    latest_price = None
                    try:
                        latest_price = stock.fast_info.last_price
                    except:
                        pass
                        
                    if latest_price is None or latest_price == 0:
                        # Fallback to history
                        hist = stock.history(period="1d")
                        if not hist.empty:
                            latest_price = hist["Close"].iloc[-1]
                    
                    if latest_price is None or latest_price == 0:
                        # Final fallback to info
                        try:
                            latest_price = stock.info.get('regularMarketPrice') or stock.info.get('currentPrice')
                        except:
                            pass

                    if latest_price:
                        stock_prices[symbol] = round(float(latest_price), 2)
                    else:
                        print(f"Could not find price for {formatted_symbol}")
                        stock_prices[symbol] = 0.0
                except Exception as e:
                    print(f"Error fetching price for {symbol}: {e}")
                    stock_prices[symbol] = 0.0

            return {"stock_prices": stock_prices}, 200
        except Exception as e:
            return {"error": str(e)}, 500