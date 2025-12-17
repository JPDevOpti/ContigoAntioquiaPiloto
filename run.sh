#!/usr/bin/env bash

# Script para levantar frontend (Next.js) y backend (FastAPI) de manera sencilla.
# Uso:
#   ./run.sh frontend   # solo frontend
#   ./run.sh backend    # solo backend
#   ./run.sh all        # ambos servicios (por defecto)

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONT_DIR="${DIR}/frontend"
BACK_DIR="${DIR}/backend"
VENV_DIR="${BACK_DIR}/.venv"

start_backend() {
  cd "$BACK_DIR"
  echo "==> Preparando backend (FastAPI)..."
  if [ ! -d "$VENV_DIR" ]; then
    python -m venv "$VENV_DIR"
  fi
  # shellcheck disable=SC1090
  source "$VENV_DIR/bin/activate"
  pip install --upgrade pip >/dev/null
  pip install -r requirements.txt
  uvicorn app.main:app --reload --port 8000
}

start_frontend() {
  cd "$FRONT_DIR"
  echo "==> Preparando frontend (Next.js)..."
  if [ ! -d "node_modules" ]; then
    npm install
  fi
  export WATCHPACK_POLLING=true
  npm run dev -- --port 3000
}

MODE="${1:-all}"

case "$MODE" in
  backend)
    start_backend
    ;;
  frontend)
    start_frontend
    ;;
  all)
    echo "==> Iniciando backend y frontend..."
    start_backend &
    BACK_PID=$!
    start_frontend &
    FRONT_PID=$!
    trap 'kill $BACK_PID $FRONT_PID 2>/dev/null || true' INT TERM
    wait $BACK_PID $FRONT_PID
    ;;
  *)
    echo "Modo no soportado. Usa: frontend | backend | all"
    exit 1
    ;;
esac

