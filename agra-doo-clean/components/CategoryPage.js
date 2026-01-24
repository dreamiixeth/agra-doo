'use client'

export default function CategoryPage({ category, types, navigateToType, loading }) {
  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header z brand logom */}
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Brand logo */}
            {category.brand_logo && (
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <img 
                  src={category.brand_logo} 
                  alt={category.brand_name}
                  className="h-12 md:h-16 object-contain"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = `<span class="text-3xl font-bold text-zinc-800">${category.brand_name}</span>`
                  }}
                />
              </div>
            )}
            
            <div className="text-center md:text-left">
              <p className="text-zinc-400 text-sm uppercase tracking-wider">
                {category.brand_name}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <span>{category.icon}</span>
                {category.name}
              </h1>
              {category.description && (
                <p className="text-zinc-300 mt-2">{category.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vrste grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {types.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg">
              Vrste za to kategorijo še niso dodane.
            </p>
          </div>
        ) : (
          <>
            <p className="text-zinc-500 mb-6">
              Izberite vrsto za ogled modelov:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => navigateToType(type)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  {/* Slika */}
                  <div className="aspect-video bg-zinc-100 relative overflow-hidden">
                    {type.image_url ? (
                      <img 
                        src={type.image_url} 
                        alt={type.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl opacity-30">{category.icon}</span>
                      </div>
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-green-700/0 group-hover:bg-green-700/10 transition-colors duration-300" />
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-zinc-800 group-hover:text-green-700 transition-colors">
                      {type.name}
                    </h3>
                    {type.description && (
                      <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                        {type.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-3 text-green-700 text-sm font-medium">
                      <span>Oglej modele</span>
                      <svg 
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
