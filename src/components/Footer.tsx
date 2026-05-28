import React, { useEffect, useState } from 'react';

interface FooterProps {
  setTab: (tab: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ setTab, isAdminMode, setIsAdminMode }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAdmin = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      alert("Modo Administrador desactivado.");
      handleLinkClick('inicio');
    } else {
      const code = prompt("Ingrese el código de acceso municipal para activar el Panel de Control:");
      if (code === "2026") {
        setIsAdminMode(true);
        alert("Modo Administrador activado. El botón 'Panel de Control' ahora es visible en los menús.");
      } else if (code !== null) {
        alert("Código de acceso incorrecto.");
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Info Column */}
          <div className="footer-column" onDoubleClick={handleToggleAdmin} style={{ cursor: 'pointer' }} title="Doble clic para administrador">
            <h3>San Juan Teita</h3>
            <p className="footer-desc">
              Gobierno Municipal regido por el sistema tradicional de Usos y Costumbres en el Distrito de Tlaxiaco, Oaxaca. Trabajando con transparencia por el bienestar común.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="footer-column">
            <h3>Enlaces Útiles</h3>
            <ul className="footer-links">
              <li>
                <button className="footer-link-item" onClick={() => handleLinkClick('inicio')}>
                  Inicio
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => handleLinkClick('municipio')}>
                  Tu Municipio
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => handleLinkClick('transparencia')}>
                  Transparencia
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => handleLinkClick('obras')}>
                  Inversión Pública
                </button>
              </li>
              {isAdminMode && (
                <li>
                  <button className="footer-link-item" onClick={() => handleLinkClick('admin')} style={{ color: 'var(--color-accent)' }}>
                    Panel de Control
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h3>Contacto</h3>
            <div className="footer-contact">
              <div className="footer-contact-row">
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" className="svg-icon">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                  </svg>
                </span>
                <span>Palacio Municipal, Centro, San Juan Teita, Tlaxiaco, Oaxaca.</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" className="svg-icon">
                    <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.72 11.72 0 0 0 3.66.58 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .58 3.66 1 1 0 0 1-.27 1.11z"/>
                  </svg>
                </span>
                <span>(951) 123 4567</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" className="svg-icon">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <span>contacto@sanjuanteita.gob.mx</span>
              </div>
            </div>
          </div>

          {/* Service Hours Column */}
          <div className="footer-column">
            <h3>Horarios Palacio</h3>
            <div className="footer-hours-row">
              <div className="footer-hours-lbl">Lunes a Sábado</div>
              <div className="footer-hours-val">9:00 AM - 3:00 PM</div>
            </div>
            <div className="footer-hours-row">
              <div className="footer-hours-lbl">Asambleas Generales</div>
              <div className="footer-hours-val">Según Convocatoria Oficial</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2026 Municipio de San Juan Teita, Tlaxiaco, Oaxaca. Todos los derechos reservados.</p>
          <button 
            className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
            onClick={handleScrollTop}
            title="Ir al inicio de la página"
            aria-label="Volver arriba"
          >
            <svg viewBox="0 0 24 24" className="svg-icon">
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
