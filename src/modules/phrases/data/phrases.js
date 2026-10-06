// Banco de frases largas (chunks) en inglés con su significado natural en español.
// Cada ítem: { id, en, es, category, connected, notes } — `category` es un id de
// `phraseCategories`; `connected`/`notes` vienen de `connectedSpeech.js`.

import { connectedSpeech } from './connectedSpeech'

export const phraseCategories = [
  { id: 'conversation', label: 'Para conversar naturalmente' },
  { id: 'ideas', label: 'Para explicar tus ideas' },
  { id: 'stalling', label: 'Para ganar tiempo mientras hablas' },
  { id: 'everyday', label: 'Para conversaciones cotidianas' },
  { id: 'professional', label: 'Inglés profesional' },
]

const raw = [
  // Para conversar naturalmente
  ['conversation', "It depends on what you're looking for.", 'Depende de lo que estés buscando.'],
  ['conversation', "I'm not really sure how to explain it.", 'No estoy muy seguro de cómo explicarlo.'],
  ['conversation', 'I know exactly what you mean.', 'Sé exactamente a qué te refieres.'],
  ['conversation', "I've never really thought about it that way.", 'Nunca lo había pensado de esa manera.'],
  ['conversation', "That's actually a really good question.", 'Esa es, de hecho, una muy buena pregunta.'],
  ['conversation', "I don't know if that makes sense.", 'No sé si eso tenga sentido.'],
  ['conversation', 'I was just about to say the same thing.', 'Justo iba a decir lo mismo.'],
  ['conversation', "That's pretty much what I was trying to say.", 'Eso es básicamente lo que intentaba decir.'],
  ['conversation', "I couldn't agree with you more.", 'No podría estar más de acuerdo contigo.'],
  ['conversation', "I wouldn't necessarily say that.", 'No necesariamente diría eso.'],

  // Para explicar tus ideas
  ['ideas', 'The way I see it, there are two possibilities.', 'Como yo lo veo, hay dos posibilidades.'],
  ['ideas', "What I'm trying to say is that...", 'Lo que intento decir es que...'],
  ['ideas', 'The main reason I think that is because...', 'La razón principal por la que pienso eso es porque...'],
  ['ideas', "As far as I know, that's how it works.", 'Hasta donde sé, así funciona.'],
  ['ideas', 'From my point of view, it makes perfect sense.', 'Desde mi punto de vista, tiene todo el sentido.'],
  ['ideas', 'I can understand why you would think that.', 'Puedo entender por qué pensarías eso.'],
  ['ideas', "There's something I've been thinking about lately.", 'Hay algo en lo que he estado pensando últimamente.'],
  ['ideas', "It's hard to put into words, but...", 'Es difícil expresarlo con palabras, pero...'],
  ['ideas', 'What makes this difficult is that...', 'Lo que hace esto difícil es que...'],
  ['ideas', "That's one of the reasons why I decided to...", 'Esa es una de las razones por las que decidí...'],

  // Para ganar tiempo mientras hablas
  ['stalling', 'Let me think about that for a second.', 'Déjame pensar eso un segundo.'],
  ['stalling', 'How can I put this...?', '¿Cómo podría decirlo...?'],
  ['stalling', "I'm trying to think of the right word.", 'Estoy tratando de pensar en la palabra correcta.'],
  ['stalling', 'What I mean by that is...', 'Lo que quiero decir con eso es...'],
  ['stalling', 'Let me see if I can explain this properly.', 'Déjame ver si puedo explicar esto bien.'],
  ['stalling', "I don't know how to say this in English, but...", 'No sé cómo decir esto en inglés, pero...'],
  ['stalling', "I'm not sure if I'm explaining myself correctly.", 'No sé si me estoy explicando correctamente.'],

  // Para conversaciones cotidianas
  ['everyday', 'What have you been up to lately?', '¿Qué has estado haciendo últimamente?'],
  ['everyday', "It's been a while since we last talked.", 'Ha pasado tiempo desde la última vez que hablamos.'],
  ['everyday', "I didn't expect that to happen at all.", 'No esperaba para nada que eso sucediera.'],
  ['everyday', "I'm really looking forward to seeing you again.", 'Tengo muchas ganas de volver a verte.'],
  ['everyday', 'I ended up staying home the whole day.', 'Terminé quedándome en casa todo el día.'],
  ['everyday', "I haven't had a chance to do it yet.", 'Todavía no he tenido oportunidad de hacerlo.'],
  ['everyday', "I've been meaning to ask you something.", 'He estado queriendo preguntarte algo.'],
  ['everyday', 'I was wondering if you could help me with something.', 'Me preguntaba si podrías ayudarme con algo.'],
  ['everyday', "It wasn't exactly what I had in mind.", 'No era exactamente lo que tenía en mente.'],
  ['everyday', 'It turned out better than I expected.', 'Resultó mejor de lo que esperaba.'],

  // Inglés profesional
  ['professional', 'Let me know if you need anything else from me.', 'Avísame si necesitas algo más de mi parte.'],
  ['professional', "I'll take a look at it and get back to you.", 'Lo revisaré y luego te respondo.'],
  ['professional', "I'm still trying to figure out what went wrong.", 'Todavía estoy intentando averiguar qué salió mal.'],
  ['professional', 'As far as I can tell, everything is working correctly.', 'Por lo que puedo ver, todo funciona correctamente.'],
  ['professional', "I haven't been able to reproduce the issue yet.", 'Todavía no he podido reproducir el problema.'],
  ['professional', "I just wanted to make sure we're on the same page.", 'Solo quería asegurarme de que estamos en sintonía.'],
  ['professional', 'There seems to be an issue with the way this works.', 'Parece haber un problema con la manera en que esto funciona.'],
  ['professional', "I'll let you know as soon as I have more information.", 'Te avisaré en cuanto tenga más información.'],
]

export const phrases = raw.map(([category, en, es], i) => {
  const id = `phrase-${String(i + 1).padStart(2, '0')}`
  return { id, en, es, category, ...connectedSpeech[id] }
})
