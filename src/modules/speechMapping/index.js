import { blocks } from './data/blocks';
import BlockStudy from './components/BlockStudy';
import OralPractice from './components/OralPractice';
import ProgressBoard from '../../components/ProgressBoard';

// `words` reutiliza `blocks` (T1) tal cual: `useProgress`/`ProgressBoard`
// solo exigen que cada elemento tenga `id`, así que no hace falta adaptar el
// shape de bloque de discurso a nada más genérico.
export const speechMappingModule = {
  id: 'speechMapping',
  navLabel: '🗣️ Mapeo de discurso',
  title: '🗣️ Mapeo mental de discurso',
  subtitle: 'Practica memorizar un discurso por bloques (uno por persona) usando pistas mínimas, con ensayo oral cronometrado.',
  storageKey: 'speech-mapping-progress-v1',
  words: blocks,
  // Este módulo reemplaza las 4 pestañas fijas por las suyas propias (ver
  // `ModuleWorkspace.jsx`): Estudio y Práctica oral custom (T2/T3), más
  // Progreso genérico reutilizado tal cual.
  tabs: [
    { key: 'study', label: '📖 Estudio', Component: BlockStudy },
    { key: 'oral', label: '🎤 Práctica oral', Component: OralPractice },
    { key: 'progress', label: '📊 Progreso', Component: ProgressBoard },
  ],
};
