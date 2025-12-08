from fastapi import APIRouter, UploadFile, File, Form, Depends, Body, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from models.user import User, UserCredentials, LoginResponse, Token, UserProfileResponse, UserResponse, FavoriteRequest
from controllers.usercontroller import (
    create_user,
    login_user,
    login_dev,
    get_user_by_email,
    add_favorite,
    remove_favorite,
    get_favorites,
    is_email_registered
)
from utils.auth import get_current_user
import shutil
import os
from uuid import uuid4

router = APIRouter(prefix="/users", tags=["Users"])

# Fotografías de perfiles
UPLOAD_DIR = "uploads"  # Carpeta donde se guardarán las fotos
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/create", response_model=str)
async def register_user(
    email: str = Form(...),
    name: str = Form(...),
    password: str = Form(...),
    type: str = Form(...),
    photo: UploadFile = File(None),
    city: str = Form(None),
    role: str = "usuario"
):
    print("📩 Email recibido:", email)


    # 🔥 VERIFICAR EMAIL ANTES DE GUARDAR NADA
    existing_user = await get_user_by_email(email)
    print("DEBUG - Resultado de get_user_by_email:", existing_user)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="El usuario ya está registrado con este correo"
        )

    # GUARDAR IMAGEN
    photo_path = None
    if photo:
        filename = f"{uuid4()}_{photo.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        photo_path = file_path

    # CIUDAD
    if type == "turista":
        city = "World"
        
    user_data = {
        "email": email,
        "name": name,
        "password": password,
        "type": type,
        "photo": photo_path,
        "city": city,
        "role": role
    }

    user_id = await create_user(user_data)
    return user_id


@router.post("/login", response_model=LoginResponse)
async def login(credentials: UserCredentials):
    result = await login_user(credentials.dict())
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo electrónico o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return result

@router.get("/getprofile/{email}", response_model=UserProfileResponse)
async def get_profile(email: str, current_user: dict = Depends(get_current_user)):
    # Verificar que el usuario solo puede acceder a su propio perfil
    if current_user["email"] != email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permiso para acceder a este perfil"
        )
        
    user = await get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    user = await get_user_by_email(current_user["email"])
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    result = await login_dev(form_data.username, form_data.password)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo electrónico o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return result

# FAVORITOS
@router.post("/favorites/add")
async def add_to_favorites(
    data: FavoriteRequest,
    current_user: dict = Depends(get_current_user)
):
    success = await add_favorite(current_user["id"], data.item_type, data.item_id, data.item_name)
    if not success:
        raise HTTPException(400, "No se pudo agregar el favorito.")
    return {"message": "Agregado a favoritos"}


@router.post("/favorites/remove")
async def remove_from_favorites(
    data: FavoriteRequest,
    current_user: dict = Depends(get_current_user)
):
    success = await remove_favorite(current_user["id"], data.item_type, data.item_id, data.item_name)
    if not success:
        raise HTTPException(400, "No se pudo quitar el favorito.")
    return {"message": "Eliminado de favoritos"}


@router.get("/favorites")
async def get_my_favorites(current_user: dict = Depends(get_current_user)):
    favs = await get_favorites(current_user["id"])
    return favs
