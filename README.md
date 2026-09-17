# Sahan Sudeepa — Personal Portfolio

A responsive Next.js App Router portfolio with TypeScript, Tailwind CSS v4, Framer Motion, Lucide icons and locally hosted Manrope typography. The default charcoal / amber theme and the warm light theme share an intentional design system.

## Run

Use Node.js 20.9+ and the bundled Yarn 4.9.2:

```sh
corepack yarn install
corepack yarn dev
```

Open http://localhost:3000. Without Corepack, replace `corepack yarn` with `node .yarn/releases/yarn-4.9.2.cjs`.

## Checks

```sh
corepack yarn type-check
corepack yarn lint
corepack yarn format
corepack yarn build
corepack yarn test:e2e
```

The browser tests launch an installed Google Chrome against the production build. Build first. If Chrome is unavailable, install Playwright Chromium (`corepack yarn playwright install chromium`) and remove `channel: 'chrome'` from `playwright.config.ts`.

Tests cover all twelve case studies, route/SEO responses, theme persistence, keyboard tabs, mobile navigation, project filters, responsive overflow, contact states, and automated WCAG accessibility checks. They capture screenshots in `test-results/`. Contact delivery is intercepted in browser tests; tests never send an external message.

`corepack yarn start` serves the production build. `corepack yarn validate` checks formatting, lint and the build.

## Edit content

- `src/data/portfolio.ts`: profile, links, twelve projects and skill categories.
- `src/sections/home-sections.tsx`: About, Experience, Education, GitHub, Resume, Contact and Footer.
- `src/sections/work-and-skills.tsx`: project filtering and keyboard-accessible skill tabs.
- `src/components/portfolio/interactions.tsx`: navigation, themes, hero, cursor and motion.
- `src/components/portfolio/project-visual.tsx`: original CSS/HTML interface concepts. These are clearly labeled illustrations, not screenshots of actual applications.
- `public/videos/interview-ai.webm`: the supplied InterviewAI screen recording used by the project card and case study. The video is muted, loops in the card, and has native controls plus fullscreen on the detail page.
- `src/app/portfolio.css`: portfolio visual system, both themes and responsive behavior.
- `src/index.css`: preserved Tailwind/shadcn theme utilities.
- `src/app/projects/[slug]/page.tsx`: statically generated case studies.

No employment dates, numerical achievements, private GitHub activity or measured project outcomes are invented. Case-study architecture and challenges are labeled conceptual considerations. Detailed first-person retrospectives can be added when available.

## Complete your public details

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: actual public deployment URL for metadata, sitemap and social links. Defaults to the portfolio URL supplied in the brief.
- `NEXT_PUBLIC_CONTACT_EMAIL`: public email. Until set, the site offers GitHub and LinkedIn, and clearly marks email as coming soon.

Add verified repository and live demo URLs to each project's optional `github` and `demo` fields in `src/data/portfolio.ts`. Missing links are unavailable rather than guessed.

Place your actual PDF at `public/resume.pdf` and rebuild. Download/View Resume automatically become available. No resume has been fabricated.

## Contact delivery integration

The frontend performs validation and posts JSON to `POST /api/contact`. The route validates again, rejects cross-origin browser requests, checks a honeypot and limits message length. It never returns a success when delivery is not configured.

EmailJS delivery is supported. Follow [EMAIL-SETUP.md](EMAIL-SETUP.md) to configure the service, template and server-only keys. Run `node --test tests/contact-delivery.cjs` to verify delivery behavior with a mocked provider; no external email is sent.

Configure these **server-only** environment variables on your host:

```env
CONTACT_WEBHOOK_URL=https://your-service.example/contact
CONTACT_WEBHOOK_TOKEN=optional-secret-token
```

The server sends `{ "name": "...", "email": "...", "message": "..." }` as JSON with an optional `Authorization: Bearer ...` header. The endpoint must return 2xx only after accepting the message for delivery. A missing endpoint returns 503; delivery failures return 502. The frontend preserves the draft on error and offers LinkedIn as an alternative.

Use an authenticated email/workflow service for that endpoint. Apply durable rate limiting and spam protection at your hosting/service layer before enabling public delivery. No email credentials are included in the repository, and no form contents are logged.

## Rendering, motion and accessibility

The homepage's editorial sections and project pages use Server Components. Interactive islands handle filters, form state and navigation. Project detail routes are prerendered. The hero and most project art are code-rendered; the two Krish FX Swing Lab entries use supplied product screenshots, while four case studies use supplied walkthrough videos. The portfolio projects preprocessed 3D line illustrations onto Canvas without loading a 3D engine in the browser. Fonts are served locally.

Reduced-motion preferences disable continuous decorative animations and movement. The touch layout removes cursor and pointer effects. Native dialog behavior provides focus containment and Escape dismissal for mobile navigation. Form fields have labels and error associations; tabs support arrow keys, Home and End.

The portfolio has a continuous scroll composition: a three-chapter introduction, changing 3D illustrations, sticky skills and experience layouts, stacked project cards, a full-screen typography interlude, and a progress indicator through Contact. Each section gets a distinct sculpture: radio, knot, laptop, aviator, gears, book, network, pen and paper plane. The human figure appears only in the introduction. Sculptures morph between chapters, load on demand and use their own SVG if loading fails. Case studies share the changing sculptures and highlight the current reading section. Cards use normal document flow on small or short screens; reduced-motion visitors get a static layout. Covered walkthroughs pause and resume when revealed, and all videos retain opaque surfaces and fullscreen controls.

Journey assets are generated by `node scripts/prepare-journey-art.mjs`. It expects `.artwork-sources/boombox.glb`, `.artwork-sources/helmet.gltf`, and `.artwork-sources/FlightHelmet.bin`; source URLs and CC0 credits are in `public/models/credits.txt`. The other seven sculptures are procedural originals. Source models are excluded from deployment.

Browser tests normally start a production server on port 3100. Set `PLAYWRIGHT_BASE_URL` to use an already running server instead (for example, `http://127.0.0.1:3200`); the test runner then leaves that server's lifecycle to the caller.

The figure uses Motion values and a Canvas projection of preprocessed 3D lines. It pauses offscreen and in hidden tabs; a local SVG is the loading/failure fallback. Both the introduction and the continuing backdrop have pause buttons. Three.js is a development-only tool for baking the asset. To regenerate it, run `node scripts/prepare-wireframe.mjs path/to/Xbot.glb`. Figure provenance: [Mixamo / Three.js X Bot](https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/Xbot.glb); adaptation details are in `public/models/credits.txt`.

SEO includes page-specific metadata, OpenGraph/Twitter images, a generated social card, SVG favicon, structured Person data, robots and sitemap routes. Theme preference persists locally and is applied before first paint.

Deployment requires a Next.js-capable host for the contact API. No static-export configuration is used.

References: [Next.js documentation](https://nextjs.org/docs), [Motion for React](https://motion.dev/docs/react).
