import { canSpeak, speak } from '../../../utils/speak';
import { connectedTypes } from '../data/connectedSpeech';
import './ConnectedSpeech.css';

const SLOW_RATE = 0.6;

// Muestra cómo suena una frase en connected speech: respelling, la lista de
// fenómenos (enlace, reducción, etc.) y audio a velocidad natural y lenta.
// La voz lee la frase original; el respelling es solo una guía visual.
export default function ConnectedSpeech({ phrase }) {
  if (!phrase?.connected) return null;

  const notes = phrase.notes ?? [];
  const usedTypes = [...new Set(notes.map((n) => n.type))].filter((t) => connectedTypes[t]);

  return (
    <div className="connected-speech">
      <div className="cs-head">
        <span className="cs-label">🔗 Cómo suena</span>
        {canSpeak && (
          <div className="cs-audio">
            <button type="button" className="btn btn-ghost cs-btn" onClick={() => speak(phrase.en, 'en-US', 1)}>
              🔊 Natural
            </button>
            <button type="button" className="btn btn-ghost cs-btn" onClick={() => speak(phrase.en, 'en-US', SLOW_RATE)}>
              🐢 Lento
            </button>
          </div>
        )}
      </div>

      <p className="cs-text" lang="en">{phrase.connected}</p>

      {notes.length > 0 && (
        <ul className="cs-notes">
          {notes.map((n) => (
            <li key={`${n.from}-${n.type}`}>
              <span className="cs-from" lang="en">{n.from}</span>
              <span aria-hidden="true"> → </span>
              <span className="cs-sr"> suena </span>
              <strong className="cs-to" lang="en">{n.to}</strong>
              <span className={`cs-type cs-type-${n.type}`}>{connectedTypes[n.type]?.label ?? n.type}</span>
            </li>
          ))}
        </ul>
      )}

      {usedTypes.length > 0 && (
        <details className="cs-help">
          <summary>¿Qué significa cada tipo?</summary>
          <dl>
            {usedTypes.map((t) => (
              <div key={t}>
                <dt>{connectedTypes[t].label}</dt>
                <dd>{connectedTypes[t].explanation}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </div>
  );
}
