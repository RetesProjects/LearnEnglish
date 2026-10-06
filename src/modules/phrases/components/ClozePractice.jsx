import { useState } from 'react';
import SpeakButton from '../../../components/SpeakButton';
import CategoryFilter from './CategoryFilter';
import ConnectedSpeech from './ConnectedSpeech';
import { usePhraseFilter } from '../hooks/usePhraseFilter';
import { phraseCategories } from '../data/phrases';
import { cloze, normalize } from '../utils/memorize';
import './ClozePractice.css';

const LEVELS = [
  { value: 1, label: 'Fácil' },
  { value: 2, label: 'Medio' },
  { value: 3, label: 'Difícil' },
];

// Separa la puntuación de los bordes del token para dejarla fuera del campo.
function splitToken(text) {
  const match = text.match(/^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u);
  return { before: match[1], core: match[2], after: match[3] };
}

// Arma una ronda: frase al azar (distinta de la anterior) y sus huecos.
function buildRound(words, level, previousId) {
  if (words.length === 0) return null;
  const candidates = words.length > 1 ? words.filter((w) => w.id !== previousId) : words;
  const word = candidates[Math.floor(Math.random() * candidates.length)];
  return { word, tokens: cloze(word.en, level) };
}

function ClozeRound({ words, level, registerAnswer }) {
  const [round, setRound] = useState(() => buildRound(words, level, null));
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  if (!round) {
    return <p className="progress-indicator">No hay frases en esta categoría.</p>;
  }

  const { word, tokens } = round;
  const holeIndexes = tokens.map((t, i) => (t.hidden ? i : -1)).filter((i) => i >= 0);
  const isHoleCorrect = (i) => normalize(answers[i] ?? '') === normalize(tokens[i].text);
  const allCorrect = holeIndexes.every(isHoleCorrect);

  const handleCheck = (e) => {
    e.preventDefault();
    if (checked) return;
    setChecked(true);
    registerAnswer(word.id, allCorrect);
  };

  const handleNext = () => {
    setRound(buildRound(words, level, word.id));
    setAnswers({});
    setChecked(false);
  };

  return (
    <form className="cloze-card" onSubmit={handleCheck}>
      <span className="flashcard-label">Pista en español</span>
      <p className="cloze-hint">{word.es}</p>

      <span className="flashcard-label">Completa la frase en inglés</span>
      <p className="cloze-sentence">
        {tokens.map((token, i) => {
          if (!token.hidden) return <span key={i} className="cloze-word">{token.text}</span>;
          const { before, core, after } = splitToken(token.text);
          const state = checked ? (isHoleCorrect(i) ? 'is-correct' : 'is-wrong') : '';
          return (
            <span key={i} className="cloze-word">
              {before}
              <input
                type="text"
                className={`cloze-input ${state}`}
                style={{ width: `${Math.max(core.length, 3) + 2}ch` }}
                value={answers[i] ?? ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                disabled={checked}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label={`Hueco ${holeIndexes.indexOf(i) + 1}`}
              />
              {after}
              {checked && !isHoleCorrect(i) && (
                <span className="cloze-solution"> ✗ {core}</span>
              )}
              {checked && isHoleCorrect(i) && <span className="cloze-solution is-ok"> ✓</span>}
            </span>
          );
        })}
        <SpeakButton text={word.en} />
      </p>

      {checked && (
        <p className={`cloze-feedback ${allCorrect ? 'is-correct' : 'is-wrong'}`} role="status">
          {allCorrect ? '✅ ¡Correcto!' : `❌ Frase completa: ${word.en}`}
        </p>
      )}

      {checked && <ConnectedSpeech phrase={word} />}

      <div className="action-row">
        {!checked ? (
          <button type="submit" className="btn btn-primary">Comprobar</button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            Siguiente ➡️
          </button>
        )}
      </div>
    </form>
  );
}

// Dinámica de completar huecos sobre las frases filtradas por categoría.
export default function ClozePractice({ module, registerAnswer }) {
  const { category, setCategory, filteredWords } = usePhraseFilter(module.words);
  const [level, setLevel] = useState(1);

  return (
    <div className="cloze-practice">
      <CategoryFilter
        value={category}
        onChange={setCategory}
        words={module.words}
        categories={phraseCategories}
      />

      <div className="cloze-levels" role="group" aria-label="Dificultad">
        <span>Dificultad:</span>
        {LEVELS.map((l) => (
          <button
            key={l.value}
            type="button"
            className={`btn ${level === l.value ? 'btn-primary' : 'btn-ghost'}`}
            aria-pressed={level === l.value}
            onClick={() => setLevel(l.value)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <ClozeRound
        key={`${category}-${level}`}
        words={filteredWords}
        level={level}
        registerAnswer={registerAnswer}
      />
    </div>
  );
}
