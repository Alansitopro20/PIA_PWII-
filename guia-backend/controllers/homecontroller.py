from db.dbconnection import MongoDB
from bson import ObjectId

db = MongoDB.get_database()

async def get_home_data():
    def serialize(doc):
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        return doc

    cities = [serialize(c) for c in await db["cities"].find().to_list(6)]
    places = [serialize(p) for p in await db["places"].find().to_list(6)]
    stays = [serialize(s) for s in await db["stay"].find().to_list(6)]
    stadiums = [serialize(s) for s in await db["stadiums"].find().to_list(6)]
    reviews = [serialize(r) for r in await db["reviews"].find().sort("createdAt", -1).to_list(6)]


    return {
        "featuredCities": cities,
        "topPlaces": places,
        "topStays": stays,
        "topStadiums": stadiums,
        "recentReviews": reviews

    }
