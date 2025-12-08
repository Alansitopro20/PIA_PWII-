from fastapi import APIRouter
from controllers.homecontroller import get_home_data
from models.home import HomeData

router = APIRouter(prefix="/home", tags=["Home"])

@router.get("/")
async def home():
    return await get_home_data()
