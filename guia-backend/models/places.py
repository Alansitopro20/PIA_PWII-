from pydantic import BaseModel
from typing import Optional,List

class Places(BaseModel):
    id: str | None = None

    # Datos principales
    name: str
    subtitulo: str | None = None
    ciudad:str
    descripcion: str
    
    # Datos generales
    categoria: str
    calificacion: float
   
    # Multimedia
    imagenPrincipal: str
    galeria: List[str] = [] 
    video_url: str | None = None