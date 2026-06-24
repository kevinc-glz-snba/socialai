# 🤖 SocialAI — Generador de contenido para redes sociales

SocialAI es una aplicación web que usa inteligencia artificial para generar contenido profesional para redes sociales. El usuario solo necesita describir su negocio, indicar qué desea publicar, seleccionar la red social y el tono deseado, y la IA genera una publicación lista para copiar y pegar.

---

## 🚀 Demo

[Ver aplicación en vivo](https://socialai-1b18yux13-kcgs.vercel.app/)

<img width="696" height="682" alt="Image" src="https://github.com/user-attachments/assets/d5a4a004-a9e4-4aa5-a081-af4599daaee2" />

---

## ✨ Características

- Generación de contenido con IA (Claude de Anthropic)
- Soporte para Facebook, Instagram, X, TikTok, LinkedIn y WhatsApp
- 6 tonos disponibles: Formal, Semi-formal, Casual, Divertido, Elegante y De camaradas
- Renderizado de Markdown en el resultado
- Botón de copiar con feedback visual
- Botón de regenerar contenido
- Modo oscuro/claro automático según el sistema operativo
- Validación de campos antes de enviar

---

## 🛠️ Tecnologías utilizadas

**Frontend:**
- React + TypeScript
- Vite
- TailwindCSS
- react-markdown

**Backend:**
- Python
- FastAPI
- Anthropic API (Claude)
- python-dotenv

---

## 📁 Estructura del proyecto

```
socialai/
├── frontend/          # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── GeneratorForm.tsx
│   │   │   └── ResultCard.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── backend/           # API REST con FastAPI
    ├── main.py
    ├── models.py
    ├── .env           # No incluido, ver configuración
    └── requirements.txt
```

---

## ⚙️ Cómo correrlo localmente

### Requisitos previos
- Node.js v18+
- Python 3.11+
- Cuenta en [Anthropic Console](https://console.anthropic.com) con API key

### 1. Clona el repositorio

```bash
git clone https://github.com/kevinc-glz-snba/socialai.git
cd socialai
```

### 2. Configura el backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Crea un archivo `.env` dentro de `backend/`:

```
ANTHROPIC_API_KEY=tu_api_key_aqui
```

Inicia el servidor:

```bash
uvicorn main:app --reload
```

### 3. Configura el frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Abre la aplicación

Ve a `http://localhost:5173` en tu navegador.

---

## 📚 Lo que aprendí construyendo este proyecto

- **CORS:** Qué es, por qué existe y cómo configurarlo en FastAPI para permitir comunicación entre frontend y backend en dominios distintos
- **TailwindCSS:** Cómo aplicar estilos directamente en el JSX con clases utilitarias, incluyendo modo oscuro con `dark:`
- **Props y Lifting State Up:** Cómo compartir estado entre componentes hermanos elevándolo al padre común
- **Prompt Engineering:** Cómo estructurar instrucciones precisas para obtener respuestas consistentes y listas para usar de una IA
- **async/await:** Manejo de operaciones asíncronas en JavaScript para llamadas a APIs sin bloquear la interfaz

---

## 👨‍💻 Autor

Kevin Chayane González Sanabria  
[GitHub](https://github.com/kevinc-glz-snba)

---

## 📄 Licencia

MIT
