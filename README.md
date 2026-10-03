# DevArc Foundry

Marketing site for DevArc Foundry, a three-person software engineering studio.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `lucide-react`.

TypeScript is pinned to the 6.x line rather than the newly-released 7.0: `typescript-eslint`
(and therefore `eslint-config-next`) does not yet support TypeScript 7's compiler API, so
linting would hard-crash on it. Nothing in this codebase depends on TS7-only features, so this
is a pure tooling-compatibility pin, revisit once typescript-eslint adds support
(https://github.com/typescript-eslint/typescript-eslint/issues/10940).

## Development

```bash
npm ci
npm run dev
```

## Editable content

- `src/config/site.ts` — name, tagline, contact email, social links, nav
- `src/data/*.ts` — services, expertise, experience, philosophy, team, projects, process

Project cards, detail pages, and sitemap entries all come from `src/data/projects.ts`.
Edit descriptions and technology lists there; replace labeled SVG placeholders in
`public/projects/` with real screenshots and update their paths, alt text, dimensions,
and optional captions in the data. The first screenshot is reused as the thumbnail.
Rebuild after editing static content. Both project routes are prerendered; unknown slugs
return 404. There is no separate projects index; use `/#projects`.

The gallery uses a native fullscreen dialog with Escape, arrow keys, close and
previous/next controls. Its motion respects reduced-motion preferences. The native
horizontal card row also supports arrow keys when focused and remembers its position
within the browser tab.
