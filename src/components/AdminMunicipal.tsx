import React from 'react';

interface Official {
  cargo: string;
  nombre: string;
  periodo: string;
  responsabilidad: string;
}

export const AdminMunicipal: React.FC = () => {
  const officials: Official[] = [
    {
      cargo: 'Presidente Municipal',
      nombre: 'C. Lorenzo Aguilar Cruz',
      periodo: '2026 - 2028',
      responsabilidad: 'Representación legal del municipio, ejecución de acuerdos de la asamblea comunitaria, coordinación de obras públicas y seguridad municipal.',
    },
    {
      cargo: 'Síndica Municipal',
      nombre: 'C. Martha Santiago Mendoza',
      periodo: '2026 - 2028',
      responsabilidad: 'Procuración de la justicia local, vigilancia de los bienes del ayuntamiento y resolución de controversias vecinales.',
    },
    {
      cargo: 'Regidor de Hacienda',
      nombre: 'C. Felipe Gómez Ortiz',
      periodo: '2026 - 2028',
      responsabilidad: 'Administración transparente de los recursos presupuestarios, recaudación local y rendición de cuentas públicas bimestrales.',
    },
    {
      cargo: 'Regidora de Educación y Salud',
      nombre: 'C. Juana Ruiz López',
      periodo: '2026 - 2028',
      responsabilidad: 'Supervisión de escuelas públicas, gestión de campañas de salud preventiva y enlace con la clínica municipal.',
    },
    {
      cargo: 'Regidor de Obras Públicas',
      nombre: 'C. Esteban López García',
      periodo: '2026 - 2028',
      responsabilidad: 'Supervisión física de las obras de infraestructura social básica (agua potable, pavimentaciones, caminos) y organización del tequio.',
    },
  ];

  return (
    <section className="site-section section-padding animate-fade-in">
      <div className="section-header">
        <h2 className="section-title">Administración Municipal</h2>
        <span className="section-subtitle">Cabildo Municipal electo por el Régimen de Usos y Costumbres</span>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Intro text */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '40px', lineHeight: '1.7', borderLeft: '5px solid var(--color-accent)' }}>
          <p style={{ fontSize: '16px', color: 'var(--color-text-bright)', fontWeight: 500, marginBottom: '12px' }}>
            Gobierno Comunitario e Integridad Mixteca
          </p>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
            El Honorable Ayuntamiento de San Juan Teita se rige bajo el sistema de <b>Sistemas Normativos Indígenas (Usos y Costumbres)</b>. 
            Las autoridades son electas democráticamente en la Asamblea General Comunitaria, el máximo órgano de decisión del municipio. 
            Cada cargo representa un servicio y compromiso de honor (cargo honorífico) ante la comunidad, rigiéndose por los principios de transparencia, servicio solidario y respeto a las decisiones asamblearias.
          </p>
        </div>

        {/* Officials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {officials.map((official, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              style={{ 
                padding: '28px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px', 
                border: '1px solid var(--color-border)',
                transition: 'var(--transition-smooth)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top Accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: idx === 0 ? 'var(--color-orange)' : 'var(--color-accent)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--color-primary-glow)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--color-primary-light)',
                  border: '1px solid rgba(0, 188, 212, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'currentColor' }}>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: idx === 0 ? 'var(--color-orange)' : 'var(--color-accent)', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'block'
                  }}>
                    {official.cargo}
                  </span>
                  <h3 style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '18px', 
                    color: 'var(--color-text-bright)',
                    fontWeight: 700,
                    marginTop: '2px'
                  }}>
                    {official.nombre}
                  </h3>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', marginTop: '4px' }}>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  {official.responsabilidad}
                </p>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                <span>Gestión Municipal</span>
                <strong style={{ color: 'var(--color-text-bright)' }}>{official.periodo}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
