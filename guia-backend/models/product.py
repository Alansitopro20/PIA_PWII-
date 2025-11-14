from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: str | None = None
    name: str
    description: str
    price: float
    stock: int