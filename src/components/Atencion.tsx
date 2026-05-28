import React from 'react';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  detail: string;
  action?: string;
  actionText?: string;
}

interface AtencionProps {
  setTab: (tab: string) => void;
}

export const Atencion: React.FC<AtencionProps> = ({ setTab }) => {
  const contactChannels: ContactInfo[] = [
    {
      icon: '📞',
      label: 'Teléfono Oficial',
      value: '(951) 123 4567',
      detail: 'Atención directa en la Secretaría Municipal para dudas y trámites.',
      action: 'tel:+529511234567',
      actionText: 'Llamar ahora'
    },
    {
      icon: '📧',
      label: 'Correo Electrónico',
      value: 'contacto@sanjuanteita.gob.mx',
      detail: 'Canal oficial para correspondencia y peticiones digitales formales.',
      action: 'mailto:contacto@sanjuanteita.gob.mx',
      actionText: 'Enviar correo'
    },
    {
      icon: '📍',
      label: 'Dirección Física',
      value: 'Palacio Municipal S/N, Centro',
      detail: 'San Juan Teita, Distrito de Tlaxiaco, Oaxaca. C.P. 71000.',
    }
  ];

  return (
    <section className="site-section section-padding animate-fade-in">
      <div className="section-header">
        <h2 className="section-title">Atención a la Ciudadanía</h2>
        <span className="section-subtitle">Canales oficiales de comunicación, horarios del Palacio y buzón municipal</span>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          
          {/* Left Column: Contact Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: 'var(--color-text-bright)', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px', marginBottom: '8px' }}>
              Canales de Contacto
            </h3>

            {contactChannels.map((c, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ 
                  padding: '24px', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ 
                  fontSize: '24px', 
                  backgroundColor: 'var(--color-primary-glow)', 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {c.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {c.label}
                  </span>
                  <strong style={{ fontSize: '16px', color: 'var(--color-text-bright)', fontFamily: 'var(--font-heading)' }}>
                    {c.value}
                  </strong>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: '1.5' }}>
                    {c.detail}
                  </p>
                  {c.action && (
                    <a 
                      href={c.action} 
                      style={{ 
                        alignSelf: 'flex-start',
                        marginTop: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--color-primary-light)',
                        borderBottom: '1px dashed var(--color-primary)',
                        paddingBottom: '2px'
                      }}
                    >
                      {c.actionText} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Office Hours & Interactive CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: 'var(--color-text-bright)', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px', marginBottom: '8px' }}>
              Horarios y Atención Presencial
            </h3>

            <div 
              className="glass-card" 
              style={{ 
                padding: '30px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                lineHeight: '1.7'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: 'var(--color-text-bright)', marginBottom: '14px' }}>
                ⏰ Horario General del Palacio Municipal
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '6px' }}>
                  <span>Lunes a Viernes</span>
                  <strong style={{ color: 'var(--color-text-bright)' }}>9:00 AM - 4:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '6px' }}>
                  <span>Sábados</span>
                  <strong style={{ color: 'var(--color-text-bright)' }}>9:00 AM - 1:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px' }}>
                  <span>Domingos</span>
                  <strong style={{ color: 'var(--color-orange)' }}>Cerrado</strong>
                </div>
              </div>
              <div style={{ marginTop: '20px', padding: '14px', borderRadius: '8px', backgroundColor: 'rgba(255, 112, 67, 0.05)', border: '1px solid rgba(255, 112, 67, 0.15)', fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                ⚠️ <b>Nota Comunitaria</b>: Los regidores y el cabildo atienden directamente previa cita en la Secretaría. Los días festivos locales (como el 24 de Junio) el Palacio Municipal permanecerá cerrado.
              </div>
            </div>

            {/* Direct CTA to Contact / Inbox */}
            <div 
              className="glass-card" 
              style={{ 
                padding: '30px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, var(--color-primary-glow) 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--color-text-bright)' }}>
                📬 ¿Tienes alguna queja, sugerencia o duda?
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Tu voz es importante para mejorar la comunidad. Envía un mensaje formal directamente a nuestro buzón en línea. El Cabildo dará seguimiento oportuno en sus sesiones.
              </p>
              <button 
                onClick={() => setTab('contacto')}
                className="btn-premium btn-primary"
                style={{ 
                  border: 'none', 
                  alignSelf: 'flex-start',
                  fontSize: '13px',
                  padding: '10px 20px',
                  marginTop: '4px'
                }}
              >
                Ir al Buzón Ciudadano ✉️
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
