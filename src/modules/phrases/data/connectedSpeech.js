// Connected speech: cómo suena cada frase al hablarla a velocidad natural
// (inglés americano). `connected` es un respelling informal, fácil de leer
// sin saber fonética; `notes` señala cada fenómeno como [original, suena, tipo].
//
// Convenciones del respelling: `-` une palabras que se pronuncian juntas,
// `'` marca un sonido que se corta o desaparece, `uh` es la vocal neutra
// (schwa) y `d` entre vocales es la "t/d suave" del inglés americano.

export const connectedTypes = {
  linking: {
    label: 'Enlace',
    explanation: 'La consonante final de una palabra se une a la vocal con la que empieza la siguiente.',
  },
  glide: {
    label: 'Enlace con y/w/r',
    explanation: 'Entre dos vocales aparece un sonido de y, w o r que las conecta.',
  },
  flap: {
    label: 'T/D suave',
    explanation: 'La t o d entre vocales suena como una d rápida, parecida a la r de "pero".',
  },
  glottal: {
    label: 'T cortada',
    explanation: 'La t final antes de una consonante casi no se pronuncia: se corta el aire.',
  },
  elision: {
    label: 'Sonido que desaparece',
    explanation: 'Una consonante (normalmente t o d entre otras consonantes) se omite.',
  },
  assimilation: {
    label: 'Asimilación',
    explanation: 'Dos sonidos se fusionan en uno nuevo: t + y suena "ch", d + y suena "j".',
  },
  weak: {
    label: 'Forma débil',
    explanation: 'Las palabras gramaticales sin acento se reducen: to → tuh, for → fer, can → k\'n, of → uh, and → \'n, you → ya.',
  },
  reduction: {
    label: 'Reducción',
    explanation: 'Grupos de palabras muy frecuentes se contraen al hablar rápido (lemme, dunno, tryna) y -ing suena -in\'.',
  },
}

