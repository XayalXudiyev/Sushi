# NORI Sushi — MVP demo

Next.js 16 (App Router) + Tailwind v4, tam statik export (SSG).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statik sayt → out/ qovluğu
```

`out/` qovluğunu istənilən statik hostinqə (Vercel, Netlify, GitHub Pages, nginx) yükləmək olar.

## Struktur

- `src/data/menu.ts` — bütün məhsullar, kateqoriyalar, qiymətlər (mock data)
- `src/components/SushiArt.tsx` — SVG mock şəkillər (real foto gələndə `<Image>` ilə əvəz edin)
- `src/components/MenuBrowser.tsx` — axtarış, kateqoriya/tag filterləri, sıralama
- `src/lib/cart.ts` — səbət (localStorage-də saxlanılır)
- `src/app/menu/[slug]` — hər məhsul üçün statik səhifə

Sifariş demo-dur: heç yerə göndərilmir.
