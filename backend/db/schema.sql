CREATE TABLE `Departamento` (
  `Codig_departamento` varchar(255) PRIMARY KEY COMMENT 'Código oficial del departamento',
  `Departamento` varchar(255) NOT NULL COMMENT 'Nombre del departamento',
  `Total_Dpto_Defunciones` integer COMMENT 'Total de defunciones en el departamento',
  `Total_Dpto_Suicidios` integer COMMENT 'Total de suicidios en el departamento',
  `Total_Dpto_Nacimientos` integer COMMENT 'Total de nacimientos en el departamento',
  `Dpto_Tasa_Embarazo_Adolecentes_10_a_14` decimal COMMENT 'Tasa de embarazo adolescentes 10-14 años (CSV: Dpto_Tasa_Embarazo_Adolecentes 10 a 14)',
  `Dpto_Tasa_Embarazo_Adolecentes_15_a_19` decimal COMMENT 'Tasa de embarazo adolescentes 15-19 años (CSV: Dpto_Tasa_Embarazo_Adolecentes 15 a 19)',
  `Dpto_Porcentaje_nacidos_Vivos_bajo_peso` decimal COMMENT '% nacidos vivos con bajo peso al nacer (CSV: %_Dpto_nacidos_Vivos_ bajo peso al nacer)',
  `Razon_Dpto_Mortalidad_Materna` decimal COMMENT 'Razón de mortalidad materna departamental',
  `Tasa_Dpto_Mortalidad_Neontal` decimal COMMENT 'Tasa de mortalidad neonatal departamental',
  `Tasa_Dpto_Mortalidad_Ninez` decimal COMMENT 'Tasa de mortalidad en la niñez departamental (CSV: Tasa_Dpto_Mortalidad_Niñez)',
  `Tasa_Dpto_Mortalidad_Desnutricion` decimal COMMENT 'Tasa de mortalidad por desnutrición departamental',
  `Total_Dpto_intento_Suicidio` integer COMMENT 'Total de intentos de suicidio en el departamento'
);

CREATE TABLE `Region` (
  `Codig_Region` varchar(255) PRIMARY KEY COMMENT 'Código de la región o subregión',
  `Region` varchar(255) NOT NULL COMMENT 'Nombre de la región',
  `Total_Poblacion_region` integer COMMENT 'Población total de la región',
  `Codig_departamento` varchar(255) COMMENT 'Departamento al que pertenece'
);

