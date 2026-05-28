import React, { useState } from 'react';

interface DocumentItem {
  id: string;
  name: string;
  code?: string; // e.g. "Fracción I", "LDF", etc.
  description: string;
  fileName: string;
}

export const Transparencia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('art70');
  const [searchQuery, setSearchQuery] = useState('');
  const [clickedDoc, setClickedDoc] = useState<string | null>(null);

  const handleDocClick = (docId: string) => {
    setClickedDoc(docId);
    setTimeout(() => setClickedDoc(null), 2500);
  };

  const menuItems = [
    { id: 'art70', label: 'Ley Federal: Art. 70 (Comunes)' },
    { id: 'art71', label: 'Ley Federal: Art. 71 (Específicas)' },
    { id: 'art30', label: 'Ley Estatal: Art. 30 (Oaxaca)' },
    { id: 'financiera', label: 'Información Financiera' },
    { id: 'ingresos', label: 'Ley de Ingresos' },
    { id: 'egresos', label: 'Presupuesto de Egresos' },
    { id: 'gaceta', label: 'Gaceta Municipal' },
  ];

  // Documents data structured by active tab
  const documentsData: Record<string, DocumentItem[]> = {
    art70: [
      {
        id: '70-1',
        code: 'Fracción I',
        name: 'Marco Normativo Aplicable',
        description: 'El marco normativo aplicable al sujeto obligado, en el que deberá incluirse leyes, códigos, reglamentos, decretos de creación, manuales administrativos, reglas de operación, criterios, políticas, entre otros;',
        fileName: 'marco_normativo_san_juan_teita_2026.pdf',
      },
      {
        id: '70-2',
        code: 'Fracción II',
        name: 'Estructura Orgánica y Organigrama',
        description: 'Su estructura orgánica completa, en un formato que permita vincular cada parte de la estructura, las atribuciones y responsabilidades que le corresponden a cada servidor público, prestador de servicios profesionales o miembro de los sujetos obligados, de conformidad con las disposiciones aplicables;',
        fileName: 'organigrama_municipal_teita_2026.pdf',
      },
      {
        id: '70-3',
        code: 'Fracción III',
        name: 'Facultades de cada Área',
        description: 'Las facultades de cada Área;',
        fileName: 'manual_funciones_facultades_2026.pdf',
      },
      {
        id: '70-3-spec',
        code: 'BANDO',
        name: 'Bando de Policía y Buen Gobierno',
        description: 'Bando de Policía y Buen Gobierno del Municipio de San Juan Teita.',
        fileName: 'bando_policia_buen_gobierno_teita_2026.pdf',
      },
      {
        id: '70-4',
        code: 'Fracción IV',
        name: 'Metas y Objetivos de las Áreas',
        description: 'Las metas y objetivos de las Áreas de conformidad con sus programas operativos;',
        fileName: 'metas_objetivos_ayuntamiento_2026.pdf',
      },
      {
        id: '70-5',
        code: 'Fracción V',
        name: 'Indicadores de Interés Público',
        description: 'Los indicadores relacionados con temas de interés público o trascendencia social que conforme a sus funciones, deban establecer;',
        fileName: 'indicadores_interes_publico_2026.pdf',
      },
      {
        id: '70-6',
        code: 'Fracción VI',
        name: 'Indicadores de Rendición de Cuentas',
        description: 'Los indicadores que permitan rendir cuenta de sus objetivos y resultados;',
        fileName: 'indicadores_objetivos_resultados_2026.pdf',
      },
      {
        id: '70-7',
        code: 'Fracción VII',
        name: 'Directorio de Servidores Públicos',
        description: 'El directorio de todos los Servidores Públicos, a partir del nivel de jefe de departamento o su equivalente, o de menor nivel, cuando se brinde atención al público; manejen o apliquen recursos públicos; realicen actos de autoridad o presten servicios profesionales bajo el régimen de confianza u honorarios y personal de base. El directorio deberá incluir, al menos el nombre, cargo o nombramiento asignado, nivel del puesto en la estructura orgánica, fecha de alta en el cargo, número telefónico, domicilio para recibir correspondencia y dirección de correo electrónico oficiales;',
        fileName: 'directorio_completo_servidores_2026.pdf',
      },
      {
        id: '70-8',
        code: 'Fracción VIII',
        name: 'Remuneraciones Brutas y Netas',
        description: 'La remuneración bruta y neta de todos los Servidores Públicos de base o de confianza, de todas las percepciones, incluyendo sueldos, prestaciones, gratificaciones, primas, comisiones, dietas, bonos, estímulos, ingresos y sistemas de compensación, señalando la periodicidad de dicha remuneración;',
        fileName: 'remuneraciones_brutas_netas_2026.pdf',
      },
      {
        id: '70-9',
        code: 'Fracción IX',
        name: 'Gastos de Representación y Viáticos',
        description: 'Los gastos de representación y viáticos, así como el objeto e informe de comisión correspondiente;',
        fileName: 'reporte_viaticos_comisiones_2026.pdf',
      },
      {
        id: '70-10',
        code: 'Fracción X',
        name: 'Plazas y Personal de Base y Confianza',
        description: 'El número total de las plazas y del personal de base y confianza, especificando el total de las vacantes, por nivel de puesto, para cada unidad administrativa;',
        fileName: 'plazas_vacantes_ayuntamiento_2026.pdf',
      },
      {
        id: '70-11',
        code: 'Fracción XI',
        name: 'Contrataciones por Honorarios',
        description: 'Las contrataciones de servicios profesionales por honorarios, señalando los nombres de los prestadores de servicios, los servicios contratados, el monto de los honorarios y el periodo de contratación;',
        fileName: 'contratos_honorarios_servicios_2026.pdf',
      },
      {
        id: '70-12',
        code: 'Fracción XII',
        name: 'Declaraciones Patrimoniales',
        description: 'La información en Versión Pública de las declaraciones patrimoniales de los Servidores Públicos que así lo determinen, en los sistemas habilitados para ello, de acuerdo a la normatividad aplicable;',
        fileName: 'declaraciones_patrimoniales_publicas_2026.pdf',
      },
      {
        id: '70-13',
        code: 'Fracción XIII',
        name: 'Unidad de Transparencia',
        description: 'El domicilio de la Unidad de Transparencia, además de la dirección electrónica donde podrán recibirse las solicitudes para obtener la información;',
        fileName: 'unidad_transparencia_contacto_2026.pdf',
      },
      {
        id: '70-14',
        code: 'Fracción XIV',
        name: 'Convocatorias a Concursos Públicos',
        description: 'Las convocatorias a concursos para ocupar cargos públicos y los resultados de los mismos;',
        fileName: 'convocatorias_cargos_resultados_2026.pdf',
      },
      {
        id: '70-15',
        code: 'Fracción XV',
        name: 'Programas de Subsidios y Apoyos',
        description: 'La información de los programas de subsidios, estímulos y apoyos, en el que se deberá informar respecto de los programas de transferencia, de servicios, de infraestructura social y de subsidio;',
        fileName: 'programas_subsidios_apoyos_2026.pdf',
      },
      {
        id: '70-16',
        code: 'Fracción XVI',
        name: 'Relaciones Laborales y Sindicatos',
        description: 'Las condiciones generales de trabajo, contratos o convenios que regulen las relaciones laborales del personal de base o de confianza, así como los recursos públicos económicos, en especie o donativos, que sean entregados a los sindicatos y ejerzan como recursos públicos;',
        fileName: 'condiciones_laborales_contratos_2026.pdf',
      },
      {
        id: '70-17',
        code: 'Fracción XVII',
        name: 'Información Curricular e Historial',
        description: 'La información curricular, desde el nivel de jefe de departamento o equivalente, hasta el titular del sujeto obligado, así como, en su caso, las sanciones administrativas de que haya sido objeto;',
        fileName: 'curriculums_servidores_publicos_2026.pdf',
      },
      {
        id: '70-18',
        code: 'Fracción XVIII',
        name: 'Listado de Sanciones Administrativas',
        description: 'El listado de Servidores Públicos con sanciones administrativas definitivas, especificando la causa de sanción y la disposición;',
        fileName: 'reporte_sanciones_definitivas_2026.pdf',
      },
      {
        id: '70-19',
        code: 'Fracción XIX',
        name: 'Servicios Públicos y Requisitos',
        description: 'Los servicios que ofrecen señalando los requisitos para acceder a ellos;',
        fileName: 'registro_servicios_requisitos_2026.pdf',
      },
      {
        id: '70-20',
        code: 'Fracción XX',
        name: 'Trámites, Requisitos y Formatos',
        description: 'Los trámites, requisitos y formatos que ofrecen;',
        fileName: 'registro_tramites_formatos_2026.pdf',
      },
      {
        id: '70-21',
        code: 'Fracción XXI',
        name: 'Información Financiera Presupuestal',
        description: 'La información financiera sobre el presupuesto asignado, así como los informes del ejercicio trimestral del gasto, en términos de la Ley General de Contabilidad Gubernamental y demás normatividad aplicable;',
        fileName: 'informacion_financiera_ejercicio_2026.pdf',
      },
      {
        id: '70-22',
        code: 'Fracción XXII',
        name: 'Deuda Pública Municipal',
        description: 'La información relativa a la deuda pública, en términos de la normatividad aplicable;',
        fileName: 'declaracion_deuda_publica_2026.pdf',
      },
      {
        id: '70-23',
        code: 'Fracción XXIII',
        name: 'Comunicación Social y Publicidad',
        description: 'Los montos destinados a gastos relativos a comunicación social y publicidad oficial desglosada por tipo de medio, proveedores, número de contrato y concepto o campaña;',
        fileName: 'gastos_comunicacion_publicidad_2026.pdf',
      },
      {
        id: '70-24',
        code: 'Fracción XXIV',
        name: 'Resultados de Auditorías Realizadas',
        description: 'Los informes de resultados de las auditorías al ejercicio presupuestal de cada sujeto obligado que se realicen y, en su caso, las aclaraciones que correspondan;',
        fileName: 'auditorias_fiscalizadoras_respuestas_2026.pdf',
      },
      {
        id: '70-25',
        code: 'Fracción XXV',
        name: 'Dictaminación de Estados Financieros',
        description: 'El resultado de la dictaminación de los estados financieros;',
        fileName: 'dictamenes_estados_financieros_2026.pdf',
      },
      {
        id: '70-26',
        code: 'Fracción XXVI',
        name: 'Asignación de Recursos a Terceros',
        description: 'Los montos, criterios, convocatorias y listado de personas físicas o morales a quienes, por cualquier motivo, se les asigne o permita usar recursos públicos o realicen actos de autoridad;',
        fileName: 'recursos_asignados_terceros_2026.pdf',
      },
      {
        id: '70-27',
        code: 'Fracción XXVII',
        name: 'Concesiones, Permisos y Licencias',
        description: 'Las concesiones, contratos, convenios, permisos, licencias o autorizaciones otorgados, especificando los titulares de aquéllos, debiendo publicarse su objeto, nombre o razón social del titular, vigencia, tipo, términos, condiciones, monto y modificaciones;',
        fileName: 'concesiones_permisos_otorgados_2026.pdf',
      },
      {
        id: '70-28',
        code: 'Fracción XXVIII',
        name: 'Resultados de Licitaciones y Obras',
        description: 'La información sobre los resultados sobre procedimientos de adjudicación directa, invitación restringida y licitación de cualquier naturaleza, incluyendo la Versión Pública del Expediente respectivo y de los contratos celebrados;',
        fileName: 'licitaciones_adjudicaciones_obras_2026.pdf',
      },
      {
        id: '70-29',
        code: 'Fracción XXIX',
        name: 'Informes Obligatorios por Ley',
        description: 'Los informes que por disposición legal generen los sujetos obligados;',
        fileName: 'informes_obligatorios_municipales_2026.pdf',
      },
      {
        id: '70-30',
        code: 'Fracción XXX',
        name: 'Estadísticas del Sujeto Obligado',
        description: 'Las estadísticas que generen en cumplimiento de sus facultades, competencias o funciones con la mayor desagregación posible;',
        fileName: 'estadisticas_municipales_generadas_2026.pdf',
      },
      {
        id: '70-31',
        code: 'Fracción XXXI',
        name: 'Avances Presupuestales y Financieros',
        description: 'Informe de avances programáticos o presupuestales, balances generales y su estado financiero;',
        fileName: 'balances_avances_financieros_2026.pdf',
      },
      {
        id: '70-32',
        code: 'Fracción XXXII',
        name: 'Padrón de Proveedores y Contratistas',
        description: 'Padrón de proveedores y contratistas;',
        fileName: 'padron_proveedores_contratistas_2026.pdf',
      },
      {
        id: '70-32-spec',
        code: 'PADRON',
        name: 'Registro Único de Contratistas',
        description: 'Padrón de contratistas y constructores registrados en el municipio.',
        fileName: 'padron_contratistas_habilitados_2026.pdf',
      },
      {
        id: '70-33',
        code: 'Fracción XXXIII',
        name: 'Convenios de Coordinación y Concertación',
        description: 'Los convenios de coordinación de concertación con los sectores social y privado;',
        fileName: 'convenios_sectores_privados_sociales_2026.pdf',
      },
      {
        id: '70-34',
        code: 'Fracción XXXIV',
        name: 'Inventario de Bienes e Inmuebles',
        description: 'El inventario de bienes muebles e inmuebles en posesión y propiedad;',
        fileName: 'inventario_bienes_muebles_inmuebles_2026.pdf',
      },
      {
        id: '70-35',
        code: 'Fracción XXXV',
        name: 'Recomendaciones de Derechos Humanos',
        description: 'Las recomendaciones emitidas por los órganos públicos del Estado mexicano u organismos internacionales garantes de los derechos humanos, así como las acciones que han llevado a cabo para su atención;',
        fileName: 'recomendaciones_derechos_humanos_2026.pdf',
      },
      {
        id: '70-36',
        code: 'Fracción XXXVI',
        name: 'Resoluciones y Laudos en Juicios',
        description: 'Las resoluciones y laudos que se emitan en procesos o procedimientos seguidos en forma de juicio;',
        fileName: 'resoluciones_laudos_procesos_juicio_2026.pdf',
      },
      {
        id: '70-37',
        code: 'Fracción XXXVII',
        name: 'Mecanismos de Participación Ciudadana',
        description: 'Los mecanismos de participación ciudadana;',
        fileName: 'mecanismos_participacion_ciudadana_2026.pdf',
      },
      {
        id: '70-38',
        code: 'Fracción XXXVIII',
        name: 'Programas, Población y Requisitos',
        description: 'Los programas que ofrecen, incluyendo información sobre la población, objetivo y destino, así como los trámites, tiempos de respuesta, requisitos y formatos para acceder a los mismos;',
        fileName: 'programas_poblacion_tramites_2026.pdf',
      },
      {
        id: '70-39',
        code: 'Fracción XXXIX',
        name: 'Actas del Comité de Transparencia',
        description: 'Las actas y resoluciones del Comité de Transparencia de los sujetos obligados;',
        fileName: 'actas_comite_transparencia_2026.pdf',
      },
      {
        id: '70-40',
        code: 'Fracción XL',
        name: 'Evaluaciones y Encuestas a Programas',
        description: 'Todas las evaluaciones y encuestas que hagan los sujetos obligados a programas financiados con recursos públicos;',
        fileName: 'evaluaciones_encuestas_programas_2026.pdf',
      },
      {
        id: '70-41',
        code: 'Fracción XLI',
        name: 'Estudios Financiados con Recursos',
        description: 'Los estudios financiados con recursos públicos;',
        fileName: 'estudios_financiados_recursos_publicos_2026.pdf',
      },
      {
        id: '70-42',
        code: 'Fracción XLII',
        name: 'Listado de Jubilados y Pensionados',
        description: 'El listado de jubilados y pensionados y el monto que reciben;',
        fileName: 'listado_jubilados_pensionados_montos_2026.pdf',
      },
      {
        id: '70-43',
        code: 'Fracción XLIII',
        name: 'Ingresos Recibidos y Destino',
        description: 'Los ingresos recibidos por cualquier concepto señalando el nombre de los responsables de recibirlos, administrarlos y ejercerlos, así como su destino, indicando el destino de cada uno de ellos;',
        fileName: 'ingresos_recibidos_destino_ejercicio_2026.pdf',
      },
      {
        id: '70-44',
        code: 'Fracción XLIV',
        name: 'Donaciones Realizadas a Terceros',
        description: 'Donaciones hechas a terceros en dinero o en especie;',
        fileName: 'donaciones_terceros_dinero_especie_2026.pdf',
      },
      {
        id: '70-45',
        code: 'Fracción XLV',
        name: 'Catálogo y Guía de Archivo Documental',
        description: 'El catálogo de disposición y guía de archivo documental;',
        fileName: 'catalogo_guia_archivo_documental_2026.pdf',
      },
      {
        id: '70-46',
        code: 'Fracción XLVI',
        name: 'Actas de Cabildo y Consejos Consultivos',
        description: 'Las actas de sesiones ordinarias y extraordinarias, así como las opiniones y recomendaciones que emitan, en su caso, los consejos consultivos;',
        fileName: 'actas_sesiones_consejos_consultivos_2026.pdf',
      },
      {
        id: '70-47',
        code: 'Fracción XLVII',
        name: 'Solicitudes a Telecomunicaciones',
        description: 'Para efectos estadísticos, el listado de solicitudes a las empresas concesionarias de telecomunicaciones y proveedores de servicios para la intervención de comunicaciones o geolocalización;',
        fileName: 'solicitudes_telecomunicaciones_estadistica_2026.pdf',
      },
      {
        id: '70-48',
        code: 'Fracción XLVIII',
        name: 'Información Relevante y de Utilidad',
        description: 'Cualquier otra información que sea de utilidad o se considere relevante, además de la que, con base en la información estadística, responda a las preguntas hechas con más frecuencia por el público.',
        fileName: 'informacion_relevante_preguntas_frecuentes_2026.pdf',
      },
    ],
    art71: [
      {
        id: '71-1',
        code: 'Fracción I',
        name: 'Estudios de Impacto y Opiniones',
        description: 'Dictámenes, estudios financiados y opiniones técnicas emitidas sobre el territorio de la Mixteca Alta.',
        fileName: 'estudios_tecnicos_impacto_2026.pdf',
      },
      {
        id: '71-2',
        code: 'Fracción II',
        name: 'Concesiones, Licencias y Permisos',
        description: 'Reporte del control de permisos comerciales, licencias de funcionamiento y de construcción municipal.',
        fileName: 'registro_licencias_permisos_teita_2026.pdf',
      },
      {
        id: '71-3',
        code: 'Fracción III',
        name: 'Resultados de Auditorías Realizadas',
        description: 'Informes detallados y auditorías practicadas por la Auditoría Superior de Fiscalización del Estado (ASFE).',
        fileName: 'auditorias_asfe_fiscalizacion_2026.pdf',
      },
    ],
    art30: [
      {
        id: '30-1',
        code: 'Fracción I',
        name: 'Plan Municipal de Desarrollo',
        description: 'Documento rector que establece los ejes estratégicos, programas y metas de la administración 2026-2028.',
        fileName: 'plan_municipal_desarrollo_teita_2026_2028.pdf',
      },
      {
        id: '30-2',
        code: 'Fracción II',
        name: 'Actas de Sesiones del Cabildo',
        description: 'Colección de actas de sesiones ordinarias y extraordinarias solemnes del Cabildo Usos y Costumbres.',
        fileName: 'actas_cabildo_primer_trimestre_2026.pdf',
      },
      {
        id: '30-3',
        code: 'Fracción III',
        name: 'Convenios de Coordinación',
        description: 'Convenios de colaboración suscritos con el Gobierno del Estado de Oaxaca y dependencias federales.',
        fileName: 'convenios_colaboracion_institucional_2026.pdf',
      },
    ],
    financiera: [
      {
        id: 'fin-1',
        code: 'CONAC',
        name: 'Armonización Contable - T1 2026',
        description: 'Información financiera estructurada bajo las normas del Consejo Nacional de Armonización Contable.',
        fileName: 'financiero_armonizacion_conac_t1_2026.pdf',
      },
      {
        id: 'fin-2',
        code: 'LDF',
        name: 'Balance General de Actividades',
        description: 'Estado de situación financiera de la Hacienda Pública Municipal detallando activos, pasivos y patrimonio.',
        fileName: 'estado_situacion_financiera_teita_2026.pdf',
      },
      {
        id: 'fin-3',
        code: 'LDF',
        name: 'Certificación de Deuda Pública Cero',
        description: 'Declaratoria oficial certificando que el municipio de San Juan Teita no cuenta con pasivos financieros o deudas.',
        fileName: 'reporte_deuda_publica_cero_2026.pdf',
      },
    ],
    ingresos: [
      {
        id: 'ing-1',
        code: 'LIF',
        name: 'Ley de Ingresos Municipal Aprobada',
        description: 'Decreto de la Ley de Ingresos del Municipio de San Juan Teita publicado en el Periódico Oficial del Estado.',
        fileName: 'ley_ingresos_aprobada_teita_2026.pdf',
      },
      {
        id: 'ing-2',
        code: 'LIF',
        name: 'Iniciativa de Ley de Ingresos',
        description: 'Proyecto de ley turnado a la comisión de hacienda de la legislatura estatal para su correspondiente análisis.',
        fileName: 'proyecto_iniciativa_ley_ingresos_2026.pdf',
      },
    ],
    egresos: [
      {
        id: 'egr-1',
        code: 'PEF',
        name: 'Presupuesto de Egresos Aprobado',
        description: 'El presupuesto detallado de egresos autorizado por la asamblea comunitaria y el cabildo para el ejercicio 2026.',
        fileName: 'presupuesto_egresos_aprobado_teita_2026.pdf',
      },
      {
        id: 'egr-2',
        code: 'PEF',
        name: 'Clasificador por Objeto del Gasto',
        description: 'Anexo normativo que detalla las partidas de gasto presupuestario asignadas a las dependencias locales.',
        fileName: 'partidas_objeto_gasto_ejercicio2026.pdf',
      },
      {
        id: 'egr-3',
        code: 'PEF',
        name: 'Tabulador de Sueldos del Ayuntamiento',
        description: 'Listado autorizado de salarios, dietas e indemnizaciones de los integrantes del cabildo y personal.',
        fileName: 'tabulador_sueldos_municipal_aprobado_2026.pdf',
      },
    ],
    gaceta: [
      {
        id: 'gac-1',
        code: 'Nº 1',
        name: 'Gaceta Municipal - Edición Enero 2026',
        description: 'Publicación oficial con bandos cívicos, reglamentos interiores y circulares emitidas durante enero.',
        fileName: 'gaceta_municipal_no1_enero2026.pdf',
      },
      {
        id: 'gac-2',
        code: 'Nº 2',
        name: 'Gaceta Municipal - Edición Febrero 2026',
        description: 'Publicación oficial que reúne las actas de cabildo aprobadas y reformas al reglamento comercial.',
        fileName: 'gaceta_municipal_no2_febrero2026.pdf',
      },
      {
        id: 'gac-3',
        code: 'Nº 3',
        name: 'Gaceta Municipal - Edición Marzo 2026',
        description: 'Compendio de las circulares informativas y reportes mensuales de tesorería del mes de marzo.',
        fileName: 'gaceta_municipal_no3_marzo2026.pdf',
      },
      {
        id: 'gac-bando',
        code: 'BANDO',
        name: 'Bando de Policía y Buen Gobierno',
        description: 'Código de convivencia cívica, derechos, obligations y sanciones del Municipio de San Juan Teita.',
        fileName: 'bando_policia_buen_gobierno_teita_2026.pdf',
      },
    ],
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const currentDocs = documentsData[activeTab] || [];

  const filteredDocs = currentDocs.filter((d) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      query === '' ||
      d.name.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      (d.code && d.code.toLowerCase().includes(query))
    );
  });

  return (
    <section id="transparencia" className="site-section section-padding">
      <div className="section-header">
        <h2 className="section-title">Transparencia</h2>
        <span className="section-subtitle">Portal de Rendición de Cuentas</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px', marginTop: '30px' }} className="transparency-layout">
        {/* Sidebar Nav */}
        <div className="glass-card" style={{ padding: '20px', alignSelf: 'start' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-text-bright)', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            Secciones
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSearchQuery('');
                }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)',
                  backgroundColor: activeTab === item.id ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === item.id ? 'var(--color-bg-card)' : 'var(--color-text-bright)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: 'var(--color-text-bright)' }}>
                {menuItems.find((m) => m.id === activeTab)?.label}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Obligaciones legales e información oficial pública del ayuntamiento.
              </p>
            </div>

            {/* Inline search */}
            <div style={{ position: 'relative', width: '260px' }}>
              <input
                type="text"
                placeholder="Filtrar en esta sección..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'rgba(55, 71, 79, 0.05)',
                  color: 'var(--color-text-bright)',
                  fontSize: '13px',
                }}
              />
              <svg viewBox="0 0 24 24" style={{ position: 'absolute', left: '12px', top: '12px', width: '14px', height: '14px', fill: 'var(--color-text-muted)' }}>
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="premium-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Código / Ley</th>
                  <th style={{ width: '30%' }}>Concepto Oficial</th>
                  <th style={{ width: '40%' }}>Descripción del Documento</th>
                  <th style={{ width: '15%', textAlign: 'center' }}>Documentos</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => {
                  return (
                    <tr key={doc.id}>
                      <td>
                        <span className="fraction-badge" style={{ backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-primary-light)', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
                          {doc.code || 'DOC'}
                        </span>
                      </td>
                      <td>
                        <b style={{ color: 'var(--color-text-bright)' }}>{doc.name}</b>
                      </td>
                      <td style={{ fontSize: '13.5px', color: 'var(--color-text-muted)' }}>
                        {doc.description}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {doc.id === '70-2' || doc.id === '70-3' ? (
                          <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>—</span>
                        ) : (
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              onClick={() => handleDocClick(doc.id)}
                              aria-label="Ver documento PDF"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: clickedDoc === doc.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                                backgroundColor: clickedDoc === doc.id ? 'rgba(255, 112, 67, 0.15)' : 'var(--color-primary-glow)',
                                color: clickedDoc === doc.id ? 'var(--color-accent)' : 'var(--color-primary)',
                                transition: 'all 0.2s ease',
                                transform: clickedDoc === doc.id ? 'scale(1.1)' : 'scale(1)',
                              }}
                            >
                              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                              </svg>
                            </button>
                            {clickedDoc === doc.id && (
                              <div style={{
                                position: 'absolute',
                                bottom: '42px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: '#37474F',
                                color: '#FAFAFA',
                                fontSize: '11px',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                zIndex: 10,
                                pointerEvents: 'none',
                                animation: 'fadeInUp 0.2s ease',
                              }}>
                                📄 Documento en trámite
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  width: 0,
                                  height: 0,
                                  borderLeft: '5px solid transparent',
                                  borderRight: '5px solid transparent',
                                  borderTop: '5px solid #37474F',
                                }} />
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
                      No se encontraron documentos en esta sección para la búsqueda ingresada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

