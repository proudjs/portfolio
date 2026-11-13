# CLAUDE.md: rules for working on Proud's portfolio

This is the personal portfolio of Jutamat (Proud) Samnakbankok, UX/UI + Visual Designer in Milwaukee, WI.
React + Vite + Tailwind, deployed on Vercel from the `main` branch.
Explain every change in plain words and share a preview link before anything goes live.

## Before you change anything
- Check that the change matches her actual design. If it doesn't, say what's off and how to fix it. Don't change it quietly.
- Change only what she asked for. Touch nothing else.
- Work on a branch and open a pull request. Put the Vercel preview link at the top: `Preview: <url>`.
- Run `npm run build` before pushing. It must pass.

## Writing rules (all site copy)
- No em dashes. No semicolons. No comma before "and," "or" or "but."
- Short, plain sentences. American spelling. Sounds like a person, not like AI.
- Don't brag or compare her to other designers.
- BMO and ParkChicago are always called unsolicited redesigns. Furcast is her UT Austin capstone, co-designed with Barbara Sherwood.
- Only describe methods, results, numbers and quotes that appear in her published case studies at uxfol.io/prouddesigns.
- Credit: "Built with Claude." Never say she coded the site herself.

## Design system (tokens live in src/styles/index.css)
- Background blush white #FDFBFB. Thai red #9C1C17 for her drawings, name and headings. Deep ink #2A1412 for body text. Muted #74514C. Line #EBDAD6.
- Khon gold #B08A2E is a small accent only (greeting, section numbers, stat ticks, hover bud). Never body text.
- Headings: Gambetta Regular 400 (self-hosted in public/fonts). Body: Geist. Thai: Noto Serif Thai / Noto Sans Thai. Lao: Noto Sans Lao.
- Never hardcode colors or fonts in components. Use the CSS variables.

## The motif (her own phut tan drawings)
- The hero flower and the four falling flowers are Proud's own hand drawings. Never replace them with other art.
- Never trace or ship drawings by Kru Yo (ครูโย่สอนวาด). Those were reference only.
- Hero flower faces left (CSS scaleX(-1)). It draws one stroke at a time from `center` in src/assets/flowers/hero-flower.json, outlines first, then the hatching. About 12 seconds. Then her bold ink fades in.
- Falling flowers: small, 35% opacity while falling, rest 3 s, fade 7 s, about 20% gold, gentle mouse wind.
- One big motif per page at most. No flowers inside case study pages. The work leads there.
- Respect prefers-reduced-motion: no drawing animation, no falling, a still row of flowers.
- Heavy effects start after the page loads, so her name and headline show first.

## Case studies
- One Markdown file per project in src/content/work/. Copy `_template.md` to start. The comments in CaseStudy.jsx explain the syntax.
- Image addresses with spaces need angle brackets: `![caption](<slot:Some slot> "phone")`.
- Put real images in public/work/<slug>/ as .webp.
