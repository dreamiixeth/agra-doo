'use client'

export default function Sidebar({ 
  categories, 
  selectedCategory, 
  navigateToCategory,
  sidebarOpen,
  setSidebarOpen 
}) {
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
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
            Kategorije
          </h2>
          
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigateToCategory(category)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                  transition-all duration-200
                  ${selectedCategory?.id === category.id 
                    ? 'bg-green-700 text-white shadow-md' 
                    : 'text-zinc-700 hover:bg-zinc-100'
                  }
                `}
              >
                <span className="text-xl">{category.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{category.name}</p>
                  <p className={`text-xs truncate ${
                    selectedCategory?.id === category.id 
                      ? 'text-green-100' 
                      : 'text-zinc-400'
                  }`}>
                    {category.brand_name}
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Contact info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-200 bg-zinc-50">
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
