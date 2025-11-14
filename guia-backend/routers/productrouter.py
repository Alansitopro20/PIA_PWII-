from fastapi import APIRouter, Depends, Body, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from models.product import Product
from controllers.productcontroller import get_all_products, create_product
from utils.auth import get_current_user


router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/create", response_model=str)
async def register_product(
    name: str=Form(...),
    description: str=Form(...),
    price: float=Form(...),
    stock: int=Form(...)
):
    product_data={
        "name":name,
        "description":description,
        "price":price,
        "stock":stock
    }

    product_id=await create_product(product_data)
    return product_id

@router.get("/", response_model=list[Product])
async def read_products(current_user: dict = Depends(get_current_user)):
    return await get_all_products()


