'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navigation({ 
  currentView, 
  navigateHome, 
  navigateBack,
  selectedCategory,
  selectedType,
  setCurrentView 
}) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getBreadcrumb = () => {
    const crumbs = [{ label: 'Domov', action: navigateHome }]
    if (selectedCategory) {
      crumbs.push({ label: selectedCategory.name, action: () => setCurrentView('category') })
    }
    if (selectedType) {
      crumbs.push({ label: selectedType.name, action: () => setCurrentView('type') })
    }
    return crumbs
  }

  // Domov — naslovana stran, vrh
  const goHome = () => {
    router.push('/')
  }

  // Kontakt — naslovana stran, scrolla na #kontakt
  const goKontakt = () => {
    router.push('/?scrollTo=kontakt')
  }

  const isHome = currentView === 'home'

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F8F9FA] border-b border-[#DDE1E6] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div 
            className="flex items-baseline gap-1.5 cursor-pointer"
            onClick={goHome}
          >
            <span className="text-[#1A1A1A] font-extrabold text-xl tracking-tight">AGRA</span>
            <span className="text-[#1A1A1A]/60 font-normal text-sm">d.o.o.</span>
          </div>

          {/* Breadcrumb - desktop (podstrani kataloga) */}
          {!isHome && (
            <div className="hidden md:flex items-center gap-2 text-sm">
              {getBreadcrumb().map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span className="text-[#1A1A1A]/30">/</span>}
                  <button
                    onClick={crumb.action}
                    className={`transition-colors font-medium ${
                      index === getBreadcrumb().length - 1 
                        ? 'text-[#1A1A1A]' 
                        : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {crumb.label}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Desktop nav links (katalog home) */}
          {isHome && (
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: 'DOMOV',   action: goHome,     active: false },
                { label: 'KATALOG', action: navigateHome, active: true  },
                { label: 'KONTAKT', action: goKontakt,  active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="relative text-[#1A1A1A] font-semibold text-[13px] tracking-wide px-4 py-2 transition-opacity hover:opacity-100"
                  style={{ opacity: item.active ? 1 : 0.55 }}
                >
                  {item.label}
                  {item.active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#E0A800] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Zapri katalog — desktop, ko si na podstrani */}
            {!isHome && (
              <button
                onClick={navigateHome}
                className="hidden md:flex items-center gap-2 text-white font-semibold text-sm transition-colors bg-[#1C4532] hover:bg-[#2C6E49] px-3 py-1.5 rounded-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Nazaj
              </button>
            )}

            {/* Back button - mobile */}
            {!isHome && (
              <button
                onClick={navigateBack}
                className="md:hidden p-2 text-[#1A1A1A] hover:opacity-70 transition-opacity"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* CTA — rumena */}
            <a 
              href="tel:031574730" 
              className="hidden lg:flex items-center gap-2 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-semibold text-xs tracking-wide px-6 py-2.5 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              031 574 730
            </a>

            {/* Admin */}
            <button
              onClick={() => setCurrentView('admin')}
              className="p-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
              title="Admin"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1A1A]"
            >
              {mobileMenuOpen ? (
                <span className="text-xl font-bold">✕</span>
              ) : (
                <div className="space-y-1.5">
                  <div className="w-5 h-0.5 bg-[#1A1A1A]"></div>
                  <div className="w-5 h-0.5 bg-[#1A1A1A]"></div>
                  <div className="w-5 h-0.5 bg-[#1A1A1A]"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#1A1A1A]/10">
            <div className="flex flex-col space-y-1 pt-4">
              <button onClick={() => { goHome(); setMobileMenuOpen(false) }} className="px-4 py-3 text-[#1A1A1A] font-semibold text-sm tracking-wide text-left hover:bg-[#1A1A1A]/5 rounded-lg">DOMOV</button>
              <button onClick={() => { navigateHome(); setMobileMenuOpen(false) }} className="px-4 py-3 text-[#1A1A1A] font-semibold text-sm tracking-wide text-left hover:bg-[#1A1A1A]/5 rounded-lg">KATALOG</button>
              <button onClick={() => { goKontakt(); setMobileMenuOpen(false) }} className="px-4 py-3 text-[#1A1A1A] font-semibold text-sm tracking-wide text-left hover:bg-[#1A1A1A]/5 rounded-lg">KONTAKT</button>
              <a href="tel:031574730" className="mx-4 mt-3 flex items-center justify-center gap-2 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-semibold px-6 py-3 rounded-lg text-sm">📞 031 574 730</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
