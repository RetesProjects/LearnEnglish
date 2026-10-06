import { useState } from 'react'
import SpeakButton from '../../../components/SpeakButton'
import CategoryFilter from './CategoryFilter'
import ConnectedSpeech from './ConnectedSpeech'
import { phraseCategories } from '../data/phrases'
import { usePhraseFilter } from '../hooks/usePhraseFilter'
import { prioritizePhrases } from '../utils/memorize'
import './SpacedReviewPractice.css'

const BATCH_SIZE = 10

const STATUS_LABELS = {
  new: 'Nueva',
  learning: 'En aprendizaje',
  mastered: 'Dominada',
}

function statusOf(entry) {
  if (!entry || entry.seen === 0) return 'new'
  return entry.status === 'mastered' ? 'mastered' : 'learning'
}

function buildQueue(words, getEntry) {
  return prioritizePhrases(words, getEntry).slice(0, BATCH_SIZE)
}

// Repaso espaciado: tandas de frases priorizadas por peor desempeño.
// Se muestra el español, el usuario intenta recordar y revela el inglés.
export default function SpacedReviewPractice({ module, getEntry, registerAnswer }) {
  const { category, setCategory, filteredWords } = usePhraseFilter(module.words)
  const [queue, setQueue] = useState(() => buildQueue(filteredWords, getEntry))
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState({ remembered: 0, forgot: 0 })

  const finished = queue.length > 0 && index >= queue.length
  const current = queue[index]

  const startBatch = (words) => {
    setQueue(buildQueue(words, getEntry))
    setIndex(0)
    setRevealed(false)
    setResults({ remembered: 0, forgot: 0 })
  }

  const handleCategory = (next) => {
    setCategory(next)
    startBatch(next === 'all' ? module.words : module.words.filter((w) => w.category === next))
  }

  const answer = (remembered) => {
    registerAnswer(current.id, remembered)
    setResults((r) => ({
      remembered: r.remembered + (remembered ? 1 : 0),
      forgot: r.forgot + (remembered ? 0 : 1),
    }))
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  const pending = filteredWords.filter((w) => getEntry(w.id).status !== 'mastered').length

  const filter = (
    <CategoryFilter
      value={category}
      onChange={handleCategory}
      words={module.words}
      categories={phraseCategories}
    />
  )

  if (queue.length === 0) {
    return (
      <div className="spaced-review">
        {filter}
        <p className="spaced-empty">No hay frases en esta categoría.</p>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="spaced-review">
        {filter}
        <div className="spaced-summary">
          <h3>Tanda terminada</h3>
          <p>
            Recordadas: <strong>{results.remembered}</strong> · No recordadas:{' '}
            <strong>{results.forgot}</strong>
          </p>
          <p>
            Frases sin dominar en esta categoría: <strong>{pending}</strong> de{' '}
            {filteredWords.length}.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => startBatch(filteredWords)}>
            Siguiente tanda
          </button>
        </div>
      </div>
    )
  }

  const status = statusOf(getEntry(current.id))

  return (
    <div className="spaced-review">
      {filter}
      <p className="spaced-progress">
        Frase {index + 1} de {queue.length}
      </p>
      <div className="spaced-card">
        <span className={`spaced-status spaced-status-${status}`}>{STATUS_LABELS[status]}</span>
        <p className="spaced-es">{current.es}</p>
        {revealed ? (
          <div className="spaced-answer">
            <p className="spaced-en">{current.en}</p>
            <SpeakButton text={current.en} />
            <ConnectedSpeech phrase={current} />
          </div>
        ) : (
          <p className="spaced-hint">Intentá recordar cómo se dice en inglés.</p>
        )}
      </div>
      {revealed ? (
        <div className="spaced-actions">
          <button type="button" className="btn btn-danger" onClick={() => answer(false)}>
            No lo recordé
          </button>
          <button type="button" className="btn btn-success" onClick={() => answer(true)}>
            Lo recordé
          </button>
        </div>
      ) : (
        <div className="spaced-actions">
          <button type="button" className="btn btn-primary" onClick={() => setRevealed(true)}>
            Mostrar inglés
          </button>
        </div>
      )}
    </div>
  )
}
