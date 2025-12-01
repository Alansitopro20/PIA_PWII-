from db.dbconnection import MongoDB
from bson import ObjectId
import bcrypt
from models.places import Places
from utils.auth import decode_access_token
from datetime import timedelta

collection = MongoDB.get_database()["places"]

async def createPlace(place_data):
    # Guardar el lugar
    result= await collection.insert_one(place_data)
    return str(result.inserted_id)

async def get_all_places():
    places = []
    cursor = collection.find({})
    async for document in cursor:
        document["id"] = str(document["_id"])
        del document["_id"]
        places.append(Places(**document))
    return places

async def get_place_by_name(name: str):
    place = await collection.find_one({"name": name})
    if not place:
        return None

    place["id"] = str(place["_id"])
    del place["_id"]

    return Places(**place)