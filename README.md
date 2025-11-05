# Rudiment Practice App

Una aplicación web para estudiantes de percusión marching en Panamá, enfocada en la práctica de rudimentos básicos, intermedios y avanzados.

## Despliegue en Vercel

Instrucciones rápidas para desplegar la aplicación en Vercel:

1. Conecta el repositorio a Vercel (https://vercel.com) y selecciona la rama `develop` o `main` según prefieras.
2. Vercel detectará un proyecto estático y ejecutará `npm run build` por defecto. El `vercel.json` incluido fuerza que todas las rutas sean reescritas a `index.html`, necesario para aplicaciones SPA usando `BrowserRouter`.
3. Si prefieres usar la CLI:

```bash
# instalar la CLI si no la tienes 
npm i -g vercel
vercel login
# desde la carpeta del proyecto
vercel --prod
```

Notas:
- El build output se encuentra en `build/` (configurado por Create React App y por `vercel.json`).
- Si quieres que las rutas se sirvan correctamente al recargar una URL (p. ej. `/rudiment/some-slug`), el `vercel.json` proporciona la regla de reescritura.

Si quieres que haga el despliegue por ti (ejecutando `npm ci` y `npm run build` en mi entorno) dímelo y lo hago. También puedo añadir un workflow de GitHub Actions si prefieres despliegues automáticos.

## Características

- **Niveles de Dificultad**: Básico, Intermedio y Avanzado
- **Explorar + Detalle**: Ruteo con páginas para explorar y practicar cada rudimento
- **Metrónomo Mejorado**: 40–220 BPM, Tap Tempo, acento configurable y feedback visual
- **Lista de Rudimentos**: Basada en los estándares de la Percussive Arts Society (PAS)
- **Sticking Viewer**: Visualiza R/L, acentos y notas de gracia de forma clara
- **Consejos (Tips)**: Nueva sección con recomendaciones de técnica, postura y rutinas de práctica
- **Tema**: El tema (claro/oscuro) sí se guarda en `localStorage`.
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
- **Almacenamiento**: El tema de la UI (claro/oscuro) se guarda en `localStorage`. Favoritos y progreso funcionan en memoria (single-session) por diseño: se mantienen mientras la pestaña está abierta pero no se sincronizan ni persisten automáticamente entre dispositivos. Existe un plan de export/import para respaldos manuales.

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
3. Ajusta BPM, acentos o usa Tap Tempo durante tu práctica.
4. Ten en cuenta que estos marcadores y el progreso se almacenan en memoria y no se guardan entre sesiones. Puedes visitar la página "Consejos" para ver recomendaciones y rutinas de práctica.

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