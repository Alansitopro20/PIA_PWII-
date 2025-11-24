from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Post(BaseModel):
    id: Optional[str] = None
    author_name: str
    author_id: str
    title: str
    category: str
    description: str
    photo: Optional[str] = None
    date: str    # "2025-11-23"
    time: str    # "22:45"
    comments_count: int = 0   # Por si quieres mostrar cuántos comentarios tiene

class PostCreateResponse(BaseModel):
    id: str

class PostResponse(BaseModel):
    id: str
    author_name: str
    author_id: str
    title: str
    category: str
    description: str
    photo: Optional[str] = None
    date: str
    time: str
    comments_count: int
