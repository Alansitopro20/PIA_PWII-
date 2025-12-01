from pydantic import BaseModel
from typing import Optional,List

class Stadiums(BaseModel):
    id: str | None = None
    name: str
    descripcion: str
    capacidad: float
    ciudad: str
    imagenPrincipal: str
    galeria: List[str] = []  
