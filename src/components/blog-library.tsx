"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiSearch, FiFileText, FiLayers, FiShield, FiGrid, FiList } from "react-icons/fi";
type Post = {slug:string;category:string;title:string;image:string;excerpt:string};
export function BlogLibrary({posts}:{posts:Post[]}) {
  const [category,setCategory]=useState("All articles");
  const [query,setQuery]=useState("");
  const [view,setView]=useState<"grid"|"list">("grid");
  const topics=[
    {name:"Procurement",Icon:FiFileText,description:"Quotation checklists, project scope and supplier discussions."},
    {name:"Tooling",Icon:FiLayers,description:"Drawing reviews, application requirements and project planning."},
    {name:"Quality",Icon:FiShield,description:"Inspection expectations, sample reviews and tooling handover."},
  ];
  const visible=posts.filter(post=>(category==="All articles"||post.category===category)&&`${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <>
    <div className="bl-topic-grid" aria-label="Browse blog topics">{topics.map(({name,Icon,description})=>{const count=posts.filter(post=>post.category===name).length;return <button className="bl-topic" key={name} aria-pressed={category===name} onClick={()=>{setCategory(name);setQuery("");}}><span className="bl-topic-icon"><Icon/></span><span className="bl-topic-copy"><strong>{name}</strong><span>{description}</span><small>{count} {count===1?"guide":"guides"}<FiArrowRight/></small></span></button>})}</div>
    <div className="bl-tools"><div className="bl-filters" aria-label="Article categories">{["All articles","Procurement","Tooling","Quality"].map(item=><button key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div><label className="bl-search"><FiSearch/><input type="search" aria-label="Search articles" placeholder="Search articles…" value={query} onChange={event=>setQuery(event.target.value)}/></label></div>
    <div className="bl-results-toolbar"><div className="bl-result-count" aria-live="polite">Showing {visible.length} of {posts.length} articles</div><div className="bl-view-toggle" aria-label="Article layout"><button aria-label="Grid view" aria-pressed={view==="grid"} onClick={()=>setView("grid")}><FiGrid/></button><button aria-label="List view" aria-pressed={view==="list"} onClick={()=>setView("list")}><FiList/></button></div></div>
    <div className={`bl-article-grid ${view==="list"?"bl-list-view":""}`}>{visible.map(post=><article className="bl-card" key={post.slug}><Link className="bl-card-image" href={`/blog/${post.slug}`}><Image src={`/assets/${post.image}`} alt={post.title} width={656} height={399} sizes="(max-width:700px) 90vw,(max-width:1000px) 44vw,405px"/></Link><div className="bl-card-copy"><span className="bl-category">{post.category}</span><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article <FiArrowRight/></Link></div></article>)}</div>
    {visible.length===0&&<div className="bl-empty"><h3>No matching articles</h3><p>Try another keyword or browse all categories.</p><button onClick={()=>{setCategory("All articles");setQuery("");}}>Show all articles</button></div>}
  </>;
}
