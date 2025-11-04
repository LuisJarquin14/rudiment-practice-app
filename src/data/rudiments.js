export const LEVELS = [
  { id: 'basic', label: 'Básico' },
  { id: 'intermediate', label: 'Intermedio' },
  { id: 'advanced', label: 'Avanzado' },
];

// Nota: Nombres según la lista PAS 40 (nombres son hechos, no texto protegido).
// Descripciones y stickings son breves y originales, solo como guía.
export const RUDIMENTS = [
  // Single Stroke Rudiments
  { slug: 'single-stroke-roll', name: 'Single Stroke Roll', category: 'single-stroke', level: 'basic', description: 'Alterna manos de forma pareja.', sticking: 'R L R L', image: '01-single-stroke-roll.jpeg' },
  { slug: 'single-stroke-four', name: 'Single Stroke Four', category: 'single-stroke', level: 'basic', description: 'Grupo de 4 golpes alternados.', sticking: 'R L R L', image: '02-single-stroke-4.png' },
  { slug: 'single-stroke-seven', name: 'Single Stroke Seven', category: 'single-stroke', level: 'basic', description: 'Grupo de 7 golpes alternados.', sticking: 'R L R L R L R', image: '03_Single_Stroke_7.webp' },

  // Multiple Bounce Roll Rudiments
  { slug: 'multiple-bounce-roll', name: 'Multiple Bounce Roll', category: 'multiple-bounce', level: 'basic', description: 'Buzz/press roll uniforme.', sticking: 'rrrr llll', image: '04_Multiple_Bounce_Roll.webp' },
  { slug: 'triple-stroke-roll', name: 'Triple Stroke Roll', category: 'multiple-bounce', level: 'basic', description: 'Tres golpes por mano.', sticking: 'RRR LLL', image: '05_Triple_Stroke_Roll.webp' },

  // Double Stroke Open Roll Rudiments
  { slug: 'double-stroke-roll', name: 'Double Stroke Roll', category: 'double-stroke', level: 'basic', description: 'Dos golpes por mano (abierto).', sticking: 'RR LL', image: '06_Double_Stroke_Roll.webp' },
  { slug: 'five-stroke-roll', name: 'Five Stroke Roll', category: 'double-stroke', level: 'basic', description: 'Dos diddles + acento final.', sticking: 'RR LL R', image: '06_Five_Stroke_Roll.webp' },
  { slug: 'six-stroke-roll', name: 'Six Stroke Roll', category: 'double-stroke', level: 'intermediate', description: 'Acentos en extremos con diddles al centro.', sticking: 'R ll rr L', image: '08_Six_Stroke_Roll.webp' },
  { slug: 'seven-stroke-roll', name: 'Seven Stroke Roll', category: 'double-stroke', level: 'intermediate', description: 'Tres diddles + acento.', sticking: 'RR LL RR L', image: '9_seven-stroke-roll.webp' },
  { slug: 'nine-stroke-roll', name: 'Nine Stroke Roll', category: 'double-stroke', level: 'intermediate', description: 'Cuatro diddles + acento.', sticking: 'RR LL RR LL R', image: '10_nine-stroke-roll.webp' },
  { slug: 'ten-stroke-roll', name: 'Ten Stroke Roll', category: 'double-stroke', level: 'intermediate', description: 'Cuatro diddles + dos acentos.', sticking: 'RR LL RR LL R L', image: '11_ten-stroke-roll.webp' },
  { slug: 'eleven-stroke-roll', name: 'Eleven Stroke Roll', category: 'double-stroke', level: 'intermediate', description: 'Cinco diddles + acento.', sticking: 'RR LL RR LL RR L', image: '12_eleven-stroke-roll.webp' },
  { slug: 'thirteen-stroke-roll', name: 'Thirteen Stroke Roll', category: 'double-stroke', level: 'advanced', description: 'Seis diddles + acento.', sticking: 'RR LL RR LL RR LL R', image: '13_thirteen-stroke-roll.webp' },
  { slug: 'fifteen-stroke-roll', name: 'Fifteen Stroke Roll', category: 'double-stroke', level: 'advanced', description: 'Siete diddles + acento.', sticking: 'RR LL RR LL RR LL RR L', image: '14_fifteen-stroke-roll.webp' },
  { slug: 'seventeen-stroke-roll', name: 'Seventeen Stroke Roll', category: 'double-stroke', level: 'advanced', description: 'Ocho diddles + acento.', sticking: 'RR LL RR LL RR LL RR LL R', image: '15_seventeen-stroke-roll.webp' },

  // Diddle Rudiments
  { slug: 'single-paradiddle', name: 'Single Paradiddle', category: 'diddle', level: 'basic', description: 'Dos simples + un diddle.', sticking: 'R L R R L R L L', image: '16_single-paradiddle.webp' },
  { slug: 'double-paradiddle', name: 'Double Paradiddle', category: 'diddle', level: 'intermediate', description: 'Cuatro simples + un diddle.', sticking: 'R L R L R R L R L R L L', image: '17_double-paradiddle.webp' },
  { slug: 'triple-paradiddle', name: 'Triple Paradiddle', category: 'diddle', level: 'advanced', description: 'Seis simples + un diddle.', sticking: 'R L R L R L R R L R L R L L', image: '18_triple-paradiddle.webp' },
  { slug: 'paradiddle-diddle', name: 'Paradiddle-diddle', category: 'diddle', level: 'intermediate', description: 'Paradiddle + diddle extra.', sticking: 'R L R R L L', image: '19_paradiddle-diddle.webp' },

  // Flam Rudiments
  { slug: 'flam', name: 'Flam', category: 'flam', level: 'basic', description: 'Nota de gracia + nota principal.', sticking: 'r L / l R', image: '20_flam.webp' },
  { slug: 'flam-accent', name: 'Flam Accent', category: 'flam', level: 'intermediate', description: 'Flam + dos taps en grupo de tres.', sticking: 'r L R / l R L', image: '21_flam-accent.webp' },
  { slug: 'flam-tap', name: 'Flam Tap', category: 'flam', level: 'intermediate', description: 'Diddles con flam en el primer golpe.', sticking: 'r R l L', image: '22_flam-tap.webp' },
  { slug: 'flamacue', name: 'Flamacue', category: 'flam', level: 'intermediate', description: 'Flam con acentos desplazados.', sticking: 'r L R r L', image: '23_flamacue.webp' },
  { slug: 'flam-paradiddle', name: 'Flam Paradiddle', category: 'flam', level: 'intermediate', description: 'Paradiddle con flam inicial.', sticking: 'r L R R / l R L L', image: '24_flam-paradiddle.webp' },
  { slug: 'single-flammed-mill', name: 'Single Flammed Mill', category: 'flam', level: 'advanced', description: 'Inverted paradiddle con flam.', sticking: 'r R L R / l L R L', image: '25_flammed-mill.webp' },
  { slug: 'flam-paradiddle-diddle', name: 'Flam Paradiddle-diddle', category: 'flam', level: 'advanced', description: 'Paradiddle-diddle con flam.', sticking: 'r L R R L L', image: '26_flam-paradiddle-diddle.webp' },
  { slug: 'pataflafla', name: 'Pataflafla', category: 'flam', level: 'advanced', description: 'Flams al inicio y final del motivo.', sticking: 'r L R l', image: '27_patafla-fla.webp' },
  { slug: 'swiss-army-triplet', name: 'Swiss Army Triplet', category: 'flam', level: 'advanced', description: 'Triplete con flam de mano guía.', sticking: 'r R L / l L R', image: '28_swiss-army-triple.webp' },
  { slug: 'inverted-flam-tap', name: 'Inverted Flam Tap', category: 'flam', level: 'advanced', description: 'Diddles con flam en el segundo golpe.', sticking: 'R r L l', image: '29_inverted-flam-tap.webp' },
  { slug: 'flam-drag', name: 'Flam Drag', category: 'flam', level: 'advanced', description: 'Flam seguido de drag y tap.', sticking: 'r L rr R', image: '30_flam-drag.webp' },

  // Drag Rudiments
  { slug: 'drag', name: 'Drag', category: 'drag', level: 'basic', description: 'Dos notas de gracia (doble) antes del golpe.', sticking: 'rr L / ll R', image: '31_drag.webp' },
  { slug: 'single-drag-tap', name: 'Single Drag Tap', category: 'drag', level: 'basic', description: 'Drag + tap alternado.', sticking: 'rr L R / ll R L', image: '32-single-drag.webp' },
  { slug: 'double-drag-tap', name: 'Double Drag Tap', category: 'drag', level: 'intermediate', description: 'Drag extra antes del single drag tap.', sticking: 'rr rr L R', image: '33_double-drag.webp' },
  { slug: 'lesson-25', name: 'Lesson 25', category: 'drag', level: 'intermediate', description: 'Tres notas alternadas, drag en la primera.', sticking: 'rr L R L', image: '34_lesson-25.webp' },
  { slug: 'single-dragadiddle', name: 'Single Dragadiddle', category: 'drag', level: 'intermediate', description: 'Paradiddle con drag inicial.', sticking: 'rr L R R L', image: '35_single-dragadiddle.webp' },
  { slug: 'drag-paradiddle-1', name: 'Drag Paradiddle No. 1', category: 'drag', level: 'intermediate', description: 'Acento + paradiddle con drags en inicios.', sticking: 'R rr L R R', image: '36_drag-paradiddle1.webp' },
  { slug: 'drag-paradiddle-2', name: 'Drag Paradiddle No. 2', category: 'drag', level: 'advanced', description: 'Dos acentos + paradiddle con drags.', sticking: 'R rr R L R R', image: '37_drag-paradiddle2.webp' },
  { slug: 'single-ratamacue', name: 'Single Ratamacue', category: 'drag', level: 'intermediate', description: 'Drag en primero, acento en cuarto.', sticking: 'rr L R L', image: '38_single-ratamacue.webp' },
  { slug: 'double-ratamacue', name: 'Double Ratamacue', category: 'drag', level: 'advanced', description: 'Single ratamacue con drag previo.', sticking: 'rr rr L R L', image: '39_double-ratamacue.webp' },
  { slug: 'triple-ratamacue', name: 'Triple Ratamacue', category: 'drag', level: 'advanced', description: 'Single ratamacue con dos drags previos.', sticking: 'rr rr rr L R L', image: '40_triple-ratamacue.webp' },
];

export function getRudimentBySlug(slug) {
  return RUDIMENTS.find((r) => r.slug === slug);
}

export function getRudimentsByLevel(level) {
  return RUDIMENTS.filter((r) => r.level === level);
}

export const CATEGORIES = [
  { id: 'single-stroke', label: 'Single Strokes' },
  { id: 'multiple-bounce', label: 'Multiple Bounce Rolls' },
  { id: 'double-stroke', label: 'Double Stroke Rolls' },
  { id: 'diddle', label: 'Diddles' },
  { id: 'flam', label: 'Flams' },
  { id: 'drag', label: 'Drags' },
];