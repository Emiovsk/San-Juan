import React, { useState, useEffect } from 'react';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  status: string;
}

export const Obras: React.FC = () => {
  const [docsConfig, setDocsConfig] = useState<any>({});

  // Load uploaded files from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('teita_obras_docs');
      if (stored) {
        setDocsConfig(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading documents configuration:', err);
    }
  }, []);

  const works: WorkItem[] = [
    {
      id: 'w1',
      title: 'Obra 1: Rehabilitación de Red de Agua Potable en la Zona Centro',
      category: 'Agua y Saneamiento',
      status: 'Concluida',
    },
    {
      id: 'w2',
      title: 'Obra 2: Pavimentación con Concreto Hidráulico en Calle de Acceso Escolar',
      category: 'Urbanización',
      status: 'En Proceso',
    },
  ];

  // Helper to get custom or default document names
  const getDocName = (obraId: string, docType: string, defaultName: string) => {
    if (docsConfig[obraId] && docsConfig[obraId][docType]) {
      return docsConfig[obraId][docType];
    }
    return defaultName;
  };

  // SVG PDF Document icon
  const pdfIcon = (
    <svg 
      viewBox="0 0 24 24" 
      style={{ 
        width: '40px', 
        height: '40px', 
        fill: 'hsl(42, 85%, 55%)', 
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer'
      }}
      className="pdf-icon"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.15)';
        e.currentTarget.style.fill = 'hsl(42, 90%, 65%)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.fill = 'hsl(42, 85%, 55%)';
      }}
    >
      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm8.5 6.5H8v-1.5h12V16zm0-3H8v-1.5h12V13zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
    </svg>
  );

  return (
    <section id="obras" className="site-section section-padding">
      <div className="section-header">
        <h1 className="section-title">Ejercicio 2026</h1>
        <span className="section-subtitle">Obras de Infraestructura e Inversión Pública</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginTop: '30px' }}>
        {works.map((w) => {
          const contractFile = getDocName(w.id, 'contrato', '');
          const receiptFile = getDocName(w.id, 'acta', '');
          const photosFile = getDocName(w.id, 'fotos', '');

          return (
            <div key={w.id} className="glass-card" style={{ padding: '32px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '16px',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <h2 
                  style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: '22px', 
                    color: 'var(--color-text-bright)',
                    fontWeight: 600
                  }}
                >
                  {w.title}
                </h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      backgroundColor: w.status === 'Concluida' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: w.status === 'Concluida' ? 'hsl(140, 70%, 75%)' : 'hsl(40, 90%, 75%)',
                      border: w.status === 'Concluida' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)'
                    }}
                  >
                    {w.status}
                  </span>
                </div>
              </div>

              {/* Document download table styled premium HSL */}
              <div className="table-wrapper">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th style={{ width: '33.3%', textAlign: 'center' }}>
                        Contrato de Obra
                      </th>
                      <th style={{ width: '33.3%', textAlign: 'center' }}>
                        Acta Entrega Recepción
                      </th>
                      <th style={{ width: '33.3%', textAlign: 'center' }}>
                        Reporte Fotográfico
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center', padding: '24px' }}>
                        {contractFile ? (
                          <a href={`/assets/docs/${contractFile}`} download={contractFile} aria-label={`Descargar ${contractFile}`}>
                            {pdfIcon}
                          </a>
                        ) : (
                          <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>—</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center', padding: '24px' }}>
                        {receiptFile ? (
                          <a href={`/assets/docs/${receiptFile}`} download={receiptFile} aria-label={`Descargar ${receiptFile}`}>
                            {pdfIcon}
                          </a>
                        ) : (
                          <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>—</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center', padding: '24px' }}>
                        {photosFile ? (
                          <a href={`/assets/docs/${photosFile}`} download={photosFile} aria-label={`Descargar ${photosFile}`}>
                            {pdfIcon}
                          </a>
                        ) : (
                          <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>—</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', paddingBottom: '8px' }}>
                        {contractFile ? (
                          <>
                            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                              Archivo Cargado:
                            </span>
                            <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{contractFile}</span>
                          </>
                        ) : (
                          <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Sin archivo</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', paddingBottom: '8px' }}>
                        {receiptFile ? (
                          <>
                            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                              Archivo Cargado:
                            </span>
                            <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{receiptFile}</span>
                          </>
                        ) : (
                          <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Sin archivo</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', paddingBottom: '8px' }}>
                        {photosFile ? (
                          <>
                            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                              Archivo Cargado:
                            </span>
                            <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{photosFile}</span>
                          </>
                        ) : (
                          <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Sin archivo</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>


    </section>
  );
};
