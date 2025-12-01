from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
from utils.auth import get_current_user
from controllers.postscontroller import create_post, get_post_by_id, get_all_posts, get_posts_by_category
from uuid import uuid4
import os
import shutil
from datetime import datetime

router = APIRouter(prefix="/posts", tags=["Posts"])

UPLOAD_DIR = "uploads/posts"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/create", response_model=str)
async def create_new_post(
    title: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    photo: UploadFile = File(None),
    current_user: dict = Depends(get_current_user)
):
    # Procesar foto
    photo_path = None
    if photo:
        filename = f"{uuid4()}_{photo.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        photo_path = file_path

    # Crear fecha y hora automática
    now = datetime.now()
    date = now.strftime("%Y-%m-%d")
    time = now.strftime("%H:%M")

    post_data = {
        "author_name": current_user["unkonwn"],
        "author_id": current_user["sub"],
        "title": title,
        "category": category,
        "description": description,
        "photo": photo_path,
        "date": date,
        "time": time,
        "comments_count": 0
    }

    post_id = await create_post(post_data)
    return post_id


@router.get("/{post_id}")
async def get_post(post_id: str):
    post = await get_post_by_id(post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    return post


@router.get("/category/{category}")
async def get_posts_category(category: str):
    return await get_posts_by_category(category)


@router.get("/")
async def list_all_posts():
    return await get_all_posts()
