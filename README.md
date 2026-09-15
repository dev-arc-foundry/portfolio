# DevArc Foundry

Marketing site for DevArc Foundry, a three-person software engineering studio.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `motion`, `lucide-react`.

TypeScript is pinned to the 6.x line rather than the newly-released 7.0: `typescript-eslint`
(and therefore `eslint-config-next`) does not yet support TypeScript 7's compiler API, so
linting would hard-crash on it. Nothing in this codebase depends on TS7-only features, so this
is a pure tooling-compatibility pin, revisit once typescript-eslint adds support
(https://github.com/typescript-eslint/typescript-eslint/issues/10940).

## Development

```bash
npm install
npm run dev
```

## Editable content

- `src/config/site.ts` — name, tagline, contact email, social links, nav
- `src/data/*.ts` — services, expertise, experience, philosophy, team, products, process

Replace the placeholder team bios and product names in `src/data/team.ts` and
`src/data/products.ts` when real content is available.
