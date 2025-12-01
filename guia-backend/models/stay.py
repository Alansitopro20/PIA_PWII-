from pydantic import BaseModel
from typing import Optional,List
from fastapi import UploadFile, File

class Stay (BaseModel):
    id: str | None = None
    name: str
    descripcion: str
    ciudad: str
    precio: float
    imagenPrincipal: str
    galeria: List[str] = []  # <--- ESTA PARTE ESTÁ BIEN
