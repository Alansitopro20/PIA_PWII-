from fastapi import FastAPI

app = FastAPI(title="Guía Mundial 2026 - API")

# --- ENDPOINTS ---

@app.get("/")
def home():
    return {"message": "Bienvenido a la Guía Mundial México 2026"}

# ------------------------
#       Usuarios
# ------------------------

@app.post("/api/auth/register")
def register_user():
    return{"message":"Usuario registrado"}


@app.post("/api/auth/login")
def login_user():
    return {"message": "Usuario logueado"}

@app.get("/api/users/me")
def get_current_user():
    return {"id": 1, "username": "turista001", "role": "turista"}

# ------------------------
#       Ciudades
# ------------------------
@app.get("/api/ciudades")
def get_ciudades():
    return [{"id":1,"name":"Monterrey"},{"id":2,"name":"Guadalajara"}]

@app.get("/api/ciudades/{id}")
def get_ciudad(id: int):
    return {"id": id, "name": "Ciudad ejemplo"}

# ------------------------
#       Estadios
# ------------------------
@app.get("/api/estadios")
def get_estadios():
    return [{"id":1,"name":"Estadio BBVA","city":"Monterrey"}]

@app.get("/api/estadios/{id}")
def get_estadio(id: int):
    return {"id": id, "name": "Estadio ejemplo"}

# ------------------------
#       Hospedajes
# ------------------------

@app.get("/api/hospedajes")
def get_hospedajes():
    return [{"id":1,"name":"Hotel Holiday Inn"}]

@app.get("/api/hospedajes/{id}")
def get_hospedaje(id: int):
    return {"id": id, "name": "Hospedaje ejemplo"}

@app.get ("/api/ciudades/{id}/hospedajes")
def get_hospedajebyciudad(id: int):
    return {"id":id, "name": "Holiday Inn", "city": "Monterrey", "rating":"4.5"}

# POST - crear un hospedaje nuevo
@app.post("/api/hospedajes")
def create_hospedaje():
    return {"message":"Hospedaje creado"}

# PUT - actualizar 
@app.put("/api/hospedajes/{id}")
def edit_hospedaje(id: int):
    return {"id":id,"message":"Hospedaje editado"}

# DELETE - eliminar 
@app.delete("/api/hospedajes/{id}")
def delete_hospedaje(id: int):
    return {"id":id,"message":"Hospedaje eliminado"}

# ------------------------
#    Puntos turisticos
# ------------------------
@app.get("/api/puntosTuristicos")
def get_puntosTuristicos():
    return [{"id":1,"name":"Restaurante Fútbol","city":"Monterrey","category":"Restaurante"}]

# POST - crea un punto turístico nuevo
@app.post("/api/puntosTuristicos")
def create_puntoTuristico():
    return {"message":"Punto turistico creado"}

# PUT - actualizar 
@app.put("/api/puntosTuristicos/{id}")
def edit_puntoTuristico(id: int):
    return {"id":id,"message":"Punto turistico editado"}

# DELETE - eliminar 
@app.delete("/api/puntosTuristicos/{id}")
def delete_puntoTuristico(id: int):
    return {"id":id,"message":"Punto turistico eliminado"}

# ------------------------
#       Reseñas
# ------------------------
# GET - obtener todas las reseñas
@app.get("/api/reseñas")
def get_reviews():
    return [{"id":1,"user_id":1,"target_id":1,"rating":5,"comment":"Excelente ambiente"}]

# POST - obtener todas las reseñas
@app.post("/api/reseñas")
def create_review():
    return {"message":"Reseña creada"}

# PUT - actualizar reseña
@app.put("/api/reseñas/{id}")
def edit_review(id: int):
    return {"id":id,"message":"Reseña editada"}

# DELETE - eliminar reseña
@app.delete("/api/reseñas/{id}")
def delete_review(id: int):
    return {"id":id,"message":"Reseña eliminada"}


# ------------------------
#       Favoritos
# ------------------------
@app.get("/api/favoritos")
def get_favorites():
    return [{"id":1,"user_id":1,"target_id":1,"type":"stadium"}]

@app.post("/api/favoritos")
def add_favorite():
    return {"message":"Favorito agregado (ejemplo)"}

# DELETE - eliminar reseña
@app.delete("/api/favoritos/{id}")
def delete_favorite(id: int):
    return {"id":id,"message":"Eliminado de favoritos"}