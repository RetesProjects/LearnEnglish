import { useState } from 'react'
import SpeakButton from '../../../components/SpeakButton'
import CategoryFilter from './CategoryFilter'
import ConnectedSpeech from './ConnectedSpeech'
import { usePhraseFilter } from '../hooks/usePhraseFilter'
import { phraseCategories } from '../data/phrases'
import { isSamePhrase, shuffleTokens } from '../utils/memorize'
import './WordOrderPractice.css'

// Una ronda: fichas mezcladas que el usuario toca para armar la frase.
function Round({ phrase, registerAnswer, onNext }) {
  const [tiles] = useState(() => shuffleTokens(phrase.en))
  const [placed, setPlaced] = useState([]) // ids de fichas en orden
  const [result, setResult] = useState(null) // null | true | false

  const byId = (id) => tiles.find((t) => t.id === id)
  const available = tiles.filter((t) => !placed.includes(t.id))
  const checked = result !== null
  const complete = placed.length === tiles.length

  const place = (id) => setPlaced((p) => [...p, id])
  const remove = (id) => setPlaced((p) => p.filter((x) => x !== id))
  const reset = () => setPlaced([])

  const check = () => {
    const attempt = placed.map((id) => byId(id).text).join(' ')
    const ok = isSamePhrase(attempt, phrase.en)
    setResult(ok)
    registerAnswer(phrase.id, ok)
  }

  return (
    <div className="word-order-card">
      <p className="word-order-hint">
        <span className="word-order-label">Traducción</span>
        {phrase.es}
      </p>

      <div
        className={`word-order-answer${checked ? (result ? ' is-correct' : ' is-wrong') : ''}`}
        aria-label="Tu frase"
      >
        {placed.length === 0 && (
          <span className="word-order-placeholder">Tocá las fichas para armar la frase</span>
        )}
        {placed.map((id) => (
          <button
            key={id}
            type="button"
            className="word-chip is-placed"
            disabled={checked}
            onClick={() => remove(id)}
            title="Quitar ficha"
          >
            {byId(id).text}
          </button>
        ))}
      </div>

      <div className="word-order-pool" aria-label="Fichas disponibles">
        {available.map((t) => (
          <button
            key={t.id}
            type="button"
            className="word-chip"
            disabled={checked}
            onClick={() => place(t.id)}
          >
            {t.text}
          </button>
        ))}
      </div>

      {checked && (
        <div className={`word-order-feedback ${result ? 'is-correct' : 'is-wrong'}`} role="status">
          <p>{result ? '¡Correcto!' : 'Todavía no es la frase correcta.'}</p>
          {!result && (
            <p className="word-order-solution">
              Frase correcta: <strong>{phrase.en}</strong>
            </p>
          )}
          <SpeakButton text={phrase.en} lang="en-US" />
          <ConnectedSpeech phrase={phrase} />
        </div>
      )}

      <div className="word-order-actions">
        {!checked ? (
          <>
            <button type="button" className="btn btn-ghost" onClick={reset} disabled={placed.length === 0}>
              Reiniciar
            </button>
            <button type="button" className="btn btn-primary" onClick={check} disabled={!complete}>
              Comprobar
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onNext}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  )
}

export default function WordOrderPractice({ module, registerAnswer }) {
  const { category, setCategory, filteredWords } = usePhraseFilter(module.words)
  // Solo frases con al menos dos palabras tienen sentido para ordenar.
  const usable = filteredWords.filter((w) => w.en.trim().split(/\s+/).length >= 2)
  // `r` (0..1) elige la frase de la ronda; `n` fuerza remontar la ronda.
  const [round, setRound] = useState(() => ({ r: Math.random(), n: 0 }))

  const index = usable.length ? Math.floor(round.r * usable.length) : -1
  const current = index >= 0 ? usable[index] : null

  const next = () =>
    setRound((prev) => {
      let r = Math.random()
      if (usable.length > 1 && Math.floor(r * usable.length) === index) {
        r = (r + 1 / usable.length) % 1
      }
      return { r, n: prev.n + 1 }
    })

  const changeCategory = (c) => {
    setCategory(c)
    setRound((prev) => ({ r: Math.random(), n: prev.n + 1 }))
  }

  return (
    <div className="mode-panel word-order">
      <div className="mode-header">
        <h2>Ordenar palabras</h2>
        <p>Armá la frase en inglés tocando las fichas en el orden correcto.</p>
      </div>

      <CategoryFilter
        value={category}
        onChange={changeCategory}
        words={module.words}
        categories={phraseCategories}
      />

      {current ? (
        <Round key={`${current.id}-${round.n}`} phrase={current} registerAnswer={registerAnswer} onNext={next} />
      ) : (
        <p className="word-order-empty">No hay frases en esta categoría.</p>
      )}
    </div>
  )
}
