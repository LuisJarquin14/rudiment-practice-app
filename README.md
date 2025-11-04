# Rudiment Practice App

Una aplicación web para estudiantes de percusión marching en Panamá, enfocada en la práctica de rudimentos básicos, intermedios y avanzados.

## Características

- **Niveles de Dificultad**: Básico, Intermedio y Avanzado
- **Explorar + Detalle**: Ruteo con páginas para explorar y practicar cada rudimento
- **Metrónomo Mejorado**: 40–220 BPM, Tap Tempo, acento configurable y feedback visual
- **Lista de Rudimentos**: Basada en los estándares de la Percussive Arts Society (PAS)
- **Sticking Viewer**: Visualiza R/L, acentos y notas de gracia de forma clara
- **Favoritos + Progreso**: Guarda progreso y favoritos localmente (localStorage)
- **UI Moderna**: Diseño responsivo, rápido y accesible

## Rudimentos Incluidos

### Básico
- Single Stroke Roll
- Single Stroke Four
- Single Stroke Seven
- Multiple Bounce Roll
- Triple Stroke Roll

### Intermedio
- Double Stroke Roll
- Five Stroke Roll
- Seven Stroke Roll
- Flam
- Flam Accent
- Drag
- Single Drag Tap

### Avanzado
- Paradiddle
- Double Paradiddle
- Flam Paradiddle
- Single Ratamacue
- Swiss Army Triplet

## Tecnologías Utilizadas

- **Frontend**: React.js
- **Audio**: Web Audio API para el metrónomo
- **Estilos**: CSS puro
- **Almacenamiento**: localStorage para progreso

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/LuisJarquin14/rudiment-practice-app.git
   cd rudiment-practice-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. En "Explorar", elige nivel (Básico/Intermedio/Avanzado) y busca.
2. Abre un rudimento para ver su detalle, sticking y metrónomo.
3. Ajusta BPM, acentos o usa Tap Tempo. Marca como completado.
4. Guarda favoritos para acceso rápido desde la lista de Explore.

## Contribución

Este proyecto está diseñado para expandirse con:
- Más rudimentos (incluyendo híbridos)
- Integración con APIs externas (videos tutoriales, partituras)
- Backend para tracking avanzado
- Modo de práctica con secuencias aleatorias

¡Contribuciones son bienvenidas! Abre un issue o pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## Contacto

Para preguntas o sugerencias, contacta a [LuisJarquin14](https://github.com/LuisJarquin14).