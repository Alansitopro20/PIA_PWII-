from db.dbconnection import MongoDB
from bson import ObjectId

db = MongoDB.get_database()

def serialize_mongo_document(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc


async def global_search(query: str, filter: str):

    results = {}

    # Buscar en Lugares
    if filter in ["all", "places"]:
        places = await db["places"].find({
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"city": {"$regex": query, "$options": "i"}},
            ]
        }).to_list(10)

        results["places"] = [serialize_mongo_document(p) for p in places]

    # Buscar en Hospedajes
    if filter in ["all", "stay"]:
        stays = await db["stay"].find({
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"city": {"$regex": query, "$options": "i"}},
            ]
        }).to_list(10)

        results["stays"] = [serialize_mongo_document(s) for s in stays]

    # Buscar en Ciudades
    if filter in ["all", "cities"]:
        cities = await db["cities"].find({
            "name": {"$regex": query, "$options": "i"}
        }).to_list(10)

        results["cities"] = [serialize_mongo_document(c) for c in cities]

    # Buscar en Reseñas
    if filter in ["all", "reviews"]:
        reviews = await db["reviews"].find({
            "comment": {"$regex": query, "$options": "i"}
        }).to_list(10)

        results["reviews"] = [serialize_mongo_document(r) for r in reviews]

    return results

