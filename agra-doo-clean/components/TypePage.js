'use client'

export default function TypePage({ type, category, models, navigateToModel, navigateBack, loading }) {
  const showPrices = category?.has_prices === true

  const formatPrice = (price) => {
    if (!price) return null
    return new Intl.NumberFormat('sl-SI', { style: 'currency', currency: 'EUR' }).format(price)
  }

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
      </div>
    )
  }

  // ── PRIMERJALNA TABELA ────────────────────────────────────────────────────────
  // Zberi vse ključe iz specifications vseh modelov (ohranjaj vrstni red prvega pojavljanja)
  const allSpecKeys = models && models.length > 0
    ? [...new Set(models.flatMap(m => m.specifications ? Object.keys(m.specifications) : []))]
    : []

  const showComparisonTable = allSpecKeys.length > 0 && models && models.length > 1

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-green-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nazaj na {category?.name || 'kategorijo'}
          </button>

          <div className="flex items-center gap-4">
            <span className="text-4xl">{category?.icon || '🌿'}</span>
            <div>
              <p className="text-green-100 text-sm">{category?.brand_name} • {category?.name}</p>
              <h1 className="text-3xl font-bold">{type?.name || 'Vrsta'}</h1>
            </div>
          </div>

          {type?.description && (
            <p className="text-green-100 mt-3 max-w-2xl">{type.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!models || models.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <span className="text-6xl mb-4 block">📋</span>
            <p className="text-zinc-500 text-lg">Modeli za {type?.name || 'to vrsto'} še niso dodani.</p>
            <p className="text-zinc-400 text-sm mt-2">Kmalu bodo na voljo!</p>
          </div>
        ) : (
          <>
            {/* ── PRIMERJALNA TABELA ── */}
            {showComparisonTable && (
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-zinc-700 mb-3">Primerjava modelov</h2>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-700 text-white">
                        <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Specifikacija</th>
                        {models.map(model => (
                          <th
                            key={model.id}
                            onClick={() => navigateToModel(model)}
                            className="px-4 py-3 font-semibold whitespace-nowrap text-center cursor-pointer hover:bg-green-600 transition-colors"
                          >
                            {model.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allSpecKeys.map((key, i) => (
                        <tr
                          key={key}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}
                        >
                          <td className="px-4 py-2.5 font-medium text-zinc-600 whitespace-nowrap border-r border-zinc-100">
                            {key}
                          </td>
                          {models.map(model => {
                            const val = model.specifications?.[key]
                            return (
                              <td
                                key={model.id}
                                className="px-4 py-2.5 text-center text-zinc-700 border-r border-zinc-100 last:border-r-0"
                              >
                                {val !== undefined && val !== null ? String(val) : '—'}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                      {/* Cena vrstica */}
                      {showPrices && models.some(m => m.price) && (
                        <tr className="bg-green-50 font-semibold">
                          <td className="px-4 py-2.5 text-zinc-700 border-r border-zinc-100">Cena (brez DDV)</td>
                          {models.map(model => (
                            <td key={model.id} className="px-4 py-2.5 text-center text-green-700 border-r border-zinc-100 last:border-r-0">
                              {model.price ? formatPrice(model.price) : '—'}
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-zinc-400 mt-2">Kliknite na naziv modela za podrobnosti.</p>
              </div>
            )}

            {/* ── MREŽA MODELOV ── */}
            <h2 className="text-lg font-semibold text-zinc-700 mb-3">
              {showComparisonTable ? 'Izberite model' : 'Modeli'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {models.map((model) => (
                <div
                  key={model.id}
                  onClick={() => navigateToModel(model)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Slika */}
                  <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                    {model.image_url ? (
                      <img
                        src={model.image_url}
                        alt={model.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl opacity-20">{category?.icon || '🌿'}</span>
                      </div>
                    )}

                    {showPrices && model.price_with_vat && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                        {formatPrice(model.price_with_vat)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-zinc-800 group-hover:text-green-700 transition-colors">
                      {model.name}
                    </h3>

                    {model.description && (
                      <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{model.description}</p>
                    )}

                    {/* Prve 3 spec. kot značke */}
                    {model.specifications && Object.keys(model.specifications).length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {Object.entries(model.specifications).slice(0, 3).map(([key, value]) => (
                          <span key={key} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}

                    {showPrices && model.price && (
                      <p className="text-sm text-zinc-400 mt-3">Brez DDV: {formatPrice(model.price)}</p>
                    )}

                    <div className="flex items-center gap-2 mt-3 text-green-700 text-sm font-medium">
                      <span>Več informacij</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
