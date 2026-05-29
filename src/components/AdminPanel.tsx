import React, { useState, useEffect } from 'react';

interface CitizenMessage {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  fecha: string;
}

interface RegisteredFile {
  obraId: string;
  obraLabel: string;
  docType: string;
  docTypeLabel: string;
  fileName: string;
}

interface Work {
  id: string;
  title: string;
  category: string;
  status: string;
}

const DOC_TYPE_LABELS: Record<string, string> = {
  contrato: 'Contrato de Obra',
  acta: 'Acta Entrega Recepción',
  fotos: 'Reporte Fotográfico',
};

// ─── Detectar si el servidor Express está disponible ─────────────────────
async function serverAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/api/docs', { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Upload via API (VPS) ─────────────────────────────────────────────────
async function uploadViaAPI(file: File, token: string): Promise<{ ok: boolean; fileName?: string; error?: string }> {
  const form = new FormData();
  form.append('file', file, file.name);
  const res = await fetch('/api/upload', { 
    method: 'POST', 
    headers: { 'x-admin-token': token },
    body: form 
  });
  return res.json();
}

async function deleteViaAPI(fileName: string, token: string): Promise<void> {
  await fetch(`/api/docs/${encodeURIComponent(fileName)}`, { 
    method: 'DELETE',
    headers: { 'x-admin-token': token }
  }).catch(() => {});
}

