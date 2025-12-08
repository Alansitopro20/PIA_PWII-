from fastapi import APIRouter
from controllers.searchcontroller import global_search
from models.search import SearchResults

router = APIRouter(prefix="/search", tags=["Search"])

@router.get("/", response_model=SearchResults)
async def search_route(query: str, filter: str = "all"):
    return await global_search(query, filter)
