from db.dbconnection import MongoDB
from bson import ObjectId
import bcrypt
from models.stay import Stay
from utils.auth import decode_access_token
from datetime import timedelta

collection = MongoDB.get_database()["stay"]


async def createStay(stay_data):
    # Guardar el hospedaje
    result= await collection.insert_one(stay_data)
    return str(result.inserted_id)

async def get_all_stay():
    stay = []
    cursor = collection.find({})
    async for document in cursor:
        document["id"] = str(document["_id"])
        del document["_id"]
        stay.append(Stay(**document))
    return stay

async def get_stay_by_name(name: str):
    stay = await collection.find_one({"name": name})
    if not stay:
        return None

    stay["id"] = str(stay["_id"])
    del stay["_id"]

    return Stay(**stay)