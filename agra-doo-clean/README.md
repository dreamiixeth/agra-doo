# AGRA d.o.o. - Spletna stran

Spletna stran za prodajo kmetijske mehanizacije.

## 🚀 Hiter deploy na Vercel

### 1. Naloži na GitHub

```bash
# Ustvari nov repository na github.com, nato:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TVOJE_IME/agra-doo.git
git push -u origin main
```

### 2. Deploy na Vercel

1. Pojdi na [vercel.com](https://vercel.com)
2. Klikni "Add New Project"
3. Izberi svoj GitHub repo "agra-doo"
4. **POMEMBNO:** Dodaj Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://kedhcfgeqwytqgbdbwgx.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (celoten ključ)
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = `agra2024` (ali spremeni)
5. Klikni "Deploy"

### 3. Poveži domeno (ko jo kupiš)

1. V Vercel dashboard pojdi na Settings → Domains
2. Dodaj `agra-doo.si`
3. Na domenca.si nastavi DNS:
   - Type: `A`, Name: `@`, Value: `76.76.19.19`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

## 📁 Struktura projekta

```
agra-doo/
├── app/
│   ├── layout.js      # Root layout z metadata
│   ├── page.js        # Glavna stran
│   └── globals.css    # Tailwind CSS
├── components/
│   ├── Navigation.js  # Navigacija
│   ├── Sidebar.js     # Stranski meni
│   ├── HomePage.js    # Domača stran
│   ├── CatalogPage.js # Katalog strojev
│   ├── MachinePage.js # Posamezni stroj
│   ├── AdminPage.js   # Admin panel
│   └── AnimatedSection.js
├── lib/
│   └── supabase.js    # Supabase client
└── package.json
```

## 🔧 Lokalni development

```bash
npm install
npm run dev
```

Odpri http://localhost:3000

## 🔐 Admin panel

- URL: klikni na sidebar → "Upravljanje"
- Geslo: `agra2024` (spremeni v produkciji!)

## 📞 Kontakt

- Telefon: 031 574 730
- Email: agra.slavko@gmail.com
- Naslov: Ljubljanska cesta 86, Slovenska Bistrica
