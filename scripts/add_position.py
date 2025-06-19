import pymongo
from pymongo import MongoClient
import sys

def connect_to_mongodb():
    try:
        # Connect to MongoDB (update the connection string as needed)
        client = MongoClient('mongodb://localhost:27014/')
        db = client['parewa_backend']  # Replace with your database name
        collection = db['positions']   # Matches the Mongoose model name
        return collection
    except pymongo.errors.ConnectionError as e:
        print(f"Error connecting to MongoDB: {e}")
        sys.exit(1)

def insert_position(collection):
    while True:
        # Get user input
        name = input("Enter position name (or type 'exit' to quit): ").strip()
        
        if name.lower() == 'exit':
            print("Exiting program.")
            break
        
        if not name:
            print("Position name cannot be empty. Please try again.")
            continue
        
        # Create document to insert
        position = {
            "name": name
            # createdAt and updatedAt are handled by Mongoose timestamps
        }
        
        try:
            # Insert the document
            result = collection.insert_one(position)
            print(f"Successfully inserted position with ID: {result.inserted_id}")
        except pymongo.errors.PyMongoError as e:
            print(f"Error inserting position: {e}")
            continue

def main():
    # Connect to MongoDB
    collection = connect_to_mongodb()
    
    print("MongoDB Position Data Entry")
    print("WARNING: the positions that you create must be linked to the WORDPRESS CMS OR THINGS WILL BREAK")
    print("--------------------------")
    insert_position(collection)

if __name__ == "__main__":
    main()