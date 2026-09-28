import { useEffect, useRef, useState } from 'react';
import { blocks } from '../data/blocks';

// Duraciones sugeridas por bloque (en segundos). 40s es el default: alcanza
// para improvisar la oración completa a partir de las `keyPoints` sin
// sentirse apurado, pero sigue siendo un ensayo cronometrado real.
const DURATION_OPTIONS = [30, 40, 45];
const DEFAULT_DURATION = 40;

// Práctica oral cronometrada (T3): a diferencia de BlockStudy (T2), aquí
// nunca se muestra `fullIdea` — solo las `keyPoints`, para forzar a
// improvisar la oración en voz alta contra el reloj, como en el discurso
// real. Por eso tampoco usa `useProgress`/`registerAnswer`: no es un modo de
// examen con puntaje, es un cronómetro de ensayo. Todo el estado (bloque
// actual, segundos restantes, si está corriendo, bloques repasados en la
// sesión) vive en este componente, sin depender de nada externo al módulo.
export default function OralPractice() {
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_DURATION);
  const [running, setRunning] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const intervalRef = useRef(null);

  const safeIndex = index % blocks.length;
  const current = blocks[safeIndex];
  const timeUp = secondsLeft === 0;

  useEffect(() => {
    if (!running) return undefined;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => {
    if (secondsLeft === 0) setSecondsLeft(duration);
    setRunning(true);
  };

  const pause = () => setRunning(false);

  const resetTimer = () => {
    setRunning(false);
    setSecondsLeft(duration);
  };

  const goNext = () => {
    setRunning(false);
    setReviewedCount((c) => c + 1);
    setIndex((i) => (i + 1) % blocks.length);
    setSecondsLeft(duration);
  };

  const goPrev = () => {
    setRunning(false);
    setIndex((i) => (i - 1 + blocks.length) % blocks.length);
    setSecondsLeft(duration);
  };

  const changeDuration = (seconds) => {
    setDuration(seconds);
    setRunning(false);
    setSecondsLeft(seconds);
  };

  return (
    <section className="mode-panel">
      <header className="mode-header">
        <h2>Práctica oral cronometrada</h2>
        <p>
          Mirá solo las pistas y decí la idea completa en voz alta antes de que se acabe el
          tiempo. No se muestra la idea completa: es para ensayar el discurso real.
        </p>
      </header>

      <div className="mode-controls">
        <label className="toggle">
          Duración por bloque:{' '}
          <select value={duration} onChange={(e) => changeDuration(Number(e.target.value))}>
            {DURATION_OPTIONS.map((seconds) => (
              <option key={seconds} value={seconds}>
                {seconds}s
              </option>
            ))}
          </select>
        </label>
        <span className="progress-indicator">Bloques repasados: {reviewedCount}</span>
      </div>

      <p className="progress-indicator">
        Bloque {safeIndex + 1} de {blocks.length} · {current.relation} ({current.name})
      </p>

      <div className="exam-question">
        <span className="flashcard-label">Pistas (sin la idea completa)</span>
        <ul className="oral-keypoints">
          {current.keyPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      <p className={`oral-timer ${timeUp ? 'oral-timer-done' : ''}`}>
        ⏱️ {secondsLeft}s{timeUp ? ' · ¡Se acabó el tiempo!' : ''}
      </p>

      <div className="action-row">
        {running ? (
          <button type="button" className="btn btn-ghost" onClick={pause}>
            ⏸ Pausar
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={start}>
            ▶️ Iniciar
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={resetTimer}>
          🔁 Reiniciar tiempo
        </button>
      </div>

      <div className="action-row">
        <button type="button" className="btn btn-ghost" onClick={goPrev}>
          ◀ Anterior
        </button>
        <button type="button" className="btn btn-primary" onClick={goNext}>
          Siguiente bloque ➡️
        </button>
      </div>
    </section>
  );
}
