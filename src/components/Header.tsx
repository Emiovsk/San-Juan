import React from 'react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isAdminMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  isAdminMode,
}) => {
  const tabs = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'municipio', label: 'Tu Municipio' },
    { id: 'transparencia', label: 'Transparencia' },
    { id: 'obras', label: 'Inversión Pública' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleTabClick = (tabId: string) => {
    setTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      {/* Top Info Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="contact-links">
              <a href="tel:+529511234567" className="contact-link">
                <svg viewBox="0 0 24 24" className="svg-icon">
                  <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.72 11.72 0 0 0 3.66.58 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .58 3.66 1 1 0 0 1-.27 1.11z"/>
                </svg>
                <span className="hidden-mobile">Contacto Oficial: (951) 123 4567</span>
              </a>
              <a href="mailto:contacto@sanjuanteita.gob.mx" className="contact-link">
                <svg viewBox="0 0 24 24" className="svg-icon">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="hidden-mobile">contacto@sanjuanteita.gob.mx</span>
              </a>
            </div>
            <div className="hidden-mobile" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span>Régimen de Usos y Costumbres • Distrito de Tlaxiaco</span>
              {isAdminMode && (
                <button 
                  onClick={() => handleTabClick('admin')}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    color: 'var(--color-accent)',
                    fontSize: '11px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: '12px', height: '12px', fill: 'currentColor' }}>
                    <path d="M12.65 11.35l-1.3-1.3L10 11.4l1.3 1.3c.3.3.3.7 0 1l-1.4 1.4-1.4-1.4-2.8 2.8 1.4 1.4.7-.7c.3-.3.7-.3 1 0l1.3 1.3c.3.3.3.7 0 1l-.7.7-1.4-1.4-1.4 1.4c-.3.3-.7.3-1 0L3.8 17c-.3-.3-.3-.7 0-1l1.4-1.4-1.4-1.4 6.3-6.3c1.7-1.7 4.5-1.7 6.2 0 1.7 1.7 1.7 4.5 0 6.2-.8.8-1.9 1.2-3 1.2s-2.2-.4-3-1.2l1.3-1.3c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8z"/>
                  </svg>
                  Panel de Control
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo Section */}
            <button 
              className="logo" 
              onClick={() => handleTabClick('inicio')}
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
            >
              <img src="/assets/img/escudo.png" alt="Logo Oficial de San Juan Teita" className="logo-img" />
              <div className="logo-text">
                <span className="logo-title">San Juan Teita</span>
                <span className="logo-subtitle">Oaxaca</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-link ${currentTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación"
            >
              <span className="hamburger"></span>
            </button>
          </div>

          {/* Mobile Navigation Panel */}
          <nav className={`nav-mobile ${mobileMenuOpen ? 'active' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-link-mobile ${currentTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            {isAdminMode && (
              <button
                className={`nav-link-mobile ${currentTab === 'admin' ? 'active' : ''}`}
                onClick={() => handleTabClick('admin')}
                style={{ color: 'var(--color-accent)' }}
              >
                Panel de Control
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
