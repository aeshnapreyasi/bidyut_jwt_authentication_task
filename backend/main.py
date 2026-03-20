from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import routes

# Automatically create all tables in the PostgreSQL database if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="JWT Authentication API")

# Configure CORS so the React frontend can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the routers mapping to our API contracts
app.include_router(routes.auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(routes.user_router, prefix="/api", tags=["User Profile"])