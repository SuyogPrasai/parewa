import json
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["calendar_data"]
collection = db["events"]

# Read the JSON file
with open("basic.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Extract VEVENT list from VCALENDAR
vcalendar = data.get("VCALENDAR", [])

if isinstance(vcalendar, list) and len(vcalendar) > 0:
    events = vcalendar[0].get("VEVENT", [])  # Get VEVENT from first VCALENDAR entry
else:
    events = []

if not events:
    print("No valid VEVENT data found. Check JSON structure.")
else:
    # Extract required fields
    filtered_data = [
        {
            "Title": event.get("SUMMARY"),
            "start_date": event.get("DTSTART;VALUE=DATE") or event.get("DTSTART"),
            "end_date": event.get("DTEND;VALUE=DATE") or event.get("DTEND")
        }
        for event in events
    ]

    # Insert into MongoDB
    collection.insert_many(filtered_data)
    print(f"{len(filtered_data)} records inserted successfully!")
