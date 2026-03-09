'use client'

import { useState } from 'react'

export default function ModelPage({ model, type, category, navigateBack }) {
  const [activeImage, setActiveImage] = useState(0)
  const [showInquiry, setShowInquiry] = useState(false)
  
  const showPrices = category?.has_prices === true
  
  const allImages = [
    model?.image_url,
    ...(model?.gallery || [])
  ].filter(Boolean)

  const formatPrice = (price) => {
    if (!price) return null
    return new Intl.NumberFormat('sl-SI', { style: 'currency', currency: 'EUR' }).format(price)
  }

  if (!model) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen bg-[#F8F9FA]">
        <p className="text-[#1A1A1A]/50">Model ni najden.</p>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-12 bg-[#F8F9FA] min-h-screen">

      {/* Header — temno zelena */}
      <div className="bg-[#1C4532] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={navigateBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nazaj na {type?.name || 'seznam'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Leva stran — slike + opis */}
          <div>
            <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-md mb-4 border-2 border-[#1C4532]/20">
              {allImages.length > 0 ? (
                <img 
                  src={allImages[activeImage]} 
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl opacity-20">{category?.icon || '🌿'}</span>
                </div>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-4">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index 
                        ? 'border-[#2C6E49] shadow-md' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${model.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {model.description && (
              <div className="bg-[#DDE1E6] rounded-xl p-5 shadow-sm border-2 border-[#1C4532]/20">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">Opis</h2>
                <p className="text-[#1A1A1A]/70 leading-relaxed">{model.description}</p>
              </div>
            )}
          </div>

          {/* Desna stran — specifikacije */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-[#1A1A1A]/50 uppercase tracking-wider">
                {category?.brand_name} • {type?.name}
              </p>
              <h1 className="text-3xl font-bold text-[#1A1A1A] mt-1">
                {model.name}
              </h1>
            </div>

            {showPrices && model.price_with_vat && (
              <div className="bg-gradient-to-r from-[#E0A800] to-[#c99700] rounded-xl p-4 mb-4 shadow-md">
                <p className="text-[#1A1A1A]/70 text-sm">Cena z DDV</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {formatPrice(model.price_with_vat)}
                </p>
                {model.price && (
                  <p className="text-[#1A1A1A]/70 text-sm mt-1">
                    Brez DDV: {formatPrice(model.price)}
                  </p>
                )}
              </div>
            )}

            {model.specifications && Object.keys(model.specifications).length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">Specifikacije</h2>
                <div className="bg-[#DDE1E6] rounded-xl overflow-hidden shadow-sm border-2 border-[#1C4532]/20">
                  {Object.entries(model.specifications).map(([key, value], index) => (
                    <div 
                      key={key}
                      className={`flex justify-between py-3 px-4 ${
                        index % 2 === 0 ? 'bg-white/60' : 'bg-[#DDE1E6]'
                      }`}
                    >
                      <span className="text-[#1A1A1A]/60">{key}</span>
                      <span className="font-medium text-[#1A1A1A] text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {model.optional_equipment && model.optional_equipment.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">Opcijska oprema</h2>
                <ul className="bg-[#DDE1E6] rounded-xl p-4 shadow-sm border-2 border-[#1C4532]/20 space-y-2">
                  {model.optional_equipment.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-[#1A1A1A]/70">
                      <svg className="w-5 h-5 text-[#2C6E49] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowInquiry(true)}
                className="flex-1 bg-[#2C6E49] hover:bg-[#3E8F6A] text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md"
              >
                📧 Povpraševanje
              </button>
              
              <a
                href="tel:031574730"
                className="flex-1 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-medium py-3 px-6 rounded-xl transition-colors text-center shadow-md"
              >
                📞 031 574 730
              </a>
              
              {model.pdf_url && (
                <a
                  href={model.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-[#1C4532]/30 hover:border-[#1C4532] text-[#1A1A1A] font-medium py-3 px-6 rounded-xl transition-colors text-center bg-white"
                >
                  📄 PDF katalog
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#DDE1E6] rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#1C4532]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#1A1A1A]">Povpraševanje</h3>
              <button 
                onClick={() => setShowInquiry(false)}
                className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-[#1A1A1A]/60 mb-4">
              Za povpraševanje o izdelku <strong className="text-[#1A1A1A]">{model.name}</strong> nas kontaktirajte:
            </p>
            
            <div className="space-y-3">
              <a
                href="tel:031574730"
                className="flex items-center gap-3 p-4 bg-[#2C6E49]/8 rounded-xl hover:bg-[#2C6E49]/15 transition-colors border border-[#2C6E49]/20"
              >
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-medium text-[#2C6E49]">Telefon</p>
                  <p className="text-[#1A1A1A]/70">031 574 730</p>
                </div>
              </a>
              
              <a
                href={`mailto:agra.slavko@gmail.com?subject=Povpraševanje: ${model.name}&body=Pozdravljeni,%0A%0AZanima me izdelek: ${model.name}%0A%0A`}
                className="flex items-center gap-3 p-4 bg-[#DDE1E6] rounded-xl hover:bg-[#B8BFC6]/50 transition-colors border border-[#B8BFC6]"
              >
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Email</p>
                  <p className="text-[#1A1A1A]/60">agra.slavko@gmail.com</p>
                </div>
              </a>
            </div>
            
            <button
              onClick={() => setShowInquiry(false)}
              className="w-full mt-4 py-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
            >
              Zapri
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
