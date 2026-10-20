"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, type ReactNode, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { FiArrowRight, FiChevronDown, FiX, FiPaperclip, FiMail, FiCopy } from "react-icons/fi";

const questions = [
  ["What files do you need for a quote?", "2D or 3D drawings (STEP, IGES, PDF, etc.), part material, expected annual volume and any special requirements. The more details you share, the more accurate the quotation."],
  ["What is the typical delivery time?", "Delivery depends on part complexity, tooling requirements, sampling and validation. Share your drawings and target date so we can review a project schedule with you."],
  ["How do you handle inspection?", "We discuss dimensional checks, sample validation and inspection documentation with you before confirming the project requirements."],
];
export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return <div className="faq-list">{questions.map(([question, answer], index) => <div className="faq-item" key={question}><h3><button onClick={() => setActive(active === index ? null : index)} aria-expanded={active === index} aria-controls={`answer-${index}`}>{question}<FiChevronDown className={active === index ? "rotated" : ""} /></button></h3><div className="faq-answer" id={`answer-${index}`} hidden={active !== index}>{answer}</div></div>)}</div>;
}
const productContent: Record<string, { title: string; image: string; text: string }> = {
  medical: { title: "Medical Injection Molds", image: "medical.jpeg", text: "Discuss custom tooling for medical device housings and components. Share part drawings, material requirements, expected production volume and your inspection needs for a project review." },
  automotive: { title: "Automotive Plastic Parts Molds", image: "automotive.jpeg", text: "Tooling coordination for automotive interior and exterior plastic components. Send your drawings and define surface finish, resin, production targets and validation requirements." },
  electronics: { title: "Electronic Plastic Molds", image: "electronics.jpeg", text: "Custom tooling discussions for electronic enclosures and functional plastic components. Send your part drawings, material and assembly requirements to start a review." },
};
function DialogPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
}
export function ProductLink({ product, children, className, label }: { product: string; children: ReactNode; className?: string; label?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const content = productContent[product];
  if (product === "medical") return <Link className={`product-link ${className ?? ""}`} href="/products/medical-device-housing-injection-mold" aria-label={label}>{children}</Link>;
  return <><button className={`product-link ${className ?? ""}`} onClick={() => dialog.current?.showModal()} aria-label={label}>{children}</button><DialogPortal><dialog className="detail-dialog" ref={dialog} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}><button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close product details"><FiX /></button><Image src={`/assets/${content.image}`} alt={content.title} width={656} height={399} /><h2>{content.title}</h2><p>{content.text}</p><p className="detail-note">Illustrative imagery. Detailed project specifications are reviewed individually.</p><a className="button primary" href="#quote" onClick={() => dialog.current?.close()}>Discuss your project <FiArrowRight /></a></dialog></DialogPortal></>;
}
export function PrivacyLink() {
  const dialog = useRef<HTMLDialogElement>(null);
  return <><button className="privacy-link" onClick={() => dialog.current?.showModal()}>Privacy Policy</button><DialogPortal><dialog className="detail-dialog privacy-dialog" ref={dialog}><button className="dialog-close" aria-label="Close privacy information" onClick={() => dialog.current?.close()}><FiX /></button><h2>Privacy information</h2><p>This local homepage does not send your form data or drawing files to a server. You can prepare an inquiry and choose to send it with your email application.</p><p>Your draft is stored only in this browser tab until you clear it or close the page. If you choose email or WhatsApp, that service handles the message under its own privacy policy. Drawing files must be attached manually in your email app.</p><p>No analytics or advertising cookies are used on this local version.</p><a href="mailto:queenie@minkontech.com">queenie@minkontech.com</a></dialog></DialogPortal></>;
}
export function QuoteForm() {
  const [error, setError] = useState("");
  const [attachment, setAttachment] = useState("");
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => { if (brief) dialog.current?.showModal(); }, [brief]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) return;
    const data = new FormData(event.currentTarget);
    const text = `Custom injection mold inquiry\n\nName: ${data.get("name")}\nWork email: ${data.get("email")}\nCountry: ${data.get("country")}\n\nProject requirements:\n${data.get("requirements")}\n\n${attachment ? `Drawing to attach manually: ${attachment}` : "No drawing selected."}`;
    setBrief(text); dialog.current?.showModal();
  }
  return <><form className="quote-form" onSubmit={submit} ref={form}>
    <div className="form-fields"><label>Name <span>*</span><input name="name" placeholder="Your name" required autoComplete="name" maxLength={100} /></label><label>Work email <span>*</span><input name="email" placeholder="you@company.com" type="email" required autoComplete="email" maxLength={200} /></label><label>Country <span>*</span><select name="country" required defaultValue=""><option value="" disabled>Select a country</option>{["United States", "United Kingdom", "Germany", "France", "Canada", "Australia", "Italy", "Spain", "Netherlands", "Switzerland", "Mexico", "Brazil", "United Arab Emirates", "Other"].map(country => <option key={country}>{country}</option>)}</select></label><label>Project requirements <span>*</span><textarea name="requirements" placeholder="Please describe your project, materials, quantity, etc." required maxLength={5000} /></label></div>
    <input ref={file} className="file-input" type="file" aria-label="Upload drawing" accept=".step,.stp,.iges,.igs,.pdf" onChange={event => { const selected = event.target.files?.[0]; setError(""); setAttachment(""); if (!selected) return; if (!/\.(step|stp|iges|igs|pdf)$/i.test(selected.name)) { setError("Choose a STEP, IGES or PDF drawing."); event.target.value = ""; return; } if (selected.size > 20 * 1024 * 1024) { setError("The drawing must be 20 MB or smaller."); event.target.value = ""; return; } setAttachment(selected.name); }} />
    <button className="upload-button" type="button" onClick={() => file.current?.click()}><FiPaperclip /><span><strong>{attachment || "Upload drawing (optional)"}</strong><small>STEP, IGES, PDF, etc. (Max 20MB)</small></span></button>
    {error && <p className="form-error" role="alert">{error}</p>}<button className="button primary form-submit" type="submit">Get a Quote <FiArrowRight /></button>
  </form><dialog className="detail-dialog brief-dialog" ref={dialog}><button className="dialog-close" aria-label="Close inquiry preview" onClick={() => dialog.current?.close()}><FiX /></button><p className="eyebrow">YOUR PROJECT INQUIRY</p><h2>Your project brief is ready.</h2><p>Review your request, then send it using your email app. Nothing has been sent yet. Please attach your drawing in the email app.</p><pre>{brief}</pre><div className="dialog-actions"><a className="button primary" href={`mailto:queenie@minkontech.com?subject=${encodeURIComponent("Custom injection mold inquiry")}&body=${encodeURIComponent(brief)}`}><FiMail /> Open email draft</a><button className="button copy-button" onClick={async () => { try { await navigator.clipboard.writeText(brief); setCopied(true); } catch { setCopied(false); } }}><FiCopy /> {copied ? "Copied" : "Copy inquiry"}</button></div></dialog></>;
}
