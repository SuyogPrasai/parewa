import json
from pymongo import MongoClient
from datetime import datetime
import re

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27014/")

db = client["parewa_backend"]
collection = db["events"]

# Function to parse date strings with improved handling
def parse_date(date_str):
    if not date_str:
        return None
    
    # Remove any whitespace
    date_str = str(date_str).strip()
    
    try:
        # Handle YYYYMMDD format (common in iCalendar)
        if len(date_str) == 8 and date_str.isdigit():
            return datetime.strptime(date_str, "%Y%m%d")
        
        # Handle YYYYMMDDTHHMMSS format (datetime with time)
        if len(date_str) == 15 and date_str[8] == 'T' and date_str[:8].isdigit() and date_str[9:].isdigit():
            return datetime.strptime(date_str, "%Y%m%dT%H%M%S")
        
        # Handle YYYYMMDDTHHMMSSZ format (UTC datetime)
        if len(date_str) == 16 and date_str.endswith('Z') and date_str[8] == 'T':
            return datetime.strptime(date_str, "%Y%m%dT%H%M%SZ")
        
        # Handle ISO format with timezone
        if 'T' in date_str:
            # Replace Z with +00:00 for UTC
            if date_str.endswith('Z'):
                date_str = date_str[:-1] + '+00:00'
            return datetime.fromisoformat(date_str)
        
        # Handle YYYY-MM-DD format
        if re.match(r'^\d{4}-\d{2}-\d{2}$', date_str):
            return datetime.strptime(date_str, "%Y-%m-%d")
        
        # Handle DD/MM/YYYY format
        if re.match(r'^\d{2}/\d{2}/\d{4}$', date_str):
            return datetime.strptime(date_str, "%d/%m/%Y")
        
        # Handle MM/DD/YYYY format
        if re.match(r'^\d{1,2}/\d{1,2}/\d{4}$', date_str):
            return datetime.strptime(date_str, "%m/%d/%Y")
        
        # Try to parse as ISO format (fallback)
        return datetime.fromisoformat(date_str)
        
    except (ValueError, TypeError) as e:
        print(f"Invalid date format: {date_str}, Error: {e}")
        return None

# Function to convert datetime to YYYY-MM-DD format string
def format_date_to_string(dt):
    """Convert datetime object to YYYY-MM-DD string format"""
    if dt is None:
        return None
    return dt.date().isoformat()

# Function to extract date from iCalendar property (handles different formats)
def extract_date_from_property(event, property_name):
    # Try different possible property names
    possible_names = [
        property_name,
        f"{property_name};VALUE=DATE",
        f"{property_name};TZID=UTC"
    ]
    
    for name in possible_names:
        if name in event:
            return parse_date(event[name])
    
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
    skipped_events = 0
    
    for event in events:
        # Extract dates using improved function
        startDate = extract_date_from_property(event, "DTSTART")
        endDate = extract_date_from_property(event, "DTEND")
        title = event.get("SUMMARY")

        # Only include events with valid data
        if title and startDate:
            # If no end date, use start date
            if not endDate:
                endDate = startDate
            
            # Format dates to YYYY-MM-DD string format
            startDate_str = format_date_to_string(startDate)
            endDate_str = format_date_to_string(endDate)
            
            filtered_data.append({
                "title": title,
                "startDate": startDate_str,
                "endDate": endDate_str,
            })

        else:
            skipped_events += 1
            print(f"Skipping event with missing or invalid data: Title: {title}, Start: {startDate}")

    # Insert into MongoDB
    if filtered_data:
        try:
            # Create index on startDate for better query performance
            collection.create_index("startDate")
            
            # Insert the data
            result = collection.insert_many(filtered_data)
            print(f"{len(filtered_data)} records inserted successfully!")
            print(f"Inserted IDs: {result.inserted_ids[:5]}...")  # Show first 5 IDs
            
            if skipped_events > 0:
                print(f"Skipped {skipped_events} events due to missing or invalid data.")
                
        except Exception as e:
            print(f"Error inserting data into MongoDB: {e}")
    else:
        print("No valid data to insert.")

# Verify the data was stored correctly
print("\nVerifying stored data (first 3 records):")
try:
    sample_records = collection.find().limit(3)
    for record in sample_records:
        print(f"Title: {record['title']}")
        print(f"Start Date: {record['startDate']} (Type: {type(record['startDate'])})")
        print(f"End Date: {record['endDate']} (Type: {type(record['endDate'])})")
        print("---")
except Exception as e:
    print(f"Error retrieving data: {e}")

# Close MongoDB connection
client.close()