import { words } from './data/words';
import { SAMPLE_TEXTS } from './data/sampleTexts';

export const accessoriesModule = {
  id: 'accessories',
  navLabel: '👜 Accessories',
  title: '👜 Accessories en inglés',
  subtitle: 'Aprende el vocabulario de accesorios y practica con flashcards.',
  storageKey: 'accessories-progress-v1',
  words,
  labels: {
    front: 'Word',
    back: 'Definition',
    chooseBack: 'Choose the correct definition',
    matchBack: 'Which word matches this definition?',
  },
  identify: {
    title: 'Identificar accessories',
    instructions:
      'Pega un texto en inglés y haz clic en cada palabra que creas que es un accessory (accesorio, como "scarf" o "gloves").',
    shortInstructions: 'Haz clic en las palabras que sean accessories.',
    nounSingular: 'accessory',
    nounPlural: 'accessories',
    // Los accessories son una lista cerrada de 15 palabras: no hace falta
    // (ni tiene sentido) una heurística de "parece accessory" como la de los
    // adjetivos, así que se omiten `looksLikeExtra` y `unknownOutsideHint`.
    sampleTexts: SAMPLE_TEXTS,
  },
};
