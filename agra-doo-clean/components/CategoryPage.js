'use client'

import { useState } from 'react'

// Definicija skupin za Kosilnice
const KOSILNICE_GROUPS = [
  { key: 'vse', label: 'Vse', pattern: null },
  { key: 'sprednje', label: 'Sprednje', pattern: 'sprednje' },
  { key: 'zadnje', label: 'Zadnje', pattern: 'zadnje' },
  { key: 'kombinirane', label: 'Kombinirane', pattern: 'kombinirane' },
  { key: 'vlecene', label: 'Vlečene', pattern: 'vlecene' },
]

export default function CategoryPage({ category, types, navigateToType, loading }) {
  const [activeGroup, setActiveGroup] = useState('vse')
  
  // Preveri ali je to kategorija Kosilnice
  const isKosilnice = category?.slug === 'kosilnice'
  
  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
      </div>
    )
  }

  // Filtriraj tipe glede na aktivno skupino (samo za kosilnice)
  const getFilteredTypes = () => {
    if (!isKosilnice || activeGroup === 'vse') return types
    
    const group = KOSILNICE_GROUPS.find(g => g.key === activeGroup)
    if (!group || !group.pattern) return types
    
    return types.filter(type => 
      type.slug?.toLowerCase().includes(group.pattern)
    )
  }

  // Štej tipe v skupini
  const getGroupTypeCount = (pattern) => {
    if (!pattern) return types.length
    return types.filter(t => t.slug?.toLowerCase().includes(pattern)).length
  }

  const filteredTypes = getFilteredTypes()

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

      {/* NAVIGACIJA PO SKUPINAH - SAMO ZA KOSILNICE */}
      {isKosilnice && types.length > 0 && (
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex overflow-x-auto py-2 gap-2 scrollbar-hide">
              {KOSILNICE_GROUPS.map((group) => {
                const count = getGroupTypeCount(group.pattern)
                if (count === 0 && group.key !== 'vse') return null
                
                return (
                  <button
                    key={group.key}
                    onClick={() => setActiveGroup(group.key)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                      activeGroup === group.key
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {group.label}
                    <span className={`ml-2 text-sm ${
                      activeGroup === group.key ? 'text-green-200' : 'text-zinc-400'
                    }`}>
                      ({count})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

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
            
            {filteredTypes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 text-lg">
                  V tej skupini ni vrst.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => navigateToType(type)}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-zinc-100 hover:border-green-200 overflow-hidden group"
                  >
                    {/* Type image */}
                    <div className="aspect-video bg-gradient-to-br from-green-50 to-zinc-100 flex items-center justify-center overflow-hidden">
                      {type.image_url ? (
                        <img 
                          src={type.image_url} 
                          alt={type.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                          🌿
                        </div>
                      )}
                    </div>
                    
                    {/* Type info */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-zinc-900 group-hover:text-green-700 transition-colors">
                        {type.name}
                      </h3>
                      {type.description && (
                        <p className="text-zinc-500 text-sm mt-1 line-clamp-2">
                          {type.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-zinc-400">
                          {type.model_count || 0} modelov
                        </span>
                        <span className="text-green-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                          Oglej modele →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
