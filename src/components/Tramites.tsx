import React from 'react';

interface Tramite {
  titulo: string;
  descripcion: string;
  requisitos: string[];
  costo: string;
  tiempo: string;
  entidad: string;
}

export const Tramites: React.FC = () => {
  const listadoTramites: Tramite[] = [
    {
      titulo: 'Constancia de Residencia / Origen',
      descripcion: 'Documento oficial que certifica que el ciudadano habita en el municipio o es originario del mismo, útil para gestiones escolares, bancarias o apoyos federales.',
      requisitos: [
        'Copia de Acta de Nacimiento.',
        'Copia de Identificación Oficial (INE) vigente con domicilio en el municipio.',
        'Comprobante de domicilio reciente (luz o agua).',
        'Constancia de estar al corriente con sus aportaciones comunitarias y tequios públicos (expedida por el Alcalde de su barrio).'
      ],
      costo: '$50.00 MXN',
      tiempo: 'Mismo día (15 a 30 minutos)',
      entidad: 'Secretaría Municipal'
    },
    {
      titulo: 'Constancia de Productor Agrícola',
      descripcion: 'Acreditación oficial para los campesinos de la región, indispensable para registrarse en programas de fomento al campo y apoyos de artesanía en palma.',
      requisitos: [
        'Copia de INE vigente.',
        'Copia de la Clave Única de Registro de Población (CURP).',
        'Croquis simple de localización de la parcela o terreno de siembra.',
        'Testimonio de dos vecinos caracterizados que validen su labor agrícola en el municipio.'
      ],
      costo: 'Gratuito',
      tiempo: '1 a 2 días hábiles',
      entidad: 'Regiduría de Obras Públicas y Desarrollo Agropecuario'
    },
    {
      titulo: 'Permiso para Eventos y Reuniones Familiares',
      descripcion: 'Autorización oficial para realizar festividades particulares (bodas, bautizos, celebraciones religiosas) en espacios públicos o domicilios privados que afecten el tránsito.',
      requisitos: [
        'Solicitud por escrito dirigida al Presidente Municipal detallando fecha, horario y motivo del evento.',
        'Visto bueno por escrito de los jefes del barrio correspondiente.',
        'Firma de carta compromiso para mantener el orden público y respetar los límites de ruido y horarios acordados.'
      ],
      costo: '$200.00 MXN',
      tiempo: '3 días hábiles',
      entidad: 'Presidencia Municipal'
    }
  ];

  return (
    <section className="site-section section-padding animate-fade-in">
      <div className="section-header">
        <h2 className="section-title">Trámites y Servicios</h2>
        <span className="section-subtitle">Guía de servicios municipales y requisitos oficiales para la ciudadanía</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
          Para facilitar tus gestiones en el Palacio Municipal, te presentamos los requisitos de los trámites más comunes. 
          Todas las solicitudes se reciben en las ventanillas de atención ciudadana del Ayuntamiento en horario de oficina.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {listadoTramites.map((t, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              style={{ 
                padding: '32px', 
                border: '1px solid var(--color-border)',
                transition: 'var(--transition-smooth)',
                borderRadius: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: 'var(--color-text-bright)' }}>
                    {t.titulo}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                    Área Responsable: <b>{t.entidad}</b>
                  </span>
                </div>
                <div style={{ 
                  backgroundColor: 'var(--color-primary-glow)', 
                  border: '1px solid rgba(0, 188, 212, 0.2)',
                  borderRadius: '50px',
                  padding: '6px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--color-primary-light)'
                }}>
                  Costo: {t.costo}
                </div>
              </div>

              <p style={{ fontSize: '14.5px', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>
                {t.descripcion}
              </p>

              <div style={{ backgroundColor: '#FDFBF9', border: '1px dashed rgba(134, 98, 67, 0.2)', borderRadius: '10px', padding: '20px 24px', marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--color-text-bright)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Requisitos necesarios:
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', margin: 0 }}>
                  {t.requisitos.map((req, rIdx) => (
                    <li key={rIdx} style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-muted)', flexWrap: 'wrap', gap: '10px' }}>
                <span>Tiempo de entrega estimado: <b>{t.tiempo}</b></span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>San Juan Teita, Oaxaca</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
