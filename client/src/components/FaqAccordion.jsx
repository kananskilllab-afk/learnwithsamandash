import { useState } from "react";

/** items: [{ q: string, a: ReactNode }] */
export function FaqGroup({ title, items, id }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="faq-group" id={id}>
      {title && <h3>{title}</h3>}
      {items.map((item, i) => (
        <div className={`faq-item${openIndex === i ? " open" : ""}`} key={i}>
          <button className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            {item.q}
            <span className="plus">＋</span>
          </button>
          <div className="faq-a">
            <div className="faq-a-inner">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
