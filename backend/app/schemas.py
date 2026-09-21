from pydantic import BaseModel, EmailStr, Field

class CadastroEntrada(BaseModel):
    nome: str = Field(min_length=2, max_length=160)
    matricula: str = Field(min_length=2, max_length=50)
    email: EmailStr
    telefone: str | None = Field(default=None, max_length=30)
    senha: str = Field(min_length=8, max_length=128)

class LoginEntrada(BaseModel):
    email: str = Field(min_length=2, max_length=254)
    senha: str

class RecuperacaoEntrada(BaseModel):
    matricula: str
    email: EmailStr
