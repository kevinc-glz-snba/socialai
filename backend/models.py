from pydantic import BaseModel

class Peticion(BaseModel):
    negocio: str
    publicacion: str
    redSocial: str
    tono: str
    