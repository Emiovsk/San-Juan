# Portal Web Oficial - Municipio de San Juan Teita, Oaxaca

Este repositorio contiene el código fuente completo del portal web oficial del **Honorable Ayuntamiento de San Juan Teita, Oaxaca** (Distrito de Tlaxiaco, Región Mixteca Alta). 

El sitio ha sido diseñado con un enfoque estético premium de alto impacto visual, utilizando una paleta de colores tierra y orgánica (Turquesa `#00BCD4`, Tierra `#866243`, Naranja Coral `#FF7043` y Blanco `#FAFAFA`) que representa la riqueza natural y el arraigo cultural mixteco de la comunidad. 

El portal es completamente responsivo, rápido y autogestionable por el personal del ayuntamiento.

---

## Características Principales

### 1. Inicio
*   Carrusel dinámico con imágenes representativas y escudo del municipio.
*   Mensaje institucional de bienvenida y sección de últimas noticias/eventos comunitarios.
*   Acceso rápido a trámites y transparencia mediante botones estilizados.

### 2. Sección "Tu Municipio" (Menú Desplegable)
Replica el menú de navegación del ayuntamiento de referencia mediante una barra responsiva:
*   **Conócelo**: Acordeón interactivo con la toponimia del municipio, reseña histórica (incluyendo conflictos resueltos ejidales con Tataltepec), datos demográficos basados en el censo 2020 de INEGI (544 habitantes), labor del tejido de palma y festividades populares (24 de Junio, San Juan Bautista).
*   **Administración Municipal**: Presentación del Cabildo electo bajo el sistema de Usos y Costumbres en tarjetas dinámicas.
*   **Trámites y Servicios**: Requisitos detallados de gestiones usuales (Constancias de residencia, productor agrícola y permisos de eventos). Incluye la validación tradicional mixteca de estar al corriente con el **Tequio comunitario**.
*   **Atención Ciudadanía**: Horarios oficiales del Palacio Municipal, canales directos de contacto (teléfono, email) y enlace directo al Buzón en línea.
*   **Directorio Comercial**: Tabla premium de comercios y artesanos de palma del municipio con rayas alternadas orgánicas, buscador inteligente en tiempo real y badges de llamada directa (`tel:`) para smartphones.

### 3. Transparencia Municipal
*   Estructura basada en las Fracciones Oficiales de la Ley de Transparencia de Oaxaca.
*   Interactividad en la consulta de documentos públicos con retroalimentación visual al ciudadano ("Documento en trámite") en lugar de enlaces rotos o descargas vacías.

### 4. Inversión Pública (Obras)
*   Tabla de proyectos y obras de infraestructura social (Agua potable, pavimentaciones, etc.).
*   Carga en tiempo real de los expedientes de obra (Contratos, Actas de entrega, Reportes fotográficos) administrados desde la consola de control.

### 5. Buzón Ciudadano e Inbox Administrativo
*   Formulario de contacto interactivo que guarda las consultas, quejas y sugerencias directamente en un buzón persistente para su revisión.

### 6. Panel de Control de Administración (`?admin=true`)
Consola autogestionable interna para el personal del Ayuntamiento, accesible agregando `?admin=true` al final de la URL, que permite:
*   **Gestión de Obras**: Subida de PDFs de obras mediante arrastrar y soltar (drag-and-drop), los cuales se publican automáticamente para descarga ciudadana.
*   **Buzón Ciudadano**: Lectura, gestión y eliminación de mensajes enviados por los pobladores de San Juan Teita.
*   **Administrador de Directorio Comercial**: Formulario para agregar nuevos negocios locales, listar los existentes y darlos de baja de forma inmediata con un solo clic.

---

## Stack Tecnológico y Arquitectura

