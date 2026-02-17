import pandas as pd
import os
from datetime import datetime

def read_csv(file_path):
    """Read a CSV file and return a DataFrame."""
    return pd.read_csv(file_path)

def is_file_up_to_date(file_path):
    """Check if a file was last modified today."""
    if not os.path.exists(file_path):
        return False
    file_date = datetime.fromtimestamp(os.path.getmtime(file_path)).date()
    return file_date == datetime.today().date()