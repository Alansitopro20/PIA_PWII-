from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException
from typing import List, Optional
from models.stadiums import Stadiums
from controllers.stadiumscontroller import get_all_stadiums, createStadium, get_stadium_by_name
from utils.auth import get_current_user
import shutil
import os
from uuid import uuid4
from urllib.parse import unquote


UPLOAD_DIR = "uploads/stadiums"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/stadiums", tags=["Stadiums"])


@router.post("/create", response_model=str)
async def register_stadium(
    name: str = Form(...),
    descripcion: str = Form(...),
    capacidad: float = Form(...),
    ciudad: str = Form(...),

    imagenPrincipal: UploadFile = File(...),
    galeria: List[UploadFile] = File(None)

):
     # === GUARDAR IMAGEN PRINCIPAL ===
    filename = f"{uuid4()}{os.path.splitext(str(imagenPrincipal.filename))[1]}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(imagenPrincipal.file, buffer)

    # ESTA ES LA RUTA QUE DEBES GUARDAR EN LA BD
    imagenPrincipal_url = f"uploads/stadiums/{filename}"

    # === GALERÍA ===
    galeria_urls = []

    if galeria:
        for img in galeria:
            gal_filename = f"{uuid4()}{os.path.splitext(str(img.filename))[1]}"
            gal_path = os.path.join(UPLOAD_DIR, gal_filename)

            with open(gal_path, "wb") as buffer:
                shutil.copyfileobj(img.file, buffer)

            galeria_urls.append(f"uploads/stadiums/{gal_filename}")



    stadium_data = {
        "name": name,
        "descripcion": descripcion,
        "capacidad": capacidad,
        "ciudad": ciudad,
        "imagenPrincipal": imagenPrincipal_url,
        "galeria": galeria_urls
    }

    stadium_id = await createStadium(stadium_data)
    return stadium_id


@router.get("/", response_model=List[Stadiums])
async def read_stadiums():
    return await get_all_stadiums()

@router.get("/{name}", response_model=Stadiums)
async def read_stadium_by_name(name: str):
    decoded = unquote(name)

    stadium = await get_stadium_by_name(decoded)
    
    if not stadium:
        raise HTTPException(status_code=404, detail="Stadium not found")

    return stadium