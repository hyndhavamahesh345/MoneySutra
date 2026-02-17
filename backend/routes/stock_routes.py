from flask import Blueprint, request, jsonify
from controllers.stock_controller import StockController
from models.stocks import StockData
stock_routes = Blueprint("stock_routes", __name__)

@stock_routes.route("/stocks", methods=["GET"])
def get_available_tickers():
    """Get a list of available ticker symbols."""
    return StockController.get_available_tickers()

@stock_routes.route("/stock/historical", methods=["POST"])
def get_historical_data():
    """Fetch historical data for a given ticker symbol."""
    data = request.get_json()
    ticker = data.get("ticker")
    print(ticker)
    return StockController.fetch_historical_data(ticker)

@stock_routes.route("/stock/info/<ticker>", methods=["GET"])
def get_stock_info(ticker):
    """Fetch general stock information."""
    return StockController.fetch_stock_info(ticker)

@stock_routes.route("/stock/dividends/<ticker>", methods=["GET"])
def get_dividends(ticker):
    """Fetch dividend history."""
    return StockController.fetch_dividends(ticker)

@stock_routes.route("/stock/splits/<ticker>", methods=["GET"])
def get_splits(ticker):
    """Fetch stock split history."""
    return StockController.fetch_splits(ticker)

@stock_routes.route("/stock/earnings/<ticker>", methods=["GET"])
def get_earnings_dates(ticker):
    """Fetch earnings dates."""
    return StockController.fetch_earnings_dates(ticker)

@stock_routes.route("/stock/analyst/<ticker>", methods=["GET"])
def get_analyst_recommendations(ticker):
    """Fetch analyst recommendations."""
    return StockController.fetch_analyst_recommendations(ticker)

@stock_routes.route("/stock/institutional/<ticker>", methods=["GET"])
def get_institutional_holders(ticker):
    """Fetch institutional holders."""
    return StockController.fetch_institutional_holders(ticker)

@stock_routes.route("/stock/sustainability/<ticker>", methods=["GET"])
def get_sustainability(ticker):
    """Fetch sustainability data."""
    return StockController.fetch_sustainability(ticker)

@stock_routes.route('/get_stock_prices', methods=['POST'])
def get_stock_prices():
    data = request.get_json()
    stock_symbols = data.get('stock_symbols')

    if not stock_symbols or not isinstance(stock_symbols, list):
        return jsonify({"error": "Stock symbols must be provided as a list"}), 400

    response, status_code = StockData.get_stock_prices(stock_symbols)
    return jsonify(response), status_code