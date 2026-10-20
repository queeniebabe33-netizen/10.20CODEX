import Image from "next/image";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { PrivacyLink } from "./interactions";
export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid"><Link className="footer-logo" href="/" aria-label="QUEEN home"><Image src="/assets/logo-footer.png" alt="QUEEN" width={162} height={86} /></Link><div className="footer-company"><p>SHENZHEN QUEEN TECH INTERNATIONAL CO., LTD</p><span>B2B mold export and project coordination partner<br />for global OEMs and product companies.</span></div><div className="footer-contact"><a href="mailto:queenie@minkontech.com"><FiMail />queenie@minkontech.com</a><a href="https://wa.me/8613823331427" target="_blank" rel="noreferrer"><FaWhatsapp />WhatsApp +86 138 2333 1427</a></div><div className="footer-legal"><div className="legal-links"><PrivacyLink /><span className="footer-separator">|</span><a href="/#contact">Contact</a></div><p>© 2026 Shenzhen Queen Tech International Co., Ltd.<br />All rights reserved.</p></div></div></footer>;
}
