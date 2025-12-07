from pydantic import BaseModel
from typing import Optional,List

class Stadiums(BaseModel):
    id: str | None = None

    # Datos principales
    name: str
    subtitulo: str | None = None
    descripcion: str

    #Datos generales
    capacidad: float
    ciudad: str

    # Datos multimedia 
    imagenPrincipal: str
    galeria: List[str] = [] 
    video_url: str | None = None
