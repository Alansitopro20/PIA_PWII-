from db.dbconnection import MongoDB
from bson import ObjectId
import bcrypt
from models.city import City
from utils.auth import decode_access_token
from datetime import timedelta

collection = MongoDB.get_database()["city"]


async def createCity(product_data):
    # Guardar la ciudad
    result= await collection.insert_one(product_data)
    return str(result.inserted_id)

async def get_all_cities():
    cities = []
    cursor = collection.find({})
    async for document in cursor:
        document["id"] = str(document["_id"])
        del document["_id"]
        cities.append(City(**document))
    return cities