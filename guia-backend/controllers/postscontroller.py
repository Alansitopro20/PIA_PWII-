from db.dbconnection import MongoDB
from bson import ObjectId
from models.posts import PostResponse

collection = MongoDB.get_database()["posts"]

async def create_post(post_data):
    # Guardar post en DB
    result = await collection.insert_one(post_data)
    return str(result.inserted_id)


async def get_post_by_id(post_id: str):
    post = await collection.find_one({"_id": ObjectId(post_id)})
    if post:
        post["id"] = str(post["_id"])
        del post["_id"]
    return post

async def get_posts_by_category(category: str):
    posts = []
    cursor = collection.find({"category": category})
    async for post in cursor:
        post["id"] = str(post["_id"])
        del post["_id"]
        posts.append(post)
    return posts

async def get_all_posts():
    posts = []
    cursor = collection.find()
    async for post in cursor:
        post["id"] = str(post["_id"])
        del post["_id"]
        posts.append(post)
    return posts