CREATE TABLE `Municipio` (
  `Codig_Municipio` varchar(255) PRIMARY KEY COMMENT 'Código oficial del municipio (DIVIPOLA)',
  `Municipio` varchar(255) NOT NULL COMMENT 'Nombre del municipio',
  `Municipio_PDET` varchar(255) COMMENT 'SI/NO - Si es municipio PDET',
  `Municipio_ZOMAC` varchar(255) COMMENT 'SI/NO - Si es municipio ZOMAC',
  `Altitud_m_snm` decimal COMMENT 'Altitud en metros sobre el nivel del mar (CSV: Altitud (m s. n. m.))',
  `Temperatura_promedio_C` decimal COMMENT 'Temperatura promedio en grados Celsius (CSV: Temperatura promedio (°C))',
  `Area_km2` decimal COMMENT 'Área del municipio en km² (CSV: Área (km²))',
  `Coordenada_x` decimal COMMENT 'Coordenada X (longitud proyectada) (CSV: x)',
  `Coordenada_y` decimal COMMENT 'Coordenada Y (latitud proyectada) (CSV: y)',
  `Shape_Area` decimal COMMENT 'Área geométrica según shapefile (CSV: Shape__Area)',
  `Shape_Length` decimal COMMENT 'Perímetro según shapefile (CSV: Shape__Length)',
  `Distancia_estimada_Pasto_km` decimal COMMENT 'Distancia estimada a Pasto en km (CSV: Distancia estimada a Pasto (km))',
  `Tiempo_estimado_Pasto_horas` decimal COMMENT 'Tiempo estimado a Pasto en horas (CSV: Tiempo estimado a Pasto (Horas))',
  `Corregimientos` integer COMMENT 'Número de corregimientos (CSV: Corregimientos )',
  `total_Veredas` integer COMMENT 'Número total de veredas (CSV: total Veredas )',
  `INB_Porcentaje_Total` decimal COMMENT '% población con necesidades básicas insatisfechas (CSV: INB_%_Total)',
  `INB_Porcentaje_Urbana` decimal COMMENT '% población urbana con NBI (CSV: INB_% _Urbana)',
  `INB_Porcentaje_Rural` decimal COMMENT '% población rural con NBI (CSV: INB_%_Rural)',
  `Poblacion_Total` integer COMMENT 'Población total del municipio',
  `Poblacion_Urbana` integer COMMENT 'Población urbana',
  `Porcentaje_Poblacion_Urbana` decimal COMMENT '% población urbana (CSV: % Poblacion_Urbana)',
  `Poblacion_Rural_Dispersa` integer COMMENT 'Población rural dispersa',
  `Porcentaje_Poblacion_Rural` decimal COMMENT '% población rural (CSV: % Poblacion_Rural)',
  `Densidad_Poblacional_hab_km2` decimal COMMENT 'Densidad poblacional hab/km² (CSV: Densidad_Poblacional_ (hab./km2).)',
  `Viviendas` integer COMMENT 'Número de viviendas',
  `Energia_electrica` decimal COMMENT 'Cobertura de energía eléctrica (CSV: Energía eléctrica)',
  `Acueducto` decimal COMMENT 'Cobertura de acueducto',
  `Alcantarillado` decimal COMMENT 'Cobertura de alcantarillado',
  `Total_Mpio_Defuncion` integer COMMENT 'Total de defunciones en el municipio',
  `Total_Mpios_Suicidios` integer COMMENT 'Total de suicidios en el municipio',
  `Total_Mpio_Nacimiento` integer COMMENT 'Total de nacimientos en el municipio (CSV: Total_Mpio_Nacimiento )',
  `Mpio_Embarazo_Adolecentes_10_a_14` decimal COMMENT 'Tasa embarazo adolescentes 10-14 años municipal (CSV: Mpio_Embarazo_Adolecentes 10 a 14)',
  `Mpio_Embarazo_Adolecentes_15_a_19` decimal COMMENT 'Tasa embarazo adolescentes 15-19 años municipal (CSV: Mpio_Embarazo_Adolecentes 15 a 19)',
  `Mpio_Porcentaje_nacidos_Vivos_bajo_peso` decimal COMMENT '% nacidos vivos con bajo peso municipal (CSV: %_Mpio_nacidos_Vivos_ bajo peso al nacer)',
  `Razon_Mpio_Mortalidad_Materna` decimal COMMENT 'Razón de mortalidad materna municipal (CSV: Razon_Mpio_Mortaidad_Materna)',
  `Tasa_Mpio_Mortalidad_Neontal` decimal COMMENT 'Tasa de mortalidad neonatal municipal (CSV: Tasa_Mpio_Mortaidad_Neontal)',
  `Tasa_Mpio_Mortalidad_Ninez` decimal COMMENT 'Tasa de mortalidad en la niñez municipal (CSV: Tasa_Mpio_Mortaidad_Niñez)',
  `Tasa_Mpio_Mortalidad_Desnutricion` decimal COMMENT 'Tasa de mortalidad por desnutrición municipal (CSV: Tasa_Mpio_Mortaidad_Desnutricion)',
  `Total_Mpio_intento_Suicidio` integer COMMENT 'Total de intentos de suicidio municipal',
  `Codig_departamento` varchar(255) COMMENT 'Departamento al que pertenece',
  `Codig_Region` varchar(255) COMMENT 'Región a la que pertenece'
);

CREATE TABLE `Prestador` (
  `id_prestador_sede` varchar(255) PRIMARY KEY COMMENT 'ID compuesto: nombre_prestador + numero_sede + Codig_Municipio',
  `nombre_prestador` varchar(255) NOT NULL COMMENT 'Nombre del prestador de servicios de salud',
  `numero_sede` varchar(255) NOT NULL COMMENT 'Número identificador de la sede',
  `Codig_Municipio` varchar(255) COMMENT 'Municipio donde se ubica',
  `tipo_zona` varchar(255) COMMENT 'URBANA/RURAL',
  `centro_poblado` varchar(255) COMMENT 'Nombre del centro poblado',
  `caracter` varchar(255) COMMENT 'Municipal, Departamental, etc.',
  `nivel` integer COMMENT 'Nivel de complejidad institucional (1, 2, 3...)',
  `habilitado` varchar(255) COMMENT 'SI/NO - Si está habilitado'
);

CREATE TABLE `Capacidad_Instalada` (
  `id_capacidad` varchar(255) PRIMARY KEY COMMENT 'ID compuesto: id_prestador_sede + grupo_capacidad + coca_codigo',
  `id_prestador_sede` varchar(255) COMMENT 'Prestador y sede',
  `grupo_capacidad` varchar(255) NOT NULL COMMENT 'AMBULANCIAS, CAMAS, CAMILLAS, CONSULTORIOS, SALAS, etc.',
  `coca_codigo` varchar(255) NOT NULL COMMENT 'Código de capacidad según COCA',
  `coca_nombre` varchar(255) COMMENT 'Nombre de la capacidad (BÁSICA, Pediátrica, Adultos, etc.)',
  `cantidad` integer COMMENT 'Número de unidades de esa capacidad'
);

CREATE TABLE `Grupo_Servicio` (
  `grse_codigo` varchar(255) PRIMARY KEY COMMENT 'Código del grupo de servicios',
  `serv_nombre` varchar(255) NOT NULL COMMENT 'Apoyo Diagnóstico, Consulta Externa, Internación, Atención Inmediata (CSV: serv_nombre)'
);

