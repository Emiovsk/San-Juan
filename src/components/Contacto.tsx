import React, { useState } from 'react';

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.nombre.trim() === '' ||
      formData.email.trim() === '' ||
      formData.asunto === '' ||
      formData.mensaje.trim() === ''
    ) {
      setFormStatus('error');
      return;
    }

    try {
      // Retrieve existing messages from LocalStorage
      const existing = localStorage.getItem('teita_mensajes');
      const messages = existing ? JSON.parse(existing) : [];

      // Create new message object
      const newMessage = {
        id: 'msg_' + Date.now(),
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        asunto: formData.asunto,
        mensaje: formData.mensaje.trim(),
        fecha: new Date().toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Push and save back
      messages.unshift(newMessage); // Add to the top
      localStorage.setItem('teita_mensajes', JSON.stringify(messages));

      setFormStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
      });

      // Clear success feedback banner after 7 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 7000);
    } catch (err) {
      console.error('Error saving message:', err);
      setFormStatus('error');
    }
  };

  return (
    <section id="contacto" className="site-section section-padding">
      <div className="section-header">
        <h2 className="section-title">Contacto</h2>
        <span className="section-subtitle">Portal de Atención Directa y Ubicación</span>
      </div>

      <div className="contact-layout">
        {/* Contact details */}
        <div>
          <h3 className="hero-title" style={{ fontSize: '32px', marginBottom: '24px' }}>Atención Ciudadana</h3>
          <p className="hero-description" style={{ marginBottom: '32px' }}>
            Ponemos a su disposición los canales oficiales de comunicación con el Ayuntamiento de San Juan Teita. Estamos para atender sus dudas, trámites y reportes comunitarios.
          </p>

          <div className="contact-info-blocks">
            {/* Block 1: Address */}
            <div className="contact-info-widget">
              <div className="contact-widget-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
              </div>
              <div className="contact-widget-content">
                <h4>Ubicación Municipal</h4>
                <p>Palacio Municipal, Plaza Principal S/N, Centro, C.P. 69830, San Juan Teita, Tlaxiaco, Oaxaca, México.</p>
              </div>
            </div>

            {/* Block 2: Phone */}
            <div className="contact-info-widget">
              <div className="contact-widget-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.72 11.72 0 0 0 3.66.58 1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .58 3.66 1 1 0 0 1-.27 1.11z"/>
                </svg>
              </div>
              <div className="contact-widget-content">
                <h4>Teléfono Oficial</h4>
                <p><a href="tel:+529511234567" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>(951) 123 4567</a><br/>Horario de atención del Cabildo.</p>
              </div>
            </div>

            {/* Block 3: Mail */}
            <div className="contact-info-widget">
              <div className="contact-widget-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="contact-widget-content">
                <h4>Correo Electrónico</h4>
                <p><a href="mailto:contacto@sanjuanteita.gob.mx" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>contacto@sanjuanteita.gob.mx</a></p>
              </div>
            </div>
          </div>

          {/* Real Google Maps embed pointing to San Juan Teita, Oaxaca */}
          <div className="map-widget" style={{ height: '240px', marginTop: '30px' }}>
            <iframe 
              src="https://maps.google.com/maps?q=San%20Juan%20Teita,%20Oaxaca,%20Mexico&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Mapa oficial del Municipio de San Juan Teita, Oaxaca"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card form-card">
          <h3 className="form-title">Envíanos un Mensaje</h3>
          <p className="form-desc">Los mensajes enviados se reciben directamente en la Secretaría Municipal para su canalización.</p>
          
          {/* Form feedbacks using clean inline SVGs */}
          {formStatus === 'success' && (
            <div className="alert-feedback success">
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor', marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              ¡Mensaje enviado con éxito! Agradecemos su participación ciudadana, nos comunicaremos a la brevedad.
            </div>
          )}

          {formStatus === 'error' && (
            <div className="alert-feedback error">
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor', marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              Ocurrió un error al procesar el envío. Por favor, asegúrese de completar los campos obligatorios.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                className="form-input"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez López"
                required
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  className="form-input"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="10 dígitos"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="asunto">Asunto Principal *</label>
              <select
                id="asunto"
                className="form-select"
                value={formData.asunto}
                onChange={handleChange}
                required
              >
                <option value="">-- Seleccione una opción --</option>
                <option value="tramite">Consulta sobre Trámite</option>
                <option value="tequio">Información sobre Tequio / Obras</option>
                <option value="queja">Reporte o Queja Ciudadana</option>
                <option value="sugerencia">Sugerencia para el Cabildo</option>
                <option value="otro">Otro Asunto</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mensaje">Mensaje detallado *</label>
              <textarea
                id="mensaje"
                className="form-textarea"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escriba aquí su mensaje con claridad..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-premium btn-primary" style={{ width: '100%', border: 'none' }}>
              Enviar Mensaje Oficial
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
