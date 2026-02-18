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

// Definicija skupin za Balirke
const BALIRKE_GROUPS = [
  { key: 'vse', label: 'Vse', pattern: null },
  { key: 'fiksna', label: 'Fiksne komore', pattern: 'fiksna' },
  { key: 'variabilna', label: 'Variabilne komore', pattern: 'variabilna' },
  { key: 'kombinirane', label: 'Kombinirane', pattern: 'kombinirane' },
]

// Mapiranje kategorij na skupine (filter tabs)
const CATEGORY_GROUPS = {
  'kosilnice': KOSILNICE_GROUPS,
  'balirke': BALIRKE_GROUPS,
}

// Kategorije ki imajo vmesni nivo skupin (group_slug v bazi)
// Za te kategorije se najprej prikažejo GROUP kartice, nato TYPE kartice
const GROUPED_NAV_CATEGORIES = ['plugi']

// Lepa imena za group_slug vrednosti
const GROUP_DISPLAY_NAMES = {
  'servo-2000': 'SERVO 2000',
  'servo-3000': 'SERVO 3000',
  'servo-4000': 'SERVO 4000',
  'dodatna': 'Dodatna oprema',
}

// Vrstni red skupin
const GROUP_SORT_ORDER = ['servo-2000', 'servo-3000', 'servo-4000', 'dodatna']

export default function CategoryPage({ category, types, navigateToType, loading }) {
  const [activeGroup, setActiveGroup] = useState('vse')
  const [selectedGroupSlug, setSelectedGroupSlug] = useState(null)

  const groups = CATEGORY_GROUPS[category?.slug] || null
  const hasGroups = groups && groups.length > 0
  const isGroupedNav = GROUPED_NAV_CATEGORIES.includes(category?.slug)

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent"></div>
      </div>
    )
  }

  // ── GROUPED NAV logika ───────────────────────────────────────────────────────

  const getUniqueGroups = () => {
    const seen = {}
    types.forEach(type => {
      const slug = type.group_slug || 'dodatna'
      if (!seen[slug]) {
        seen[slug] = {
          slug,
          name: GROUP_DISPLAY_NAMES[slug] || slug.toUpperCase().replace(/-/g, ' '),
          count: 0,
          image_url: type.image_url || null,
        }
      }
      seen[slug].count++
    })
    return GROUP_SORT_ORDER
      .filter(s => seen[s])
      .map(s => seen[s])
  }

  const getTypesInGroup = (groupSlug) => {
    return types.filter(t => (t.group_slug || 'dodatna') === groupSlug)
  }

  // ── FILTER TABS logika ───────────────────────────────────────────────────────

  const getFilteredTypes = () => {
    if (!hasGroups || activeGroup === 'vse') return types
    const group = groups.find(g => g.key === activeGroup)
    if (!group || !group.pattern) return types
    return types.filter(type => type.slug?.toLowerCase().includes(group.pattern))
  }

  const getGroupTypeCount = (pattern) => {
    if (!pattern) return types.length
    return types.filter(t => t.slug?.toLowerCase().includes(pattern)).length
  }

  const filteredTypes = getFilteredTypes()
  const uniqueGroups = isGroupedNav ? getUniqueGroups() : []
  const typesInSelectedGroup = selectedGroupSlug ? getTypesInGroup(selectedGroupSlug) : []

  // ── KARTICA komponenta ───────────────────────────────────────────────────────

  const TypeCard = ({ item, onClick, actionLabel = 'Oglej modele →', countLabel }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-zinc-100 hover:border-green-200 overflow-hidden group"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-zinc-100 flex items-center justify-center overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-5xl opacity-50 group-hover:scale-110 transition-transform duration-300">🌿</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-base text-zinc-900 group-hover:text-green-700 transition-colors">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-zinc-400">
            {countLabel || `${item.model_count || 0} modelov`}
          </span>
          <span className="text-green-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
            {actionLabel}
          </span>
        </div>
      </div>
    </div>
  )

  // ── RENDER ───────────────────────────────────────────────────────────────────

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
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
              <p className="text-zinc-400 text-sm uppercase tracking-wider">{category.brand_name}</p>
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

      {/* Filter tabs (Kosilnice, Balirke...) */}
      {hasGroups && types.length > 0 && (
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto py-2 gap-2 scrollbar-hide">
              {groups.map((group) => {
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
                    <span className={`ml-2 text-sm ${activeGroup === group.key ? 'text-green-200' : 'text-zinc-400'}`}>
                      ({count})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── GROUPED NAV (Plugi) ── */}
      {isGroupedNav && (
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Nivo 1: Skupinske kartice */}
          {!selectedGroupSlug && (
            <>
              <p className="text-zinc-500 mb-6">Izberite skupino:</p>
              {types.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-500 text-lg">Vrste za to kategorijo še niso dodane.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {uniqueGroups.map((group) => (
                    <TypeCard
                      key={group.slug}
                      item={group}
                      onClick={() => setSelectedGroupSlug(group.slug)}
                      actionLabel={group.slug === 'dodatna' ? 'Oglej kategorije →' : 'Oglej variante →'}
                      countLabel={group.slug === 'dodatna' ? `${group.count} kategorije` : `${group.count} variante`}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Nivo 2: Tipi znotraj izbrane skupine */}
          {selectedGroupSlug && (
            <>
              <button
                onClick={() => setSelectedGroupSlug(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-green-700 mb-6 transition-colors font-medium"
              >
                ← Nazaj na {category.name}
              </button>

              <h2 className="text-2xl font-bold text-zinc-800 mb-2">
                {GROUP_DISPLAY_NAMES[selectedGroupSlug] || selectedGroupSlug}
              </h2>
              <p className="text-zinc-500 mb-6">
                {selectedGroupSlug === 'dodatna' ? 'Izberite kategorijo za ogled artiklov:' : 'Izberite vrsto za ogled modelov:'}
              </p>

              {typesInSelectedGroup.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-500 text-lg">V tej skupini ni vrst.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {typesInSelectedGroup.map((type) => (
                    <TypeCard
                      key={type.id}
                      item={type}
                      onClick={() => navigateToType(type)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── STANDARDNI PRIKAZ (Kosilnice, Balirke...) ── */}
      {!isGroupedNav && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {types.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-lg">Vrste za to kategorijo še niso dodane.</p>
            </div>
          ) : (
            <>
              <p className="text-zinc-500 mb-6">Izberite vrsto za ogled modelov:</p>
              {filteredTypes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-500 text-lg">V tej skupini ni vrst.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredTypes.map((type) => (
                    <TypeCard
                      key={type.id}
                      item={type}
                      onClick={() => navigateToType(type)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
