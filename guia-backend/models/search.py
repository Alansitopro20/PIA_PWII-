from pydantic import BaseModel
from typing import List, Optional, Any

class SearchResults(BaseModel):
    places: Optional[List[Any]] = None
    stays: Optional[List[Any]] = None
    cities: Optional[List[Any]] = None
    reviews: Optional[List[Any]] = None
