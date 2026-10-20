# Prototype Instructions

User selected ../design-output/homepage-1-1440x2400.png (option 1) on 2026-10-19. Preserve its typography, wrapping, layout, colors, section order and density. Do not redesign.
User explicitly requires Next.js; use App Router and TypeScript instead of the starter Vite runtime. Build this app in src/app and src/components. Original template hosting support files are retained but are not the active runtime.
Save accepted version as 首页基础版. Run npm run build and npm run typecheck, then browser visual and interaction QA.
2026-10-19 navigation revision: user explicitly requested a centered premium frosted-glass mega-menu. This supersedes visual-source fidelity for navigation only. Original homepage/navigation saved BEFORE edits in ../archives/首页基础版-原导航-20261019.zip; restoration script is beside it. Shared navigation must live in src/components/site-header.tsx, mounted exactly once in src/app/layout.tsx, with src/app/navigation.css. All future pages inherit the same navigation. Do not add page-specific headers. User ended the earlier extended QA workflow; keep further checks focused on the edited navigation.
Local homepage only: no live mail/CRM/storage service is connected. Never claim local drafts or mailto clicks have been delivered.
2026-10-20: user selected product detail option 3 from ../design-output/product-page-previews/product-detail-3-1440x2400.png. Build its application-led layout at /products/medical-device-housing-injection-mold, reusing the shared navigation. User requests exactly one brief check and fast handoff; this overrides extended validation loops. Replace Queenie's old portrait with supplied 网站tu.jpg, stored as public/assets/queenie-real.jpg, on homepage and product page. Preserve the supplied photo; do not generate or alter her face.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
