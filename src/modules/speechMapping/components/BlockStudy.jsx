import { useMemo, useState } from 'react';
import { shuffle } from '../../../utils/shuffle';
import { blocks } from '../data/blocks';

// Etiquetas en español para el foco gramatical de cada bloque (ver shape en
// `data/blocks.js`, T1).
const GRAMMAR_LABEL = {
  possessive: 'Adjetivo posesivo (her/his)',
  presentSimple: 'Presente simple',
  pastSimple: 'Pasado simple',
};

// Modo estudio (tarjeta con pistas → revela la idea completa): recorre el
// banco de bloques de T1 mostrando primero solo las `keyPoints` de cada
// persona ("frente" de la tarjeta); al tocarla se revela `fullIdea`
// ("dorso"). Sigue el mismo esqueleto de mazo/índice que
// `ConjugationStudy.jsx`, registrando el resultado con `registerAnswer` de
// `useProgress` una vez que ya se improvisó/revisó la idea.
export default function BlockStudy({ getEntry, registerAnswer }) {
  const [deck, setDeck] = useState(() => shuffle(blocks));
  const [onlyPending, setOnlyPending] = useState(true);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const visibleDeck = useMemo(() => {
    if (!onlyPending) return deck;
    const pending = deck.filter((block) => getEntry(block.id).status !== 'mastered');
    return pending.length > 0 ? pending : deck;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, onlyPending]);

  const safeIndex = index % visibleDeck.length;
  const current = visibleDeck[safeIndex];
  const entry = getEntry(current.id);

  const goNext = () => {
    setRevealed(false);
    setIndex((i) => (i + 1) % visibleDeck.length);
  };

  const goPrev = () => {
    setRevealed(false);
    setIndex((i) => (i - 1 + visibleDeck.length) % visibleDeck.length);
  };

  const reshuffle = () => {
    setDeck(shuffle(blocks));
    setIndex(0);
    setRevealed(false);
  };

  const handleAnswer = (isCorrect) => {
    registerAnswer(current.id, isCorrect);
    goNext();
  };

  const badge =
    entry.status === 'mastered'
      ? { type: 'mastered', label: '✅ Dominado' }
      : entry.seen > 0
        ? { type: 'learning', label: '🔁 En progreso' }
        : { type: 'new', label: '✨ Nuevo' };

  return (
    <section className="mode-panel">
      <header className="mode-header">
        <h2>Modo estudio: mapeo mental</h2>
        <p>Mirá solo las pistas e improvisá la idea en inglés en voz alta. Tocá la tarjeta para revelar la idea completa.</p>
      </header>

      <div className="mode-controls">
        <label className="toggle">
          <input
            type="checkbox"
            checked={onlyPending}
            onChange={(e) => {
              setOnlyPending(e.target.checked);
              setIndex(0);
              setRevealed(false);
            }}
          />
          Repasar solo bloques pendientes
        </label>
        <button type="button" className="btn btn-ghost" onClick={reshuffle}>
          🔀 Mezclar de nuevo
        </button>
      </div>

      <p className="progress-indicator">
        Bloque {safeIndex + 1} de {visibleDeck.length} ·{' '}
        {GRAMMAR_LABEL[current.grammarFocus] ?? current.grammarFocus}
      </p>

      <div className="flashcard-nav-row">
        <button
          type="button"
          className="btn btn-ghost nav-arrow"
          onClick={goPrev}
          aria-label="Bloque anterior"
        >
          ◀
        </button>

        <div className="flashcard-wrapper" onClick={() => setRevealed((r) => !r)}>
          <span className={`badge badge-${badge.type}`}>{badge.label}</span>
          <div className={`flashcard flashcard-dense ${revealed ? 'is-flipped' : ''}`}>
            <div className="flashcard-face flashcard-front">
              <span className="flashcard-label">
                {current.relation} · {current.name}
              </span>
              <ul className="block-keypoints">
                {current.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="flashcard-face flashcard-back">
              <span className="flashcard-label">Idea completa</span>
              <p className="flashcard-text-dense">{current.fullIdea}</p>
            </div>
          </div>
          <span className="flashcard-hint">Toca la tarjeta para revelar la idea completa</span>
        </div>

        <button
          type="button"
          className="btn btn-ghost nav-arrow"
          onClick={goNext}
          aria-label="Bloque siguiente"
        >
          ▶
        </button>
      </div>

      <div className="action-row">
        <button type="button" className="btn btn-danger" onClick={() => handleAnswer(false)}>
          ❌ A repasar
        </button>
        <button type="button" className="btn btn-success" onClick={() => handleAnswer(true)}>
          ✅ Correcto
        </button>
      </div>
    </section>
  );
}
