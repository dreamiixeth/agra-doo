'use client'

export default function HomePage({ categories, navigateToCategory }) {
  // Grupiraj kategorije po blagovni znamki
  const brandGroups = (categories || []).reduce((acc, cat) => {
    if (!acc[cat.brand_name]) {
      acc[cat.brand_name] = {
        name: cat.brand_name,
        logo: cat.brand_logo,
        categories: []
      }
    }
    acc[cat.brand_name].categories.push(cat)
    return acc
  }, {})

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
          
          {/* Partner logotipi */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-80">
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
              <span className="text-2xl font-bold">STEYR</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
              <span className="text-2xl font-bold">PÖTTINGER</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
              <span className="text-2xl font-bold">VESTA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Kategorije po blagovnih znamkah */}
      <section className="py-12 lg:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {Object.values(brandGroups).map((brand) => (
            <div key={brand.name} className="mb-12">
              {/* Brand header */}
              <div className="flex items-center gap-4 mb-6">
                {brand.logo && (
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-8 object-contain"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <h2 className="text-2xl font-bold text-zinc-800">{brand.name}</h2>
              </div>

              {/* Kategorije grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {brand.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => navigateToCategory(category)}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 text-left transition-all duration-300 hover:-translate-y-1 border border-zinc-100"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{category.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-zinc-800 group-hover:text-green-700 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1">
                          {category.description}
                        </p>
                        {category.has_prices && (
                          <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            S cenami
                          </span>
                        )}
                      </div>
                      <svg 
                        className="w-5 h-5 text-zinc-300 group-hover:text-green-700 group-hover:translate-x-1 transition-all" 
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
      <section className="bg-zinc-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AGRA d.o.o.</h3>
              <p className="text-zinc-400">
                Ljubljanska cesta 86<br />
                2310 Slovenska Bistrica
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <p className="text-zinc-400">
                <a href="tel:031574730" className="hover:text-white transition-colors">
                  📞 031 574 730
                </a>
                <br />
                <a href="mailto:agra.slavko@gmail.com" className="hover:text-white transition-colors">
                  ✉️ agra.slavko@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Partnerji</h3>
              <p className="text-zinc-400">
                Pooblaščeni prodajalec:<br />
                Steyr • Pöttinger • Vesta
              </p>
            </div>
          </div>
          <div className="border-t border-zinc-700 mt-8 pt-8 text-center text-zinc-500 text-sm">
            © 2024 AGRA d.o.o. Vse pravice pridržane.
          </div>
        </div>
      </section>
    </div>
  )
}
