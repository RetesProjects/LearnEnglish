import { useCallback, useMemo, useState } from 'react'

export const PHRASE_FILTER_KEY = 'phrases-category-filter-v1'
export const ALL_CATEGORIES = 'all'

// Categorías presentes en las frases (sin depender de otros archivos del módulo)
export function getCategoryIds(words) {
  return [...new Set(words.map((w) => w.category).filter(Boolean))]
}

function readStored() {
  try {
    const value = localStorage.getItem(PHRASE_FILTER_KEY)
    return typeof value === 'string' && value ? value : ALL_CATEGORIES
  } catch {
    return ALL_CATEGORIES
  }
}

// Guarda la categoría activa en localStorage y devuelve las frases filtradas.
// Si la categoría guardada ya no existe, vuelve a 'all'.
export function usePhraseFilter(words) {
  const [stored, setStored] = useState(readStored)

  const category = useMemo(
    () =>
      stored === ALL_CATEGORIES || getCategoryIds(words).includes(stored)
        ? stored
        : ALL_CATEGORIES,
    [stored, words],
  )

  const setCategory = useCallback((next) => {
    setStored(next)
    try {
      localStorage.setItem(PHRASE_FILTER_KEY, next)
    } catch {
      // almacenamiento no disponible: el filtro solo vive en memoria
    }
  }, [])

  const filteredWords = useMemo(
    () =>
      category === ALL_CATEGORIES
        ? words
        : words.filter((w) => w.category === category),
    [words, category],
  )

  return { category, setCategory, filteredWords }
}
