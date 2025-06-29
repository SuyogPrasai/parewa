from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from typing import Dict
import uuid
import datetime

def connect_to_mongodb() -> Collection:
    """Establishes connection to MongoDB and returns the roles collection."""
    try:
        # Connect to MongoDB (update the connection string as needed)
        client: MongoClient = MongoClient("mongodb://localhost:27014/")
        db: Database = client["parewa_backend"]  # Replace with your database name
        collection: Collection = db["roles"]  # Collection name based on schema
        print("Connected to MongoDB successfully!")
        return collection
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        exit(1)

def insert_role(collection: Collection, name: str) -> None:
    """Inserts a role into the MongoDB collection."""
    try:
        role: Dict = {
            "name": name.strip(),  # Trim whitespace as per schema
            "createdAt": datetime.datetime.now(datetime.timezone.utc),  # Mimic timestamps
            "updatedAt": datetime.datetime.now(datetime.timezone.utc)
        }
        result = collection.insert_one(role)
        print(f"Inserted role '{name}' with ID: {result.inserted_id}")
    except Exception as e:
        print(f"Error inserting role: {e}")

def main():
    """Main function to continuously prompt for role names and insert into MongoDB."""
    print("WARNING: the positions that you create must be linked to the WORDPRESS CMS OR THINGS WILL BREAK\n")

    collection: Collection = connect_to_mongodb()
    
    while True:
        # Prompt user for role name
        name: str = input("Enter role name (or type 'exit' to quit): ").strip()
        
        if name.lower() == "exit":
            print("Exiting program.")
            break
        
        if not name:
            print("Role name cannot be empty. Please try again.")
            continue
        
        # Insert the role into the database
        insert_role(collection, name)

if __name__ == "__main__":
    main()