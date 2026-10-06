import { useMemo, useState } from 'react';
import { shuffle } from '../../../utils/shuffle';
import SpeakButton from '../../../components/SpeakButton';
import CategoryFilter from './CategoryFilter';
import ConnectedSpeech from './ConnectedSpeech';
import { usePhraseFilter } from '../hooks/usePhraseFilter';
import { phraseCategories } from '../data/phrases';
import './PhrasesStudy.css';

// Pestaña Estudio: flashcards de frases largas con volteo, filtradas por
// categoría. "Lo sabía" / "Aún no" registran la respuesta y avanzan.
export default function PhrasesStudy({ module, registerAnswer }) {
  const { category, setCategory, filteredWords } = usePhraseFilter(module.words);
  const [seed, setSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // El mazo se mezcla al cambiar la categoría o al pedir "Mezclar de nuevo".
  const deck = useMemo(
    () => shuffle(filteredWords),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredWords, seed],
  );

  const finished = deck.length > 0 && index >= deck.length;
  const current = deck[index];

  const handleCategory = (next) => {
    setCategory(next);
    setIndex(0);
    setFlipped(false);
  };

  const restart = () => {
    setSeed((s) => s + 1);
    setIndex(0);
    setFlipped(false);
  };

  const move = (delta) => {
    setFlipped(false);
    setIndex((i) => Math.min(Math.max(i + delta, 0), deck.length));
  };

  const answer = (correct) => {
    registerAnswer(current.id, correct);
    move(1);
  };

  return (
    <section className="mode-panel phrases-study">
      <header className="mode-header">
        <h2>Modo estudio: frases</h2>
        <p>Leé la frase en inglés, pensá su significado y voltea la tarjeta para comprobarlo.</p>
      </header>

      <CategoryFilter
        value={category}
        onChange={handleCategory}
        words={module.words}
        categories={phraseCategories}
      />

      {deck.length === 0 && <p className="progress-indicator">No hay frases en esta categoría.</p>}

      {finished && (
        <div className="phrases-study-end">
          <p className="progress-indicator">🎉 ¡Terminaste el mazo! ({deck.length} frases)</p>
          <div className="action-row">
            <button type="button" className="btn btn-primary" onClick={restart}>
              🔀 Mezclar y empezar de nuevo
            </button>
          </div>
        </div>
      )}

      {current && (
        <>
          <p className="progress-indicator">
            Frase {index + 1} de {deck.length}
          </p>

          <div
            className={`phrases-card ${flipped ? 'is-back' : 'is-front'}`}
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }}
            aria-label="Voltear tarjeta"
          >
            <span className="flashcard-label">{flipped ? 'Español' : 'Inglés'}</span>
            <p className="phrases-card-text">{flipped ? current.es : current.en}</p>
            <SpeakButton
              text={current.en}
              lang="en-US"
            />
            <span className="flashcard-hint">Toca la tarjeta para voltearla</span>
          </div>

          <ConnectedSpeech phrase={current} />

          <div className="action-row">
            <button type="button" className="btn btn-danger" onClick={() => answer(false)}>
              ❌ Aún no
            </button>
            <button type="button" className="btn btn-success" onClick={() => answer(true)}>
              ✅ Lo sabía
            </button>
          </div>

          <div className="action-row">
            <button type="button" className="btn btn-ghost" onClick={() => move(-1)} disabled={index === 0}>
              ◀ Anterior
            </button>
            <button type="button" className="btn btn-ghost" onClick={restart}>
              🔀 Mezclar
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => move(1)}>
              Saltar ➡️
            </button>
          </div>
        </>
      )}
    </section>
  );
}
