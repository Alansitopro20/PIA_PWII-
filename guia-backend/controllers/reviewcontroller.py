from db.dbconnection import MongoDB
from models.review import Review
from bson import ObjectId

collection = MongoDB.get_database()["reviews"]


async def create_review(review_data):
    result = await collection.insert_one(review_data)
    return str(result.inserted_id)


async def get_reviews_by_item(item_id: str):
    reviews = []
    cursor = collection.find({"item_id": item_id})
    async for document in cursor:
        document["id"] = str(document["_id"])
        del document["_id"]
        reviews.append(Review(**document))
    return reviews

async def get_average_rating(item_id: str):
    collection = MongoDB.get_database()["reviews"]
    
    pipeline = [
        {"$match": {"item_id": item_id}},
        {"$group": {"_id": None, "avg_rating": {"$avg": "$rating"}}}
    ]

    result = await collection.aggregate(pipeline).to_list(1)
    
    if result:
        return result[0]["avg_rating"]
    else:
        return 0
