import React, { useEffect, useState } from 'react';

interface InicioProps {
  setTab: (tab: string) => void;
}

interface Slide {
  id: number;
  title: string;
  desc: string;
  url: string;
  iconPath: React.ReactNode;
}

export const Inicio: React.FC<InicioProps> = ({ setTab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'Servicio de Administración Tributaria',
      desc: 'Recauda con piso parejo, vocación humana y conciencia social para la transformación.',
      url: 'https://www.sat.gob.mx',
      iconPath: (
        <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'currentColor' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Secretaría de Finanzas de Oaxaca',
      desc: 'Año del Bicentenario de Margarita Maza Parada. Lealtad y servicio a la nación.',
      url: 'https://www.oaxaca.gob.mx/sefin',
      iconPath: (
        <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'currentColor' }}>
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Consejo Nacional de Armonización Contable',
      desc: 'Emitir las normas contables y lineamientos financieros para los entes gubernamentales.',
      url: 'https://www.conac.gob.mx',
      iconPath: (
        <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'currentColor' }}>
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Auditoría Superior de Fiscalización de Oaxaca',
      desc: 'Garantizar la fiscalización superior de los recursos públicos municipales y estatales.',
      url: 'https://www.asfeoaxaca.gob.mx',
      iconPath: (
        <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'currentColor' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
        </svg>
      )
    }
  ];

  // Rotate slides automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="inicio" className="site-section">
      {/* Hero Widget */}
      <div className="hero-widget">
        <div className="hero-bg-wrapper"></div>
        <div className="hero-bg-mountains"></div>
        <div className="hero-content">
          <span className="hero-badge">Administración 2026-2028</span>
          <h1 className="hero-title">Bienvenidos a<br/><span>San Juan Teita</span></h1>
          <p className="hero-description">
            Un rincón de traditions ancestrales enclavado en la Sierra Madre de la Mixteca Alta, Oaxaca. Comprometidos con el desarrollo sostenible y el bienestar de nuestra gente.
          </p>
          <div className="hero-buttons">
            <button onClick={() => setTab('contacto')} className="btn-premium btn-primary">
              Atención Ciudadana
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor' }}>
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21 12l-8.15-8.15-1.42 1.42 5.43 5.43H5v2z"/>
              </svg>
            </button>
            <button onClick={() => setTab('obras')} className="btn-premium btn-secondary">
              Ver Obra Pública
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Message from President */}
      <div className="glass-card section-padding" style={{ marginBottom: '60px' }}>
        <div className="president-card">
          <div className="president-image-wrapper">
            <div style={{ backgroundColor: 'rgba(0, 188, 212, 0.1)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" style={{ width: '80px', height: '80px', fill: 'var(--color-primary)' }}>
                <path d="M12 2L1 8v2h22V8L12 2zm10 10H2v8h2v-6h2v6h3v-6h2v6h2v-6h2v6h3v-6h2v6h2v-8zm-10 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <div className="president-label">
              <div className="president-name">Cabildo Municipal</div>
              <div className="president-role">Usos y Costumbres</div>
            </div>
          </div>
          <div className="president-content">
            <span className="section-subtitle">Mensaje a la Comunidad</span>
            <h3>Compromiso y Honestidad</h3>
            <p>
              Es un honor y una gran responsabilidad guiar los pasos de nuestro querido municipio bajo el sistema tradicional de <b>Usos y Costumbres</b>. Nuestra misión es trabajar incansablemente de la mano de cada ciudadana y ciudadano, preservando nuestras raíces raíces mixtecas y garantizando un manejo pulcro, eficiente y transparente de los recursos del pueblo.
            </p>
            <div className="quote-highlight">
              "La unión, la transparencia y el tequio comunitario son los pilares fundamentales sobre los que edificamos el progreso de San Juan Teita."
            </div>
            <p>
              Los invitamos a hacer de este portal oficial una herramienta interactiva de comunicación abierta, donde podrán dar seguimiento puntual a la inversión de la obra pública y al cumplimiento de nuestras obligaciones en materia de transparencia fiscal y administrativa.
            </p>
          </div>
        </div>
      </div>

      {/* NEW SECTION 1: QUICK LINK SERVICES */}
      <div style={{ marginBottom: '60px' }}>
        <div className="section-header">
          <h2 className="section-title">Trámites Rápidos</h2>
          <span className="section-subtitle">Acceso directo a la información ciudadana</span>
        </div>
        <div className="grid-3">
          
          {/* Card 1: Buzón */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '12px', backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-primary-light)', marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'currentColor' }}>
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--color-text-bright)', marginBottom: '8px' }}>Buzón de Atención</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Envía reportes, quejas y sugerencias directamente al cabildo municipal.</p>
            <button onClick={() => setTab('contacto')} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', cursor: 'pointer' }}>Escribir Mensaje →</button>
          </div>

          {/* Card 2: Transparencia */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '12px', backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-primary-light)', marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'currentColor' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--color-text-bright)', marginBottom: '8px' }}>Obligaciones Comunes</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Consulta de forma reactiva las fracciones del marco normativo y presupuestario.</p>
            <button onClick={() => setTab('transparencia')} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', cursor: 'pointer' }}>Revisar Leyes →</button>
          </div>

          {/* Card 3: Obras */}
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '12px', backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-primary-light)', marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px', fill: 'currentColor' }}>
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--color-text-bright)', marginBottom: '8px' }}>Expedientes de Obras</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Descarga los contratos de obra y actas de entrega del ejercicio 2026.</p>
            <button onClick={() => setTab('obras')} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', cursor: 'pointer' }}>Descargar PDFs →</button>
          </div>

        </div>
      </div>

      {/* NEW SECTION 2: RECENT NEWS & NOTICES */}
      <div style={{ marginBottom: '60px' }}>
        <div className="section-header">
          <h2 className="section-title">Anuncios y Noticias</h2>
          <span className="section-subtitle">Últimas novedades de la comunidad</span>
        </div>
        <div className="grid-2">
          
          {/* News Item 1 */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '1px' }}>Convocatoria Oficial</span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-text-bright)', fontWeight: 700 }}>Convocatoria para el Tequio Comunitario</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', textAlign: 'justify' }}>
              Se convoca a todos los jefes de familia del municipio a participar activamente en las labores colectivas de mantenimiento y deshierbe del camino principal de acceso, a realizarse este sábado a partir de las 8:00 AM. Agradecemos su contribución con las herramientas tradicionales de labranza.
            </p>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: 'auto' }}>Fecha de publicación: 25 de Mayo, 2026</span>
          </div>

          {/* News Item 2 */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '1px' }}>Cultura y Tradición</span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-text-bright)', fontWeight: 700 }}>Fiesta de San Juan Bautista 2026</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', textAlign: 'justify' }}>
              El Cabildo y la Mayordomía Municipal extienden la más cordial invitación a todos los habitantes y paisanos que residen fuera a celebrar nuestra Gran Fiesta Patronal del 22 al 25 de junio. Habrá calendas, fuegos artificiales, la solemne misa patronal, y música tradicional con bandas de viento mixtecas.
            </p>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: 'auto' }}>Fecha de publicación: 15 de Mayo, 2026</span>
          </div>

        </div>
      </div>

      {/* NEW SECTION: CULTURA, ARTESANIA E HISTORIA */}
      <div style={{ marginBottom: '60px' }}>
        <div className="section-header">
          <h2 className="section-title">Identidad y Tradición Mixteca</h2>
          <span className="section-subtitle">Riqueza cultural de San Juan Teita</span>
        </div>
        <div className="grid-2" style={{ gap: '30px', alignItems: 'stretch' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-accent)' }}>
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'currentColor' }}>
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.13 19.57 10.5 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-text-bright)' }}>Artesanía en Palma Autóctona</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', textAlign: 'justify', lineHeight: '1.6' }}>
              Nuestra gente posee un legado milenario en el tejido manual de hojas de palma. Con maestría y paciencia infinita, los artesanos teiteños elaboran sombreros tradicionales, tenates y sopladores de alta resistencia. Esta actividad no solo representa el sustento familiar en la mixteca, sino también el tejido social e identitario que une a nuestras generaciones.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-accent)' }}>
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'currentColor' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-text-bright)' }}>Defensa y Memoria de Límites</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', textAlign: 'justify', lineHeight: '1.6' }}>
              La historia de San Juan Teita está marcada por la firme defensa de su territorio ancestral. A través de acuerdos agrarios solemnes y resoluciones presidenciales históricas, nuestro municipio ha salvaguardado con orgullo y dignidad sus linderos geográficos de la Mixteca Alta, manteniendo relaciones pacíficas, respetuosas y armónicas con las comunidades hermanas vecinas.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-accent)' }}>
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'currentColor' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-text-bright)' }}>Jarabe Mixteco Teiteño</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', textAlign: 'justify', lineHeight: '1.6' }}>
              En cada festividad y evento oficial, el jarabe tradicional de nuestra región resuena con la vibrante energía de la banda de viento mixteca. Bailado con gran garbo, elegancia y porte por parejas que visten trajes tradicionales de manta bordada, el baile narra el cortejo campesino y evoca las raíces culturales profundas del México profundo y nuestra herencia indígena.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
            <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '12px', borderRadius: '10px', backgroundColor: 'var(--color-primary-glow)', color: 'var(--color-accent)' }}>
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'currentColor' }}>
                <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
              </svg>
            </div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--color-text-bright)' }}>Gastronomía Ancestral</h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', textAlign: 'justify', lineHeight: '1.6' }}>
              La mesa mixteca en Teita es un festival de sabores y texturas tradicionales cocinados con leña en fogón de tierra. Sobresale el mole negro mixteco preparado en bodas y mayordomías, las tortillas elaboradas con maíz criollo de cajete, el sabroso pulque artesanal raspado en magueyeras locales y el chilate de pollo, sazonados con ingredientes endémicos.
            </p>
          </div>

        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stat-widget" style={{ marginBottom: '60px' }}>
        <div className="stat-grid">
          <div className="stat-item">
            <span className="stat-icon">
              <svg viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </span>
            <div className="stat-num">544</div>
            <div className="stat-title">Habitantes</div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">
              <svg viewBox="0 0 24 24">
                <path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/>
              </svg>
            </span>
            <div className="stat-num">2,120<span>m</span></div>
            <div className="stat-title">Altitud Promedio</div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1c0 .55.45 1 1 1zm0 14c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-.55-.45-1-1-1zm8-8c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1c.55 0 1-.45 1-1zM6 12c0 .55.45 1 1 1h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1zm11.66-5.66c.39-.39.39-1.02 0-1.41l-.71-.71a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l.71.71c.39.39 1.02.39 1.41 0zM6.66 17.66c-.39.39-.39 1.02 0 1.41l.71.71a.996.996 0 0 0 1.41 0c.39-.39.39-1.02 0-1.41l-.71-.71a.996.996 0 0 0-1.41 0zm11-11c.39-.39.39-1.02 0-1.41l-.71-.71c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l.71.71c.38.39 1.02.39 1.41 0zm-11 11c-.39.39-.39 1.02 0 1.41l.71.71c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-.71-.71c-.39-.39-1.02-.39-1.41 0z"/>
              </svg>
            </span>
            <div className="stat-num">20<span>°C</span></div>
            <div className="stat-title">Clima Promedio</div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </span>
            <div className="stat-num">100<span>%</span></div>
            <div className="stat-title">Mixteca Alta</div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: CALENDARIO CIVICO Y FESTIVO */}
      <div style={{ marginBottom: '60px' }}>
        <div className="section-header">
          <h2 className="section-title">Calendario de Tradiciones</h2>
          <span className="section-subtitle">Fechas y acontecimientos más significativos</span>
        </div>
        <div className="grid-3" style={{ gap: '24px' }}>
          
          {/* Event 1 */}
          <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--color-accent)' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: 700, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              24 de Junio
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-text-bright)', marginBottom: '8px' }}>Fiesta Patronal a San Juan Bautista</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              La festividad más grande de la comunidad. Calendas solemnes recorren las calles principales acompañadas de bandas de viento, castillos de pirotecnia, comida comunitaria y el tradicional jaripeo ranchero.
            </p>
          </div>

          {/* Event 2 */}
          <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--color-primary-light)' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-primary-light)', fontWeight: 700, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              1 de Enero
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-text-bright)', marginBottom: '8px' }}>Toma de Posesión y Cambio de Cabildo</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              Ceremonia solemne en la cual el Cabildo Municipal entrante, electo de manera democrática bajo nuestro sistema normativo interno de Usos y Costumbres, toma protesta del cargo ante la asamblea comunitaria.
            </p>
          </div>

          {/* Event 3 */}
          <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--color-accent)' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: 700, fontFamily: 'var(--font-heading)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              1 y 2 de Noviembre
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-text-bright)', marginBottom: '8px' }}>Fieles Difuntos (Día de Muertos)</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
              El cementerio de la comunidad se ilumina con velas y flores de cempasúchil. En cada hogar mixteco se montan espectaculares altares con pan de yema cocido en horno de piedra, mole tradicional y chocolate de agua.
            </p>
          </div>

        </div>
      </div>

      {/* NEW SECTION 3: INTEREST SITESS CAROUSEL */}
      <div style={{ marginBottom: '40px' }}>
        <div className="section-header">
          <h2 className="section-title">Sitios de Interés</h2>
          <span className="section-subtitle">Portales institucionales gubernamentales</span>
        </div>
        
        {/* Carousel Container */}
        <div className="glass-card" style={{ padding: '32px', position: 'relative', overflow: 'hidden', minHeight: '200px' }}>
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div 
                key={slide.id} 
                style={{ 
                  display: isActive ? 'flex' : 'none', 
                  alignItems: 'center', 
                  gap: '30px',
                  animation: 'fadeIn 0.5s ease-in-out forwards',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                  {slide.iconPath}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--color-text-bright)', marginBottom: '8px' }}>
                    {slide.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                    {slide.desc}
                  </p>
                  <a 
                    href={slide.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="download-link" 
                    style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px', display: 'inline-flex' }}
                  >
                    Visitar Sitio
                    <svg viewBox="0 0 24 24" style={{ width: '12px', height: '12px' }}>
                      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: index === currentSlide ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
                  transition: 'background-color 0.3s'
                }}
                aria-label={`Ir al sitio de interés ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