*   **Frontend**: React + TypeScript + Vite.
*   **Estilos**: CSS Vanilla con variables de diseño unificadas HSL para animaciones e interactividad avanzada.
*   **Backend**: Node.js + Express (Servidor de producción VPS en `server.js`).
*   **Subida de Archivos**: Configurado con `multer` para procesar archivos PDF de hasta 25MB de forma segura.
*   **Seguridad**: 
    *   Todas las acciones críticas del servidor (`POST /api/upload` y `DELETE /api/docs/:name`) están protegidas con el middleware `requireAdmin` y requieren la cabecera `x-admin-token`.
    *   El frontend adjunta el token administrativo de forma automática y silenciosa, garantizando que **ninguna contraseña sea visible en el código fuente de JS expuesto al público**.
*   **Modo de Desarrollo Local (SW/IndexedDB)**: En caso de correr de forma local (sin el servidor Node activo), el frontend conmuta automáticamente a modo local utilizando un Service Worker y base de datos IndexedDB en el navegador para simular el almacenamiento y subida de archivos de manera 100% interactiva.

---

## Guía de Desarrollo Local

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Correr en modo desarrollo local (Vite)**:
    ```bash
    npm run dev
    ```
    El portal correrá en `http://localhost:5173/` (o puerto disponible). Para entrar a la administración, ingresa a `http://localhost:5173/?admin=true`.

3.  **Compilar para producción (Build)**:
    ```bash
    npm run build
    ```
    Esto generará la carpeta `dist/` optimizada con los recursos listos para producción.

---

## Despliegue en Servidor de Producción (VPS)

Para desplegar la aplicación de forma permanente en un VPS, se utiliza el servidor de producción Express provisto en `server.js`:

1.  **Compilar el proyecto**:
    ```bash
    npm run build
    ```

2.  **Iniciar el servidor de Node**:
    ```bash
    npm start
    ```
    El servidor Express escuchará por defecto en el puerto `3000` (o el especificado en la variable `PORT` de tu sistema).

3.  **Configurar PM2 (Recomendado para VPS)**:
    Para mantener el servidor corriendo de forma continua en segundo plano y recuperarse de reinicios:
    ```bash
    npm install -g pm2
    pm2 start server.js --name "teita-portal"
    pm2 save
    pm2 startup
    ```

4.  **Configuración de Contraseña de API**:
    Por defecto, la API utiliza el token `TeitaAdmin2026#` para autenticar peticiones de administración. Si deseas cambiar esta contraseña sin modificar el código, puedes definir la variable de entorno en tu servidor VPS antes de iniciar Express:
    ```bash
    export ADMIN_PASSWORD="TuNuevaClaveSegura123#"
    ```

---

## Estructura del Proyecto

```text
san-juan-teita/
├── dist/                     # Build optimizado para producción
├── public/                   # Recursos estáticos públicos (imágenes, sw.js)
├── server.js                 # Servidor de producción Express para VPS
├── src/
│   ├── assets/               # Imágenes y estilos globales
│   ├── components/           # Componentes modulares de React
│   │   ├── AdminMunicipal.tsx   # Vista de Cabildo Municipal
│   │   ├── AdminPanel.tsx       # Consola de Administración completa
│   │   ├── Atencion.tsx         # Horarios e información del Palacio
│   │   ├── Contacto.tsx         # Mapa y formulario de contacto
│   │   ├── DirectorioComercial.tsx # Directorio y buscador de negocios
│   │   ├── Footer.tsx           # Pie de página oficial
│   │   ├── Header.tsx           # Encabezado con menú desplegable responsivo
│   │   ├── Inicio.tsx           # Página de inicio del portal
│   │   ├── Municipio.tsx        # Sección "Conócelo" (Historia y geografía)
│   │   ├── Obras.tsx            # Inversión Pública y expedientes
│   │   └── Transparencia.tsx    # Fracciones de la Ley de Transparencia
│   ├── App.tsx               # Enrutador principal y estados
│   ├── index.css             # Hoja de estilos premium y diseño responsivo
│   └── main.tsx              # Punto de entrada de la aplicación
├── package.json              # Configuración y dependencias del proyecto
└── tsconfig.json             # Configuración de TypeScript
```

---

## Licencia y Derechos
Desarrollado para el **Ayuntamiento de San Juan Teita, Oaxaca**. Todos los derechos reservados © 2026.
