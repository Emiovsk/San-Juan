// Service Worker — sirve PDFs guardados en IndexedDB como si fueran archivos reales
const DB_NAME = 'teita_docs_v1';
const STORE = 'files';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore(STORE, { keyPath: 'name' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Recibe archivos desde la página
self.addEventListener('message', async (event) => {
  if (event.data?.type === 'STORE_FILE') {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put({ name: event.data.name, buffer: event.data.buffer, mime: event.data.mime });
      event.ports[0]?.postMessage({ ok: true });
    } catch (err) {
      event.ports[0]?.postMessage({ ok: false, error: String(err) });
    }
  }
  if (event.data?.type === 'DELETE_FILE') {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(event.data.name);
    } catch {}
  }
  if (event.data?.type === 'CLEAR_FILES') {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
    } catch {}
  }
});

// Intercepta peticiones a /assets/docs/ y las sirve desde IndexedDB
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/assets/docs/')) {
    const fileName = decodeURIComponent(url.pathname.split('/').pop() || '');
    if (!fileName) return;
    event.respondWith(
      openDB().then((db) => {
        return new Promise((resolve) => {
          const tx = db.transaction(STORE, 'readonly');
          const req = tx.objectStore(STORE).get(fileName);
          req.onsuccess = () => {
            if (req.result?.buffer) {
              resolve(new Response(req.result.buffer, {
                status: 200,
                headers: {
                  'Content-Type': req.result.mime || 'application/pdf',
                  'Content-Disposition': `inline; filename="${fileName}"`,
                },
              }));
            } else {
              resolve(new Response('Archivo no encontrado', { status: 404 }));
            }
          };
          req.onerror = () => resolve(new Response('Error', { status: 500 }));
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
