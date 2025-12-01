from db.dbconnection import MongoDB
from bson import ObjectId
import bcrypt
from models.stadiums import Stadiums
from utils.auth import decode_access_token
from datetime import timedelta

collection = MongoDB.get_database()["stadiums"]


async def createStadium(stadium_data):
    # Guardar el estadio
    result= await collection.insert_one(stadium_data)
    return str(result.inserted_id)

async def get_all_stadiums():
    stadium = []
    cursor = collection.find({})
    async for document in cursor:
        document["id"] = str(document["_id"])
        del document["_id"]
        stadium.append(Stadiums(**document))
    return stadium

async def get_stadium_by_name(name: str):
    stadium = await collection.find_one({"name": name})
    if not stadium:
        return None

    stadium["id"] = str(stadium["_id"])
    del stadium["_id"]

    return Stadiums(**stadium)