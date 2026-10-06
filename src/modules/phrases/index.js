import { phrases } from './data/phrases';
import PhrasesStudy from './components/PhrasesStudy';
import PhrasesExam from './components/PhrasesExam';
import MemorizeTab from './components/MemorizeTab';
import ProgressBoard from '../../components/ProgressBoard';

// Módulo de frases largas con pestañas propias (ver `ModuleWorkspace.jsx`):
// Estudio y Examen con filtro por categoría, Memorizar (4 dinámicas) y
// Progreso genérico.
export const phrasesModule = {
  id: 'phrases',
  navLabel: '💬 Frases',
  title: '💬 Frases comunes en inglés',
  subtitle: 'Aprende y memoriza frases largas para conversar con naturalidad.',
  storageKey: 'phrases-progress-v1',
  words: phrases,
  tabs: [
    { key: 'study', label: '📖 Estudio', Component: PhrasesStudy },
    { key: 'exam', label: '📝 Examen', Component: PhrasesExam },
    { key: 'memorize', label: '🧠 Memorizar', Component: MemorizeTab },
    { key: 'progress', label: '📊 Progreso', Component: ProgressBoard },
  ],
};
