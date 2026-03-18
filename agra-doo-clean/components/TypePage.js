'use client'

import { useState } from 'react'

export default function TypePage({ type, category, models = [], navigateToModel, navigateBack, loading }) {
  const [showInquiry, setShowInquiry] = useState(false)
  const showPrices = category?.has_prices === true

  // Preveri ali je Gorenc (specifikacije so v type, ne v modelih)
  const isGorenc = category?.brand_name === 'Gorenc'
  const gorencSpecs = type?.specifications || {}
  const gorencModels = gorencSpecs.models || []
  const gorencSpecRows = gorencSpecs.specs || []

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

  // ── PRIMERJALNA TABELA ZA OSTALE ZNAMKE ───────────────────────────────────────
  const allSpecKeys = models && models.length > 0
    ? [...new Set(models.flatMap(m => m.specifications ? Object.keys(m.specifications) : []))]
    : []

  const showComparisonTable = !isGorenc && allSpecKeys.length > 0 && models && models.length > 1

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="relative bg-[#1C4532] text-white py-8 overflow-hidden">
        {!isGorenc && models && models[0]?.image_url && (
          <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
            <img
              src={models[0].image_url}
              alt={type?.name}
              className="h-full w-full object-cover object-left opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C4532] via-[#1C4532]/60 to-transparent" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nazaj na {category?.name || 'kategorijo'}
          </button>

          <div className="flex items-center gap-5">
            {category?.brand_logo ? (
              category.brand_name === 'Gorenc' ? (
                <img
                  src={category.brand_logo}
                  alt={category.brand_name}
                  style={{ height: `${category.logo_height || 80}px` }}
                  className="w-auto object-contain flex-shrink-0"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              ) : (
                <div className="bg-white rounded-xl px-3 py-2 shadow-md flex-shrink-0">
                  <img
                    src={category.brand_logo}
                    alt={category.brand_name}
                    style={{ height: `${category.logo_height || 80}px` }}
                    className="w-auto object-contain"
                  />
                </div>
              )
            ) : null}
            <div>
              <p className="text-white/60 text-sm uppercase tracking-wider mb-1">{category?.brand_name}</p>
              <h1 className="text-3xl font-bold">{type?.name || 'Vrsta'}</h1>
              {type?.description && (
                <p className="text-white/70 mt-1 max-w-2xl">{type.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 bg-[#DDE1E6] min-h-screen">

        {/* ══════════════════════════════════════════════════════════════════════
            GORENC: Prikaži tabelo specifikacij iz type.specifications
        ══════════════════════════════════════════════════════════════════════ */}
        {isGorenc && (
          <>
            {gorencModels.length > 0 && gorencSpecRows.length > 0 ? (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-zinc-700 mb-3">Specifikacije</h2>
                <div className="bg-white rounded-xl shadow-md border-2 border-[#1C4532]/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#1C4532] text-white">
                          <th className="text-left py-4 px-4 font-semibold text-sm uppercase tracking-wider border-r border-[#1C4532]/30 min-w-[150px]">
                            Specifikacija
                          </th>
                          {gorencModels.map((model, idx) => (
                            <th 
                              key={idx} 
                              className="text-center py-4 px-3 font-semibold text-sm uppercase tracking-wider border-r border-[#1C4532]/30 last:border-r-0 min-w-[100px]"
                            >
                              {model}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {gorencSpecRows.map((spec, rowIdx) => (
                          <tr 
                            key={rowIdx}
                            className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#DDE1E6]/40'}
                          >
                            <td className="py-3 px-4 font-medium text-[#1A1A1A] border-r border-[#1C4532]/10 text-sm">
                              {spec.name}
                            </td>
                            {spec.values.map((value, colIdx) => (
                              <td 
                                key={colIdx} 
                                className="py-3 px-3 text-center text-[#1A1A1A]/80 border-r border-[#1C4532]/10 last:border-r-0 text-sm"
                              >
                                {value || '-'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow border-2 border-[#1C4532]/20">
                <span className="text-6xl mb-4 block">📋</span>
                <p className="text-zinc-500 text-lg">Specifikacije za {type?.name || 'ta tip'} še niso dodane.</p>
              </div>
            )}

            {/* CTA gumbi za Gorenc */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <button
                onClick={() => setShowInquiry(true)}
                className="flex-1 bg-[#2C6E49] hover:bg-[#3E8F6A] text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md"
              >
                📧 Povpraševanje
              </button>
              
              <a
                href="tel:031574730"
                className="flex-1 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-medium py-3 px-6 rounded-xl transition-colors text-center shadow-md"
              >
                📞 031 574 730
              </a>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            OSTALE ZNAMKE: Standardni prikaz modelov
        ══════════════════════════════════════════════════════════════════════ */}
        {!isGorenc && (
          <>
            {!models || models.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow border-2 border-[#1C4532]/20">
                <span className="text-6xl mb-4 block">📋</span>
                <p className="text-zinc-500 text-lg">Modeli za {type?.name || 'to vrsto'} še niso dodani.</p>
                <p className="text-zinc-400 text-sm mt-2">Kmalu bodo na voljo!</p>
              </div>
            ) : (
              <>
                {/* Primerjalna tabela */}
                {showComparisonTable && (
                  <div className="mb-10">
                    <h2 className="text-lg font-semibold text-zinc-700 mb-3">Primerjava modelov</h2>
                    <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[#2C6E49] text-white">
                            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Specifikacija</th>
                            {models.map(model => (
                              <th
                                key={model.id}
                                onClick={() => navigateToModel(model)}
                                className="px-4 py-3 font-semibold whitespace-nowrap text-center cursor-pointer hover:bg-[#3E8F6A] transition-colors"
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
                          {showPrices && models.some(m => m.price) && (
                            <tr className="bg-[#2C6E49]/10 font-semibold">
                              <td className="px-4 py-2.5 text-zinc-700 border-r border-zinc-100">Cena (brez DDV)</td>
                              {models.map(model => (
                                <td key={model.id} className="px-4 py-2.5 text-center text-[#2C6E49] border-r border-zinc-100 last:border-r-0">
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

                {/* Mreža modelov */}
                <h2 className="text-lg font-semibold text-zinc-700 mb-3">
                  {showComparisonTable ? 'Izberite model' : 'Modeli'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => navigateToModel(model)}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-[#1C4532]/20 hover:border-[#1C4532]"
                    >
                      <div className="aspect-[4/3] bg-[#DDE1E6] relative overflow-hidden">
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

                      <div className="p-4">
                        <h3 className="text-base font-semibold text-zinc-800 group-hover:text-[#2C6E49] transition-colors">
                          {model.name}
                        </h3>

                        {model.description && (
                          <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{model.description}</p>
                        )}

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

                        <div className="flex items-center gap-2 mt-3 text-[#2C6E49] text-sm font-medium">
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
          </>
        )}
      </div>

      {/* Modal za povpraševanje (Gorenc) */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#1C4532]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#1A1A1A]">Povpraševanje</h3>
              <button 
                onClick={() => setShowInquiry(false)}
                className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-[#1A1A1A]/60 mb-4">
              Za povpraševanje o izdelku <strong className="text-[#1A1A1A]">{type?.name}</strong> nas kontaktirajte:
            </p>
            
            <div className="space-y-3">
              <a
                href="tel:031574730"
                className="flex items-center gap-3 p-4 bg-[#2C6E49]/8 rounded-xl hover:bg-[#2C6E49]/15 transition-colors border border-[#2C6E49]/20"
              >
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-medium text-[#2C6E49]">Telefon</p>
                  <p className="text-[#1A1A1A]/70">031 574 730</p>
                </div>
              </a>
              
              <a
                href={`mailto:agra.slavko@gmail.com?subject=Povpraševanje: ${type?.name}&body=Pozdravljeni,%0A%0AZanima me izdelek: ${type?.name}%0A%0A`}
                className="flex items-center gap-3 p-4 bg-[#DDE1E6] rounded-xl hover:bg-[#B8BFC6]/50 transition-colors border border-[#B8BFC6]"
              >
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Email</p>
                  <p className="text-[#1A1A1A]/60">agra.slavko@gmail.com</p>
                </div>
              </a>
            </div>
            
            <button
              onClick={() => setShowInquiry(false)}
              className="w-full mt-4 py-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
            >
              Zapri
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
