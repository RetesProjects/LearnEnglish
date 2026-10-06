import { shuffle } from '../../../utils/shuffle';

// Palabras funcionales que se evitan al elegir huecos (si hay alternativas).
const FUNCTION_WORDS = new Set([
  'a', 'an', 'the', 'i', 'to', 'of', 'in', 'on', 'at', 'it', 'is', 'am', 'are',
  'be', 'and', 'or', 'but', 'so', 'if', 'as', 'by', 'for', 'my', 'me', 'we',
  'you', 'he', 'she', 'do', 'no', 'that', 'this', 'with', 'was', 'its', 'your',
]);

// Normaliza una palabra: minúsculas, apóstrofes tipográficos -> ', sin puntuación en los bordes.
export function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[^\p{L}\p{N}']+/gu, ' ')
    .replace(/(^|\s)'+|'+(?=\s|$)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

// Divide un texto en palabras tal como se escriben (conserva puntuación pegada).
export function tokenize(text) {
  return String(text ?? '').trim().split(/\s+/).filter(Boolean);
}

// Palabras normalizadas (sin puntuación) para comparar; descarta las vacías.
function normalizedWords(text) {
  return tokenize(text).map(normalize).filter(Boolean);
}

// Cantidad de huecos según el nivel (1 a 3) y la longitud de la frase.
function holeCount(total, level) {
  const lvl = Math.min(3, Math.max(1, Math.round(level) || 1));
  const ratio = [0.2, 0.4, 0.65][lvl - 1];
  return Math.max(1, Math.min(total - 1 > 0 ? total - 1 : 1, Math.round(total * ratio)));
}

// Devuelve tokens { text, hidden }. Oculta más palabras clave a mayor nivel,
// prefiriendo palabras largas y no funcionales. `text` conserva la puntuación.
export function cloze(phrase, level = 1) {
  const tokens = tokenize(phrase);
  const count = holeCount(tokens.length, level);
  const scored = tokens
    .map((text, index) => {
      const norm = normalize(text);
      const weak = !norm || norm.length <= 2 || FUNCTION_WORDS.has(norm);
      return { index, weak, len: norm.length, rnd: Math.random() };
    })
    .filter((t) => t.len > 0)
    .sort((a, b) => Number(a.weak) - Number(b.weak) || b.rnd - a.rnd);
  const hiddenIdx = new Set(scored.slice(0, count).map((t) => t.index));
  return tokens.map((text, index) => ({ text, hidden: hiddenIdx.has(index) }));
}

// Compara lo escrito con la frase correcta (LCS por palabras normalizadas).
// Devuelve [{ text, status }] con status: 'ok' | 'missing' (falta, texto
// correcto) | 'wrong' (palabra escrita distinta de la esperada) | 'extra' (sobra).
export function diffWords(typed, correct) {
  const a = tokenize(typed).filter((t) => normalize(t));
  const b = tokenize(correct).filter((t) => normalize(t));
  const na = a.map(normalize);
  const nb = b.map(normalize);
  const dp = Array.from({ length: a.length + 1 }, () => Array.from({ length: b.length + 1 }, () => 0));
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      dp[i][j] = na[i] === nb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ops = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && na[i] === nb[j]) {
      ops.push({ text: b[j], status: 'ok' });
      i += 1;
      j += 1;
    } else if (j < b.length && (i >= a.length || dp[i][j + 1] >= dp[i + 1][j])) {
      ops.push({ text: b[j], status: 'missing' });
      j += 1;
    } else {
      ops.push({ text: a[i], status: 'extra' });
      i += 1;
    }
  }
  // Un 'extra' junto a un 'missing' contiguo se interpreta como palabra incorrecta.
  const result = [];
  for (let k = 0; k < ops.length; k += 1) {
    const cur = ops[k];
    const next = ops[k + 1];
    if (cur.status === 'extra' && next?.status === 'missing') {
      result.push({ text: cur.text, status: 'wrong', expected: next.text });
      k += 1;
    } else if (cur.status === 'missing' && next?.status === 'extra') {
      result.push({ text: next.text, status: 'wrong', expected: cur.text });
      k += 1;
    } else {
      result.push(cur);
    }
  }
  return result;
}

// Indica si lo escrito coincide con la frase correcta tras normalizar.
export function isSamePhrase(typed, correct) {
  return normalizedWords(typed).join(' ') === normalizedWords(correct).join(' ');
}

// Mezcla las palabras de la frase garantizando un orden distinto del original
// (si hay al menos dos palabras distintas). Devuelve [{ id, text }].
export function shuffleTokens(phrase) {
  const tokens = tokenize(phrase).map((text, id) => ({ id, text }));
  const sameOrder = (arr) => arr.every((t, k) => t.text === tokens[k].text);
  if (tokens.length < 2 || tokens.every((t) => t.text === tokens[0].text)) return tokens;
  let result = shuffle(tokens);
  let attempts = 0;
  while (sameOrder(result) && attempts < 50) {
    result = shuffle(tokens);
    attempts += 1;
  }
  return result;
}

// Ordena frases por prioridad de repaso: no dominadas primero, luego menor
// racha, más errores, menos vistas; el azar desempata. No muta `words`.
export function prioritizePhrases(words, getEntry) {
  return words
    .map((word) => {
      const e = getEntry(word.id);
      return { word, e, rnd: Math.random() };
    })
    .sort(
      (x, y) =>
        Number(x.e.status === 'mastered') - Number(y.e.status === 'mastered') ||
        x.e.streak - y.e.streak ||
        y.e.wrong - x.e.wrong ||
        x.e.seen - y.e.seen ||
        x.rnd - y.rnd,
    )
    .map((x) => x.word);
}
