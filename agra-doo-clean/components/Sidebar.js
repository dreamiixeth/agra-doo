'use client'

import { useState, useEffect } from 'react'

export default function Sidebar({ 
  categories, 
  selectedCategory, 
  navigateToCategory,
  sidebarOpen,
  setSidebarOpen 
}) {
  const brands = [
    { name: 'Steyr', displayName: 'Steyr' },
    { name: 'Pöttinger', displayName: 'Pöttinger' },
    { name: 'Quicke', displayName: 'Quicke' },
    { name: 'Trioliet', displayName: 'Trioliet' },
    { name: 'Fliegl', displayName: 'Fliegl' },
    { name: 'Vesta', displayName: 'Vesta' },
  ]

  // Ti slugi so "Dodatna oprema" podkategorije — za active state na "Dodatna oprema" linku
  const QUICKE_DODATNA_SLUGS = ['quicke-zlice', 'quicke-gnoj-silaza', 'quicke-oprema-za-bale', 'quicke-dodatna-oprema']

  const [openBrands, setOpenBrands] = useState({
    'Steyr': false,
    'Pöttinger': false,
    'Quicke': false,
    'Trioliet': false,
    'Fliegl': false,
    'Vesta': false,
  })

  useEffect(() => {
    if (selectedCategory?.brand_name) {
      setOpenBrands(prev => ({ ...prev, [selectedCategory.brand_name]: true }))
    }
  }, [selectedCategory])

  const toggleBrand = (brandName) => {
    setOpenBrands(prev => ({ ...prev, [brandName]: !prev[brandName] }))
  }

  const categoriesByBrand = brands.reduce((acc, brand) => {
    acc[brand.name] = categories.filter(cat => cat.brand_name === brand.name)
    return acc
  }, {})

  const handleClick = (category) => {
    navigateToCategory(category)
    if (window.innerWidth < 1024) setSidebarOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-4 left-4 z-40 lg:hidden bg-[#2C6E49] text-white p-3 rounded-full shadow-lg hover:bg-green-500 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <aside className={`
        fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r-2 border-[#1C4532] z-40
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex-1 overflow-y-auto p-4 pb-0">
          <h2 className="text-sm font-semibold text-[#1A1A1A]/50 uppercase tracking-wider mb-4">Katalog</h2>

          <nav className="space-y-2 pb-4">
            {brands.map((brand) => {
              const allCats = categoriesByBrand[brand.name] || []
              if (allCats.length === 0) return null

              const isQuicke = brand.name === 'Quicke'
              const isOpen = openBrands[brand.name]
              const hasSelected = allCats.some(c => c.id === selectedCategory?.id)

              // Za Quicke: prikaži samo Nakladalci + Dodatna oprema (2 linka)
              let displayCats
              if (isQuicke) {
                const nakladalci = allCats.find(c => c.slug?.includes('nakladalci'))
                const dodatna = allCats.find(c => c.slug === 'quicke-dodatna-oprema')
                displayCats = [nakladalci, dodatna].filter(Boolean)
              } else {
                displayCats = allCats
              }

              return (
                <div key={brand.name} className="border-b border-[#1C4532]/10 pb-2">
                  <button
                    onClick={() => toggleBrand(brand.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 text-left
                      ${hasSelected ? 'bg-[#2C6E49]/10 text-[#2C6E49]' : 'text-[#1A1A1A] hover:bg-[#DDE1E6]'}`}
                  >
                    <span className="font-semibold text-sm uppercase tracking-wide">{brand.displayName}</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-2 space-y-0.5">
                      {displayCats.map((cat) => {
                        // Dodatna oprema je aktivna tudi ko je prikazana podkategorija
                        const isActive = isQuicke && cat.slug === 'quicke-dodatna-oprema'
                          ? QUICKE_DODATNA_SLUGS.includes(selectedCategory?.slug)
                          : selectedCategory?.id === cat.id

                        return (
                          <button
                            key={cat.id}
                            onClick={() => handleClick(cat)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
                              transition-all duration-200 text-sm
                              ${isActive
                                ? 'bg-[#2C6E49] text-white shadow-md'
                                : 'text-[#1A1A1A]/70 hover:bg-[#DDE1E6]'}`}
                          >
                            <span className="text-base">{cat.icon}</span>
                            <span className="font-medium truncate">{cat.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>
        </div>

        <div className="flex-shrink-0 p-4 border-t-2 border-[#1C4532]/20 bg-white">
          <div className="text-sm">
            <p className="font-semibold text-[#1A1A1A]">AGRA <span className="text-[#1A1A1A]/50 font-normal">d.o.o.</span></p>
            <p className="text-[#1A1A1A]/40 text-xs mt-0.5">Slovenska Bistrica</p>
          </div>
        </div>
      </aside>
    </>
  )
}
