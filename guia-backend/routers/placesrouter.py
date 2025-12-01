from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException, status
from typing import List, Optional
from models.places import Places
from controllers.placescontroller import get_all_places, createPlace, get_place_by_name
from utils.auth import get_current_user
import shutil
import os
from uuid import uuid4
from urllib.parse import unquote


UPLOAD_DIR = "uploads/places"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/places", tags=["Places"])

@router.post("/create", response_model=str)
async def register_place(
    name: str = Form(...),
    descripcion: str = Form(...),
    categoria: str = Form(...),
    calificacion: float = Form(...),
    imagenPrincipal: UploadFile = File(...),
    galeria: List[UploadFile] = File(None)
    
):
    # === GUARDAR IMAGEN PRINCIPAL ===
    filename = f"{uuid4()}{os.path.splitext(str(imagenPrincipal.filename))[1]}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(imagenPrincipal.file, buffer)

    # ESTA ES LA RUTA QUE DEBES GUARDAR EN LA BD
    imagenPrincipal_url = f"uploads/places/{filename}"

    # === GALERÍA ===
    galeria_urls = []

    if galeria:
        for img in galeria:
            gal_filename = f"{uuid4()}{os.path.splitext(str(img.filename))[1]}"
            gal_path = os.path.join(UPLOAD_DIR, gal_filename)

            with open(gal_path, "wb") as buffer:
                shutil.copyfileobj(img.file, buffer)

            galeria_urls.append(f"uploads/places/{gal_filename}")

    # === DATOS A BASE DE DATOS ===
    place_data = {
        "name": name,
        "descripcion": descripcion,
        "categoria": categoria,
        "calificacion": calificacion,
        "imagenPrincipal": imagenPrincipal_url,
        "galeria": galeria_urls
    }

    place_id = await createPlace(place_data)
    return place_id


@router.get("/", response_model=List[Places])
async def read_places():
    return await get_all_places()

@router.get("/{name}", response_model=Places)
async def read_place_by_name(name: str):
    decoded = unquote(name)

    place = await get_place_by_name(decoded)

    if not place:
        raise HTTPException(status_code=404, detail="Place not found")

    return place