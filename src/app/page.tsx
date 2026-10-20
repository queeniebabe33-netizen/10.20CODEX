import Image from "next/image";
import { FiSettings, FiUsers, FiGlobe, FiFileText, FiMail, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { FAQ, QuoteForm, ProductLink, PrivacyLink } from "@/components/interactions";

const products = [
  { id: "medical", title: "Medical Injection Molds", image: "medical-match.webp", alt: "Medical equipment and a separate white plastic housing", description: "Precision molds for medical device housings and components." },
  { id: "automotive", title: "Automotive Plastic Parts Molds", image: "automotive-match.webp", alt: "Automotive air vent and interior components", description: "Molds for interior and exterior automotive parts, such as air vents and functional components." },
  { id: "electronics", title: "Electronic Plastic Molds", image: "electronics-match.webp", alt: "Blue electronic enclosure with an open plastic housing", description: "Molds for consumer electronics, industrial housings and custom enclosures." },
];
const steps = [
  ["Design review", "Assess feasibility and optimize for manufacturability"],
  ["Tooling development", "Work with qualified manufacturing partners"],
  ["Inspection & trial", "Dimensional check and sample validation"],
  ["Project delivery", "Coordinate logistics and export documentation"],
];
const examples = [
  { title: "Home appliance housings", image: "appliance-match.webp", alt: "Air purifier housing in a home setting", className: "appliance" },
  { title: "Automotive components", image: "vent-match.webp", alt: "Air vent fitted into an automotive dashboard", className: "vent" },
  { title: "Electronic products", image: "electronic-match.webp", alt: "Industrial electronic enclosure", className: "electronic" },
  { title: "Tooling examples", image: "tooling-match.webp", alt: "Open steel injection mold core and cavity", className: "tooling" },
];

export default function Home() {
  return <>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <Image className="hero-image" src="/assets/hero.png" alt="Injection molding machine in an industrial workshop, illustrative image" fill priority sizes="100vw" quality={95} />
        <div className="container hero-content">
          <p className="eyebrow hero-eyebrow">SHENZHEN QUEEN TECH INTERNATIONAL CO., LTD</p>
          <h1 id="hero-title">Precision tooling.<br />Clear project delivery.</h1>
          <p className="hero-description">Your B2B partner for injection molds and plastic parts,<br className="desktop-break" /> supporting OEMs and product companies in Europe<br className="desktop-break" /> and North America.</p>
          <div className="hero-actions"><a className="button primary" href="#quote">Get a Quote <FiArrowRight /></a><a className="button secondary" href="/assets/queen-product-catalog.pdf" download><FiFileText /> Download Catalog</a></div>
        </div>
      </section>
      <section className="benefits" aria-label="Our advantages"><div className="container benefits-inner">
        <div className="benefit"><FiSettings /><div><h2>Custom tooling</h2><p>Molds for medical, automotive and electronics</p></div></div>
        <div className="benefit"><FiUsers /><div><h2>Project coordination</h2><p>Connect, communicate and drive progress</p></div></div>
        <div className="benefit"><FiGlobe /><div><h2>Export support</h2><p>Serving European and North American markets</p></div></div>
      </div></section>
      <section className="products section" id="products" aria-labelledby="products-title"><div className="container">
        <p className="eyebrow">OUR PRODUCTS</p>
        <div className="section-heading"><h2 id="products-title">Injection molds for key industries</h2><a className="text-link" href="/products">View all products <FiArrowRight /></a></div>
        <div className="product-grid" id="product-grid">{products.map(product => <article className="product" id={`product-${product.id}`} key={product.id}>
          <ProductLink product={product.id} className="product-photo-link" label={`View ${product.title}`}><Image className="product-photo" src={`/assets/${product.image}`} alt={product.alt} width={656} height={399} sizes="(max-width: 650px) 90vw, (max-width: 1000px) 44vw, 408px" /></ProductLink>
          <h3><ProductLink product={product.id}>{product.title}</ProductLink></h3><p>{product.description}</p>
          <ProductLink className="text-link" product={product.id}>Learn more <FiArrowRight /></ProductLink>
        </article>)}</div>
      </div></section>
      <section className="capabilities" id="capabilities" aria-labelledby="capabilities-title">
        <div className="inspection-image"><Image src="/assets/inspection-match.webp" alt="Coordinate measuring machine inspecting a white plastic enclosure, illustrative imagery" fill sizes="(max-width: 800px) 100vw, 57vw" /></div>
        <div className="capabilities-content"><p className="eyebrow">OUR CAPABILITIES</p><h2 id="capabilities-title">From drawing to delivery</h2><p className="capabilities-intro">We coordinate mold projects with experienced manufacturing partners and support you through the entire process.</p><ol className="steps">{steps.map(([title, description], i) => <li key={title}><span className="step-number">{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div>
      </section>
      <section className="quality" aria-label="Quality documentation"><div className="container quality-inner"><FiFileText className="document-icon" /><div><h2>Quality documentation</h2><p>Inspection reports and relevant documents are available after project requirements are confirmed.</p></div><a href="#quote">Review project requirements with our team.</a></div></section>
      <section className="applications section" id="applications" aria-labelledby="applications-title"><div className="container">
        <div className="application-heading"><div><p className="eyebrow">APPLICATION EXAMPLES</p><h2 id="applications-title">From concept to real-world products</h2></div><p>Our molds are used in a wide range of industries, including medical devices, automotive components and electronic products.</p></div>
        <div className="application-grid">{examples.map(example => <article key={example.title}><div className={`application-photo ${example.className}`}><Image src={`/assets/${example.image}`} alt={example.alt} fill sizes="(max-width: 650px) 44vw, 300px" /></div><h3>{example.title}</h3><p>Project details to be added</p></article>)}</div>
      </div></section>
      <section className="contact-section" id="contact" aria-label="Contact Queenie and request a quote"><div className="contact-grid">
        <div className="portrait"><Image src="/assets/queenie-real.jpg" alt="Queenie Lam, your project contact" fill sizes="(max-width: 650px) 42vw, 298px" style={{objectPosition:"50% 30%"}} /></div>
        <div className="project-contact" id="about"><p className="eyebrow">YOUR PROJECT CONTACT</p><h2>Queenie Lam</h2><p className="contact-description">I’m here to support your mold projects and make the process simple and efficient.</p><a href="mailto:queenie@minkontech.com"><FiMail /> queenie@minkontech.com</a><a href="https://wa.me/8613823331427" target="_blank" rel="noreferrer"><FaWhatsapp className="whatsapp-icon" /> WhatsApp +86 138 2333 1427</a></div>
        <div className="faq-column" id="resources"><p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p><FAQ /></div>
        <div className="quote-column" id="quote"><h2>Get a Quote</h2><QuoteForm /></div>
      </div></section>
    </main>
    <footer className="site-footer"><div className="container footer-grid">
      <a className="footer-logo" href="#home" aria-label="QUEEN home"><Image src="/assets/logo-footer.png" alt="QUEEN" width={162} height={86} /></a>
      <div className="footer-company"><p>SHENZHEN QUEEN TECH INTERNATIONAL CO., LTD</p><span>B2B mold export and project coordination partner<br />for global OEMs and product companies.</span></div>
      <div className="footer-contact"><a href="mailto:queenie@minkontech.com"><FiMail /> queenie@minkontech.com</a><a href="https://wa.me/8613823331427" target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp +86 138 2333 1427</a></div>
      <div className="footer-legal"><div className="legal-links"><PrivacyLink /> <span className="footer-separator">|</span> <a href="#contact">Contact</a></div><p>© 2026 Shenzhen Queen Tech International Co., Ltd.<br />All rights reserved.</p></div>
    </div></footer>
  </>;
}
