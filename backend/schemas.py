from pydantic import BaseModel, EmailStr

# Schema for incoming registration data
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# Schema for outgoing user data (password excluded!)
class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True  # Allows Pydantic to read SQLAlchemy models

# Schema for the JWT token response
class Token(BaseModel):
    access_token: str
    token_type: str

# Schema for data encoded inside the JWT
class TokenData(BaseModel):
    email: str | None = None


