from fastapi import FastAPI
from models import Peticion
from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()
api_key_anthropic = os.getenv("ANTHROPIC_API_KEY")

#Cliente unico al arrancar el servidor
#Se define fuera de las funciones para reutlizarlos
#en cada peticion sin recrearlo cada vez
cliente = Anthropic(api_key= api_key_anthropic)

app = FastAPI()

#CORS configurado solo para el frontend en desarrollo
#En producción, cambiar localhost:5173 por el dominio real.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"mensaje" : "Hola"}

@app.post("/generar")
def generar(datos: Peticion):
    response = cliente.messages.create(
        model= "claude-sonnet-4-6",
        max_tokens=500,
        
        # El prompt define el rol, contexto y reglas de formato que Claude
        # debe seguir para generar contenido consistente y listo para publicar.
        # La f-string inserta dinámicamente los datos del usuario.
        messages=[
            {
                "role":"user",
                "content":f"""Actúa como un experto en marketing digital para pequeños negocios 
                en Latinoamérica. Genera una publicación para {datos.redSocial} 
                con las siguientes características:

                - Negocio: {datos.negocio}
                - Lo que se desea comunicar: {datos.publicacion}
                - Tono: {datos.tono}

                Reglas:
                - El texto debe ser natural y persuasivo, listo para publicar directamente
                - Incluye un call to action claro al final del texto
                - Después del texto, agrega exactamente 5 hashtags relevantes en español
                - No agregues explicaciones, introducciones ni comentarios adicionales, 
                responde únicamente con el contenido de la publicación"""
            }
            
        ]
    )
    return {"resultado": response.content[0].text}