const data = {
  'phrase-01': ["It depend-zon wha-cher lookin' fer.", [
    ['depends on', 'depend-zon', 'linking'],
    ["what you're", 'wha-cher', 'assimilation'],
    ['for', 'fer', 'weak'],
  ]],
  'phrase-02': ["I'm no' really sure how-duh explai-nit.", [
    ['not really', "no' really", 'glottal'],
    ['how to', 'how-duh', 'weak'],
    ['explain it', 'explai-nit', 'linking'],
  ]],
  'phrase-03': ['I know exackly wha-chu mean.', [
    ['exactly', 'exackly', 'elision'],
    ['what you', 'wha-chu', 'assimilation'],
  ]],
  'phrase-04': ["I've never really thaw-duh-bow-dit tha' way.", [
    ['thought about', 'thaw-duh-bout', 'flap'],
    ['about it', 'abow-dit', 'flap'],
    ['that way', "tha' way", 'glottal'],
  ]],
  'phrase-05': ["That's ak-shully-uh really goo' question.", [
    ['actually', 'ak-shully', 'reduction'],
    ['actually a', 'ak-shully-uh', 'glide'],
    ['good question', "goo' question", 'elision'],
  ]],
  'phrase-06': ["I dunno if tha' make-sense.", [
    ["don't know", 'dunno', 'reduction'],
    ['that makes', "tha' makes", 'glottal'],
    ['makes sense', 'make-sense', 'linking'],
  ]],
  'phrase-07': ["I wuz jus' abow-duh say the same thing.", [
    ['was', 'wuz', 'weak'],
    ['just about', "jus' about", 'elision'],
    ['about to', 'abow-duh', 'flap'],
  ]],
  'phrase-08': ["That's priddy much wha-dai wuz tryna say.", [
    ['pretty', 'priddy', 'flap'],
    ['what I', 'wha-dai', 'flap'],
    ['trying to', 'tryna', 'reduction'],
  ]],
  'phrase-09': ['I couldn-agree with-ya more.', [
    ["couldn't agree", 'couldn-agree', 'elision'],
    ['with you', 'with-ya', 'weak'],
  ]],
  'phrase-10': ["I wouldn' necessarily say that.", [
    ["wouldn't", "wouldn'", 'glottal'],
  ]],
  'phrase-11': ['The way-yai see-yit, there-ruh two possibilities.', [
    ['way I', 'way-yai', 'glide'],
    ['see it', 'see-yit', 'glide'],
    ['there are', 'there-ruh', 'glide'],
  ]],
  'phrase-12': ['Wha-daim tryna say-yiz that...', [
    ["what I'm", 'wha-daim', 'flap'],
    ['trying to', 'tryna', 'reduction'],
    ['say is', 'say-yiz', 'glide'],
  ]],
  'phrase-13': ["The main reason-ai think tha-diz 'cuz...", [
    ['reason I', 'reason-ai', 'linking'],
    ['that is', 'tha-diz', 'flap'],
    ['because', "'cuz", 'reduction'],
  ]],
  'phrase-14': ["Uz far-ruh-zai know, that's how-wit works.", [
    ['far as I', 'far-ruh-zai', 'linking'],
    ['how it', 'how-wit', 'glide'],
  ]],
  'phrase-15': ["From my poin-uh view, it makes perfec' sense.", [
    ['point of', 'poin-uh', 'weak'],
    ['perfect sense', "perfec' sense", 'elision'],
  ]],
  'phrase-16': ["I k'nunderstand why-yuh'd think that.", [
    ['can understand', "k'nunderstand", 'weak'],
    ['why you would', "why-yuh'd", 'reduction'],
  ]],
  'phrase-17': ["There's somethin-gai've bin thinkin-abow' lately.", [
    ["something I've", "somethin-gai've", 'linking'],
    ['been', 'bin', 'weak'],
    ['thinking about', "thinkin-abow'", 'reduction'],
  ]],
  'phrase-18': ["It's har-duh pu-din-tuh words, bu'...", [
    ['hard to', 'har-duh', 'elision'],
    ['put into', 'pu-din-tuh', 'flap'],
    ['but', "bu'", 'glottal'],
  ]],
  'phrase-19': ["Wha' makes this difficul-diz that...", [
    ['what makes', "wha' makes", 'glottal'],
    ['difficult is', 'difficul-diz', 'flap'],
  ]],
  'phrase-20': ["That's wun-nuh the reasons why-yai decide-duh...", [
    ['one of', 'wun-nuh', 'weak'],
    ['why I', 'why-yai', 'glide'],
    ['decided to', 'decide-duh', 'elision'],
  ]],
  'phrase-21': ["Lemme think-abow' that fer-uh second.", [
    ['let me', 'lemme', 'reduction'],
    ['think about', 'think-about', 'linking'],
    ['for a', 'fer-uh', 'weak'],
  ]],
  'phrase-22': ["How k'nai pu' this...?", [
    ['can I', "k'nai", 'weak'],
    ['put this', "pu' this", 'glottal'],
  ]],
  'phrase-23': ["I'm tryna think-uh the righ' word.", [
    ['trying to', 'tryna', 'reduction'],
    ['think of', 'think-uh', 'weak'],
    ['right word', "righ' word", 'glottal'],
  ]],
  'phrase-24': ['Wha-dai mean by tha-diz...', [
    ['what I', 'wha-dai', 'flap'],
    ['that is', 'tha-diz', 'flap'],
  ]],
  'phrase-25': ["Lemme see-yif-ai k'nexplain this properly.", [
    ['let me', 'lemme', 'reduction'],
    ['see if', 'see-yif', 'glide'],
    ['can explain', "k'nexplain", 'weak'],
  ]],
  'phrase-26': ["I dunno how-duh say thi-sin English, bu'...", [
    ["don't know", 'dunno', 'reduction'],
    ['how to', 'how-duh', 'weak'],
    ['this in', 'thi-sin', 'linking'],
  ]],
  'phrase-27': ["I'm no' sure-rif-aim explainin' myself correc'ly.", [
    ['not sure', "no' sure", 'glottal'],
    ["sure if I'm", 'sure-rif-aim', 'linking'],
    ['explaining', "explainin'", 'reduction'],
    ['correctly', "correc'ly", 'elision'],
  ]],
  'phrase-28': ['Whaddaya bin up-tuh lately?', [
    ['what have you', 'whaddaya', 'reduction'],
    ['been', 'bin', 'weak'],
    ['up to', 'up-tuh', 'weak'],
  ]],
  'phrase-29': ["It's bin-uh while since we las' tawkt.", [
    ['been a', 'bin-uh', 'linking'],
    ['last talked', "las' talked", 'elision'],
  ]],
  'phrase-30': ["I didn-expec' tha-duh happe-nuh-dall.", [
    ["didn't expect", 'didn-expect', 'elision'],
    ['that to', 'tha-duh', 'flap'],
    ['happen at all', 'happe-nuh-dall', 'linking'],
  ]],
  'phrase-31': ["I'm really lookin' forwar-duh seein-yuh-gain.", [
    ['looking', "lookin'", 'reduction'],
    ['forward to', 'forwar-duh', 'elision'],
    ['seeing you again', 'seein-yuh-gain', 'weak'],
  ]],
  'phrase-32': ["I en-di-dup stayin' home the whole day.", [
    ['ended up', 'en-di-dup', 'linking'],
    ['staying', "stayin'", 'reduction'],
  ]],
  'phrase-33': ["I haven' ha-duh chance-tuh do-wit yet.", [
    ["haven't had", "haven' had", 'glottal'],
    ['had a', 'ha-duh', 'linking'],
    ['chance to', 'chance-tuh', 'weak'],
    ['do it', 'do-wit', 'glide'],
  ]],
  'phrase-34': ["I've bin meanin-tuh ask-yuh somethin'.", [
    ['been', 'bin', 'weak'],
    ['meaning to', 'meanin-tuh', 'reduction'],
    ['ask you', 'ask-yuh', 'weak'],
  ]],
  'phrase-35': ["I wuz wonderin-if-yuh could help me with somethin'.", [
    ['was', 'wuz', 'weak'],
    ['wondering if', 'wonderin-if', 'reduction'],
    ['if you', 'if-yuh', 'weak'],
  ]],
  'phrase-36': ['It wasn-exackly wha-dai ha-din mind.', [
    ["wasn't exactly", 'wasn-exackly', 'elision'],
    ['what I', 'wha-dai', 'flap'],
    ['had in', 'ha-din', 'linking'],
  ]],
  'phrase-37': ['It turn-dout bedder thun-ai expected.', [
    ['turned out', 'turn-dout', 'linking'],
    ['better', 'bedder', 'flap'],
    ['than I', 'thun-ai', 'weak'],
  ]],
  'phrase-38': ['Lemme know-wif-yuh need anythin-gelse from me.', [
    ['let me', 'lemme', 'reduction'],
    ['know if you', 'know-wif-yuh', 'glide'],
    ['anything else', 'anythin-gelse', 'linking'],
  ]],
  'phrase-39': ["I'll tay-kuh loo-kuh-dit 'n ge' back-tuh-yuh.", [
    ['take a', 'tay-kuh', 'linking'],
    ['look at it', 'loo-kuh-dit', 'flap'],
    ['and', "'n", 'weak'],
    ['get back', "ge' back", 'glottal'],
    ['to you', 'tuh-yuh', 'weak'],
  ]],
  'phrase-40': ["I'm still tryna figure-rout wha' wen' wrong.", [
    ['trying to', 'tryna', 'reduction'],
    ['figure out', 'figure-rout', 'linking'],
    ['what went', "wha' went", 'glottal'],
    ['went wrong', "wen' wrong", 'elision'],
  ]],
  'phrase-41': ["Uz far-ruh-zai k'n tell, everythin-giz workin' correc'ly.", [
    ['far as I', 'far-ruh-zai', 'linking'],
    ['can', "k'n", 'weak'],
    ['everything is', 'everythin-giz', 'linking'],
    ['correctly', "correc'ly", 'elision'],
  ]],
  'phrase-42': ["I haven' bin able-tuh reproduce thee-yissue yet.", [
    ["haven't been", "haven' bin", 'glottal'],
    ['able to', 'able-tuh', 'weak'],
    ['the issue', 'thee-yissue', 'glide'],
  ]],
  'phrase-43': ["I jus' wannid-tuh make sure we're-ron the same page.", [
    ['just wanted', "jus' wanted", 'elision'],
    ['wanted to', 'wannid-tuh', 'elision'],
    ["we're on", "we're-ron", 'linking'],
  ]],
  'phrase-44': ['There seemz-tuh be-yuh-nissue with the way this works.', [
    ['seems to', 'seemz-tuh', 'weak'],
    ['be an', 'be-yun', 'glide'],
    ['an issue', 'uh-nissue', 'linking'],
  ]],
  'phrase-45': ["I'll letcha know-wuz soo-nuh-zai have more information.", [
    ['let you', 'letcha', 'assimilation'],
    ['know as', 'know-wuz', 'glide'],
    ['soon as I', 'soo-nuh-zai', 'linking'],
  ]],
}

// { [phraseId]: { connected, notes: [{ from, to, type }] } }
export const connectedSpeech = Object.fromEntries(
  Object.entries(data).map(([id, [connected, notes]]) => [
    id,
    { connected, notes: notes.map(([from, to, type]) => ({ from, to, type })) },
  ]),
)
