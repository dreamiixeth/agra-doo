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
      {/* Hero sekcija */}
      <section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Kmetijska mehanizacija
          </h1>
          <p className="text-xl lg:text-2xl text-green-100 mb-8 max-w-2xl mx-auto">
            Vaš zanesljiv partner za traktorje, opremo in prikolice
          </p>

          {/* Vse znamke */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
            {BRAND_ORDER.map((brandName) => (
              <div key={brandName} className="bg-white/10 backdrop-blur px-5 py-2.5 rounded-lg border-2 border-[#e6b800]">
                <span className="text-xl font-bold tracking-wide text-[#e6b800]">{brandName.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategorije po znamkah */}
      <section className="py-12 lg:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {orderedBrands.map((brand) => (
            <div key={brand.name} className="mb-12">
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
                <h2 className="text-2xl font-bold text-green-700">{brand.name}</h2>
              </div>

              {/* Kategorije grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {brand.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => navigateToCategory(category)}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl p-5 text-left transition-all duration-300 hover:-translate-y-1 border border-zinc-100"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{category.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-zinc-800 group-hover:text-green-700 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                          {category.description}
                        </p>
                        {category.has_prices && (
                          <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            S cenami
                          </span>
                        )}
                      </div>
                      <svg
                        className="w-5 h-5 text-zinc-300 group-hover:text-green-700 group-hover:translate-x-1 transition-all flex-shrink-0"
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

      {/* Kontakt sekcija */}
      <section className="bg-green-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#e6b800]">AGRA d.o.o.</h3>
              <p className="text-[#e6b800]/80">
                Ljubljanska cesta 86<br />
                2310 Slovenska Bistrica
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#e6b800]">Kontakt</h3>
              <p className="text-[#e6b800]/80">
                <a href="tel:031574730" className="hover:text-[#e6b800] transition-colors">
                  📞 031 574 730
                </a>
                <br />
                <a href="mailto:agra.slavko@gmail.com" className="hover:text-[#e6b800] transition-colors">
                  ✉️ agra.slavko@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#e6b800]">Partnerji</h3>
              <p className="text-[#e6b800]/80">
                Pooblaščeni prodajalec:<br />
                Steyr • Pöttinger • Quicke • Trioliet • Fliegl • Vesta
              </p>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-[#e6b800]/60 text-sm">
            © 2025 AGRA d.o.o. Vse pravice pridržane.
          </div>
        </div>
      </section>
    </div>
  )
}
