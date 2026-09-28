// Banco de bloques del discurso de la tarea "MS - Clases de Idiomas"
// (describir fotos de la familia). Cada bloque representa una persona/escena
// a describir, no una oración completa para memorizar palabra por palabra:
// la idea es improvisar la oración en el momento a partir de las `keyPoints`.
//
// Este es el contenido REAL del discurso (ver `.features/Presentation1/feature.md`).
// Para reutilizar este módulo con un discurso futuro, reemplazá este array por
// uno nuevo respetando el mismo shape:
//   {
//     id: string,              // único dentro del array; usar slugify(relation + '-' + name)
//     relation: string,        // relación con el narrador (ej. "mi mamá", "mi hermano")
//     name: string,            // nombre de la persona (puede ser '' en bloques de escena)
//     keyPoints: string[],     // pistas mínimas para improvisar: dato/recuerdo + ropa/accesorios
//     fullIdea: string,        // idea completa en inglés que las keyPoints deberían evocar
//     grammarFocus: 'possessive' | 'presentSimple' | 'pastSimple',
//     clothingCue: string,     // pista corta de ropa/accesorios de la foto (en inglés)
//   }
//
// `grammarFocus` distingue qué punto gramatical practica principalmente ese
// bloque: adjetivos posesivos (her/his), presente simple (un interés) o
// pasado simple (un recuerdo memorable) — los tres requisitos típicos de
// este tipo de discurso.
import { slugify } from '../../../utils/slugify';

export const blocks = [
  {
    id: slugify('intro-terraza'),
    relation: 'la terraza de mi casa',
    name: '',
    keyPoints: [
      'Ciudad Obregón, Sonora',
      "didn't have a terrace or backyard before",
      'now our favorite spot for family gatherings',
    ],
    fullIdea:
      "We are on the terrace of my house in Ciudad Obregón, Sonora. This is our new favorite place in the house because we didn't have a terrace or a backyard before. We like to have family gatherings there when we are all in Ciudad Obregón.",
    grammarFocus: 'presentSimple',
    clothingCue: '—',
  },
  {
    id: slugify('hermano-daniel'),
    relation: 'mi hermano',
    name: 'Daniel',
    keyPoints: [
      'really likes playing the piano',
      'played in performances as a child',
      'recently started taking lessons again',
      'you bought him a professional piano',
      'black polo shirt + cap',
    ],
    fullIdea:
      'This is my brother. His name is Daniel. He really likes playing the piano. When he was a child, he played the piano in many performances. Recently, he started taking piano lessons again. For his birthday, I bought him a professional piano.',
    grammarFocus: 'presentSimple',
    clothingCue: 'black polo shirt, cap',
  },
  {
    id: slugify('cunada'),
    relation: 'mi cuñada',
    name: '',
    keyPoints: [
      "brother's wife",
      'two children',
      'second child (new niece) born last Saturday',
      'dark green blouse',
    ],
    fullIdea:
      "This is my sister-in-law. She is my brother's wife. My brother and my sister-in-law have two children. Their second child, my new niece, was born last Saturday.",
    grammarFocus: 'pastSimple',
    clothingCue: 'dark green blouse',
  },
  {
    id: slugify('mama'),
    relation: 'mi mamá',
    name: '',
    keyPoints: [
      'really likes cooking',
      'creating new recipes',
      'very good cook',
      'black leather jacket (cold photo) / purple sweater (warm photo)',
    ],
    fullIdea:
      'This is my mom. She really likes cooking and creating new recipes. She is a very good cook.',
    grammarFocus: 'presentSimple',
    clothingCue: 'black leather jacket, purple sweater',
  },
  {
    id: slugify('sobrino-jose-daniel'),
    relation: 'mi sobrino',
    name: 'José Daniel',
    keyPoints: ['looks very happy', 'laughs a lot', 'navy blue polo shirt'],
    fullIdea:
      'This is my nephew. His name is José Daniel. He looks very happy and he is laughing a lot.',
    grammarFocus: 'presentSimple',
    clothingCue: 'navy blue polo shirt',
  },
  {
    id: slugify('sobrina-emilia'),
    relation: 'mi nueva sobrina',
    name: 'Emilia',
    keyPoints: ['born last Saturday', 'little pink baby outfit', 'cotton blanket with flowers'],
    fullIdea:
      'This is my new niece. Her name is Emilia. She was born last Saturday. She is wearing a little pink baby outfit, and she has a cotton blanket with flowers.',
    grammarFocus: 'pastSimple',
    clothingCue: 'pink baby outfit, cotton blanket with flowers',
  },
  {
    id: slugify('yo-narrador'),
    relation: 'yo (narrador)',
    name: '',
    keyPoints: [
      'moved to Monterrey 12 years ago for work',
      'cap + jacket + jeans (cold photo)',
      'gray T-shirt with print (warm photo)',
      'gray shirt, longer beard (photo with nephew)',
      'black suit (wedding)',
    ],
    fullIdea:
      'My brother and I left Ciudad Obregón because of work. He lives in Tijuana, and I moved to Monterrey 12 years ago. In the photos, I am wearing different outfits depending on the weather and the occasion.',
    grammarFocus: 'pastSimple',
    clothingCue: 'cap/jacket/jeans, gray tee, gray shirt, black suit',
  },
  {
    id: slugify('boda-prima'),
    relation: 'la boda de mi prima',
    name: '',
    keyPoints: [
      "cousin's wedding in Guadalajara",
      'dress code: all black',
      'suits, shirts, pants, ties',
    ],
    fullIdea:
      "In this other picture, we are at my cousin's wedding in Guadalajara. The dress code was all black. We are wearing black suits, shirts, pants, and ties.",
    grammarFocus: 'presentSimple',
    clothingCue: 'black suits, shirts, pants, ties',
  },
  {
    id: slugify('papa-aron'),
    relation: 'mi papá y mi medio hermano',
    name: 'Aron',
    keyPoints: ['Aron just turned 18', 'enlisted in the U.S. Navy'],
    fullIdea:
      'Finally, this is my dad, and this is my half-brother, Aron. Aron just turned 18. He enlisted in the U.S. Navy.',
    grammarFocus: 'pastSimple',
    clothingCue: '—',
  },
];
