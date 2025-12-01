from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import userrouter,productrouter,cityrouter,postsrouter,stadiumsrouter,stayrouter,placesrouter
from fastapi.staticfiles import StaticFiles
import os


app = FastAPI(title="API Mundial ")

# Configuración CORS para permitir todos los orígenes
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(userrouter.router)
app.include_router(productrouter.router)
app.include_router(cityrouter.router)
app.include_router(productrouter.router)
app.include_router(postsrouter.router)
app.include_router(stayrouter.router)
app.include_router(stadiumsrouter.router)
app.include_router(placesrouter.router)

#app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# Carpeta de uploads
UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")

# Servir archivos estáticos (imágenes subidas)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

UPLOAD_CITY_DIR = os.path.join(os.getcwd(), "cities")

# Servir archivos estáticos (DE CIUDADES)
app.mount("/uploads/cities", StaticFiles(directory="uploads/cities"), name="cities")
