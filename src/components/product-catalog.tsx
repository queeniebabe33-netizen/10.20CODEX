"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { ProductLink } from "./interactions";

const products = [
  { id: "medical", category: "Medical", title: "Medical Injection Molds", image: "medical-match.webp", description: "Custom tooling for medical device housings and plastic components, coordinated around your drawings and inspection requirements.", applications: ["Device housings", "Instrument enclosures", "Plastic components"], label: "View product details" },
  { id: "automotive", category: "Automotive", title: "Automotive Plastic Parts Molds", image: "automotive-match.webp", description: "Tooling coordination for automotive interior, exterior and functional plastic parts, with material and finish requirements defined per project.", applications: ["Interior components", "Air vents", "Functional parts"], label: "Explore tooling" },
  { id: "electronics", category: "Electronics", title: "Electronic Plastic Molds", image: "electronics-match.webp", description: "Custom mold projects for electronic enclosures and plastic housings, with attention to assembly, appearance and functional requirements.", applications: ["Electronic enclosures", "Industrial housings", "Custom plastic parts"], label: "Explore tooling" },
];
export function ProductCatalog() {
  const [filter, setFilter] = useState("All products");
  useEffect(() => {
    const update = () => {
      const category = products.find(product => `#${product.id}` === window.location.hash)?.category;
      if (category) setFilter(category);
      else if (!window.location.hash || window.location.hash === "#catalog") setFilter("All products");
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const visible = products.filter(product => filter === "All products" || product.category === filter);
  return <><div className="pc-filter-bar"><div className="pc-filters" aria-label="Filter by industry">{["All products", "Medical", "Automotive", "Electronics"].map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div><span aria-live="polite">{visible.length} {visible.length === 1 ? "category" : "categories"}</span></div><div className="pc-catalog-grid">{visible.map(product => <article className="pc-product-card" id={product.id} key={product.id}><div className="pc-card-image"><ProductLink product={product.id} label={`View ${product.title}`}><Image src={`/assets/${product.image}`} alt={product.title} width={405} height={233} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 44vw, 405px" /></ProductLink><span>Illustrative imagery</span></div><div className="pc-card-copy"><p className="pc-card-eyebrow">{product.category.toUpperCase()} TOOLING</p><h3><ProductLink product={product.id}>{product.title}</ProductLink></h3><p className="pc-card-description">{product.description}</p><ul>{product.applications.map(application => <li key={application}>{application}</li>)}</ul><div className="pc-card-actions"><ProductLink className="text-link" product={product.id}>{product.label}<FiArrowRight /></ProductLink><a href="#quote" aria-label={`Request a quote for ${product.title}`}><FiArrowUpRight /></a></div></div></article>)}</div></>;
}
