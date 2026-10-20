"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowUpRight, FiChevronDown, FiFileText, FiGlobe, FiLayers, FiMenu, FiMessageSquare, FiSettings, FiShield, FiX } from "react-icons/fi";

type MenuKey = "products" | "applications" | "capabilities" | "resources";
const navigation = [
  { label: "Home", href: "/#home" },
  { label: "Products", menu: "products" as MenuKey },
  { label: "Applications", menu: "applications" as MenuKey },
  { label: "Capabilities", menu: "capabilities" as MenuKey },
  { label: "Resources", menu: "resources" as MenuKey },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
const menuContent = {
  products: { eyebrow: "OUR PRODUCTS", title: "Precision starts with the right tooling.", description: "Explore custom mold solutions for your next project.", action: "Explore all products", href: "/products", links: [
    { title: "Medical Injection Molds", description: "Tooling for device housings and components.", image: "medical-match.webp", href: "/products/medical-device-housing-injection-mold" },
    { title: "Automotive Plastic Parts Molds", description: "Interior, exterior and functional components.", image: "automotive-match.webp", href: "/products#automotive" },
    { title: "Electronic Plastic Molds", description: "Enclosures and custom plastic housings.", image: "electronics-match.webp", href: "/products#electronics" },
  ] },
  applications: { eyebrow: "BY APPLICATION", title: "From concept to real-world products.", description: "Find the application that fits your project.", action: "View application examples", href: "/#applications", links: [
    { title: "Medical & Healthcare", description: "Device housings and plastic components.", image: "medical-match.webp", href: "/#applications" },
    { title: "Automotive Components", description: "Interior trim and functional plastic parts.", image: "vent-match.webp", href: "/#applications" },
    { title: "Electronics & Appliances", description: "Housings for industrial and everyday products.", image: "electronic-match.webp", href: "/#applications" },
  ] },
  capabilities: { eyebrow: "HOW WE WORK", title: "One clear path from drawing to delivery.", description: "A coordinated process, with your requirements at its center.", action: "Explore our capabilities", href: "/#capabilities", links: [
    { title: "Design & Tooling Review", description: "Discuss drawings, materials and production targets.", icon: FiLayers, href: "/#capabilities" },
    { title: "Tooling Coordination", description: "Align development with manufacturing partners.", icon: FiSettings, href: "/#capabilities" },
    { title: "Inspection & Validation", description: "Review sample checks and project documentation.", icon: FiShield, href: "/#capabilities" },
    { title: "Export & Project Support", description: "Stay connected through delivery and handover.", icon: FiGlobe, href: "/#contact" },
  ] },
  resources: { eyebrow: "YOUR PROJECT RESOURCES", title: "The details that move a project forward.", description: "Start with the right information and a direct conversation.", action: "Explore all articles", href: "/blog", links: [
    { title: "Product Catalog", description: "Download our current product image collection.", icon: FiFileText, href: "/assets/queen-product-catalog.pdf", download: true },
    { title: "Blog & Buying Guides", description: "Practical notes on procurement, tooling and quality.", icon: FiMessageSquare, href: "/blog" },
    { title: "Prepare Your Inquiry", description: "Share your drawings and project requirements.", icon: FiLayers, href: "/#quote" },
    { title: "Talk to Queenie", description: "Your point of contact for the next step.", icon: FiArrowUpRight, href: "/#about" },
  ] },
};

export function SiteHeader() {
  const [active, setActive] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinned = useRef(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const close = () => { pinned.current = false; setActive(null); setMobileOpen(false); };
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const scheduleClose = () => { cancelClose(); if (!pinned.current) closeTimer.current = setTimeout(() => setActive(null), 160); };
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) { pinned.current = false; setActive(null); setMobileOpen(false); } };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { pinned.current = false; setActive(null); setMobileOpen(false); trigger.current?.focus(); } };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("pointerdown", onPointerDown); document.removeEventListener("keydown", onKeyDown); if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, []);
  useEffect(() => { setActive(null); setMobileOpen(false); }, [pathname]);

  function menuButton(label: string, key: MenuKey, mobile = false) {
    return <button type="button" className={`premium-nav-trigger ${active === key ? "is-open" : ""}`} aria-expanded={active === key} aria-controls={mobile ? `mobile-group-${key}` : "desktop-mega-menu"}
      onMouseEnter={() => { if (!mobile) { cancelClose(); setActive(key); } }}
      onFocus={() => cancelClose()}
      onClick={event => { cancelClose(); pinned.current = !mobile; trigger.current = event.currentTarget; setActive(current => mobile && current === key ? null : key); }}
      onKeyDown={event => { if (!mobile && event.key === "ArrowDown") { event.preventDefault(); trigger.current = event.currentTarget; setActive(key); setTimeout(() => panel.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 0); } }}>
      {label}<FiChevronDown aria-hidden="true" />
    </button>;
  }

  const content = active ? menuContent[active] : null;
  return <header className="premium-header" ref={root} onMouseLeave={scheduleClose} onMouseEnter={cancelClose} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(null); }}>
    <div className="premium-header-inner">
      <Link className="premium-logo" href="/#home" aria-label="QUEEN home" onClick={close}><Image src="/assets/logo-header.png" alt="QUEEN" width={162} height={66} priority /></Link>
      <nav className="premium-nav" aria-label="Main navigation">{navigation.map(item => item.menu ? <div className="premium-nav-item" key={item.label}>{menuButton(item.label, item.menu)}</div> : <Link key={item.label} className={`premium-nav-link ${item.label === "Home" && pathname === "/" ? "is-current" : ""}`} href={item.href!} onMouseEnter={() => setActive(null)} onClick={close}>{item.label}</Link>)}</nav>
      <Link className="premium-quote" href="/#quote" onClick={close}>Get a Quote<FiArrowUpRight aria-hidden="true" /></Link>
      <button className="premium-mobile-toggle" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-site-navigation" onClick={() => { setMobileOpen(!mobileOpen); setActive(null); }}>{mobileOpen ? <FiX /> : <FiMenu />}</button>
    </div>
    {active && !mobileOpen && content && <>
      <div className="mega-scrim" onClick={close} aria-hidden="true" />
      <div className="mega-menu" id="desktop-mega-menu" ref={panel} onMouseEnter={cancelClose} onMouseLeave={scheduleClose} aria-label={`${active} navigation`}>
        <div className="mega-main"><div className="mega-intro"><p className="mega-eyebrow">{content.eyebrow}</p><h2>{content.title}</h2><p className="mega-description">{content.description}</p><Link className="mega-overview" href={content.href} onClick={close}>{content.action}<FiArrowRight /></Link></div>
          <div className={`mega-links ${active === "products" || active === "applications" ? "with-images" : "with-icons"}`}>
            {content.links.map(item => <a className="mega-link" href={item.href} key={item.title} onClick={close} {...("download" in item && item.download ? { download: true } : {})}>
              {"image" in item && <div className="mega-photo"><Image src={`/assets/${item.image}`} alt="" width={405} height={233} sizes="240px" /></div>}
              {"icon" in item && <span className="mega-icon"><item.icon aria-hidden="true" /></span>}
              <div className="mega-link-copy"><h3>{item.title}<FiArrowUpRight aria-hidden="true" /></h3><p>{item.description}</p></div>
            </a>)}
          </div>
        </div>
        <div className="mega-bottom"><span>YOUR NEXT PROJECT STARTS WITH A CONVERSATION.</span><Link href="/#quote" onClick={close}>Share your project<FiArrowRight /></Link><a href="/assets/queen-product-catalog.pdf" download onClick={close}><FiFileText />Download catalog</a></div>
      </div>
    </>}
    {mobileOpen && <nav className="premium-mobile-nav" id="mobile-site-navigation" aria-label="Mobile navigation">{navigation.map(item => item.menu ? <div className="mobile-menu-group" key={item.label}>{menuButton(item.label, item.menu, true)}{active === item.menu && <div id={`mobile-group-${item.menu}`} className="mobile-menu-links">{menuContent[item.menu].links.map(link => <a href={link.href} key={link.title} onClick={close} {...("download" in link && link.download ? { download: true } : {})}><span>{link.title}</span><FiArrowUpRight /></a>)}</div>}</div> : <Link key={item.label} href={item.href!} onClick={close}>{item.label}<FiArrowUpRight /></Link>)}<Link className="mobile-quote-link" href="/#quote" onClick={close}>Get a Quote<FiArrowRight /></Link></nav>}
  </header>;
}
