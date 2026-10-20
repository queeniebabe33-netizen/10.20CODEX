"use client";
import Image from "next/image";
import { useState } from "react";
const views = [
  { image: "tooling.jpeg", label: "Tooling overview" },
  { image: "inspection.jpeg", label: "Inspection example" },
  { image: "medical.jpeg", label: "Housing application" },
];
export function ProductGallery() {
  const [active, setActive] = useState(0);
  return <div className="pd-gallery"><div className="pd-gallery-main"><Image src={`/assets/${views[active].image}`} alt={views[active].label} fill sizes="(max-width: 800px) 90vw, 620px" /><span>Illustrative imagery</span></div><div className="pd-thumbnails" aria-label="Product image views">{views.map((view,index)=><button key={view.label} aria-label={view.label} aria-pressed={active===index} className={active===index?"selected":""} onClick={()=>setActive(index)}><Image src={`/assets/${view.image}`} alt="" fill sizes="200px" /></button>)}</div></div>;
}
