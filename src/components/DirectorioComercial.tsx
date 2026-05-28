import React, { useState, useEffect } from 'react';

interface Comercio {
  id: string;
  nombre: string;
  telefono: string;
}

export const DEFAULT_COMERCIOS: Comercio[] = [
  { id: '1', nombre: 'Tejido de Sombreros Mixtecos - Artesanía en Palma (Fam. Santiago Mendoza)', telefono: '951 456 7890' },
  { id: '2', nombre: 'Petates y Canastas "Teita" - Sra. Juana Gómez Ortiz', telefono: '953 112 4589' },
  { id: '3', nombre: 'Abarrotes "La Mixteca" - Don Pedro Cruz', telefono: '951 889 1234' },
  { id: '4', nombre: 'Ferretería y Materiales "San Juan" - Ing. Manuel Ruiz', telefono: '953 456 1223' },
  { id: '5', nombre: 'Transporte Mixto y Fletes Teita - Sr. Antonio López', telefono: '951 777 5566' },
  { id: '6', nombre: 'Panadería Tradicional "El Buen Trigo" - Sra. María Cruz Hernández', telefono: '953 234 5678' },
  { id: '7', nombre: 'Carnicería y Miscelánea "La Bendición" - Don Esteban García', telefono: '951 333 4455' }
];

export const DirectorioComercial: React.FC = () => {
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage on mount and register listener for dynamic admin panel sync
  useEffect(() => {
    loadComercios();
    
    // Listen to storage events so changes in the admin tab reflect immediately if open in another window/context
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'teita_directorio_comercial') {
        loadComercios();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadComercios = () => {
    try {
      const s = localStorage.getItem('teita_directorio_comercial');
      if (!s) {
        // Pre-populate with realistic Mixteca highlander seed data
        localStorage.setItem('teita_directorio_comercial', JSON.stringify(DEFAULT_COMERCIOS));
        setComercios(DEFAULT_COMERCIOS);
      } else {
        setComercios(JSON.parse(s));
      }
    } catch {
      setComercios(DEFAULT_COMERCIOS);
    }
  };

  const filteredComercios = comercios.filter((c) =>
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.telefono.includes(searchQuery)
  );

  return (
    <section className="site-section section-padding animate-fade-in">
      <div className="section-header">
        <h2 className="section-title">Directorio Comercial</h2>
        <span className="section-subtitle">Negocios, talleres artesanales y servicios en San Juan Teita</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
          Apoya el comercio local mixteco de San Juan Teita. Aquí encontrarás los contactos directos de artesanos de palma, 
          tiendas locales, fletes y servicios básicos para tu comodidad.
        </p>

        {/* Directory Container */}
        <div className="directorio-container">
          
          {/* Action Header / Search Bar */}
          <div className="directorio-header-actions">
            <div className="search-wrapper">
              <svg viewBox="0 0 24 24" className="search-icon">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar comercio, servicio o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {filteredComercios.length !== comercios.length && (
              <span style={{ fontSize: '13px', color: 'var(--color-accent)', fontWeight: 600 }}>
                Coincidencias encontradas: {filteredComercios.length}
              </span>
            )}
          </div>

          {/* Table Container */}
          {filteredComercios.length === 0 ? (
            <div className="no-results-box">
              <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'var(--color-border)', marginBottom: '16px', display: 'inline-block' }}>
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <p style={{ fontSize: '15px', fontWeight: 600 }}>No se encontraron comercios que coincidan con la búsqueda.</p>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Prueba con términos generales como "palma", "tienda", "pan" o dígitos telefónicos.</p>
            </div>
          ) : (
            <div className="directorio-table-container">
              <table className="directorio-table">
                <thead>
                  <tr>
                    <th>Comercio o Servicio</th>
                    <th>Teléfono(s)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComercios.map((comercio) => (
                    <tr key={comercio.id}>
                      <td>
                        <span className="business-name">{comercio.nombre}</span>
                      </td>
                      <td>
                        <div className="phone-badge-container">
                          <a href={`tel:${comercio.telefono.replace(/\s+/g, '')}`} className="phone-badge">
                            <svg viewBox="0 0 24 24" className="phone-icon">
                              <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.72 11.72 0 0 0 3.66.58 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .58 3.66 1 1 0 0 1-.27 1.11z"/>
                            </svg>
                            {comercio.telefono}
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
