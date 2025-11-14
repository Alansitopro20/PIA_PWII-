from db.dbconnection import MongoDB
from bson import ObjectId
import bcrypt
from models.user import UserResponse, LoginResponse
from utils.auth import create_access_token
from datetime import timedelta

collection = MongoDB.get_database()["users"]

async def create_user(user_data):
    password_hash = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
    user_data["password"] = password_hash.decode('utf-8')
    
    # Guardar usuario en MongoDB
    result = await collection.insert_one(user_data)
    return str(result.inserted_id)

async def get_user_by_email(email):
    user = await collection.find_one({"email": email})
    if user:
        user["id"] = str(user["_id"])
        del user["_id"]
    return user

async def login_dev(username: str, password: str):
    user = await collection.find_one({"email": username})
    if not user:
        return None
    
    if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        return None
    
    # Generar token JWT
    token_data = {
        "sub": str(user["_id"]),
        "email": user["email"]
    }
    token = create_access_token(token_data)
    return {"access_token": token, "token_type": "bearer"}

async def login_user(credentials):
    user = await collection.find_one({"email": credentials["email"]})
    if user and bcrypt.checkpw(credentials["password"].encode('utf-8'), user["password"].encode('utf-8')):
        # Convertir el ObjectId a string
        user_id = str(user["_id"])
        
        # Generar token JWT
        token_data = {
            "sub": user_id,  # "sub" es un estándar para el ID del usuario en JWT
            "email": user["email"]
        }
        token = create_access_token(token_data)
        
        # Preparar la respuesta del usuario sin incluir la contraseña
        user_response = UserResponse(
            id=user_id,
            email=user["email"],
            name=user["name"]
        )
        
        # Devolver la respuesta con usuario y token
        return LoginResponse(
            user=user_response,
            token=token
        )
    return None