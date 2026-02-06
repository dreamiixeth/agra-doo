'use client'

import { useState } from 'react'

export default function Sidebar({ 
  categories, 
  selectedCategory, 
  navigateToCategory,
  sidebarOpen,
  setSidebarOpen 
}) {
  // Grupiraj kategorije po znamkah
  const brands = [
    { name: 'Steyr', displayName: 'Steyr', logo: null },
    { name: 'Pöttinger', displayName: 'Pöttinger', logo: null },
    { name: 'Vesta', displayName: 'Vesta', logo: null }
  ]

  // Vse znamke so privzeto odprte
  const [openBrands, setOpenBrands] = useState({
    'Steyr': true,
    'Pöttinger': true,
    'Vesta': true
  })

  const toggleBrand = (brandName) => {
    setOpenBrands(prev => ({
      ...prev,
      [brandName]: !prev[brandName]
    }))
  }

  // Grupiraj kategorije po brand_name
  const categoriesByBrand = brands.reduce((acc, brand) => {
    acc[brand.name] = categories.filter(cat => cat.brand_name === brand.name)
    return acc
  }, {})

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
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 pb-0">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Katalog
          </h2>
          
          <nav className="space-y-2 pb-4">
            {brands.map((brand) => {
              const brandCategories = categoriesByBrand[brand.name] || []
              const isOpen = openBrands[brand.name]
              const hasSelectedCategory = brandCategories.some(cat => cat.id === selectedCategory?.id)
              
              if (brandCategories.length === 0) return null

              return (
                <div key={brand.name} className="border-b border-zinc-100 pb-2">
                  {/* Brand header - clickable */}
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

                  {/* Categories under brand - collapsible */}
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-[1000px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="pl-2 space-y-0.5">
                      {brandCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            navigateToCategory(category)
                            // Na mobilnih napravah zapri sidebar
                            if (window.innerWidth < 1024) {
                              setSidebarOpen(false)
                            }
                          }}
                          className={`
                            w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
                            transition-all duration-200 text-sm
                            ${selectedCategory?.id === category.id 
                              ? 'bg-green-700 text-white shadow-md' 
                              : 'text-zinc-600 hover:bg-zinc-100'
                            }
                          `}
                        >
                          <span className="text-base">{category.icon}</span>
                          <span className="font-medium truncate">{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>
        </div>

        {/* Contact info - fixed at bottom */}
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
