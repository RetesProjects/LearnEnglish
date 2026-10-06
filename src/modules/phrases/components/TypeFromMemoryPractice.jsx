import { useState } from 'react'
import { shuffle } from '../../../utils/shuffle'
import SpeakButton from '../../../components/SpeakButton'
import CategoryFilter from './CategoryFilter'
import ConnectedSpeech from './ConnectedSpeech'
import { usePhraseFilter } from '../hooks/usePhraseFilter'
import { phraseCategories } from '../data/phrases'
import { diffWords, isSamePhrase, tokenize } from '../utils/memorize'
import './TypeFromMemoryPractice.css'

const MARKS = { ok: '', missing: '＋ ', wrong: '✗ ', extra: '− ' }
const LABELS = {
  ok: 'correcta',
  missing: 'falta',
  wrong: 'incorrecta',
  extra: 'sobra',
}

// Primera letra de cada palabra, el resto como guiones bajos.
function hintFor(en) {
  return tokenize(en)
    .map((w) => w[0] + '_'.repeat(Math.max(0, w.length - 1)))
    .join(' ')
}

function Practice({ words, registerAnswer }) {
  const [deck, setDeck] = useState(() => shuffle(words))
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const phrase = deck[index % deck.length]
  const correct = checked && isSamePhrase(typed, phrase.en)
  const diff = checked ? diffWords(typed, phrase.en) : []

  const handleCheck = () => {
    if (checked || !typed.trim()) return
    registerAnswer(phrase.id, isSamePhrase(typed, phrase.en))
    setChecked(true)
  }

  const handleNext = () => {
    if (index + 1 >= deck.length) {
      setDeck(shuffle(words))
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
    setTyped('')
    setChecked(false)
    setShowHint(false)
  }

  return (
    <div className="tfm-card">
      <p className="tfm-progress">
        Frase {(index % deck.length) + 1} de {deck.length}
      </p>
      <p className="tfm-prompt-label">Escribí en inglés:</p>
      <p className="tfm-prompt">{phrase.es}</p>

      <textarea
        className="tfm-input"
        rows={3}
        value={typed}
        disabled={checked}
        placeholder="Escribí la frase en inglés de memoria..."
        aria-label="Frase en inglés"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        onChange={(e) => setTyped(e.target.value)}
      />

      {showHint && !checked && (
        <p className="tfm-hint" aria-live="polite">
          Pista: {hintFor(phrase.en)}
        </p>
      )}

      {!checked ? (
        <div className="tfm-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setShowHint((v) => !v)}
          >
            {showHint ? 'Ocultar pista' : 'Ver pista'}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!typed.trim()}
            onClick={handleCheck}
          >
            Comprobar
          </button>
        </div>
      ) : (
        <div className="tfm-result" aria-live="polite">
          <p className={`tfm-verdict ${correct ? 'is-correct' : 'is-wrong'}`}>
            {correct ? '✓ ¡Correcto!' : '✗ Hay diferencias'}
          </p>
          {!correct && (
            <>
              <p className="tfm-diff" aria-label="Diferencias con la frase correcta">
                {diff.map((t, i) => (
                  <span key={i} className={`tfm-token tfm-${t.status}`}>
                    <span className="tfm-mark" aria-hidden="true">
                      {MARKS[t.status]}
                    </span>
                    {t.text}
                    <span className="tfm-sr">{` (${LABELS[t.status]}${
                      t.status === 'wrong' && t.expected ? `, era ${t.expected}` : ''
                    })`}</span>
                  </span>
                ))}
              </p>
              <p className="tfm-legend">
                ＋ falta · ✗ incorrecta (subrayada) · − sobra (tachada)
              </p>
            </>
          )}
          <p className="tfm-correct">
            <strong>Frase correcta:</strong> {phrase.en}{' '}
            <SpeakButton text={phrase.en} />
          </p>
          <ConnectedSpeech phrase={phrase} />
          <div className="tfm-actions">
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TypeFromMemoryPractice({ module, registerAnswer }) {
  const { category, setCategory, filteredWords } = usePhraseFilter(module.words)

  return (
    <div className="mode-panel tfm-panel">
      <div className="mode-header">
        <h2>Escribir de memoria</h2>
      </div>
      <CategoryFilter
        value={category}
        onChange={setCategory}
        words={module.words}
        categories={phraseCategories}
      />
      {filteredWords.length === 0 ? (
        <p>No hay frases en esta categoría.</p>
      ) : (
        <Practice
          key={category}
          words={filteredWords}
          registerAnswer={registerAnswer}
        />
      )}
    </div>
  )
}
