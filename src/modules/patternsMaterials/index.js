import { words } from './data/words';
import { SAMPLE_TEXTS } from './data/sampleTexts';

export const patternsMaterialsModule = {
  id: 'patternsMaterials',
  navLabel: '🧵 Patterns & Materials',
  title: '🧵 Patterns & Materials en inglés',
  subtitle: 'Aprende los materiales y estampados de la ropa y practica con flashcards.',
  storageKey: 'patterns-materials-progress-v1',
  words,
  labels: {
    front: 'Word',
    back: 'Definition',
    chooseBack: 'Choose the correct definition',
    matchBack: 'Which word matches this definition?',
  },
  identify: {
    title: 'Identificar patterns y materials',
    instructions:
      'Pega un texto en inglés y haz clic en cada palabra que creas que es un material (como "cotton" o "leather") o un pattern, es decir, un estampado (como "striped" o "checked").',
    shortInstructions: 'Haz clic en las palabras que sean materials o patterns.',
    nounSingular: 'material o pattern',
    nounPlural: 'materials y patterns',
    // Lista cerrada (10 palabras): no hace falta una heurística de "parece
    // material o pattern", así que se omite `looksLikeExtra`.
    sampleTexts: SAMPLE_TEXTS,
  },
};
