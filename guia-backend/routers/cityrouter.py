from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException, status
from typing import List, Optional
from models.city import City
from controllers.citycontroller import get_all_cities, createCity, get_city_by_name
from utils.auth import get_current_user
import shutil
import os
from uuid import uuid4
from urllib.parse import unquote

UPLOAD_DIR = "uploads/cities"
os.makedirs(UPLOAD_DIR, exist_ok=True)

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
    galeria: List[UploadFile] = File(None)
):

    # === GUARDAR IMAGEN PRINCIPAL ===
    filename = f"{uuid4()}{os.path.splitext(str(imagenPrincipal.filename))[1]}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(imagenPrincipal.file, buffer)

    # ESTA ES LA RUTA QUE DEBES GUARDAR EN LA BD
    imagenPrincipal_url = f"uploads/cities/{filename}"

    # === GALERÍA ===
    galeria_urls = []

    if galeria:
        for img in galeria:
            gal_filename = f"{uuid4()}{os.path.splitext(str(img.filename))[1]}"
            gal_path = os.path.join(UPLOAD_DIR, gal_filename)

            with open(gal_path, "wb") as buffer:
                shutil.copyfileobj(img.file, buffer)

            galeria_urls.append(f"uploads/cities/{gal_filename}")

    # === DATOS A BASE DE DATOS ===
    city_data = {
        "name": name,
        "description": description,
        "clima": clima,
        "poblacion": poblacion,
        "gentilicio": gentilicio,
        "estadoRep": estadoRep,
        "imagenPrincipal": imagenPrincipal_url,
        "galeria": galeria_urls
    }

    city_id = await createCity(city_data)
    return city_id


@router.get("/", response_model=List[City])
async def read_cities():
    return await get_all_cities()

@router.get("/{name}", response_model=City)
async def read_city_by_name(name: str):
    decoded = unquote(name)

    city = await get_city_by_name(decoded)
    
    if not city:
        raise HTTPException(status_code=404, detail="City not found")

    return city