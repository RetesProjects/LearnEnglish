import { useState } from 'react';
import { shuffle } from '../../../utils/shuffle';
import SpeakButton from '../../../components/SpeakButton';
import CategoryFilter from './CategoryFilter';
import ConnectedSpeech from './ConnectedSpeech';
import { usePhraseFilter } from '../hooks/usePhraseFilter';
import { phraseCategories } from '../data/phrases';
import './PhrasesExam.css';

const QUESTION_COUNT = 10;
const OPTION_COUNT = 4;

const DIRECTIONS = {
  'en-es': { label: 'Inglés → Español', from: 'en', to: 'es', fromLang: 'en-US', toLang: 'es-ES', prompt: '¿Qué significa en español?' },
  'es-en': { label: 'Español → Inglés', from: 'es', to: 'en', fromLang: 'es-ES', toLang: 'en-US', prompt: '¿Cómo se dice en inglés?' },
};

// Arma las preguntas: distractores de la misma categoría primero, luego del resto.
// Los textos de las opciones nunca se repiten ni incluyen la respuesta dos veces.
function buildQuestions(pool, allWords, direction) {
  const dir = DIRECTIONS[direction];
  return shuffle(pool)
    .slice(0, Math.min(QUESTION_COUNT, pool.length))
    .map((item) => {
      const answer = item[dir.to];
      const others = allWords.filter((w) => w.id !== item.id);
      const ordered = [
        ...shuffle(others.filter((w) => w.category === item.category)),
        ...shuffle(others.filter((w) => w.category !== item.category)),
      ];
      const seen = new Set([answer]);
      const distractors = [];
      for (const w of ordered) {
        const text = w[dir.to];
        if (seen.has(text)) continue;
        seen.add(text);
        distractors.push(text);
        if (distractors.length >= OPTION_COUNT - 1) break;
      }
      return {
        id: item.id,
        phrase: item,
        prompt: item[dir.from],
        answer,
        options: shuffle([answer, ...distractors]),
      };
    });
}

function ExamSession({ pool, allWords, direction, onRestart, registerAnswer }) {
  const dir = DIRECTIONS[direction];
  const [questions] = useState(() => buildQuestions(pool, allWords, direction));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return <p className="progress-indicator">No hay frases en esta categoría.</p>;
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="exam-summary">
        <p className="exam-score">{percentage}%</p>
        <p>
          Respondiste correctamente {score} de {questions.length} preguntas.
        </p>
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          🔁 Intentar de nuevo
        </button>
      </div>
    );
  }

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const handleSelect = (option) => {
    if (selected) return;
    const isCorrect = option === current.answer;
    setSelected(option);
    setScore((s) => s + (isCorrect ? 1 : 0));
    registerAnswer(current.id, isCorrect);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  return (
    <>
      <p className="progress-indicator">
        Pregunta {index + 1} de {questions.length} · Aciertos: {score}
      </p>

      <div className="exam-question">
        <span className="flashcard-label">{dir.prompt}</span>
        <div className="exam-prompt-row">
          <p className="exam-prompt exam-prompt-long phrases-exam-prompt">{current.prompt}</p>
          <SpeakButton text={current.prompt} lang={dir.fromLang} />
        </div>
      </div>

      <div className="options-grid phrases-exam-options">
        {current.options.map((option, optionIndex) => {
          let stateClass = '';
          if (selected) {
            if (option === current.answer) stateClass = 'option-correct';
            else if (option === selected) stateClass = 'option-incorrect';
          }
          return (
            <div key={`${index}-${optionIndex}`} className={`option-row ${stateClass}`}>
              <button
                type="button"
                className="option-btn"
                onClick={() => handleSelect(option)}
                disabled={Boolean(selected)}
              >
                {option}
              </button>
              {direction === 'es-en' && <SpeakButton text={option} lang={dir.toLang} />}
            </div>
          );
        })}
      </div>

      {selected && <ConnectedSpeech phrase={current.phrase} />}

      {selected && (
        <div className="action-row">
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            {isLast ? 'Ver resultados' : 'Siguiente pregunta ➡️'}
          </button>
        </div>
      )}
    </>
  );
}

// Examen de selección múltiple en ambas direcciones, con filtro por categoría.
export default function PhrasesExam({ module, registerAnswer }) {
  const { category, setCategory, filteredWords } = usePhraseFilter(module.words);
  const [direction, setDirection] = useState('en-es');
  const [run, setRun] = useState(0);

  return (
    <section className="mode-panel">
      <header className="mode-header">
        <h2>Examen: Frases</h2>
        <p>Elige la opción correcta. Puedes practicar en ambas direcciones.</p>
      </header>

      <div className="phrases-exam-direction" role="group" aria-label="Dirección del examen">
        {Object.entries(DIRECTIONS).map(([key, d]) => (
          <button
            key={key}
            type="button"
            className={`btn ${direction === key ? 'btn-primary' : 'btn-ghost'}`}
            aria-pressed={direction === key}
            onClick={() => setDirection(key)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <CategoryFilter
        value={category}
        onChange={setCategory}
        words={module.words}
        categories={phraseCategories}
      />

      <ExamSession
        key={`${category}-${direction}-${run}`}
        pool={filteredWords}
        allWords={module.words}
        direction={direction}
        onRestart={() => setRun((r) => r + 1)}
        registerAnswer={registerAnswer}
      />
    </section>
  );
}
