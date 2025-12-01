
from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException
from typing import List, Optional
from models.stay import Stay
from controllers.staycontroller import createStay, get_all_stay, get_stay_by_name
from utils.auth import get_current_user
import shutil
import os
from uuid import uuid4
from urllib.parse import unquote


UPLOAD_DIR = "uploads/stay"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/stay", tags=["Stay"])

@router.post("/create", response_model=str)
async def register_stay(
    name: str = Form(...),
    descripcion: str = Form(...),
    ciudad: str = Form(...),
    precio: float = Form(...),
    imagenPrincipal: UploadFile = File(...),
    galeria: Optional[List[UploadFile]] = File(None)

):
    # === GUARDAR IMAGEN PRINCIPAL ===
    filename = f"{uuid4()}{os.path.splitext(str(imagenPrincipal.filename))[1]}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(imagenPrincipal.file, buffer)

    # ESTA ES LA RUTA QUE DEBES GUARDAR EN LA BD
    imagenPrincipal_url = f"uploads/stay/{filename}"

    # === GALERÍA ===
    galeria_urls = []

    if galeria:
        for img in galeria:
            gal_filename = f"{uuid4()}{os.path.splitext(str(img.filename))[1]}"
            gal_path = os.path.join(UPLOAD_DIR, gal_filename)

            with open(gal_path, "wb") as buffer:
                shutil.copyfileobj(img.file, buffer)

            galeria_urls.append(f"uploads/stay/{gal_filename}")


    stay_data = {
        "name": name,
        "descripcion": descripcion,
        "ciudad": ciudad,
        "precio": precio,
        "imagenPrincipal": imagenPrincipal_url,
        "galeria": galeria_urls
    }

    stay_id = await createStay(stay_data)
    return stay_id


@router.get("/", response_model=List[Stay])
async def read_stay():
    return await get_all_stay()

@router.get("/{name}", response_model=Stay)
async def read_stay_by_name(name: str):
    decoded = unquote(name)

    stay = await get_stay_by_name(decoded)
    
    if not stay:
        raise HTTPException(status_code=404, detail="Stay not found")

    return stay