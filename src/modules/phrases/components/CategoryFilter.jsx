import { ALL_CATEGORIES, getCategoryIds } from '../hooks/usePhraseFilter'
import './CategoryFilter.css'

// Selector de categoría con conteo. `categories` es opcional:
// [{ id, label }]; si falta, se derivan de `words` (etiqueta = id).
export default function CategoryFilter({ value, onChange, words, categories }) {
  const list =
    categories ?? getCategoryIds(words).map((id) => ({ id, label: id }))
  const countOf = (id) => words.filter((w) => w.category === id).length

  const options = [
    { id: ALL_CATEGORIES, label: 'Todas', count: words.length },
    ...list.map((c) => ({ ...c, count: countOf(c.id) })),
  ]

  return (
    <div className="category-filter" role="group" aria-label="Filtrar por categoría">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`category-chip${value === opt.id ? ' is-active' : ''}`}
          aria-pressed={value === opt.id}
          onClick={() => onChange(opt.id)}
        >
          <span className="category-chip-label">{opt.label}</span>
          <span className="category-chip-count">{opt.count}</span>
        </button>
      ))}
    </div>
  )
}
