import type { Metadata } from "next";
import "./globals.css";
import "./fidelity.css";
import "./navigation.css";
import { SiteHeader } from "@/components/site-header";
export const metadata: Metadata = {
  title: "QUEEN | Precision Injection Molds & Project Support",
  description: "Custom mold projects for medical, automotive and electronics. Discuss your drawings and tooling requirements with Queenie Lam at Queen Tech.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/favicon.png" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}</body></html>;
}

