import json
import random
from datetime import datetime, timedelta
from faker import Faker
from pymongo import MongoClient
from bson.objectid import ObjectId

# Initialize Faker
fake = Faker()

# MongoDB connection details
MONGO_URI = "mongodb://localhost:27017/"  # Adjust if your MongoDB is on a different host/port
DB_NAME = "parewa_backend"
COLLECTION_NAME = "notices"

# Categories for notices
CATEGORIES = ["General", "Departments", "School", "Council", "Clubs"]

# Placeholder publisherID (replace with a real publisherID from your User collection if needed)
# For this script, we'll use the one from your example data.
PUBLISHER_ID = "682d76c150303cc13ac1c18c"

def generate_notice(notice_id_counter, category):
    """Generates a single notice document."""
    title = fake.sentence(nb_words=random.randint(4, 10)).replace('.', '')  # Generate a title
    content = f"<p>{fake.paragraph(nb_sentences=random.randint(2, 5))}</p>"
    published_in = fake.date_time_between(start_date='-1y', end_date='+1y', tzinfo=None)
    modified_in = published_in + timedelta(days=random.randint(0, 30)) if random.random() > 0.5 else published_in
    trashed = random.random() < 0.1  # 10% chance of being trashed
    post_tags = random.sample(
        ['important', 'event', 'meeting', 'update', 'urgent', 'announcement', 'deadline', 'reminder'],
        k=random.randint(0, 3)
    )

    return {
        "_id": ObjectId(),  # MongoDB will generate this automatically, but for script consistency
        "id": str(notice_id_counter),
        "title": title,
        "content": content,
        "publishedIn": published_in,
        "featuredImage": "",
        "publisherID": PUBLISHER_ID,
        "voteCount": random.randint(0, 100),
        "postTags": post_tags,
        "updatedAt": modified_in,
        "trashed": trashed,
        "category": category,
        "createdAt": fake.date_time_between(start_date='-2y', end_date='now', tzinfo=None),
        "updatedAt": datetime.now(),
        "__v": 0
    }

def generate_notices_data(num_per_category=10):
    """Generates a list of notice documents."""
    notices = []
    notice_id_counter = 460  # Starting ID after your last example ID (459)

    for category in CATEGORIES:
        print(f"Generating {num_per_category} notices for category: {category}")
        for _ in range(num_per_category):
            notice = generate_notice(notice_id_counter, category)
            notices.append(notice)
            notice_id_counter += 1
    return notices

def insert_notices_into_mongodb(notices_data):
    """Connects to MongoDB and inserts the generated notices."""
    client = None
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        notices_collection = db[COLLECTION_NAME]

        # Insert many documents
        result = notices_collection.insert_many(notices_data)
        print(f"Successfully inserted {len(result.inserted_ids)} notices into MongoDB.")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if client:
            client.close()

if __name__ == "__main__":
    generated_notices = generate_notices_data(num_per_category=10)

    # Print the generated notices in JSON format (for inspection)
    print("\n--- Generated Notices (JSON) ---")
    # Convert datetime objects to string for JSON serialization
    serializable_notices = []
    for notice in generated_notices:
        temp_notice = notice.copy()
        for key, value in temp_notice.items():
            if isinstance(value, datetime):
                temp_notice[key] = value.isoformat(timespec='milliseconds') + 'Z'
            elif isinstance(value, ObjectId):
                temp_notice[key] = str(value)
        serializable_notices.append(temp_notice)

    print(json.dumps(serializable_notices, indent=2))
    print(f"\nTotal notices generated: {len(generated_notices)}")

    # Uncomment the line below to insert into MongoDB
    # insert_notices_into_mongodb(generated_notices)