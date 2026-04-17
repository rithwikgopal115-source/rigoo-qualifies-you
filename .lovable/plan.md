
## Rigoo Portfolio — Single-page LLM Portfolio

**Stack:** React SPA, Tailwind, Lovable Cloud + Lovable AI Gateway (Gemini Flash, default free tier). No DB, no auth — purely an LLM-powered conversational quiz.

### Design system (global)
- Fonts: Space Mono (headings, options, AI text), IBM Plex Sans (body) — load via Google Fonts in `index.html`
- Tokens added to `index.css` + `tailwind.config.ts`:
  - `--accent: 0 100% 63%` (#FF4444), `--option-tint: 260 60% 91%` (#e8e0ff)
  - Glass utilities: `.glass-dark`, `.glass-light` with 16px blur, white/black 8% overlay
- Animations: `fade-in-left`, `lock-blink` (option lock), `breathe` (logo pulse), `tab-crossfade`
- Typewriter streaming via per-character append in React state

### Layout
- **Sticky tab bar** (PROFESSIONAL / PERSONAL) with red underline on active, 400ms crossfade between tabs (background + content)
- Logo in header (placeholder SVG until uploaded)

### Professional tab (`#000` + dark nature bg @ 50% opacity)
1. **Hero** — "most portfolios are a résumé with a coat of paint. / this one qualifies you."
2. **Quiz flow** — chat UI with received messages (left) and locked answers (right, red bubble)
   - Step 1: avatar pick (4 options)
   - Step 2: branched follow-up based on Step 1 (freelancer / agency / cofounder branches; "exploring" gets a soft response)
   - Step 3: free-text input ("describe what you need")
   - Step 4: AI streaming response with breathing logo + cycling status lines
   - Step 5: avatar-specific Loom embed (placeholder iframe)
   - Step 6: avatar-specific CTA button (placeholder links)
3. **Work proof grid** — filtered by avatar (4 cards freelancer, 5 agency, 4 cofounder). Section heading switches per avatar. Renders only after Step 1 selected; shows all by default with tabs to switch view. Placeholder images with exact captions.
4. **Influence Accelerator** — full-width glass card, red left border, body copy + Loom placeholder
5. **Social proof row** — full-width whatsapp-reactions placeholder, no caption

### Personal tab (`#FFF` + light nature bg @ 50% opacity)
- Hero ("hey." + intro)
- Photo placeholder
- Story section (full copy as written)
- Diligence section (Notion + tally placeholders side by side)
- T-shape skills block (horizontal visual: deep skills row vs broad skills row)

### AI integration (Lovable Cloud + Lovable AI Gateway)
- Edge function `supabase/functions/assess/index.ts`:
  - Input: `{ avatar, subAnswer, userInput }`
  - Builds system prompt from your full spec (avatar-specific tone rules, Rigoo's capabilities, "still building" list, banned words)
  - Calls `google/gemini-3-flash-preview` with `stream: true`
  - Returns SSE stream; handles 429 / 402 with friendly error toasts
- Frontend: SSE parser (line-by-line, handle CRLF + partial JSON + [DONE] + final flush), token-by-token render in Space Mono
- Loading: breathing rigorawmedia logo, cycling status lines

### Placeholders catalog (one file `src/lib/placeholders.ts`)
- All image paths, Loom URLs, CTA links centralized — swap-in is one-file edit
- Each image rendered as labeled gray box with the asset filename + caption when missing

### Responsive
- Mobile-first; quiz bubbles stack full width; work grid 1 col → 2 col → 3 col; tab bar stays sticky

### What you'll swap in later
- 11 image files (use exact filenames from your asset table)
- 3 Loom embed URLs (freelancer / agency / cofounder)
- 3 CTA URLs (Upwork / Calendly / wa.me)
- rigorawmedia logo SVG
- Two background images

After build I'll point out exactly where in `placeholders.ts` to paste each link/asset.
