from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException, status
from typing import List
from models.city import City
from controllers.citycontroller import get_all_cities, createCity
from utils.auth import get_current_user

router = APIRouter(prefix="/cities", tags=["Cities"])

@router.post("/create", response_model=str)
async def register_city(
    name: str = Form(...),
    description: str = Form(...),
    clima: float = Form(...),
    poblacion: int = Form(...),
    gentilicio: str = Form(...),
    estadoRep: str = Form(...),
    imagenPrincipal: UploadFile = File(...),
    galeria: List[UploadFile] = File(None),
    current_user: dict = Depends(get_current_user)
):
    city_data = {
        "name": name,
        "description": description,
        "clima": clima,
        "poblacion": poblacion,
        "gentilicio": gentilicio,
        "estadoRep": estadoRep,
        "imagenPrincipal": imagenPrincipal.filename,
        "galeria": [img.filename for img in galeria] if galeria else []
    }

    city_id = await createCity(city_data)
    return city_id


@router.get("/", response_model=List[City])
async def read_cities():
    return await get_all_cities()
