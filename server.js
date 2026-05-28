// server.js — Servidor de producción para San Juan Teita
// Ejecutar con: node server.js
// En VPS: pm2 start server.js --name teita

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ── Configuración de Seguridad Administrativa ──────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TeitaAdmin2026#';

// Middleware para verificar la contraseña de administración
const requireAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.headers['authorization'];
  if (token === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ ok: false, error: 'Acceso denegado. Token administrativo inválido o ausente.' });
  }
};

// ── Carpeta donde se guardan los PDFs ─────────────────────────────────────
// En producción (VPS): dist/assets/docs/
// Los archivos ahí son servidos directamente por Express como estáticos
const DOCS_DIR = path.join(__dirname, 'dist', 'assets', 'docs');
fs.mkdirSync(DOCS_DIR, { recursive: true }); // Crear si no existe

// ── Middlewares ───────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Archivos estáticos (el build de React/Vite)
app.use(express.static(path.join(__dirname, 'dist')));

// ── Multer: configuración de subida ──────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, DOCS_DIR),
  filename: (_req, file, cb) => {
    // Usar el nombre original del archivo (ya validado en frontend)
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // Máx 25 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'));
    }
  },
});

// ── API: Login Administrativo ─────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === ADMIN_PASSWORD) {
    console.log(`[Security] Login exitoso para el usuario 'admin'`);
    res.json({ ok: true, token: ADMIN_PASSWORD });
  } else {
    console.warn(`[Security] Intento de login fallido para el usuario '${username || 'desconocido'}'`);
    res.status(401).json({ ok: false, error: 'Usuario o contraseña incorrectos' });
  }
});

// ── API: Subir PDF ────────────────────────────────────────────────────────
app.post('/api/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: 'No se recibió ningún archivo' });
  }
  console.log(`[Upload] Archivo guardado: ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)`);
  res.json({ ok: true, fileName: req.file.originalname, size: req.file.size });
});

// ── API: Listar archivos en docs/ ─────────────────────────────────────────
app.get('/api/docs', (_req, res) => {
  try {
    const files = fs.readdirSync(DOCS_DIR)
      .filter(f => f.toLowerCase().endsWith('.pdf'))
      .map(f => {
        const stat = fs.statSync(path.join(DOCS_DIR, f));
        return { name: f, size: stat.size, modified: stat.mtime };
      });
    res.json({ ok: true, files });
  } catch {
    res.json({ ok: true, files: [] });
  }
});

// ── API: Eliminar PDF ─────────────────────────────────────────────────────
app.delete('/api/docs/:name', requireAdmin, (req, res) => {
  const safeName = path.basename(req.params.name); // Sanitize path traversal
  const filePath = path.join(DOCS_DIR, safeName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`[Delete] Archivo eliminado: ${safeName}`);
    res.json({ ok: true });
  } else {
    res.status(404).json({ ok: false, error: 'Archivo no encontrado' });
  }
});

// ── SPA Fallback (React Router) ───────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ── Error handler ─────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Error]', err.message);
  res.status(400).json({ ok: false, error: err.message });
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor San Juan Teita corriendo en http://localhost:${PORT}`);
  console.log(`📁 Carpeta de documentos: ${DOCS_DIR}\n`);
});
