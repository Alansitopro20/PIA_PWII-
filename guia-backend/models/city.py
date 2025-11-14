from pydantic import BaseModel
from typing import Optional,List

class City(BaseModel):
    id: str | None = None
    name: str
    description: str
    poblacion: int
    clima: float
    gentilicio: str
    estadoRep: str
    imagenPrincipal: str
    galeria: Optional[List[str]] = []  # Lista de URLs o rutas de imágenes
    