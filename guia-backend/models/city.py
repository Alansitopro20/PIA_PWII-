from pydantic import BaseModel
from typing import Optional,List
from fastapi import UploadFile, File

class City(BaseModel):
    id: str | None = None
    name: str
    description: str
    poblacion: int
    clima: float
    gentilicio: str
    estadoRep: str
    imagenPrincipal: str
    galeria: List[str] = []  # <--- ESTA PARTE ESTÁ BIEN
    