// ─── Upload via Service Worker (local dev) ────────────────────────────────
async function uploadViaSW(file: File): Promise<boolean> {
  const sw = navigator.serviceWorker?.controller;
  if (!sw) return false;
  const buffer = await file.arrayBuffer();
  return new Promise((resolve) => {
    const ch = new MessageChannel();
    ch.port1.onmessage = (e) => resolve(e.data?.ok === true);
    sw.postMessage({ type: 'STORE_FILE', name: file.name, buffer, mime: file.type || 'application/pdf' }, [ch.port2, buffer]);
  });
}

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'inbox' | 'directorio' | 'obras'>('files');
  const [selectedObra, setSelectedObra] = useState('w1');
  const [selectedDocType, setSelectedDocType] = useState('contrato');
  const [messages, setMessages] = useState<CitizenMessage[]>([]);
  const [registeredFiles, setRegisteredFiles] = useState<RegisteredFile[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'uploading'; msg: string } | null>(null);
  const [hasServer, setHasServer] = useState<boolean | null>(null); // null = checking
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Estados para Directorio Comercial
  const [comercios, setComercios] = useState<{ id: string; nombre: string; telefono: string }[]>([]);
  const [newNombre, setNewNombre] = useState('');
  const [newTelefono, setNewTelefono] = useState('');
  const [dirStatus, setDirStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Estados para Catálogo de Obras
  const [works, setWorks] = useState<Work[]>([]);
  const [newWorkTitle, setNewWorkTitle] = useState('');
  const [newWorkCategory, setNewWorkCategory] = useState('Agua y Saneamiento');
  const [newWorkStatus, setNewWorkStatus] = useState('En Proceso');
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [editWorkTitle, setEditWorkTitle] = useState('');
  const [editWorkCategory, setEditWorkCategory] = useState('');
  const [editWorkStatus, setEditWorkStatus] = useState('');
  const [worksStatus, setWorksStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Token de seguridad administrativo para la comunicación con la API de Express (VPS)
  const ADMIN_TOKEN = 'TeitaAdmin2026#';

  useEffect(() => {
    loadInbox();
    loadWorks();
    loadRegisteredFiles();
    loadComercios();
    serverAvailable().then(setHasServer);
  }, []);

  const loadInbox = () => {
    const s = localStorage.getItem('teita_mensajes');
    setMessages(s ? JSON.parse(s) : []);
  };

  const loadWorks = () => {
    try {
      const s = localStorage.getItem('teita_obras_lista');
      if (!s) {
        const defaults = [
          { id: 'w1', title: 'Obra 1: Rehabilitación de Red de Agua Potable en la Zona Centro', category: 'Agua y Saneamiento', status: 'Concluida' },
          { id: 'w2', title: 'Obra 2: Pavimentación con Concreto Hidráulico en Calle de Acceso Escolar', category: 'Urbanización', status: 'En Proceso' }
        ];
        localStorage.setItem('teita_obras_lista', JSON.stringify(defaults));
        setWorks(defaults);
        if (defaults.length > 0) setSelectedObra(defaults[0].id);
      } else {
        const list = JSON.parse(s);
        setWorks(list);
        if (list.length > 0) setSelectedObra(list[0].id);
      }
    } catch {
      setWorks([]);
    }
  };

  const loadRegisteredFiles = (currentWorks: Work[] = works) => {
    try {
      const s = localStorage.getItem('teita_obras_docs');
      if (!s) { setRegisteredFiles([]); return; }
      const cfg = JSON.parse(s) as Record<string, Record<string, string>>;
      const list: RegisteredFile[] = [];
      
      // Intentar cargar obras de localStorage para tener etiquetas frescas si currentWorks está vacío
      let activeWorks = currentWorks;
      if (activeWorks.length === 0) {
        const osStr = localStorage.getItem('teita_obras_lista');
        if (osStr) activeWorks = JSON.parse(osStr);
      }

      for (const oid of Object.keys(cfg))
        for (const dt of Object.keys(cfg[oid])) {
          if (cfg[oid][dt]) {
            const w = activeWorks.find(item => item.id === oid);
            const label = w ? w.title : oid;
            list.push({ 
              obraId: oid, 
              obraLabel: label, 
              docType: dt, 
              docTypeLabel: DOC_TYPE_LABELS[dt] || dt, 
              fileName: cfg[oid][dt] 
            });
          }
        }
      setRegisteredFiles(list);
    } catch { setRegisteredFiles([]); }
  };

  const saveToLocalStorage = (obraId: string, docType: string, fileName: string) => {
    const s = localStorage.getItem('teita_obras_docs');
    const cfg = s ? JSON.parse(s) : {};
    if (!cfg[obraId]) cfg[obraId] = {};
    cfg[obraId][docType] = fileName;
    localStorage.setItem('teita_obras_docs', JSON.stringify(cfg));
  };

  const removeFromLocalStorage = (obraId: string, docType: string) => {
    const s = localStorage.getItem('teita_obras_docs');
    if (!s) return;
    const cfg = JSON.parse(s);
    if (cfg[obraId]) {
      delete cfg[obraId][docType];
      if (!Object.keys(cfg[obraId]).length) delete cfg[obraId];
    }
    localStorage.setItem('teita_obras_docs', JSON.stringify(cfg));
  };

  const pickFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setStatus({ type: 'error', msg: 'Solo se aceptan archivos PDF.' });
      return;
    }
    setCurrentFile(file);
    setStatus(null);
    const n = file.name.toLowerCase();
    if (n.includes('acta') || n.includes('entrega') || n.includes('recep')) setSelectedDocType('acta');
    else if (n.includes('foto') || n.includes('reporte')) setSelectedDocType('fotos');
    else setSelectedDocType('contrato');
    
    // Buscar obra coincidente dinámicamente basándose en el nombre del archivo
    const matched = works.find(w => 
      n.includes(w.id.toLowerCase()) || 
      w.title.toLowerCase().split(/\s+/).some(word => word.length > 4 && n.includes(word))
    );
    if (matched) setSelectedObra(matched.id);
    else if (works.length > 0) setSelectedObra(works[0].id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) pickFile(f);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFile) return;

    setStatus({ type: 'uploading', msg: 'Subiendo archivo...' });

    let ok = false;

    if (hasServer) {
      // VPS mode: upload to real server
      const result = await uploadViaAPI(currentFile, ADMIN_TOKEN);
      ok = result.ok;
      if (!ok) setStatus({ type: 'error', msg: `Error: ${result.error}` });
    } else {
      // Local dev mode: store in Service Worker / IndexedDB
      await navigator.serviceWorker?.ready;
      await new Promise(r => setTimeout(r, 200));
      ok = await uploadViaSW(currentFile);
      if (!ok) setStatus({ type: 'error', msg: 'No se pudo guardar. Recarga e intenta de nuevo.' });
    }

    if (ok) {
      saveToLocalStorage(selectedObra, selectedDocType, currentFile.name);
      setStatus({ type: 'success', msg: `"${currentFile.name}" publicado correctamente.` });
      setCurrentFile(null);
      loadRegisteredFiles();
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const handleDeleteFile = async (obraId: string, docType: string, fileName: string) => {
    if (hasServer) {
      await deleteViaAPI(fileName, ADMIN_TOKEN);
    } else {
      navigator.serviceWorker?.controller?.postMessage({ type: 'DELETE_FILE', name: fileName });
    }
    removeFromLocalStorage(obraId, docType);
    setConfirmDelete(null);
    loadRegisteredFiles();
  };

  const handleClearAll = async () => {
    if (hasServer) {
      for (const rf of registeredFiles) await deleteViaAPI(rf.fileName, ADMIN_TOKEN);
    } else {
      navigator.serviceWorker?.controller?.postMessage({ type: 'CLEAR_FILES' });
    }
    localStorage.removeItem('teita_obras_docs');
    setRegisteredFiles([]);
    setConfirmDelete(null);
  };

  const handleDeleteMessage = (id: string) => {
    const s = localStorage.getItem('teita_mensajes');
    if (s) {
      const f = (JSON.parse(s) as CitizenMessage[]).filter(m => m.id !== id);
      localStorage.setItem('teita_mensajes', JSON.stringify(f));
      setMessages(f);
    }
  };

  const loadComercios = () => {
    try {
      const s = localStorage.getItem('teita_directorio_comercial');
      if (!s) {
        const defaults = [
          { id: '1', nombre: 'Tejido de Sombreros Mixtecos - Artesanía en Palma (Fam. Santiago Mendoza)', telefono: '951 456 7890' },
          { id: '2', nombre: 'Petates y Canastas "Teita" - Sra. Juana Gómez Ortiz', telefono: '953 112 4589' },
          { id: '3', nombre: 'Abarrotes "La Mixteca" - Don Pedro Cruz', telefono: '951 889 1234' },
          { id: '4', nombre: 'Ferretería y Materiales "San Juan" - Ing. Manuel Ruiz', telefono: '953 456 1223' },
          { id: '5', nombre: 'Transporte Mixto y Fletes Teita - Sr. Antonio López', telefono: '951 777 5566' },
          { id: '6', nombre: 'Panadería Tradicional "El Buen Trigo" - Sra. María Cruz Hernández', telefono: '953 234 5678' },
          { id: '7', nombre: 'Carnicería y Miscelánea "La Bendición" - Don Esteban García', telefono: '951 333 4455' }
        ];
        localStorage.setItem('teita_directorio_comercial', JSON.stringify(defaults));
        setComercios(defaults);
      } else {
        setComercios(JSON.parse(s));
      }
    } catch {
      setComercios([]);
    }
  };

  const handleAddComercio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre.trim() || !newTelefono.trim()) {
      setDirStatus({ type: 'error', msg: 'Completa todos los campos.' });
      return;
    }
    const nuevo = {
      id: Date.now().toString(),
      nombre: newNombre.trim(),
      telefono: newTelefono.trim()
    };
    const lista = [...comercios, nuevo];
    localStorage.setItem('teita_directorio_comercial', JSON.stringify(lista));
    setComercios(lista);
    setNewNombre('');
    setNewTelefono('');
    setDirStatus({ type: 'success', msg: 'Comercio registrado exitosamente.' });
    setTimeout(() => setDirStatus(null), 4000);
  };

  const handleDeleteComercio = (id: string) => {
    const lista = comercios.filter(c => c.id !== id);
    localStorage.setItem('teita_directorio_comercial', JSON.stringify(lista));
    setComercios(lista);
  };

  const handleResetComercios = () => {
    const defaults = [
      { id: '1', nombre: 'Tejido de Sombreros Mixtecos - Artesanía en Palma (Fam. Santiago Mendoza)', telefono: '951 456 7890' },
      { id: '2', nombre: 'Petates y Canastas "Teita" - Sra. Juana Gómez Ortiz', telefono: '953 112 4589' },
      { id: '3', nombre: 'Abarrotes "La Mixteca" - Don Pedro Cruz', telefono: '951 889 1234' },
      { id: '4', nombre: 'Ferretería y Materiales "San Juan" - Ing. Manuel Ruiz', telefono: '953 456 1223' },
      { id: '5', nombre: 'Transporte Mixto y Fletes Teita - Sr. Antonio López', telefono: '951 777 5566' },
      { id: '6', nombre: 'Panadería Tradicional "El Buen Trigo" - Sra. María Cruz Hernández', telefono: '953 234 5678' },
      { id: '7', nombre: 'Carnicería y Miscelánea "La Bendición" - Don Esteban García', telefono: '951 333 4455' }
    ];
    localStorage.setItem('teita_directorio_comercial', JSON.stringify(defaults));
    setComercios(defaults);
    setDirStatus({ type: 'success', msg: 'Directorio restablecido a los valores por defecto.' });
    setTimeout(() => setDirStatus(null), 4000);
  };

  // Métodos CRUD para Catálogo de Obras
  const handleAddWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkTitle.trim() || !newWorkCategory.trim()) {
      setWorksStatus({ type: 'error', msg: 'Completa todos los campos.' });
      return;
    }
    const nuevoId = 'w_' + Date.now();
    const nuevaObra: Work = {
      id: nuevoId,
      title: newWorkTitle.trim(),
      category: newWorkCategory.trim(),
      status: newWorkStatus
    };
    const lista = [...works, nuevaObra];
    localStorage.setItem('teita_obras_lista', JSON.stringify(lista));
    setWorks(lista);
    setNewWorkTitle('');
    setNewWorkCategory('Agua y Saneamiento');
    setNewWorkStatus('En Proceso');
    setWorksStatus({ type: 'success', msg: 'Obra agregada exitosamente al catálogo.' });
    setTimeout(() => setWorksStatus(null), 4000);
  };

  const handleUpdateWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorkId || !editWorkTitle.trim() || !editWorkCategory.trim()) {
      setWorksStatus({ type: 'error', msg: 'Completa todos los campos.' });
      return;
    }
    const lista = works.map(w => 
      w.id === editingWorkId 
        ? { ...w, title: editWorkTitle.trim(), category: editWorkCategory.trim(), status: editWorkStatus }
        : w
    );
    localStorage.setItem('teita_obras_lista', JSON.stringify(lista));
    setWorks(lista);
    setEditingWorkId(null);
    setWorksStatus({ type: 'success', msg: 'Obra actualizada correctamente.' });
    loadRegisteredFiles(lista); // Recargar archivos registrados con etiquetas actualizadas
    setTimeout(() => setWorksStatus(null), 4000);
  };

  const handleDeleteWork = (id: string) => {
    const lista = works.filter(w => w.id !== id);
    localStorage.setItem('teita_obras_lista', JSON.stringify(lista));
    setWorks(lista);
    
    // Limpiar documentos asociados de esa obra en teita_obras_docs
    try {
      const s = localStorage.getItem('teita_obras_docs');
      if (s) {
        const cfg = JSON.parse(s);
        if (cfg[id]) {
          delete cfg[id];
          localStorage.setItem('teita_obras_docs', JSON.stringify(cfg));
        }
      }
    } catch {}
    
    loadRegisteredFiles(lista);
    if (selectedObra === id && lista.length > 0) {
      setSelectedObra(lista[0].id);
    }
  };

  const handleResetWorks = () => {
    const defaults = [
      { id: 'w1', title: 'Obra 1: Rehabilitación de Red de Agua Potable en la Zona Centro', category: 'Agua y Saneamiento', status: 'Concluida' },
      { id: 'w2', title: 'Obra 2: Pavimentación con Concreto Hidráulico en Calle de Acceso Escolar', category: 'Urbanización', status: 'En Proceso' }
    ];
    localStorage.setItem('teita_obras_lista', JSON.stringify(defaults));
    setWorks(defaults);
    loadRegisteredFiles(defaults);
    setWorksStatus({ type: 'success', msg: 'Catálogo de obras restablecido a los valores por defecto.' });
    setTimeout(() => setWorksStatus(null), 4000);
  };

  // ── Styles ───────────────────────────────────────────────────────────────
  const tabBtn = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 600,
    textAlign: 'left', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
    border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '10px',
    backgroundColor: active ? 'var(--color-primary)' : 'transparent',
    color: active ? '#fff' : 'var(--color-text-bright)', transition: 'var(--transition-smooth)',
  });
  const delBtn: React.CSSProperties = {
    fontSize: '12px', fontWeight: 700, padding: '5px 12px', borderRadius: '6px',
    cursor: 'pointer', border: '1px solid rgba(220,50,50,0.25)',
    backgroundColor: 'rgba(220,50,50,0.08)', color: 'hsl(0,75%,50%)',
    fontFamily: 'var(--font-heading)',
  };


  return (
    <section className="site-section section-padding">
      <div className="section-header">
        <h1 className="section-title">Panel de Control</h1>
        <span className="section-subtitle">Gestión del Ayuntamiento Municipal</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '30px', marginTop: '30px' }}>

        {/* Sidebar */}
        <div className="glass-card" style={{ padding: '24px', alignSelf: 'start' }}>
          <h3 className="info-box-title" style={{ fontSize: '16px', marginBottom: '16px' }}>Opciones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => setActiveTab('files')} style={tabBtn(activeTab === 'files')}>
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor', flexShrink: 0 }}>
                <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
              </svg>
              Gestor de Archivos
              {registeredFiles.length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--color-accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '50px' }}>
                  {registeredFiles.length}
                </span>
              )}
            </button>
            <button onClick={() => setActiveTab('inbox')} style={tabBtn(activeTab === 'inbox')}>
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor', flexShrink: 0 }}>
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Buzón de Atención
              {messages.length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--color-accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '50px' }}>
                  {messages.length}
                </span>
              )}
            </button>
            <button onClick={() => setActiveTab('directorio')} style={tabBtn(activeTab === 'directorio')}>
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor', flexShrink: 0 }}>
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-7H7v2h7v-2zm-3 4H7v2h4v-2z"/>
              </svg>
              Directorio Comercial
              {comercios.length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--color-accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '50px' }}>
                  {comercios.length}
                </span>
              )}
            </button>
            <button onClick={() => setActiveTab('obras')} style={tabBtn(activeTab === 'obras')}>
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor', flexShrink: 0 }}>
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm10 12h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V9h8v2zm0-4h-8V5h8v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
              </svg>
              Catálogo de Obras
              {works.length > 0 && (
                <span style={{ marginLeft: 'auto', background: 'var(--color-accent)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '50px' }}>
                  {works.length}
                </span>
              )}
            </button>
          </div>

          {/* Server status badge */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', fontWeight: 600,
              color: hasServer === null ? 'var(--color-text-muted)' : hasServer ? 'hsl(150,70%,35%)' : 'hsl(38,90%,40%)',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                backgroundColor: hasServer === null ? '#ccc' : hasServer ? 'hsl(150,70%,45%)' : 'hsl(38,90%,55%)',
              }} />
              {hasServer === null ? 'Verificando…' : hasServer ? 'Servidor activo (VPS)' : 'Modo local (dev)'}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass-card" style={{ padding: '40px' }}>

          {/* ══ TAB: ARCHIVOS ══ */}
          {activeTab === 'files' && (
            <div>
              <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '28px' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-text-bright)', marginBottom: '4px' }}>
                  Subir documentos de obras
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  {hasServer
                    ? 'En VPS — los archivos se guardan en el servidor permanentemente para todos los visitantes.'
                    : 'En modo desarrollo local — los archivos se guardan en este navegador.'}
                </p>
              </div>

              {/* Status */}
              {status && (
                <div style={{
                  marginBottom: '20px', padding: '14px 18px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600,
                  backgroundColor: status.type === 'success' ? 'rgba(0,180,100,0.08)' : status.type === 'error' ? 'rgba(220,50,50,0.08)' : 'rgba(0,188,212,0.08)',
                  border: `1px solid ${status.type === 'success' ? 'rgba(0,180,100,0.25)' : status.type === 'error' ? 'rgba(220,50,50,0.25)' : 'rgba(0,188,212,0.25)'}`,
                  color: status.type === 'success' ? 'hsl(150,70%,30%)' : status.type === 'error' ? 'hsl(0,70%,45%)' : 'var(--color-primary)',
                }}>
                  {status.msg}
                </div>
              )}

              {/* Drop Zone */}
              <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <div
                  onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: dragActive ? '2px dashed var(--color-primary)' : currentFile ? '2px solid rgba(0,180,100,0.4)' : '2px dashed var(--color-border)',
                    borderRadius: '14px', padding: '44px 24px', textAlign: 'center',
                    backgroundColor: dragActive ? 'var(--color-primary-glow)' : currentFile ? 'rgba(0,180,100,0.04)' : '#FAFAFA',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }}
                    onChange={(e) => { if (e.target.files?.[0]) pickFile(e.target.files[0]); }} />
                  <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', marginBottom: '12px', display: 'inline-block', fill: currentFile ? 'hsl(150,70%,40%)' : 'hsl(14,90%,55%)' }}>
                    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm8.5 6.5H8v-1.5h12V16zm0-3H8v-1.5h12V13zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
                  </svg>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-bright)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                    {currentFile ? `Archivo PDF: ${currentFile.name}` : 'Arrastra el PDF aquí'}
                  </p>
                  <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)' }}>
                    {currentFile ? `${(currentFile.size / 1024).toFixed(1)} KB — haz clic para cambiar` : 'o haz clic para seleccionarlo'}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="obra-select">Obra</label>
                    <select id="obra-select" className="form-select" value={selectedObra} onChange={(e) => setSelectedObra(e.target.value)}>
                      {works.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="doctype-select">Tipo de documento</label>
                    <select id="doctype-select" className="form-select" value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)}>
                      <option value="contrato">Contrato de Obra</option>
                      <option value="acta">Acta Entrega Recepción</option>
                      <option value="fotos">Reporte Fotográfico</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-premium btn-primary"
                  style={{ border: 'none', alignSelf: 'flex-start', opacity: !currentFile || status?.type === 'uploading' ? 0.45 : 1, fontSize: '15px', padding: '14px 28px' }}
                  disabled={!currentFile || status?.type === 'uploading'}
                >
                  {status?.type === 'uploading' ? 'Subiendo...' : 'Publicar documento'}
                </button>
              </form>

              {/* Archivos publicados */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-text-bright)' }}>
                    Archivos publicados ({registeredFiles.length})
                  </h3>
                  {registeredFiles.length > 0 && (
                    <button onClick={handleClearAll} style={{ ...delBtn, fontSize: '11px' }}>Eliminar todos</button>
                  )}
                </div>

                {registeredFiles.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '28px', border: '1px dashed var(--color-border)', borderRadius: '10px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
                    Aún no hay archivos publicados.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {registeredFiles.map((rf) => {
                      const key = `${rf.obraId}|${rf.docType}`;
                      const confirming = confirmDelete === key;
                      return (
                        <div key={key} style={{
                          display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px',
                          borderRadius: '10px', transition: 'all 0.2s ease',
                          border: confirming ? '1px solid rgba(220,50,50,0.4)' : '1px solid var(--color-border)',
                          backgroundColor: confirming ? 'rgba(220,50,50,0.04)' : '#FFFFFF',
                        }}>
                          <svg viewBox="0 0 24 24" style={{ width: '30px', height: '30px', fill: 'hsl(14,90%,55%)', flexShrink: 0 }}>
                            <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm8.5 6.5H8v-1.5h12V16zm0-3H8v-1.5h12V13zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
                          </svg>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-bright)', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {rf.fileName}
                            </p>
                            <p style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                              {rf.obraLabel} · <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{rf.docTypeLabel}</span>
                            </p>
                          </div>
                          {!confirming ? (
                            <button onClick={() => setConfirmDelete(key)} style={delBtn}>Eliminar</button>
                          ) : (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                              <span style={{ fontSize: '11.5px', color: 'hsl(0,70%,45%)', fontWeight: 600 }}>¿Seguro?</span>
                              <button onClick={() => handleDeleteFile(rf.obraId, rf.docType, rf.fileName)} style={{ ...delBtn, backgroundColor: 'rgba(220,50,50,0.15)', border: '1px solid rgba(220,50,50,0.4)' }}>Sí</button>
                              <button onClick={() => setConfirmDelete(null)} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>No</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ TAB: INBOX ══ */}
          {activeTab === 'inbox' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-text-bright)', marginBottom: '4px' }}>Buzón Ciudadano</h2>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Mensajes y quejas recibidos en la Secretaría Municipal.</p>
                </div>
                {messages.length > 0 && (
                  <button onClick={() => { localStorage.removeItem('teita_mensajes'); setMessages([]); }} style={{ ...delBtn, fontSize: '13px', padding: '8px 16px' }}>
                    Vaciar buzón
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
                  <svg viewBox="0 0 24 24" style={{ width: '48px', height: '48px', fill: 'var(--color-border)', marginBottom: '16px' }}>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 11H4V8l8 5 8-5v7z"/>
                  </svg>
                  <p style={{ fontSize: '15px' }}>El buzón está vacío.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {messages.map((m) => (
                    <div key={m.id} style={{ border: '1px solid var(--color-border)', padding: '24px', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--color-text-bright)' }}>{m.nombre}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase' }}>
                            {m.asunto === 'tramite' ? 'Consulta' : m.asunto === 'queja' ? 'Queja' : m.asunto === 'sugerencia' ? 'Sugerencia' : m.asunto === 'tequio' ? 'Tequio' : 'Otro'}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{m.fecha}</span>
                      </div>
                      <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap' }}>{m.mensaje}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '14px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-muted)', alignItems: 'center' }}>
                          <span>Correo: <b style={{ color: 'var(--color-text-bright)' }}>{m.email}</b></span>
                          {m.telefono && <span>Teléfono: <b style={{ color: 'var(--color-text-bright)' }}>{m.telefono}</b></span>}
                        </div>
                        <button onClick={() => handleDeleteMessage(m.id)} style={delBtn}>Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ TAB: DIRECTORIO ══ */}
          {activeTab === 'directorio' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-text-bright)', marginBottom: '4px' }}>
                    Directorio de Comercios Locales
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    Administra los negocios de San Juan Teita que se muestran en el sitio público.
                  </p>
                </div>
                <button onClick={handleResetComercios} style={{ ...delBtn, backgroundColor: 'rgba(134,98,67,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-accent)', fontSize: '12px', padding: '8px 16px' }}>
                  Restablecer predeterminados
                </button>
              </div>

              {/* Status */}
              {dirStatus && (
                <div style={{
                  marginBottom: '20px', padding: '12px 16px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600,
                  backgroundColor: dirStatus.type === 'success' ? 'rgba(0,180,100,0.08)' : 'rgba(220,50,50,0.08)',
                  border: `1px solid ${dirStatus.type === 'success' ? 'rgba(0,180,100,0.25)' : 'rgba(220,50,50,0.25)'}`,
                  color: dirStatus.type === 'success' ? 'hsl(150,70%,30%)' : 'hsl(0,70%,45%)',
                }}>
                  {dirStatus.msg}
                </div>
              )}

              {/* Form to add */}
              <form onSubmit={handleAddComercio} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: '#FAFAFA' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--color-text-bright)', margin: 0, fontWeight: 700 }}>
                  Registrar Nuevo Comercio o Servicio
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '16px', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="business-name-input">Nombre / Comercio o Servicio</label>
                    <input
                      id="business-name-input"
                      type="text"
                      className="form-select"
                      style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '14px', backgroundColor: '#fff' }}
                      placeholder="Ej: Abarrotes 'La Espiga' - Don Luis"
                      value={newNombre}
                      onChange={(e) => setNewNombre(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="business-phone-input">Teléfono(s)</label>
                    <input
                      id="business-phone-input"
                      type="text"
                      className="form-select"
                      style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '14px', backgroundColor: '#fff' }}
                      placeholder="Ej: 951 123 4567"
                      value={newTelefono}
                      onChange={(e) => setNewTelefono(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-premium btn-primary"
                  style={{ border: 'none', alignSelf: 'flex-start', fontSize: '13px', padding: '10px 20px', marginTop: '4px' }}
                >
                  Registrar Comercio
                </button>
              </form>

              {/* List of registered businesses */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-text-bright)', marginBottom: '14px' }}>
                  Comercios registrados ({comercios.length})
                </h3>

                {comercios.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed var(--color-border)', borderRadius: '10px', color: 'var(--color-text-muted)', fontSize: '13.5px' }}>
                    No hay comercios registrados en este momento. Usa el formulario de arriba o presiona el botón para restablecer los valores de demostración.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {comercios.map((c) => (
                      <div key={c.id} style={{
                        display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px',
                        borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF',
                      }}>
                        <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'var(--color-primary)', flexShrink: 0, opacity: 0.8 }}>
                          <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H5v-4h7v4z"/>
                        </svg>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-text-bright)', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {c.nombre}
                          </p>
                          <p style={{ fontSize: '12px', color: 'var(--color-primary-light)', fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg viewBox="0 0 24 24" style={{ width: '12px', height: '12px', fill: 'currentColor' }}>
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                            {c.telefono}
                          </p>
                        </div>
                        <button onClick={() => handleDeleteComercio(c.id)} style={delBtn}>Eliminar</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ TAB: CATÁLOGO DE OBRAS ══ */}
          {activeTab === 'obras' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-text-bright)', marginBottom: '4px' }}>
                    Catálogo de Obras Municipales
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    Administra los proyectos de infraestructura del ayuntamiento que se visualizan en el portal público.
                  </p>
                </div>
                <button onClick={handleResetWorks} style={{ ...delBtn, backgroundColor: 'rgba(134,98,67,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-accent)', fontSize: '12px', padding: '8px 16px' }}>
                  Restablecer predeterminadas
                </button>
              </div>

              {/* Status */}
              {worksStatus && (
                <div style={{
                  marginBottom: '20px', padding: '12px 16px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600,
                  backgroundColor: worksStatus.type === 'success' ? 'rgba(0,180,100,0.08)' : 'rgba(220,50,50,0.08)',
                  border: `1px solid ${worksStatus.type === 'success' ? 'rgba(0,180,100,0.25)' : 'rgba(220,50,50,0.25)'}`,
                  color: worksStatus.type === 'success' ? 'hsl(150,70%,30%)' : 'hsl(0,70%,45%)',
                }}>
                  {worksStatus.msg}
                </div>
              )}

              {/* Form to add or edit */}
              <form onSubmit={editingWorkId ? handleUpdateWork : handleAddWork} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: '#FAFAFA' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: 'var(--color-text-bright)', margin: 0, fontWeight: 700 }}>
                  {editingWorkId ? 'Editar Obra Municipal' : 'Registrar Nueva Obra Municipal'}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 180px', gap: '16px', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="work-title-input">Nombre / Descripción de la Obra</label>
                    <input
                      id="work-title-input"
                      type="text"
                      className="form-select"
                      style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '14px', backgroundColor: '#fff' }}
                      placeholder="Ej: Obra 3: Techado de la Cancha Municipal"
                      value={editingWorkId ? editWorkTitle : newWorkTitle}
                      onChange={(e) => editingWorkId ? setEditWorkTitle(e.target.value) : setNewWorkTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="work-category-input">Categoría</label>
                    <input
                      id="work-category-input"
                      type="text"
                      className="form-select"
                      style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '14px', backgroundColor: '#fff' }}
                      placeholder="Ej: Urbanización"
                      value={editingWorkId ? editWorkCategory : newWorkCategory}
                      onChange={(e) => editingWorkId ? setEditWorkCategory(e.target.value) : setNewWorkCategory(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" htmlFor="work-status-input">Estado</label>
                    <select
                      id="work-status-input"
                      className="form-select"
                      style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '14px', backgroundColor: '#fff' }}
                      value={editingWorkId ? editWorkStatus : newWorkStatus}
                      onChange={(e) => editingWorkId ? setEditWorkStatus(e.target.value) : setNewWorkStatus(e.target.value)}
                    >
                      <option value="Concluida">Concluida</option>
                      <option value="En Proceso">En Proceso</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    className="btn-premium btn-primary"
                    style={{ border: 'none', fontSize: '13px', padding: '10px 20px' }}
                  >
                    {editingWorkId ? 'Actualizar Obra' : 'Registrar Obra'}
                  </button>
                  {editingWorkId && (
                    <button
                      type="button"
                      className="btn-premium"
                      style={{ border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-text-muted)', fontSize: '13px', padding: '10px 20px' }}
                      onClick={() => setEditingWorkId(null)}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>

              {/* List of registered works */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--color-text-bright)', marginBottom: '14px' }}>
                  Obras registradas ({works.length})
                </h3>

                {works.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed var(--color-border)', borderRadius: '10px', color: 'var(--color-text-muted)', fontSize: '13.5px' }}>
                    No hay obras registradas en este momento. Usa el formulario de arriba o presiona el botón para restablecer las obras por defecto.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {works.map((w) => (
                      <div key={w.id} style={{
                        display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px',
                        borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#FFFFFF',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-bright)', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                            {w.title}
                          </p>
                          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, marginTop: '2px' }}>
                            Categoría: <span style={{ color: 'var(--color-text-bright)', fontWeight: 600 }}>{w.category}</span> · Estado: <span style={{ 
                              color: w.status === 'Concluida' ? 'hsl(140, 70%, 35%)' : 'hsl(40, 90%, 40%)', 
                              fontWeight: 700,
                              backgroundColor: w.status === 'Concluida' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              display: 'inline-block',
                              marginLeft: '4px'
                            }}>{w.status}</span>
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              setEditingWorkId(w.id);
                              setEditWorkTitle(w.title);
                              setEditWorkCategory(w.category);
                              setEditWorkStatus(w.status);
                            }}
                            style={{ ...delBtn, backgroundColor: 'rgba(0,188,212,0.06)', border: '1px solid rgba(0,188,212,0.2)', color: 'var(--color-primary)' }}
                          >
                            Editar
                          </button>
                          <button onClick={() => handleDeleteWork(w.id)} style={delBtn}>Eliminar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
