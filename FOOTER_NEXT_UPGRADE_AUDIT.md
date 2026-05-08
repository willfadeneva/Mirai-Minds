# Footer + Next Upgrade Audit

## Footer changes

Added a site-wide footer through `components/layout/footer.tsx`.

Footer now includes:

- Mirai Minds brand text
- English + Japanese contact heading: `Contact / お問い合わせ`
- Contact email mailto link: `charanjotsingh@gmail.com`
- Credit line: `Designed by mir-ai.cloud`
- `mir-ai.cloud` hyperlink to `https://mir-ai.cloud/`
- Privacy and How-to-use footer links
- Light pastel, kid-friendly styling
- Responsive layout for mobile and desktop

## Next.js upgrade

Upgraded project dependencies from the previous Next 14 release line to:

- `next`: `^16.2.6`
- `react`: `^19.2.3`
- `react-dom`: `^19.2.3`
- `@types/react`: `^19.2.14`
- `@types/react-dom`: `^19.2.3`
- `postcss`: `^8.5.10`

Added Node engine requirement:

```json
"engines": {
  "node": ">=20.9.0"
}
```

This is required because Next 16 needs Node 20.9 or newer.

## Audit notes

- Static preview was tested with Python HTTP server and returned `HTTP 200 OK`.
- `package.json` and `package-lock.json` parse correctly.
- Footer source checks passed for the required links/text.
- `npm audit` no longer reports the previous critical issue. It still reports 2 moderate advisories through Next's bundled PostCSS dependency. npm's suggested forced fix is not appropriate because it suggests a major downgrade path. Keep Next updated as Vercel releases patched versions.

## How to run

```bash
npm install
npm run dev
```

If port 3000 is busy, Next will automatically use 3001.
