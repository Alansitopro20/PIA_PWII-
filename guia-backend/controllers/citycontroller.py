from db.dbconnection import MongoDB
from bson import ObjectId
import bcrypt
from models.city import City
from utils.auth import decode_access_token
from datetime import timedelta

collection = MongoDB.get_database()["city"]


async def createCity(city_data):    
    # Guardar la ciudad
    result= await collection.insert_one(city_data)
    return str(result.inserted_id)

async def get_all_cities():
    cities = []
    cursor = collection.find({})
    async for document in cursor:
        document["id"] = str(document["_id"])
        del document["_id"]
        cities.append(City(**document))
    return cities


async def get_city_by_name(name: str):
    city = await collection.find_one({"name": name})
    if not city:
        return None

    city["id"] = str(city["_id"])
    del city["_id"]

    return City(**city)
