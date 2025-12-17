import csv
import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

import pymysql

# Configuración: usa variables de entorno o defaults
DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", None)
DB_HOST = os.getenv("MYSQL_HOST", "localhost")
DB_PORT = int(os.getenv("MYSQL_PORT", "3306"))
DB_NAME = os.getenv("MYSQL_DB", "contigo_db")

CSV_PATH = Path(__file__).resolve().parents[2] / "DataBase" / "Base de datos ASIS Antioquia.csv"


def to_number(val: str) -> Any:
  if val is None:
    return None
  val = val.strip()
  if not val or val.lower() == "na":
    return None

  # Extrae el primer número válido (permite coma o punto)
  match = re.search(r"-?[0-9]+(?:[.,][0-9]+)?", val)
  if not match:
    return None
  num = match.group(0)

  if "," in num and "." not in num:
    num = num.replace(",", ".")
  try:
    if "." in num:
      return float(num)
    return int(num)
  except ValueError:
    return None


def make_id_prestador(nombre: str, numero_sede: str, cod_mpio: str) -> Optional[str]:
  nombre = (nombre or "").strip()
  numero_sede = (numero_sede or "").strip()
  cod_mpio = (cod_mpio or "").strip()
  if not nombre or not numero_sede or not cod_mpio:
    return None
  return f"{nombre}|{numero_sede}|{cod_mpio}"


def make_id_capacidad(id_prestador_sede: str, grupo_capacidad: str, coca_codigo: str) -> Optional[str]:
  if not id_prestador_sede or not grupo_capacidad or not coca_codigo:
    return None
  return f"{id_prestador_sede}|{grupo_capacidad.strip()}|{coca_codigo.strip()}"


def make_id_prestador_servicio(id_prestador_sede: str, serv_codigo: str) -> Optional[str]:
  if not id_prestador_sede or not serv_codigo:
    return None
  return f"{id_prestador_sede}|{serv_codigo.strip()}"


