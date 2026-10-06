// Utilidad mínima sobre la Web Speech API del navegador (sin dependencias)
// para leer texto en voz alta. `lang` usa códigos BCP 47 ('en-US', 'es-ES');
// `rate` es la velocidad (1 = normal, < 1 más lento).
// No todos los navegadores la soportan (p. ej. algunos WebViews), así que
// `canSpeak` permite ocultar el botón cuando no está disponible.
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text, lang = 'en-US', rate = 1) {
  if (!canSpeak || !text) return;
  window.speechSynthesis.cancel(); // corta cualquier lectura en curso antes de empezar otra
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}
