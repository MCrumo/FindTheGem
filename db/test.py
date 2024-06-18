import pandas as pd

# Load the dataset
df = pd.read_csv('patents.csv')

# Define a function to clean and format dates
def clean_and_format_date(date_str):
    if pd.isnull(date_str) or date_str.strip() == "":
        return None  # Return None if the date is missing or empty
    try:
        # Try to convert the date to the desired format
        return pd.to_datetime(date_str).strftime('%Y-%m-%d')
    except ValueError:
        # Return None if the date conversion fails
        return None

# Clean and format the 'Grant Date' and 'Expiration date' columns
df['Grant Date'] = df['Grant Date'].apply(clean_and_format_date)
df['Expiration date'] = df['Expiration date'].apply(clean_and_format_date)

# Save the cleaned data back to a CSV file
df.to_csv('cleaned_patents.csv', index=False)