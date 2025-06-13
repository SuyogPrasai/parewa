import json
from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient("mongodb+srv://suyogprasai:uU9kiqpVlvppdAi5@parewa.8akkuij.mongodb.net/?retryWrites=true&w=majority&appName=parewa/parewa_backend")

db = client["parewa_backend"]
collection = db["events"]

# Function to parse date strings
def parse_date(date_str):
    try:
        # Handle YYYYMMDD format (common in iCalendar)
        if date_str and len(date_str) == 8 and date_str.isdigit():
            return datetime.strptime(date_str, "%Y%m%d")
        # Handle other date formats (e.g., ISO)
        return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    except (ValueError, TypeError) as e:
        print(f"Invalid date format: {date_str}, Error: {e}")
        return None

# Read the JSON file
try:
    with open("basic.json", "r", encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    print("Error: basic.json file not found.")
    exit(1)
except json.JSONDecodeError:
    print("Error: Invalid JSON format in basic.json.")
    exit(1)

# Extract VEVENT list from VCALENDAR
vcalendar = data.get("VCALENDAR", [])

if isinstance(vcalendar, list) and len(vcalendar) > 0:
    events = vcalendar[0].get("VEVENT", [])
else:
    events = []

if not events:
    print("No valid VEVENT data found. Check JSON structure.")
else:
    # Extract and format required fields
    filtered_data = []
    for event in events:
        start_date = parse_date(event.get("DTSTART;VALUE=DATE") or event.get("DTSTART"))
        end_date = parse_date(event.get("DTEND;VALUE=DATE") or event.get("DTEND"))
        title = event.get("SUMMARY")

        # Only include events with valid data
        if title and start_date and end_date:
            filtered_data.append({
                "title": title,
                "start_date": start_date,
                "end_date": end_date
            })
        else:
            print(f"Skipping event with missing or invalid data: {event}")

    # Insert into MongoDB
    if filtered_data:
        try:
            collection.insert_many(filtered_data)
            print(f"{len(filtered_data)} records inserted successfully!")
        except Exception as e:
            print(f"Error inserting data into MongoDB: {e}")
    else:
        print("No valid data to insert.")