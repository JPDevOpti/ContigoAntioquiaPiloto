from fastapi import APIRouter

from app.schemas.dashboard import DashboardHighlight, DashboardSummary

router = APIRouter()


@router.get("/highlights", response_model=list[DashboardHighlight], summary="Destacados base")
async def get_highlights():
    return [
        DashboardHighlight(title="Cobertura departamental", value="125 municipios", change="4 nuevos"),
        DashboardHighlight(title="Población monitoreada", value="6.2M habitantes", change="3.1% mes"),
        DashboardHighlight(title="Eventos críticos", value="18 alertas", change="5 en resolución")
    ]


@router.get("/summary", response_model=DashboardSummary, summary="Resumen de estado")
async def get_summary():
    return DashboardSummary(
        births=12450,
        deaths=3200,
        maternal_mortality_rate=42.5,
        adolescent_pregnancy_rate="22.1 por 1.000",
        notes="Datos de ejemplo listos para conectar con ASIS Consolidado."
    )

