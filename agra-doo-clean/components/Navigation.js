'use client'

import { useState } from 'react'

export default function Navigation({ 
  currentView, 
  navigateHome, 
  navigateBack,
  selectedCategory,
  selectedType,
  setCurrentView 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Breadcrumb
  const getBreadcrumb = () => {
    const crumbs = [{ label: 'Domov', action: navigateHome }]
    
    if (selectedCategory) {
      crumbs.push({ 
        label: selectedCategory.name, 
        action: () => {
          setCurrentView('category')
        }
      })
    }
    
    if (selectedType) {
      crumbs.push({ 
        label: selectedType.name, 
        action: () => {
          setCurrentView('type')
        }
      })
    }
    
    return crumbs
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={navigateHome}
          >
            <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-green-700">AGRA d.o.o.</h1>
              <p className="text-xs text-zinc-500">Kmetijska mehanizacija</p>
            </div>
          </div>

          {/* Breadcrumb - desktop */}
          {currentView !== 'home' && (
            <div className="hidden md:flex items-center gap-2 text-sm">
              {getBreadcrumb().map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-zinc-400">/</span>}
                  <button
                    onClick={crumb.action}
                    className={`hover:text-green-700 transition-colors ${
                      index === getBreadcrumb().length - 1 
                        ? 'text-green-700 font-medium' 
                        : 'text-zinc-600'
                    }`}
                  >
                    {crumb.label}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Back button - mobile */}
            {currentView !== 'home' && (
              <button
                onClick={navigateBack}
                className="md:hidden p-2 text-zinc-600 hover:text-green-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Contact info - desktop */}
            <a 
              href="tel:031574730" 
              className="hidden lg:flex items-center gap-2 text-green-700 hover:text-green-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">031 574 730</span>
            </a>

            {/* Admin link */}
            <button
              onClick={() => setCurrentView('admin')}
              className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
              title="Admin"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