def import_data():
  if not CSV_PATH.exists():
    raise FileNotFoundError(f"No se encontró el CSV filtrado: {CSV_PATH}")

  conn = pymysql.connect(
    host=DB_HOST,
    port=DB_PORT,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME,
    autocommit=True,
    charset="utf8mb4",
  )

  dept_rows: Dict[str, Dict[str, Any]] = {}
  region_rows: Dict[str, Dict[str, Any]] = {}
  muni_rows: Dict[str, Dict[str, Any]] = {}
  prestador_rows: Dict[str, Dict[str, Any]] = {}
  capacidad_rows: Dict[str, Dict[str, Any]] = {}
  grupo_servicio_rows: Dict[str, Dict[str, Any]] = {}
  servicio_rows: Dict[str, Dict[str, Any]] = {}
  prestador_servicio_rows: Dict[str, Dict[str, Any]] = {}
  complejidad_rows: Dict[str, Dict[str, Any]] = {}

  with CSV_PATH.open(newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
      dept_code = row.get("Codig_departamento", "").strip()
      if not dept_code:
        continue

      # Departamento
      dept_rows[dept_code] = {
        "Codig_departamento": dept_code,
        "Departamento": row.get("Departamento", "").strip(),
        "Total_Dpto_Defunciones": to_number(row.get("Total_Dpto_Defunciones")),
        "Total_Dpto_Suicidios": to_number(row.get("Total_Dpto_Suicidios")),
        "Total_Dpto_Nacimientos": to_number(row.get("Total_Dpto_Nacimientos")),
        "Dpto_Tasa_Embarazo_Adolecentes_10_a_14": to_number(row.get("Dpto_Tasa_Embarazo_Adolecentes 10 a 14")),
        "Dpto_Tasa_Embarazo_Adolecentes_15_a_19": to_number(row.get("Dpto_Tasa_Embarazo_Adolecentes 15 a 19")),
        "Dpto_Porcentaje_nacidos_Vivos_bajo_peso": to_number(row.get("%_Dpto_nacidos_Vivos_ bajo peso al nacer")),
        "Razon_Dpto_Mortalidad_Materna": to_number(row.get("Razon_Dpto_Mortalidad_Materna")),
        "Tasa_Dpto_Mortalidad_Neontal": to_number(row.get("Tasa_Dpto_Mortalidad_Neontal")),
        "Tasa_Dpto_Mortalidad_Ninez": to_number(row.get("Tasa_Dpto_Mortalidad_Niñez")),
        "Tasa_Dpto_Mortalidad_Desnutricion": to_number(row.get("Tasa_Dpto_Mortalidad_Desnutricion")),
        "Total_Dpto_intento_Suicidio": to_number(row.get("Total_Dpto_intento_Suicidio")),
      }

      # Región
      reg_code = row.get("Codig_Region", "").strip()
      if reg_code and reg_code.lower() != "na":
        region_rows[reg_code] = {
          "Codig_Region": reg_code,
          "Region": row.get("Region", "").strip(),
          "Total_Poblacion_region": to_number(row.get("Total_Poblacion_region")),
          "Codig_departamento": dept_code,
        }

      # Municipio
      muni_code = row.get("Codig_Municipio", "").strip()
      if muni_code:
        muni_rows.setdefault(
          muni_code,
          {
            "Codig_Municipio": muni_code,
            "Municipio": row.get("Municipio", "").strip(),
            "Municipio_PDET": row.get("Municipio_PDET", "").strip(),
            "Municipio_ZOMAC": row.get("Municipio_ZOMAC", "").strip(),
            "Altitud_m_snm": to_number(row.get("Altitud (m s. n. m.)")),
            "Temperatura_promedio_C": to_number(row.get("Temperatura promedio (°C)")),
            "Area_km2": to_number(row.get("Área (km²)") or row.get("Area (km²)")),
            "Coordenada_x": to_number(row.get("x")),
            "Coordenada_y": to_number(row.get("y")),
            "Shape_Area": to_number(row.get("Shape__Area")),
            "Shape_Length": to_number(row.get("Shape__Length")),
            "Distancia_estimada_Pasto_km": to_number(row.get("Distancia estimada a Pasto (km)")),
            "Tiempo_estimado_Pasto_horas": to_number(row.get("Tiempo estimado a Pasto (Horas)")),
            "Corregimientos": to_number(row.get("Corregimientos ")),
            "total_Veredas": to_number(row.get("total Veredas ")),
            "INB_Porcentaje_Total": to_number(row.get("INB_%_Total")),
            "INB_Porcentaje_Urbana": to_number(row.get("INB_% _Urbana")),
            "INB_Porcentaje_Rural": to_number(row.get("INB_%_Rural")),
            "Poblacion_Total": to_number(row.get("Poblacion_Total")),
            "Poblacion_Urbana": to_number(row.get("Poblacion_Urbana")),
            "Porcentaje_Poblacion_Urbana": to_number(row.get("% Poblacion_Urbana")),
            "Poblacion_Rural_Dispersa": to_number(row.get("Poblacion_Rural_Dispersa")),
            "Porcentaje_Poblacion_Rural": to_number(row.get("% Poblacion_Rural")),
            "Densidad_Poblacional_hab_km2": to_number(row.get("Densidad_Poblacional_ (hab./km2).")),
            "Viviendas": to_number(row.get("Viviendas")),
            "Energia_electrica": to_number(row.get("Energía eléctrica")),
            "Acueducto": to_number(row.get("Acueducto")),
            "Alcantarillado": to_number(row.get("Alcantarillado")),
            "Total_Mpio_Defuncion": to_number(row.get("Total_Mpio_Defuncion")),
            "Total_Mpios_Suicidios": to_number(row.get("Total_Mpios_Suicidios")),
            "Total_Mpio_Nacimiento": to_number(row.get("Total_Mpio_Nacimiento ")),
            "Mpio_Embarazo_Adolecentes_10_a_14": to_number(row.get("Mpio_Embarazo_Adolecentes 10 a 14")),
            "Mpio_Embarazo_Adolecentes_15_a_19": to_number(row.get("Mpio_Embarazo_Adolecentes 15 a 19")),
            "Mpio_Porcentaje_nacidos_Vivos_bajo_peso": to_number(row.get("%_Mpio_nacidos_Vivos_ bajo peso al nacer")),
            "Razon_Mpio_Mortalidad_Materna": to_number(row.get("Razon_Mpio_Mortaidad_Materna")),
            "Tasa_Mpio_Mortalidad_Neontal": to_number(row.get("Tasa_Mpio_Mortaidad_Neontal")),
            "Tasa_Mpio_Mortalidad_Ninez": to_number(row.get("Tasa_Mpio_Mortaidad_Niñez")),
            "Tasa_Mpio_Mortalidad_Desnutricion": to_number(row.get("Tasa_Mpio_Mortaidad_Desnutricion")),
            "Total_Mpio_intento_Suicidio": to_number(row.get("Total_Mpio_intento_Suicidio")),
            "Codig_departamento": dept_code,
            "Codig_Region": reg_code or None,
          },
        )

        # Prestador y servicios
        nombre_prestador = row.get("nombre_prestador", "")
        numero_sede = row.get("numero_sede", "")
        id_prestador = make_id_prestador(nombre_prestador, numero_sede, muni_code)
        if id_prestador:
          prestador_rows.setdefault(
            id_prestador,
            {
              "id_prestador_sede": id_prestador,
              "nombre_prestador": nombre_prestador.strip(),
              "numero_sede": numero_sede.strip(),
              "Codig_Municipio": muni_code,
              "tipo_zona": row.get("tipo_zona", "").strip(),
              "centro_poblado": row.get("centro_poblado", "").strip(),
              "caracter": row.get("caracter", "").strip(),
              "nivel": to_number(row.get("nivel")),
              "habilitado": row.get("habilitado", "").strip(),
            },
          )

          # Capacidad instalada
          grupo_capacidad = row.get("grupo_capacidad", "").strip()
          coca_codigo = row.get("coca_codigo", "").strip()
          coca_nombre = row.get("coca_nombre", "").strip()
          cantidad = to_number(row.get("cantidad"))
          cap_id = make_id_capacidad(id_prestador, grupo_capacidad, coca_codigo)
          if cap_id:
            capacidad_rows.setdefault(
              cap_id,
              {
                "id_capacidad": cap_id,
                "id_prestador_sede": id_prestador,
                "grupo_capacidad": grupo_capacidad,
                "coca_codigo": coca_codigo,
                "coca_nombre": coca_nombre,
                "cantidad": cantidad,
              },
            )

          # Grupo servicio
          grse_codigo = row.get("grse_codigo", "").strip()
          serv_nombre = row.get("serv_nombre", "").strip()
          if grse_codigo:
            grupo_servicio_rows.setdefault(
              grse_codigo,
              {
                "grse_codigo": grse_codigo,
                "serv_nombre": serv_nombre,
              },
            )

          # Servicio
          serv_codigo = row.get("serv_codigo", "").strip()
          serv_nombre3 = row.get("serv_nombre3", "").strip()
          if serv_codigo:
            servicio_rows.setdefault(
              serv_codigo,
              {
                "serv_codigo": serv_codigo,
                "serv_nombre3": serv_nombre3,
                "grse_codigo": grse_codigo or None,
              },
            )

          # Prestador_Servicio
          id_ps = make_id_prestador_servicio(id_prestador, serv_codigo)
          if id_ps:
            prestador_servicio_rows.setdefault(
              id_ps,
              {
                "id_prestador_servicio": id_ps,
                "id_prestador_sede": id_prestador,
                "serv_codigo": serv_codigo,
                "habilitado2": row.get("habilitado2", "").strip(),
                "ambulatorio": row.get("ambulatorio", "").strip(),
                "hospitalario": row.get("hospitalario", "").strip(),
                "unidad_movil": row.get("unidad_movil", "").strip(),
                "domiciliario": row.get("domiciliario", "").strip(),
                "otras_extramural": row.get("otras_extramural", "").strip(),
                "modalidad_telemedicina": row.get("modalidad_telemedicina", "").strip(),
                "modalidad_prestador_referencia": row.get("modalidad_prestador_referencia", "").strip(),
                "modalidad_prestador_referencia_telemedicina_interactiva": row.get("modalidad_prestador_referencia_telemedicina_interactiva", "").strip(),
                "modalidad_prestador_referencia_telemedicina_no_interactiva": row.get("modalidad_prestador_referencia_telemedicina_no_interactiva", "").strip(),
                "modalidad_prestador_referencia_tele_experticia": row.get("modalidad_prestador_referencia_tele_experticia", "").strip(),
                "modalidad_prestador_referencia_tele_monitoreo": row.get("modalidad_prestador_referencia_tele_monitoreo", "").strip(),
                "modalidad_prestador_remisor": row.get("modalidad_prestador_remisor", "").strip(),
                "modalidad_prestador_remisor_tele_experticia": row.get("modalidad_prestador_remisor_tele_experticia", "").strip(),
                "modalidad_prestador_remisor_tele_monitoreo": row.get("modalidad_prestador_remisor_tele_monitoreo", "").strip(),
              },
            )

            # Complejidad / EBS
            complejidad_rows.setdefault(
              id_ps,
              {
                "id_complejidad_ebs": id_ps,
                "id_prestador_servicio": id_ps,
                "complejidades": row.get("complejidades", "").strip(),
                "EBS": row.get("EBS", "").strip(),
                "TIPO_EBS": row.get("TIPO EBS", "").strip(),
                "Cdig_Enfermeria_region": row.get("Cdig_Enfermeria_region", "").strip(),
                "Cdig_Enfermera": row.get("Cdig_Enfermera", "").strip(),
                "Nombre_Enfermera": row.get("Nombre_Enfermera", "").strip(),
                "ESE_Encargada": row.get("ESE_Encargada", "").strip(),
              },
            )

  with conn.cursor() as cur:
    # Departamento
    dept_cols = list(next(iter(dept_rows.values())).keys())
    dept_sql = f"""
    INSERT INTO Departamento ({','.join(f'`{c}`' for c in dept_cols)})
    VALUES ({','.join(['%s']*len(dept_cols))})
    ON DUPLICATE KEY UPDATE Departamento=VALUES(Departamento)
    """
    cur.executemany(dept_sql, [[dept[v] for v in dept_cols] for dept in dept_rows.values()])

    # Región
    if region_rows:
      region_cols = list(next(iter(region_rows.values())).keys())
      region_sql = f"""
      INSERT INTO Region ({','.join(f'`{c}`' for c in region_cols)})
      VALUES ({','.join(['%s']*len(region_cols))})
      ON DUPLICATE KEY UPDATE Region=VALUES(Region), Total_Poblacion_region=VALUES(Total_Poblacion_region), Codig_departamento=VALUES(Codig_departamento)
      """
      cur.executemany(region_sql, [[reg[v] for v in region_cols] for reg in region_rows.values()])

    # Municipio
    muni_cols = list(next(iter(muni_rows.values())).keys())
    muni_sql = f"""
    INSERT INTO Municipio ({','.join(f'`{c}`' for c in muni_cols)})
    VALUES ({','.join(['%s']*len(muni_cols))})
    ON DUPLICATE KEY UPDATE Municipio=VALUES(Municipio), Municipio_PDET=VALUES(Municipio_PDET), Municipio_ZOMAC=VALUES(Municipio_ZOMAC),
      Poblacion_Total=VALUES(Poblacion_Total), Poblacion_Urbana=VALUES(Poblacion_Urbana), Poblacion_Rural_Dispersa=VALUES(Poblacion_Rural_Dispersa),
      Viviendas=VALUES(Viviendas), Energia_electrica=VALUES(Energia_electrica), Acueducto=VALUES(Acueducto), Alcantarillado=VALUES(Alcantarillado)
    """
    cur.executemany(muni_sql, [[m[v] for v in muni_cols] for m in muni_rows.values()])

    # Grupo_Servicio
    if grupo_servicio_rows:
      gs_cols = list(next(iter(grupo_servicio_rows.values())).keys())
      gs_sql = f"""
      INSERT INTO Grupo_Servicio ({','.join(f'`{c}`' for c in gs_cols)})
      VALUES ({','.join(['%s']*len(gs_cols))})
      ON DUPLICATE KEY UPDATE serv_nombre=VALUES(serv_nombre)
      """
      cur.executemany(gs_sql, [[g[v] for v in gs_cols] for g in grupo_servicio_rows.values()])

    # Servicio
    if servicio_rows:
      serv_cols = list(next(iter(servicio_rows.values())).keys())
      serv_sql = f"""
      INSERT INTO Servicio ({','.join(f'`{c}`' for c in serv_cols)})
      VALUES ({','.join(['%s']*len(serv_cols))})
      ON DUPLICATE KEY UPDATE serv_nombre3=VALUES(serv_nombre3), grse_codigo=VALUES(grse_codigo)
      """
      cur.executemany(serv_sql, [[s[v] for v in serv_cols] for s in servicio_rows.values()])

    # Prestador
    if prestador_rows:
      pr_cols = list(next(iter(prestador_rows.values())).keys())
      pr_sql = f"""
      INSERT INTO Prestador ({','.join(f'`{c}`' for c in pr_cols)})
      VALUES ({','.join(['%s']*len(pr_cols))})
      ON DUPLICATE KEY UPDATE nombre_prestador=VALUES(nombre_prestador), numero_sede=VALUES(numero_sede),
        Codig_Municipio=VALUES(Codig_Municipio), tipo_zona=VALUES(tipo_zona), centro_poblado=VALUES(centro_poblado),
        caracter=VALUES(caracter), nivel=VALUES(nivel), habilitado=VALUES(habilitado)
      """
      cur.executemany(pr_sql, [[p[v] for v in pr_cols] for p in prestador_rows.values()])

    # Capacidad_Instalada
    if capacidad_rows:
      cap_cols = list(next(iter(capacidad_rows.values())).keys())
      cap_sql = f"""
      INSERT INTO Capacidad_Instalada ({','.join(f'`{c}`' for c in cap_cols)})
      VALUES ({','.join(['%s']*len(cap_cols))})
      ON DUPLICATE KEY UPDATE grupo_capacidad=VALUES(grupo_capacidad), coca_codigo=VALUES(coca_codigo),
        coca_nombre=VALUES(coca_nombre), cantidad=VALUES(cantidad)
      """
      cur.executemany(cap_sql, [[c[v] for v in cap_cols] for c in capacidad_rows.values()])

    # Prestador_Servicio
    if prestador_servicio_rows:
      ps_cols = list(next(iter(prestador_servicio_rows.values())).keys())
      ps_sql = f"""
      INSERT INTO Prestador_Servicio ({','.join(f'`{c}`' for c in ps_cols)})
      VALUES ({','.join(['%s']*len(ps_cols))})
      ON DUPLICATE KEY UPDATE habilitado2=VALUES(habilitado2), ambulatorio=VALUES(ambulatorio), hospitalario=VALUES(hospitalario),
        unidad_movil=VALUES(unidad_movil), domiciliario=VALUES(domiciliario), otras_extramural=VALUES(otras_extramural),
        modalidad_telemedicina=VALUES(modalidad_telemedicina), modalidad_prestador_referencia=VALUES(modalidad_prestador_referencia),
        modalidad_prestador_referencia_telemedicina_interactiva=VALUES(modalidad_prestador_referencia_telemedicina_interactiva),
        modalidad_prestador_referencia_telemedicina_no_interactiva=VALUES(modalidad_prestador_referencia_telemedicina_no_interactiva),
        modalidad_prestador_referencia_tele_experticia=VALUES(modalidad_prestador_referencia_tele_experticia),
        modalidad_prestador_referencia_tele_monitoreo=VALUES(modalidad_prestador_referencia_tele_monitoreo),
        modalidad_prestador_remisor=VALUES(modalidad_prestador_remisor),
        modalidad_prestador_remisor_tele_experticia=VALUES(modalidad_prestador_remisor_tele_experticia),
        modalidad_prestador_remisor_tele_monitoreo=VALUES(modalidad_prestador_remisor_tele_monitoreo)
      """
      cur.executemany(ps_sql, [[p[v] for v in ps_cols] for p in prestador_servicio_rows.values()])

    # Complejidad_EBS
    if complejidad_rows:
      comp_cols = list(next(iter(complejidad_rows.values())).keys())
      comp_sql = f"""
      INSERT INTO Complejidad_EBS ({','.join(f'`{c}`' for c in comp_cols)})
      VALUES ({','.join(['%s']*len(comp_cols))})
      ON DUPLICATE KEY UPDATE complejidades=VALUES(complejidades), EBS=VALUES(EBS), TIPO_EBS=VALUES(TIPO_EBS),
        Cdig_Enfermeria_region=VALUES(Cdig_Enfermeria_region), Cdig_Enfermera=VALUES(Cdig_Enfermera),
        Nombre_Enfermera=VALUES(Nombre_Enfermera), ESE_Encargada=VALUES(ESE_Encargada)
      """
      cur.executemany(comp_sql, [[c[v] for v in comp_cols] for c in complejidad_rows.values()])

  conn.close()
  print(
    f"Departamentos: {len(dept_rows)} | Regiones: {len(region_rows)} | Municipios: {len(muni_rows)} | "
    f"Prestadores: {len(prestador_rows)} | Capacidad: {len(capacidad_rows)} | Servicios: {len(servicio_rows)} | "
    f"Prestador_Servicio: {len(prestador_servicio_rows)} | Complejidad: {len(complejidad_rows)}"
  )


if __name__ == "__main__":
  import_data()

