# Inner Being Wellness (Next.js)
## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
``
## Routes
| Route | File |
| --- | --- |
| `/` | `src/app/page.js` |
| `/about` | `src/app/about/page.js` |
| `/offerings` | `src/app/offerings/page.js` |
| `/freedom-from-resistance` (`/freedom` redirects here) | `src/app/freedom-from-resistance/page.js` |
| `/thoughts` | `src/app/thoughts/page.js` |
| `/contact?interest=...` | `src/app/contact/page.js` |

Page UI lives in `src/views/*`, shared components in `src/components/*`, content in `src/data/siteData.js`.
