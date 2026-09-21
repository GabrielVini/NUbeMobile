from datetime import datetime, timedelta, timezone
from fastapi import Cookie, Depends, FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import or_, select
from sqlalchemy.orm import Session
from .database import get_db
from .models import RecuperacaoSenha, Sessao, Usuario
from .schemas import CadastroEntrada, LoginEntrada, RecuperacaoEntrada
from .security import hash_password, hash_token, new_token, verify_password

app = FastAPI(title="Nobe Estágios API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health(): return {"status": "ok"}

@app.post("/api/auth/cadastro", status_code=201)
def cadastro(data: CadastroEntrada, db: Session = Depends(get_db)):
    existing = db.scalar(select(Usuario).where(or_(Usuario.email == data.email.lower(), Usuario.matricula == data.matricula)))
    if existing: raise HTTPException(409, "E-mail ou matrícula já cadastrados.")
    user = Usuario(nome=data.nome.strip(), matricula=data.matricula.strip(), email=data.email.lower(), telefone=data.telefone, senha_hash=hash_password(data.senha))
    db.add(user); db.commit(); db.refresh(user)
    return {"id": user.id, "nome": user.nome, "email": user.email}

@app.post("/api/auth/login")
def login(data: LoginEntrada, response: Response, db: Session = Depends(get_db)):
    identificador = data.email.strip()
    user = db.scalar(select(Usuario).where(or_(Usuario.email == identificador.lower(), Usuario.matricula == identificador)))
    if not user or not user.ativo or not verify_password(data.senha, user.senha_hash): raise HTTPException(401, "Credenciais inválidas.")
    token = new_token(); db.add(Sessao(usuario_id=user.id, token_hash=hash_token(token), expira_em=datetime.now(timezone.utc)+timedelta(hours=8))); db.commit()
    response.set_cookie("nobe_session", token, httponly=True, secure=False, samesite="strict", max_age=28800)
    return {"nome": user.nome}

@app.get("/api/auth/me")
def me(nobe_session: str | None = Cookie(default=None), db: Session = Depends(get_db)):
    if not nobe_session: raise HTTPException(401, "Sessão inválida.")
    session = db.scalar(select(Sessao).where(Sessao.token_hash == hash_token(nobe_session)))
    if not session or session.expira_em < datetime.now(): raise HTTPException(401, "Sessão expirada.")
    user = db.get(Usuario, session.usuario_id)
    if not user or not user.ativo: raise HTTPException(401, "Sessão inválida.")
    return {"id": user.id, "nome": user.nome, "email": user.email}

@app.post("/api/auth/esqueci-senha")
def recuperar(data: RecuperacaoEntrada, db: Session = Depends(get_db)):
    user = db.scalar(select(Usuario).where(Usuario.email == data.email.lower(), Usuario.matricula == data.matricula))
    if user:
        token = new_token(); db.add(RecuperacaoSenha(usuario_id=user.id, token_hash=hash_token(token), expira_em=datetime.now(timezone.utc)+timedelta(minutes=30))); db.commit()
    return {"mensagem": "Se os dados estiverem cadastrados, enviaremos as instruções."}
