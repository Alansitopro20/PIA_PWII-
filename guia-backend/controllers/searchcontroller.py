from db.dbconnection import MongoDB
from bson import ObjectId

db = MongoDB.get_database()

def serialize_mongo_document(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc


async def global_search(query: str, filter: str):

    # Siempre devolver todas las categorías, así Angular nunca recibe undefined
    results = {
        "places": [],
        "stays": [],
        "cities": [],
        "stadiums": [],
        "reviews": []
    }

    regex = {"$regex": query, "$options": "i"}

    # Buscar Places
    if filter in ["all", "places"]:
        places = await db["places"].find({
            "$or": [
                {"name": regex},
                {"city": regex},
            ]
        }).to_list(10)
        results["places"] = [serialize_mongo_document(p) for p in places]

    # Buscar Stays
    if filter in ["all", "stays"]:   # ← corregido
        stays = await db["stay"].find({
            "$or": [
                {"name": regex},
                {"city": regex},
            ]
        }).to_list(10)
        results["stays"] = [serialize_mongo_document(s) for s in stays]

    # Buscar Cities
    if filter in ["all", "city"]:
        cities = await db["city"].find({
            "$or": [
                {"name": regex},
                {"city": regex},
            ]
        }).to_list(10)
        results["cities"] = [serialize_mongo_document(c) for c in cities]

    # Buscar Stadiums
    if filter in ["all", "stadiums"]:
        stadiums = await db["stadiums"].find({
            "$or": [
                {"name": regex},
                {"city": regex},
            ]
        }).to_list(10)
        results["stadiums"] = [serialize_mongo_document(st) for st in stadiums]

    # Buscar Reviews
    if filter in ["all", "reviews"]:
        reviews = await db["reviews"].find({
            "comment": regex
        }).to_list(10)
        results["reviews"] = [serialize_mongo_document(r) for r in reviews]

    return results
