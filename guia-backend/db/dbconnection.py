from motor.motor_asyncio import AsyncIOMotorClient

class MongoDB:
    _client = None

    @classmethod
    def get_client(cls):
        if cls._client is None:
            cls._client = AsyncIOMotorClient("mongodb://localhost:27017")
        return cls._client

    @classmethod
    def get_database(cls, db_name="guia"):
        client = cls.get_client()
        return client[db_name]