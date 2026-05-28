import React, { useState } from 'react';

export const Municipio: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const accordionItems = [
    {
      title: 'Nomenclatura y Toponimia',
      content: (
        <>
          <p>
            El nombre del municipio tiene un origen que combina la fe religiosa española con la tradición indígena. El término <b>"San Juan"</b> fue establecido en honor al santo patrón de la comunidad, <b>San Juan Bautista</b>.
          </p>
          <p>
            Por su parte, el vocablo <b>"Teita"</b> proviene de relatos ancestrales propios de la tradición oral mixteca. Cuenta la leyenda que hace siglos, un habitante de la zona montañosa fue arrastrado por la fuerte corriente de un arroyo crecido. Al salvar la vida y lograr salir a salvo en el paraje donde hoy se encuentra el poblado, la comunidad designó este asentamiento como un lugar de bendición y refugio seguro en medio de la serranía, derivando en el nombre que perdura con orgullo hasta nuestros días.
          </p>
        </>
      ),
    },
    {
      title: 'Reseña Histórica',
      content: (
        <>
          <p>
            San Juan Teita se ha consolidado históricamente como una comunidad unida de la región Mixteca Alta. A lo largo del siglo pasado, el municipio superó periodos climáticos y sociales difíciles, incluyendo sequías prolongadas que afectaron los cultivos de autoconsumo e invasiones de plagas de langostas que pusieron a prueba la resiliencia comunitaria.
          </p>
          <p>
            En la década de los setenta, la comunidad enfrentó conflictos por límites ejidales con el municipio vecino de Santa María Tataltepec. Gracias a la sabiduría de los consejos de caracterizados (ancianos respetables de la comunidad) y a las asambleas, se alcanzaron acuerdos pacíficos que garantizaron la estabilidad y el cese de rivalidades territoriales. Actualmente, Teita destaca por ser un territorio de paz, gobernado firmemente por sus propios acuerdos de asamblea comunitaria.
          </p>
        </>
      ),
    },
    {
      title: 'Demografía y Economía',
      content: (
        <>
          <p>
            De acuerdo con el Censo de Población y Vivienda 2020 del INEGI, San Juan Teita cuenta con una población total de <b>544 habitantes</b>. Su estructura demográfica se caracteriza por una estrecha cohesión familiar y un fuerte sentido de pertenencia a su tierra de origen.
          </p>
          <p>
            La economía municipal está sustentada principalmente en actividades de agricultura de subsistencia (siembra de maíz, frijol y calabaza de temporal). Asimismo, destaca la valiosa y tradicional labor artesanal del <b>tejido de palma</b>, con la cual las familias elaboran sombreros, petates y canastos. La migración temporal y las remesas juegan también un rol de soporte financiero fundamental, pero la vida local se rige por el trabajo solidario del <b>tequio</b>, donde los ciudadanos aportan su esfuerzo físico gratuito para el mantenimiento de caminos, escuelas y edificios públicos.
          </p>
        </>
      ),
    },
    {
      title: 'Cultura y Fiestas Populares',
      content: (
        <>
          <p>
            La mayor muestra de identidad de San Juan Teita se refleja en sus solemnes celebraciones y tradiciones culturales. La festividad principal se lleva a cabo el <b>24 de junio</b> en honor al Santo Patrón, <b>San Juan Bautista</b>. La celebración incluye misas solemnes, calendas con tradicionales faroles hechos de carrizo y papel de colores, bailes populares amenizados por la banda filarmónica de viento de la comunidad, y una colorida feria popular.
          </p>
          <p>
            Otras fechas de profunda devoción son la festividad de la <b>Santa Cruz el 3 de mayo</b> y la fiesta en honor a la <b>Virgen del Rosario el 1 de octubre</b>. Estas conmemoraciones sirven como punto de reencuentro de los paisanos radicados en otros estados de la República o el extranjero, quienes regresan para reafirmar sus lazos de hermandad y lealtad con su comunidad de origen.
          </p>
        </>
      ),
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="municipio" className="site-section section-padding">
      <div className="section-header">
        <h2 className="section-title">Tu Municipio</h2>
        <span className="section-subtitle">Identidad, Historia y Tradición Mixteca</span>
      </div>

      <div className="municipio-layout">
        {/* Custom Interactive Accordion */}
        <div className="accordion">
          {accordionItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                <button
                  className="accordion-trigger"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="accordion-title-wrapper">
                    <span className="accordion-number">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="accordion-title">{item.title}</span>
                  </div>
                  <span className="accordion-icon">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  className="accordion-panel"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="accordion-content">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Info Box */}
        <div className="glass-card sidebar-widget">
          <h3 className="info-box-title">Datos Rápidos</h3>
          <div className="facts-list">
            <div className="fact-row">
              <span className="fact-label">Ubicación</span>
              <span className="fact-value">Distrito de Tlaxiaco, Oaxaca</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">Región</span>
              <span className="fact-value">Mixteca Alta</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">Clima</span>
              <span className="fact-value">Semicálido subhúmedo</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">Flora Típica</span>
              <span className="fact-value">Encinos, Cactus, Palmas y Árboles Frutales</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">Artesanía</span>
              <span className="fact-value">Tejido de sombreros y petates de palma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
