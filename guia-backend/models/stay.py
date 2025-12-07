from pydantic import BaseModel
from typing import Optional,List
from fastapi import UploadFile, File

class Stay (BaseModel):
    id: str | None = None
    
    # Datos principales
    name: str
    descripcion: str

    # Datos generales
    ciudad: str
    precio: float

    # Multimedia
    imagenPrincipal: str
    galeria: List[str] = [] 
