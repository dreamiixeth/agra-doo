'use client'

const BRAND_ORDER = ['Steyr', 'Pöttinger', 'APV', 'Quicke', 'Trioliet', 'Fliegl', 'Vesta', 'Gorenc']

const FEATURES = [
  { icon: '✓', title: 'KVALITETA', desc: 'Preverjeni stroji' },
  { icon: '🔧', title: 'SERVIS', desc: 'Podpora & deli' },
  { icon: '🛡️', title: 'ZANESLJIVOST', desc: '25+ let izkušenj' },
  { icon: '🚚', title: 'HITRA DOSTAVA', desc: 'Po dogovoru' },
]

export default function HomePage({ categories, navigateToCategory }) {
  const brandGroups = (categories || []).reduce((acc, cat) => {
    if (!acc[cat.brand_name]) {
      acc[cat.brand_name] = {
        name: cat.brand_name,
        logo: cat.brand_logo || null,
        categories: []
      }
    }
    // Če ta kategorija ima logo in skupina še nima, uporabi tega
    if (cat.brand_logo && !acc[cat.brand_name].logo) {
      acc[cat.brand_name].logo = cat.brand_logo
    }
    acc[cat.brand_name].categories.push(cat)
    return acc
  }, {})

  const orderedBrands = BRAND_ORDER
    .filter(name => brandGroups[name])
    .map(name => brandGroups[name])

  return (
    <div className="pt-16 bg-[#F8F9FA]">

      {/* ═══════ HERO ═══════ 25% zelena — gradient green → green-light */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://press.lectura.de/media-storage/press_releases/steyr_ctis_6300_terrus_cvt_2(6f8).jpg"
            alt="AGRA traktor"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {/* Zeleni gradient overlay — subtilen prehod */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C6E49]/95 via-[#3E8F6A]/80 to-[#2C6E49]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C6E49]/50 via-transparent to-[#2C6E49]/20" />
        </div>

        {/* Content — več paddinga */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-28 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight uppercase">
              Prava mehanizacija
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#E0A800] leading-[0.95] tracking-tight mt-1 mb-10 uppercase">
              za vsako kmetijo
            </h1>

            <div className="text-white/70 text-base sm:text-lg tracking-wider mb-12">
              <p>Steyr&nbsp; •&nbsp; Pöttinger&nbsp; •&nbsp; APV&nbsp; •&nbsp; Quicke&nbsp; •&nbsp; Fliegl</p>
              <p className="mt-1">Trioliet&nbsp; •&nbsp; Vesta&nbsp; •&nbsp; Gorenc</p>
            </div>

            {/* CTA — 1% rumena, redek, izstopa */}
            <button
              onClick={() => {
                const el = document.getElementById('katalog-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-3 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-semibold text-base px-8 py-4 rounded-lg tracking-wide shadow-lg transition-all hover:scale-[1.02]"
            >
              ODPRI KATALOG
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Bottom fade to white bg */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#DDE1E6] to-transparent" />
      </section>

      {/* ═══════ KATALOG PO ZNAMKAH ═══════ 60% bela + 10% srebrne kartice */}
      <section id="katalog-section" className="pb-20 bg-[#DDE1E6]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-3">
              NAŠ KATALOG
            </h2>
            <p className="text-[#B8BFC6]">
              Izberite kategorijo in preglejte ponudbo
            </p>
          </div>

          {orderedBrands.map((brand) => (
            <div key={brand.name} className="mb-16">
              {/* Brand header */}
              <div className="flex items-center gap-4 mb-8">
                {brand.logo && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 w-auto object-contain"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
                <button
                  onClick={() => navigateToCategory(brand.categories[0])}
                  className="text-2xl font-extrabold text-[#2C6E49] hover:text-[#3E8F6A] transition-colors tracking-tight"
                >
                  {brand.name} <span className="text-[#E0A800]">→</span>
                </button>
              </div>

              {/* Kategorije grid — shadow-sm, hover:shadow-md */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {brand.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => navigateToCategory(category)}
                    className="group bg-white rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 border border-[#B8BFC6]/25 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{category.icon}</span>
                      <div className="flex-1 min-w-0">
                        {/* Uppercase naslovi za industrijski izgled */}
                        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wide group-hover:text-[#2C6E49] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-[#B8BFC6] mt-1.5 line-clamp-2">
                          {category.description}
                        </p>
                        {category.has_prices && (
                          <span className="inline-block mt-2.5 text-xs bg-[#E0A800]/15 text-[#1A1A1A] font-semibold px-2.5 py-1 rounded-full border border-[#E0A800]/25">
                            S cenami
                          </span>
                        )}
                      </div>
                      <svg
                        className="w-5 h-5 text-[#B8BFC6] group-hover:text-[#2C6E49] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ KONTAKT ═══════ */}
      <section id="kontakt" className="py-24 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-[#2C6E49] font-semibold text-xs uppercase tracking-[3px]">Kontakt</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mt-3 mb-4">KONTAKTIRAJTE NAS</h2>
            <p className="text-[#B8BFC6]">Z veseljem vam svetujemo pri izbiri prave kmetijske mehanizacije</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border-2 border-[#1C5C35]/40 hover:border-[#1C5C35] transition-all shadow-sm">
              <h3 className="text-xs font-bold text-[#2C6E49] uppercase tracking-[2px] mb-4">AGRA D.O.O.</h3>
              <p className="text-[#1A1A1A]/80 leading-relaxed">
                Ljubljanska cesta 86<br />
                2310 Slovenska Bistrica
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7 border-2 border-[#1C5C35]/40 hover:border-[#1C5C35] transition-all shadow-sm">
              <h3 className="text-xs font-bold text-[#2C6E49] uppercase tracking-[2px] mb-4">KONTAKT</h3>
              <div className="space-y-3">
                <a href="tel:031574730" className="flex items-center gap-2 text-[#1A1A1A]/80 hover:text-[#2C6E49] transition-colors">
                  📞 031 574 730
                </a>
                <a href="mailto:agra.slavko@gmail.com" className="flex items-center gap-2 text-[#1A1A1A]/80 hover:text-[#2C6E49] transition-colors">
                  ✉️ agra.slavko@gmail.com
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 border-2 border-[#1C5C35]/40 hover:border-[#1C5C35] transition-all shadow-sm">
              <h3 className="text-xs font-bold text-[#2C6E49] uppercase tracking-[2px] mb-4">PARTNERJI</h3>
              <p className="text-[#1A1A1A]/80 leading-relaxed">
                Pooblaščeni prodajalec:<br />
                Steyr • Pöttinger • APV<br />
                Quicke • Trioliet • Fliegl<br />
                Vesta • Gorenc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ Temno zelena */}
      <footer className="bg-[#1C4532]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white font-extrabold text-lg">AGRA</span>
              <span className="text-white/50 text-sm">d.o.o.</span>
              <span className="text-white/40 text-sm ml-1">— Slovenska Bistrica</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm">
                © {new Date().getFullYear()} AGRA d.o.o.
              </span>
              <div className="flex gap-1">
                <div className="w-5 h-1 rounded-full bg-white/30" />
                <div className="w-5 h-1 rounded-full bg-[#3E8F6A]" />
                <div className="w-5 h-1 rounded-full bg-[#E0A800]" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
