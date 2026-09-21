// Lista de "accessories" (accesorios y complementos de ropa) en inglés con su
// traducción al español y una definición corta en inglés (usada por el
// examen "solo en inglés": palabra <-> definición).
//
// Es una lista cerrada y específica (a diferencia de una clase abierta como
// los adjetivos), así que -igual que en linking verbs, irregular verbs y
// extreme adjectives- no hace falta una heurística de "parece accessory":
// basta con la lista de palabras.
//
// `forms` declara las formas que el modo Identificar reconoce en un texto
// libre (singular y plural). Como `forms` REEMPLAZA a `[en]` en el índice de
// IdentifyMode (`word.forms ?? [word.en]`), siempre incluye explícitamente la
// forma base en minúsculas. Además, ninguna forma se repite entre palabras de
// este módulo (si no, la última pisaría a la anterior sin avisar).
//
// `Rucksack / Backpack` muestra ambos nombres en la flashcard tal cual, y
// `forms` declara cada uno (y su plural) por separado.
//
// `glasses` y `sunglasses` son plural tantum ("a pair of glasses"): no existe
// un singular de uso normal, así que declaran solo su forma en plural. Al ser
// tokens distintos (no hay coincidencia por subcadena) no se pisan entre sí.
// Tampoco se agrega `glass` a Glasses: ese es el material del módulo
// `patternsMaterials`.
import { slugify } from '../../../utils/slugify';

const RAW_ACCESSORIES = [
  ['Bag', 'Bolsa', 'You put things in this to carry them around.', ['bag', 'bags']],
  [
    'Belt',
    'Cinturón',
    'You wear this around your waist to hold your trousers up.',
    ['belt', 'belts'],
  ],
  [
    'Cap',
    'Gorra',
    'You wear this on your head. It has a visor to protect your eyes from the sun.',
    ['cap', 'caps'],
  ],
  ['Earrings', 'Aretes', 'Jewellery for your ears.', ['earrings', 'earring']],
  ['Glasses', 'Lentes', 'These help you to see!', ['glasses']],
  ['Gloves', 'Guantes', 'You wear these on your hands.', ['gloves', 'glove']],
  ['Necklace', 'Collar', 'A piece of jewellery for your neck.', ['necklace', 'necklaces']],
  [
    'Pocket',
    'Bolsillo',
    'Part of your trousers or jacket etc. where you can put things.',
    ['pocket', 'pockets'],
  ],
  [
    'Rucksack / Backpack',
    'Mochila',
    'A bag that you wear on your back.',
    ['rucksack', 'rucksacks', 'backpack', 'backpacks'],
  ],
  [
    'Scarf',
    'Bufanda',
    'You wear this around your neck to keep warm.',
    ['scarf', 'scarves', 'scarfs'],
  ],
  [
    'Tie',
    'Corbata',
    'You wear this around your neck under a shirt collar and tied in a knot.',
    ['tie', 'ties'],
  ],
  [
    'Beanie',
    'Gorro de punto',
    'You wear this on your head to keep you warm.',
    ['beanie', 'beanies'],
  ],
  [
    'Handbag',
    'Bolsa de mano',
    'A small bag you hold in your hand or carry over your shoulder by a strap.',
    ['handbag', 'handbags'],
  ],
  [
    'Wallet',
    'Cartera',
    'A small, flat case you use to hold paper money, credit cards and other personal items.',
    ['wallet', 'wallets'],
  ],
  [
    'Sunglasses',
    'Lentes de sol',
    'These protect your eyes from harmful ultraviolet radiation, reduce bright light, and block annoying glare.',
    ['sunglasses'],
  ],
];

export const words = RAW_ACCESSORIES.map(([en, es, enDef, forms]) => ({
  id: slugify(en),
  en,
  es,
  enDef,
  forms,
}));