CREATE TABLE `Servicio` (
  `serv_codigo` varchar(255) PRIMARY KEY COMMENT 'Código del servicio específico',
  `serv_nombre3` varchar(255) NOT NULL COMMENT 'Nombre del servicio (MEDICINA GENERAL, URGENCIAS, etc.)',
  `grse_codigo` varchar(255) COMMENT 'Grupo al que pertenece'
);

CREATE TABLE `Prestador_Servicio` (
  `id_prestador_servicio` varchar(255) PRIMARY KEY COMMENT 'ID compuesto: id_prestador_sede + serv_codigo',
  `id_prestador_sede` varchar(255) COMMENT 'Prestador y sede',
  `serv_codigo` varchar(255) COMMENT 'Servicio específico',
  `habilitado2` varchar(255) COMMENT 'SI/NO - Si el servicio está habilitado',
  `ambulatorio` varchar(255) COMMENT 'SI/NO/SD - Modalidad ambulatoria',
  `hospitalario` varchar(255) COMMENT 'SI/NO/SD - Modalidad hospitalaria',
  `unidad_movil` varchar(255) COMMENT 'SI/NO/SD - Modalidad unidad móvil',
  `domiciliario` varchar(255) COMMENT 'SI/NO/SD - Modalidad domiciliaria',
  `otras_extramural` varchar(255) COMMENT 'SI/NO/SD - Otras modalidades extramurales',
  `modalidad_telemedicina` varchar(255) COMMENT 'SI/NO - Si se presta por telemedicina',
  `modalidad_prestador_referencia` varchar(255) COMMENT 'SI/NO - Si actúa como prestador de referencia',
  `modalidad_prestador_referencia_telemedicina_interactiva` varchar(255) COMMENT 'SI/NO - Telemedicina interactiva como referente',
  `modalidad_prestador_referencia_telemedicina_no_interactiva` varchar(255) COMMENT 'SI/NO - Telemedicina no interactiva como referente',
  `modalidad_prestador_referencia_tele_experticia` varchar(255) COMMENT 'SI/NO - Tele-expertise como referente',
  `modalidad_prestador_referencia_tele_monitoreo` varchar(255) COMMENT 'SI/NO - Tele-monitoreo como referente',
  `modalidad_prestador_remisor` varchar(255) COMMENT 'SI/NO - Si actúa como prestador remisor',
  `modalidad_prestador_remisor_tele_experticia` varchar(255) COMMENT 'SI/NO - Tele-expertise como remisor',
  `modalidad_prestador_remisor_tele_monitoreo` varchar(255) COMMENT 'SI/NO - Tele-monitoreo como remisor'
);

CREATE TABLE `Complejidad_EBS` (
  `id_complejidad_ebs` varchar(255) PRIMARY KEY COMMENT 'ID compuesto: id_prestador_servicio',
  `id_prestador_servicio` varchar(255) COMMENT 'Prestador y servicio',
  `complejidades` varchar(255) COMMENT 'BAJA, MEDIANA, ALTA, SIN COMPLEJIDAD',
  `EBS` varchar(255) COMMENT 'Identificador de equipo básico de salud',
  `TIPO_EBS` varchar(255) COMMENT 'Tipo de equipo básico de salud (CSV: TIPO EBS)',
  `Cdig_Enfermeria_region` varchar(255) COMMENT 'Código de enfermería de la región',
  `Cdig_Enfermera` varchar(255) COMMENT 'Código identificador de la enfermera/o',
  `Nombre_Enfermera` varchar(255) COMMENT 'Nombre de la enfermera/o responsable',
  `ESE_Encargada` varchar(255) COMMENT 'Nombre de la ESE encargada'
);

ALTER TABLE `Region` ADD FOREIGN KEY (`Codig_departamento`) REFERENCES `Departamento` (`Codig_departamento`);

ALTER TABLE `Municipio` ADD FOREIGN KEY (`Codig_departamento`) REFERENCES `Departamento` (`Codig_departamento`);

ALTER TABLE `Municipio` ADD FOREIGN KEY (`Codig_Region`) REFERENCES `Region` (`Codig_Region`);

ALTER TABLE `Prestador` ADD FOREIGN KEY (`Codig_Municipio`) REFERENCES `Municipio` (`Codig_Municipio`);

ALTER TABLE `Capacidad_Instalada` ADD FOREIGN KEY (`id_prestador_sede`) REFERENCES `Prestador` (`id_prestador_sede`);

ALTER TABLE `Servicio` ADD FOREIGN KEY (`grse_codigo`) REFERENCES `Grupo_Servicio` (`grse_codigo`);

ALTER TABLE `Prestador_Servicio` ADD FOREIGN KEY (`id_prestador_sede`) REFERENCES `Prestador` (`id_prestador_sede`);

ALTER TABLE `Prestador_Servicio` ADD FOREIGN KEY (`serv_codigo`) REFERENCES `Servicio` (`serv_codigo`);

ALTER TABLE `Complejidad_EBS` ADD FOREIGN KEY (`id_prestador_servicio`) REFERENCES `Prestador_Servicio` (`id_prestador_servicio`);

