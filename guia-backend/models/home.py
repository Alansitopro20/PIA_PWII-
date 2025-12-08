from pydantic import BaseModel
from typing import List, Optional

class City(BaseModel):
    id: str
    name: str

class Place(BaseModel):
    id: str
    name: str
    city: str

class Stay(BaseModel):
    id: str
    name: str
    city: str

class Stadium(BaseModel):
    id: str
    name: str
    city: str

class HomeData(BaseModel):
    featuredCities: List[City]
    topPlaces: List[Place]
    topStays: List[Stay]
    topStadiums: List[Stadium]
    
