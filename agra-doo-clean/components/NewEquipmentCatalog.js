'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// Definicija skupin za Kosilnice
const KOSILNICE_GROUPS = [
  { key: 'vse', label: 'Vse', pattern: null },
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
  const [activeGroup, setActiveGroup] = useState('vse')
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
    
    const { data: typesData } = await supabase
      .from('types')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order')

    if (typesData && typesData.length > 0) {
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

  const getFilteredTypes = () => {
    if (!isKosilnice || activeGroup === 'vse') return types
    const group = KOSILNICE_GROUPS.find(g => g.key === activeGroup)
    if (!group || !group.pattern) return types
    return types.filter(type => type.slug?.toLowerCase().includes(group.pattern))
  }

  const getModelsForType = (typeId) => {
    return models.filter(m => m.type_id === typeId)
  }

  const formatPrice = (price) => {
    if (!price) return 'Po povpraševanju'
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getGroupModelCount = (pattern) => {
    if (!pattern) return types.length
    const groupTypes = types.filter(t => t.slug?.toLowerCase().includes(pattern))
    return groupTypes.length
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

  if (selectedModel) {
    return (
      <div className="pt-20 min-h-screen bg-zinc-300">
        <div className="p-6 lg:p-10 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedModel(null)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors"
          >
            ← Nazaj na seznam
          </button>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedModel.name}</h1>
            <p className="text-gray-500 mb-6">{selectedModel.description}</p>
            <div className="text-3xl font-bold text-green-700 mb-8">{formatPrice(selectedModel.price)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-zinc-300">
      <main className="w-full">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">{categoryName}</h1>
            <p className="text-gray-500 text-lg">{types.length} kategorij</p>
          </div>

          {isKosilnice && types.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 p-1 bg-zinc-200 rounded-xl">
                {KOSILNICE_GROUPS.map((group) => {
                  const count = getGroupModelCount(group.pattern)
                  return (
                    <button
                      key={group.key}
                      onClick={() => setActiveGroup(group.key)}
                      className={`flex-1 min-w-[100px] px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        activeGroup === group.key
                          ? 'bg-green-700 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-zinc-100'
                      }`}
                    >
                      {group.label} ({count})
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {filteredTypes.length > 0 ? (
            <div className="space-y-4">
              {filteredTypes.map((type) => {
                const typeModels = getModelsForType(type.id)
                const isExpanded = expandedType === type.id
                
                return (
                  <div key={type.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <button
                      onClick={() => setExpandedType(isExpanded ? null : type.id)}
                      className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                        <p className="text-sm text-gray-500">{typeModels.length} modelov</p>
                      </div>
                      <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {isExpanded && typeModels.length > 0 && (
                      <div className="border-t border-gray-100 bg-gray-50 p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {typeModels.map((model) => (
                          <div
                            key={model.id}
                            onClick={() => setSelectedModel(model)}
                            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer border border-gray-100"
                          >
                            <h4 className="font-semibold text-gray-900 mb-1">{model.name}</h4>
                            <p className="text-lg font-bold text-green-700">{formatPrice(model.price)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-gray-500 text-lg">V tej kategoriji še ni modelov.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
