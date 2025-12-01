from pydantic import BaseModel
from typing import Optional,List

class Places(BaseModel):
    id: str | None = None
    name: str
    descripcion: str
    categoria: str
    calificacion: float
    imagenPrincipal: str
    galeria: List[str] = []  