from pydantic import BaseModel
from typing import Optional,List
from fastapi import UploadFile, File

class City(BaseModel):
    id: str | None = None
    name: str
    # Datos generales
    subtitulo: str | None = None
    description: str
    poblacion: int
    clima: float
    gentilicio: str
    estadoRep: str

    #Dato curioso
    dato_curioso: List[str] | None = None

    # Multimedia
    imagenPrincipal: str
    galeria: List[str] = [] 
    video_url: str | None = None

    