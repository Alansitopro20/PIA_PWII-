from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Review(BaseModel):
    id: Optional[str] = None
    user_id: str
    user_name: Optional[str] = None
    user_type: Optional[str] = None
    item_id: str
    item_type: str
    rating: float
    comentario: str
    fecha: datetime = datetime.utcnow()
