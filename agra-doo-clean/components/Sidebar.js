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

  // Quicke podkategorije ki se štejejo kot "Dodatna oprema" za active state
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
      setOpenBrands(prev => ({
        ...prev,
        [selectedCategory.brand_name]: true
      }))
    }
  }, [selectedCategory])

  const toggleBrand = (brandName) => {
    setOpenBrands(prev => ({
      ...prev,
      [brandName]: !prev[brandName]
    }))
  }

  const categoriesByBrand = brands.reduce((acc, brand) => {
    acc[brand.name] = categories.filter(cat => cat.brand_name === brand.name)
    return acc
  }, {})

  // Za Quicke prikaži samo: Nakladalci + Dodatna oprema
  const getQuickeSidebarCats = (brandCats) => {
    const nakladalci = brandCats.find(c => c.slug?.includes('nakladalci'))
    const dodatna = brandCats.find(c => c.slug === 'quicke-dodatna-oprema')
    return [nakladalci, dodatna].filter(Boolean)
  }

  const isQuickeDodatnaActive = QUICKE_DODATNA_SLUGS.includes(selectedCategory?.slug)

  const handleCategoryClick = (category) => {
    navigateToCategory(category)
    if (window.innerWidth < 1024) setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-4 left-4 z-40 lg:hidden bg-green-700 text-white p-3 rounded-full shadow-lg hover:bg-green-800 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg z-40
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex-1 overflow-y-auto p-4 pb-0">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Katalog
          </h2>

          <nav className="space-y-2 pb-4">
            {brands.map((brand) => {
              const allBrandCats = categoriesByBrand[brand.name] || []
              if (allBrandCats.length === 0) return null

              const isQuicke = brand.name === 'Quicke'
              const sidebarCats = isQuicke
                ? getQuickeSidebarCats(allBrandCats)
                : allBrandCats

              const isOpen = openBrands[brand.name]
              const hasSelectedCategory = isQuicke
                ? (allBrandCats.some(c => c.id === selectedCategory?.id) || isQuickeDodatnaActive)
                : allBrandCats.some(c => c.id === selectedCategory?.id)

              return (
                <div key={brand.name} className="border-b border-zinc-100 pb-2">
                  <button
                    onClick={() => toggleBrand(brand.name)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                      transition-all duration-200 text-left
                      ${hasSelectedCategory
                        ? 'bg-green-50 text-green-800'
                        : 'text-zinc-800 hover:bg-zinc-50'
                      }
                    `}
                  >
                    <span className="font-semibold text-sm uppercase tracking-wide">
                      {brand.displayName}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="pl-2 space-y-0.5">
                      {sidebarCats.map((category) => {
                        const isActive = isQuicke && category.slug === 'quicke-dodatna-oprema'
                          ? isQuickeDodatnaActive
                          : selectedCategory?.id === category.id

                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className={`
                              w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
                              transition-all duration-200 text-sm
                              ${isActive
                                ? 'bg-green-700 text-white shadow-md'
                                : 'text-zinc-600 hover:bg-zinc-100'
                              }
                            `}
                          >
                            <span className="text-base">{category.icon}</span>
                            <span className="font-medium truncate">{category.name}</span>
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

        {/* Contact info */}
        <div className="flex-shrink-0 p-4 border-t border-zinc-200 bg-zinc-50">
          <div className="text-sm text-zinc-600">
            <p className="font-medium text-zinc-800">AGRA d.o.o.</p>
            <p>Ljubljanska cesta 86</p>
            <p>Slovenska Bistrica</p>
            <a
              href="tel:031574730"
              className="text-green-700 font-medium hover:text-green-800 mt-2 block"
            >
              📞 031 574 730
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
