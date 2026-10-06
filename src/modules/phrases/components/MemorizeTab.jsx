import { useState } from 'react';
import ClozePractice from './ClozePractice';
import WordOrderPractice from './WordOrderPractice';
import TypeFromMemoryPractice from './TypeFromMemoryPractice';
import SpacedReviewPractice from './SpacedReviewPractice';
import './MemorizeTab.css';

const DYNAMICS = [
  { key: 'cloze', label: 'Huecos', Component: ClozePractice },
  { key: 'order', label: 'Ordenar', Component: WordOrderPractice },
  { key: 'type', label: 'Escribir', Component: TypeFromMemoryPractice },
  { key: 'review', label: 'Repaso espaciado', Component: SpacedReviewPractice },
];

// Pestaña "Memorizar": selector de dinámica + la dinámica activa.
export default function MemorizeTab({ module, getEntry, registerAnswer }) {
  const [active, setActive] = useState(DYNAMICS[0].key);
  const current = DYNAMICS.find((d) => d.key === active) ?? DYNAMICS[0];
  const Active = current.Component;

  return (
    <section className="mode-panel memorize-tab">
      <div className="memorize-selector" role="tablist" aria-label="Dinámica de memorización">
        {DYNAMICS.map((d) => (
          <button
            key={d.key}
            type="button"
            role="tab"
            aria-selected={d.key === current.key}
            className={`btn memorize-option${d.key === current.key ? ' memorize-option-active' : ''}`}
            onClick={() => setActive(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <Active key={current.key} module={module} getEntry={getEntry} registerAnswer={registerAnswer} />
    </section>
  );
}
