'use client'

// Logo URL-ji za vsako znamko
const BRAND_LOGOS = {
  'Steyr': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Steyr_Tractor_logo.svg/320px-Steyr_Tractor_logo.svg.png',
  'Pöttinger': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/P%C3%B6ttinger_Logo.svg/320px-P%C3%B6ttinger_Logo.svg.png',
  'Quicke': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Quicke_logo.svg/320px-Quicke_logo.svg.png',
  'Trioliet': 'https://www.trioliet.com/wp-content/uploads/2021/02/logo-trioliet.png',
  'Fliegl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Fliegl_Logo.svg/320px-Fliegl_Logo.svg.png',
  'Vesta': null,
}

// Vrstni red znamk
const BRAND_ORDER = ['Steyr', 'Pöttinger', 'Quicke', 'Trioliet', 'Fliegl', 'Vesta']

// Feature ikone
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
        logo: BRAND_LOGOS[cat.brand_name] || cat.brand_logo || null,
        categories: []
      }
    }
    acc[cat.brand_name].categories.push(cat)
    return acc
  }, {})

  // Znamke v določenem vrstnem redu
  const orderedBrands = BRAND_ORDER
    .filter(name => brandGroups[name])
    .map(name => brandGroups[name])

  return (
    <div className="pt-16">

      {/* ═══════ HERO ═══════ Zeleni gradient z sliko */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://press.lectura.de/media-storage/press_releases/steyr_ctis_6300_terrus_cvt_2(6f8).jpg"
            alt="AGRA traktor"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {/* Green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4A2E]/95 via-[#1B6B4A]/85 to-[#1B6B4A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4A2E]/60 via-transparent to-[#0F4A2E]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight">
              Kmetijska
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight italic mt-1 mb-8">
              mehanizacija
            </h1>

            <p className="text-white/70 text-base sm:text-lg tracking-wide mb-10">
              Steyr&nbsp; •&nbsp; Pöttinger&nbsp; •&nbsp; Fliegl&nbsp; •&nbsp; Quicke&nbsp; •&nbsp; Trioliet
            </p>

            <button
              onClick={() => {
                const el = document.getElementById('katalog-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-3 bg-[#FFD600] hover:bg-[#E6C200] text-[#0A0A0A] font-extrabold text-base px-8 py-4 rounded-full tracking-wide shadow-xl shadow-black/20 transition-all hover:scale-[1.02]"
            >
              ODPRI KATALOG
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F6F7] to-transparent" />
      </section>

      {/* ═══════ FEATURES BAR ═══════ */}
      <section className="py-8 bg-[#F5F6F7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#E8EAED] overflow-hidden grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E8EAED]">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="flex flex-col items-center justify-center py-7 px-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#1B6B4A]/10 border border-[#1B6B4A]/20 flex items-center justify-center text-[#1B6B4A] text-xl mb-3">
                  {feat.icon}
                </div>
                <h4 className="text-[#0A0A0A] font-extrabold text-xs tracking-[1px] mb-1">{feat.title}</h4>
                <p className="text-[#8A9199] text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ZNAMKE GRID ═══════ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mb-3">
              Zastopamo priznane znamke
            </h2>
            <p className="text-[#8A9199] max-w-2xl mx-auto">
              Sodelujemo z vodilnimi svetovnimi proizvajalci kmetijske mehanizacije
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRAND_ORDER.map((brandName) => {
              const brand = brandGroups[brandName]
              const firstCat = brand?.categories[0]
              return (
                <button
                  key={brandName}
                  onClick={() => firstCat && navigateToCategory(firstCat)}
                  className="group bg-[#F5F6F7] hover:bg-[#1B6B4A] rounded-2xl p-5 flex flex-col items-center justify-center h-28 border border-[#E8EAED] hover:border-[#1B6B4A] transition-all duration-300 hover:shadow-lg"
                >
                  {BRAND_LOGOS[brandName] ? (
                    <img
                      src={BRAND_LOGOS[brandName]}
                      alt={brandName}
                      className="h-7 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = 'block') }}
                    />
                  ) : null}
                  <span className={`text-lg font-bold text-[#0A0A0A] group-hover:text-white transition-colors ${BRAND_LOGOS[brandName] ? 'mt-2' : ''}`}>
                    {brandName}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════ KATALOG PO ZNAMKAH ═══════ */}
      <section id="katalog-section" className="py-16 bg-[#F5F6F7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mb-3">
              Naš katalog
            </h2>
            <p className="text-[#8A9199]">
              Izberite kategorijo in preglejte ponudbo
            </p>
          </div>

          {orderedBrands.map((brand) => (
            <div key={brand.name} className="mb-14">
              {/* Brand header */}
              <div className="flex items-center gap-4 mb-6">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 object-contain"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : null}
                <button
                  onClick={() => navigateToCategory(brand.categories[0])}
                  className="text-2xl font-extrabold text-[#1B6B4A] hover:text-[#145438] transition-colors"
                >
                  {brand.name} <span className="text-[#FFD600]">→</span>
                </button>
              </div>

              {/* Kategorije grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {brand.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => navigateToCategory(category)}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl p-5 text-left transition-all duration-300 hover:-translate-y-1 border border-[#E8EAED] hover:border-[#1B6B4A]/30"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{category.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-[#0A0A0A] group-hover:text-[#1B6B4A] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-[#8A9199] mt-1 line-clamp-2">
                          {category.description}
                        </p>
                        {category.has_prices && (
                          <span className="inline-block mt-2 text-xs bg-[#FFD600]/20 text-[#0A0A0A] font-semibold px-2.5 py-1 rounded-full border border-[#FFD600]/30">
                            S cenami
                          </span>
                        )}
                      </div>
                      <svg
                        className="w-5 h-5 text-[#B0B7BE] group-hover:text-[#1B6B4A] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
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

      {/* ═══════ KONTAKT ═══════ Temno ozadje */}
      <section id="kontakt" className="py-20 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#FFD600] font-bold text-xs uppercase tracking-[2px]">Kontakt</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">Kontaktirajte nas</h2>
            <p className="text-[#8A9199]">Z veseljem vam svetujemo pri izbiri prave kmetijske mehanizacije</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#151515] rounded-2xl p-6 border border-[#252525]">
              <h3 className="text-sm font-bold text-[#FFD600] uppercase tracking-wider mb-3">AGRA d.o.o.</h3>
              <p className="text-white/80 leading-relaxed">
                Ljubljanska cesta 86<br />
                2310 Slovenska Bistrica
              </p>
            </div>
            <div className="bg-[#151515] rounded-2xl p-6 border border-[#252525]">
              <h3 className="text-sm font-bold text-[#FFD600] uppercase tracking-wider mb-3">Kontakt</h3>
              <p className="text-white/80 space-y-2">
                <a href="tel:031574730" className="flex items-center gap-2 hover:text-[#FFD600] transition-colors">
                  📞 031 574 730
                </a>
                <a href="mailto:agra.slavko@gmail.com" className="flex items-center gap-2 hover:text-[#FFD600] transition-colors">
                  ✉️ agra.slavko@gmail.com
                </a>
              </p>
            </div>
            <div className="bg-[#151515] rounded-2xl p-6 border border-[#252525]">
              <h3 className="text-sm font-bold text-[#FFD600] uppercase tracking-wider mb-3">Partnerji</h3>
              <p className="text-white/80 leading-relaxed">
                Pooblaščeni prodajalec:<br />
                Steyr • Pöttinger • Quicke<br />
                Trioliet • Fliegl • Vesta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ Srebrna podlaga */}
      <footer className="bg-[#B0B7BE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[#0A0A0A] font-extrabold text-lg">AGRA</span>
              <span className="text-[#3A3A3A] text-sm">d.o.o.</span>
              <span className="text-[#555] text-sm ml-2">— Slovenska Bistrica</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#3A3A3A] text-sm">
                © {new Date().getFullYear()} AGRA d.o.o.
              </span>
              <div className="flex gap-1">
                <div className="w-5 h-1 rounded-full bg-white" />
                <div className="w-5 h-1 rounded-full bg-[#1B6B4A]" />
                <div className="w-5 h-1 rounded-full bg-[#FFD600]" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
