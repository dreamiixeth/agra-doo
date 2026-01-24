'use client'

export default function TypePage({ type, models, navigateToCategory, loading }) {
  // Format cene
  const formatPrice = (price) => {
    if (!price) return null
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <button 
            onClick={navigateToCategory}
            className="flex items-center gap-2 text-green-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nazaj
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-4xl">🌿</span>
            <div>
              <h1 className="text-3xl font-bold">{type?.name || 'Model'}</h1>
            </div>
          </div>
          
          {type?.description && (
            <p className="text-green-100 mt-3 max-w-2xl">{type.description}</p>
          )}
        </div>
      </div>

      {/* Modeli */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!models || models.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <span className="text-6xl mb-4 block">📋</span>
            <p className="text-zinc-500 text-lg">
              Modeli za {type?.name || 'to vrsto'} še niso dodani.
            </p>
            <p className="text-zinc-400 text-sm mt-2">
              Kmalu bodo na voljo!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
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
                      <span className="text-6xl opacity-20">🌿</span>
                    </div>
                  )}
                  
                  {/* Cena badge */}
                  {model.price_with_vat && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                      {formatPrice(model.price_with_vat)}
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-zinc-800 group-hover:text-green-700 transition-colors">
                    {model.name}
                  </h3>
                  
                  {model.description && (
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                      {model.description}
                    </p>
                  )}
                  
                  {/* Specifikacije preview */}
                  {model.specifications && Object.keys(model.specifications).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Object.entries(model.specifications).slice(0, 3).map(([key, value]) => (
                        <span 
                          key={key}
                          className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Cena brez DDV */}
                  {model.price && (
                    <p className="text-sm text-zinc-400 mt-3">
                      Brez DDV: {formatPrice(model.price)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
