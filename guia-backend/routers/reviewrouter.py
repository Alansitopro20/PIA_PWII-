from fastapi import APIRouter, Depends, Form, HTTPException
from typing import List
from controllers.reviewcontroller import create_review, get_reviews_by_item
from models.review import Review
from utils.auth import get_current_user
from controllers.reviewcontroller import get_average_rating


router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("/create", response_model=str)
async def register_review(
    item_id: str = Form(...),
    item_type: str = Form(...),
    rating: float = Form(...),
    comentario: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    review_data = {
        "user_id": current_user["id"],
        "user_name":current_user["name"],
        "user_type":current_user["type"],
        "user_photo":current_user["photo"],
        "item_id": item_id,
        "item_type": item_type,
        "rating": rating,
        "comentario": comentario,
    }

    review_id = await create_review(review_data)
    return review_id


@router.get("/{item_id}", response_model=List[Review])
async def get_reviews(item_id: str):
    return await get_reviews_by_item(item_id)


@router.get("/average/{item_id}")
async def get_average(item_id: str):
    return await get_average_rating(item_id)

