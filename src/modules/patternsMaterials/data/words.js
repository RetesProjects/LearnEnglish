// Lista de "patterns & materials" (materiales y estampados de la ropa y los
// objetos) en inglés, con su traducción al español y una definición corta en
// inglés (usada por el examen "solo en inglés": palabra <-> definición).
//
// Es una lista cerrada y específica (a diferencia de los adjetivos "normales",
// que son una clase abierta), así que -igual que en linking verbs, irregular
// verbs y extreme adjectives- no hace falta una heurística de "parece
// material/pattern": basta con la lista de palabras.
//
// `forms` es la lista de formas que el modo Identificar reconoce en un texto
// libre. Como REEMPLAZA a `[en]` (IdentifyMode usa `word.forms ?? [word.en]`),
// siempre incluye explícitamente la forma base en minúsculas. Las formas no se
// repiten entre palabras de este módulo (si no, la última pisaría a la
// anterior).
//
// Decisiones sobre las formas:
// - Solo `Metal` lleva plural (`metals`), porque es un sustantivo con plural
//   natural en este contexto.
// - No se agregan `woods` (bosque) ni `glasses` (vasos o lentes): cambian de
//   significado respecto del material, y `glasses` además pertenece al módulo
//   `accessories`. Tampoco se agregan plurales de incontables (`cotton`,
//   `leather`, `denim`, `wool`).
// - `checked`, `spotted` y `striped` son adjetivos: solo la forma base.
//
// Limitación aceptada: `checked` y `spotted` también son participios de los
// verbos "check" y "spot", y el modo Identificar los reconocería en esos usos.
// Los textos de ejemplo los usan solo como adjetivos de estampado.
import { slugify } from '../../../utils/slugify';

const RAW_PATTERNS_MATERIALS = [
  [
    'Wood',
    'Madera',
    'This material comes from trees and is used to make furniture such as tables or cupboards.',
    ['wood'],
  ],
  [
    'Metal',
    'Metal',
    'This material is cold and hard. Heat and electricity can travel through it.',
    ['metal', 'metals'],
  ],
  [
    'Cotton',
    'Algodón',
    'This soft material comes from the seeds of a plant. It is used to make clothes such as T-shirts.',
    ['cotton'],
  ],
  [
    'Glass',
    'Vidrio',
    'This material is hard, breakable and you can see through it. It is used to make windows.',
    ['glass'],
  ],
  [
    'Leather',
    'Piel',
    'This material comes from the skin of an animal. It is used to make shoes, bags or belts.',
    ['leather'],
  ],
  [
    'Denim',
    'Mezclilla',
    'This is a strong cotton fabric and is usually blue. It is used to make jeans.',
    ['denim'],
  ],
  [
    'Wool',
    'Lana',
    'This material comes from sheep. It is used to make winter clothes such as scarves or jumpers.',
    ['wool'],
  ],
  [
    'Checked',
    'Patrón de cuadros',
    'Patterned with small squares in different colours.',
    ['checked'],
  ],
  [
    'Spotted',
    'Patrón de manchas',
    'Patterned with spots (solid circles) of a different colour.',
    ['spotted'],
  ],
  ['Striped', 'Patrón de rayas', 'Patterned with straight lines.', ['striped']],
];

export const words = RAW_PATTERNS_MATERIALS.map(([en, es, enDef, forms]) => ({
  id: slugify(en),
  en,
  es,
  enDef,
  forms,
}));
