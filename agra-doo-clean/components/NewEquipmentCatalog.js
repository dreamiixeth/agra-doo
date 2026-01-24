'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import AnimatedSection from './AnimatedSection'

// Definicija skupin za Kosilnice
const KOSILNICE_GROUPS = [
  { key: 'sprednje', label: 'Sprednje', pattern: 'sprednje' },
  { key: 'zadnje', label: 'Zadnje', pattern: 'zadnje' },
  { key: 'kombinirane', label: 'Kombinirane', pattern: 'kombinirane' },
  { key: 'vlecene', label: 'Vlečene', pattern: 'vlecene' },
]

export default function NewEquipmentCatalog({ 
  categoryId,
  categoryName,
  categorySlug,
  setCurrentView,
}) {
  const [types, setTypes] = useState([])
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeGroup, setActiveGroup] = useState('sprednje')
  const [expandedType, setExpandedType] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)

  const isKosilnice = categorySlug === 'kosilnice'

  useEffect(() => {
    if (categoryId) {
      fetchCatalogData()
    }
  }, [categoryId])

  const fetchCatalogData = async () => {
    setLoading(true)
    
    // Dobi vse tipe za to kategorijo
    const { data: typesData } = await supabase
      .from('types')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order')

    if (typesData && typesData.length > 0) {
      // Dobi vse modele za te tipe
      const { data: modelsData } = await supabase
        .from('models')
        .select('*')
        .in('type_id', typesData.map(t => t.id))
        .order('sort_order')

      setTypes(typesData)
      setModels(modelsData || [])
    }
    
    setLoading(false)
  }

  // Filtrira tipe glede na aktivno skupino (samo za kosilnice)
  const getFilteredTypes = () => {
    if (!isKosilnice) return types
    
    return types.filter(type => 
      type.slug.toLowerCase().includes(activeGroup)
    )
  }

  // Dobi modele za določen tip
  const getModelsForType = (typeId) => {
    return models.filter(m => m.type_id === typeId)
  }

  // Formatiraj ceno
  const formatPrice = (price) => {
    if (!price) return 'Po povpraševanju'
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Štej modele v skupini
  const getGroupModelCount = (pattern) => {
    const groupTypes = types.filter(t => t.slug.toLowerCase().includes(pattern))
    return models.filter(m => groupTypes.some(t => t.id === m.type_id)).length
  }

  const filteredTypes = getFilteredTypes()

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-zinc-300">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Nalagam katalog...</p>
          </div>
        </div>
      </div>
    )
  }

  // Prikaz posameznega modela
  if (selectedModel) {
    return (
      <div className="pt-20 min-h-screen bg-zinc-300">
        <div className="p-6 lg:p-10 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedModel(null)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nazaj na seznam
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {selectedModel.image_url && (
              <div className="aspect-video bg-gray-100">
                <img 
                  src={selectedModel.image_url} 
                  alt={selectedModel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedModel.name}</h1>
              <p className="text-gray-500 mb-6">{selectedModel.description}</p>
              
              <div className="text-3xl font-bold text-green-700 mb-8">
                {formatPrice(selectedModel.price)}
              </div>

              {selectedModel.specifications && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Tehnični podatki</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(selectedModel.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 uppercase">{key.replace(/_/g, ' ')}</div>
                        <div className="font-semibold text-gray-900">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t">
                <a
                  href="tel:+38641123456"
                  className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors"
                >
                  📞 Pokličite za ponudbo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-zinc-300">
      <main className="w-full">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection>
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">{categoryName}</h1>
              <p className="text-gray-500 text-lg">
                {models.length} modelov v {types.length} kategorijah
              </p>
            </div>
          </AnimatedSection>

          {/* Navigacija po skupinah - SAMO ZA KOSILNICE */}
          {isKosilnice && (
            <AnimatedSection delay={100}>
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 p-1 bg-zinc-200 rounded-xl">
                  {KOSILNICE_GROUPS.map((group) => {
                    const count = getGroupModelCount(group.pattern)
                    return (
                      <button
                        key={group.key}
                        onClick={() => {
                          setActiveGroup(group.key)
                          setExpandedType(null)
                        }}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          activeGroup === group.key
                            ? 'bg-green-700 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-zinc-100'
                        }`}
                      >
                        <span>{group.label}</span>
                        <span className={`ml-2 text-sm ${
                          activeGroup === group.key ? 'text-green-200' : 'text-gray-400'
                        }`}>
                          ({count})
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Seznam tipov in modelov */}
          {filteredTypes.length > 0 ? (
            <div className="space-y-4">
              {filteredTypes.map((type, index) => {
                const typeModels = getModelsForType(type.id)
                const isExpanded = expandedType === type.id
                
                return (
                  <AnimatedSection key={type.id} delay={index * 50}>
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                      {/* Type header - klikni za razširitev */}
                      <button
                        onClick={() => setExpandedType(isExpanded ? null : type.id)}
                        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🚜</span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                            <p className="text-sm text-gray-500">{typeModels.length} modelov</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {typeModels.length > 0 && (
                            <span className="text-sm text-gray-400">
                              od {formatPrice(Math.min(...typeModels.map(m => m.price || Infinity)))}
                            </span>
                          )}
                          <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Modeli - prikaži ko je razširjeno */}
                      {isExpanded && typeModels.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50">
                          <div className="p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {typeModels.map((model) => (
                              <div
                                key={model.id}
                                onClick={() => setSelectedModel(model)}
                                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-green-200"
                              >
                                <h4 className="font-semibold text-gray-900 mb-1">{model.name}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{model.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold text-green-700">
                                    {formatPrice(model.price)}
                                  </span>
                                  <span className="text-xs text-gray-400">Več →</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          ) : (
            <AnimatedSection>
              <div className="text-center py-20 bg-white rounded-2xl">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-500 text-lg">V tej kategoriji še ni modelov.</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>
    </div>
  )
}
