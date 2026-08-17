import { useState } from "react";

/** modules: [{ name: string, items: string[] }] */
export default function CurriculumAccordion({ modules }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div>
      {modules.map((mod, i) => (
        <div className={`curriculum-item${openIndex === i ? " open" : ""}`} key={mod.name}>
          <div className="curriculum-head" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <b>{mod.name}</b>
            <span className="plus">＋</span>
          </div>
          <div className="curriculum-body">
            <ul>
              {mod.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
