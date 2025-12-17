from pydantic import BaseModel


class DashboardHighlight(BaseModel):
    title: str
    value: str
    change: str


class DashboardSummary(BaseModel):
    births: int
    deaths: int
    maternal_mortality_rate: float
    adolescent_pregnancy_rate: str
    notes: str | None = None

