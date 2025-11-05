import React from 'react';

export default function Tips() {
  return (
    <div className="tips-page">
      <h1>Consejos para practicar rudimentos</h1>
      <p className="lead">Aquí tienes una guía práctica y estructurada para mejorar técnica, postura y resultados en tus sesiones de práctica.</p>

      <div className="tips-grid">
        <section className="card">
          <h2>Postura y ajuste</h2>
          <ul>
            <li>Mantén la espalda erguida y relajada. Evita encorvar el torso.</li>
            <li>Siéntate con ambos pies apoyados para estabilidad.</li>
            <li>Ajusta la altura del tambor o pad para que los brazos queden a un ángulo cómodo (codos ligeramente abajo).</li>
          </ul>
        </section>

        <section className="card">
          <h2>Sujeción (grip) y fulcro</h2>
          <ul>
            <li>Localiza el fulcro (punto de apoyo) en la baqueta — normalmente entre el primer y segundo nudillo.</li>
            <li>Mantén el agarre lo suficientemente firme para controlar la baqueta, pero sin tensión excesiva en la mano.</li>
            <li>Deja que la baqueta rebote naturalmente; usa el fulcro como punto de apoyo para el rebote.</li>
          </ul>
        </section>

        <section className="card">
          <h2>Sticking / Grid y patrones</h2>
          <ul>
            <li>Trabaja patrones lentamente al principio. La velocidad viene de la precisión.</li>
            <li>Fragmenta rudimentos en celdas (grids) y practica cada celda hasta sentir control.</li>
            <li>Usa control de altura y dinámica: práctica fuerte/soft y accents para equilibrio.</li>
          </ul>
        </section>

        <section className="card">
          <h2>Uso del metrónomo</h2>
          <ul>
            <li>Comienza a tempo lento y sube gradualmente en incrementos pequeños (ej. 2-5 BPM).</li>
            <li>Practica subdivisiones: pulsa corcheas, tresillos o subdivisiones necesarias según el rudimento.</li>
            <li>Prueba ejercicios de 'backing off' (tocar en los off-beats) para mejorar la independencia.</li>
          </ul>
        </section>

        <section className="card">
          <h2>Rutinas de práctica</h2>
          <ol>
            <li>Calentamiento (5-10 min): golpes simples, paradiddles, rolls suaves.</li>
            <li>Trabajo técnico (15-25 min): un rudimento o patrón focal a velocidad lenta-moderada.</li>
            <li>Aplicación musical (10-15 min): integra el rudimento en fills, grooves o rudimental drum beats.</li>
            <li>Enfriamiento y reflexión (5 min): nota progresos y define el foco para la próxima sesión.</li>
          </ol>
        </section>

        <section className="card">
          <h2>Consejos adicionales</h2>
          <ul>
            <li>Grábate y escucha — detectarás tensiones y áreas de mejora que no ves en tiempo real.</li>
            <li>Varía la dinámica y las superficies de práctica (pad, tambor, cojín) para sensibilidad y control.</li>
            <li>Mantén sesiones cortas y frecuentes en vez de largas y esporádicas; la consistencia gana.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
