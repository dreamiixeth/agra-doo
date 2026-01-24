'use client'

import { useState } from 'react'

export default function ModelPage({ model, type, category, navigateBack }) {
  const [activeImage, setActiveImage] = useState(0)
  const [showInquiry, setShowInquiry] = useState(false)
  
  // Vse slike (glavna + galerija)
  const allImages = [
    model?.image_url,
    ...(model?.gallery || [])
  ].filter(Boolean)

  // Format cene
  const formatPrice = (price) => {
    if (!price) return null
    return new Intl.NumberFormat('sl-SI', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  if (!model) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <p className="text-zinc-500">Model ni najden.</p>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-12">
      {/* Header */}
      <div className="bg-zinc-800 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <button 
            onClick={navigateBack}
            className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nazaj na {type?.name || 'seznam'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leva stran - Slike + Opis */}
          <div>
            {/* Glavna slika */}
            <div className="aspect-[4/3] bg-zinc-100 rounded-xl overflow-hidden shadow-lg mb-4">
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
            
            {/* Galerija thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-4">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index 
                        ? 'border-green-700 shadow-md' 
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

            {/* Opis - pod sliko */}
            {model.description && (
              <div className="bg-white rounded-xl p-5 shadow-md">
                <h2 className="text-lg font-semibold text-zinc-800 mb-2">Opis</h2>
                <p className="text-zinc-600 leading-relaxed">{model.description}</p>
              </div>
            )}
          </div>

          {/* Desna stran - Specifikacije na vrhu */}
          <div>
            {/* Naslov in brand */}
            <div className="mb-4">
              <p className="text-sm text-zinc-500 uppercase tracking-wider">
                {category?.brand_name} • {type?.name}
              </p>
              <h1 className="text-3xl font-bold text-zinc-800 mt-1">
                {model.name}
              </h1>
            </div>

            {/* Cena - če obstaja */}
            {model.price_with_vat && (
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-4 mb-4 shadow-md">
                <p className="text-yellow-900 text-sm">Cena z DDV</p>
                <p className="text-3xl font-bold text-yellow-900">
                  {formatPrice(model.price_with_vat)}
                </p>
                {model.price && (
                  <p className="text-yellow-800 text-sm mt-1">
                    Brez DDV: {formatPrice(model.price)}
                  </p>
                )}
              </div>
            )}

            {/* Specifikacije - na vrhu desne strani */}
            {model.specifications && Object.keys(model.specifications).length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-zinc-800 mb-3">Specifikacije</h2>
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  {Object.entries(model.specifications).map(([key, value], index) => (
                    <div 
                      key={key}
                      className={`flex justify-between py-3 px-4 ${
                        index % 2 === 0 ? 'bg-zinc-50' : 'bg-white'
                      }`}
                    >
                      <span className="text-zinc-600">{key}</span>
                      <span className="font-medium text-zinc-800 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opcijska oprema */}
            {model.optional_equipment && model.optional_equipment.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-zinc-800 mb-3">Opcijska oprema</h2>
                <ul className="bg-white rounded-xl p-4 shadow-md space-y-2">
                  {model.optional_equipment.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-zinc-600">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Akcijski gumbi */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setShowInquiry(true)}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                📧 Povpraševanje
              </button>
              
              <a
                href="tel:031574730"
                className="flex-1 bg-zinc-800 hover:bg-zinc-900 text-white font-medium py-3 px-6 rounded-xl transition-colors text-center shadow-md hover:shadow-lg"
              >
                📞 Pokliči: 031 574 730
              </a>
              
              {model.pdf_url && (
                <a
                  href={model.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border-2 border-zinc-300 hover:border-zinc-400 text-zinc-700 font-medium py-3 px-6 rounded-xl transition-colors text-center"
                >
                  📄 PDF katalog
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Povpraševanje modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-zinc-800">Povpraševanje</h3>
              <button 
                onClick={() => setShowInquiry(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-zinc-600 mb-4">
              Za povpraševanje o izdelku <strong>{model.name}</strong> nas kontaktirajte:
            </p>
            
            <div className="space-y-3">
              <a
                href="tel:031574730"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-medium text-green-800">Telefon</p>
                  <p className="text-green-700">031 574 730</p>
                </div>
              </a>
              
              <a
                href={`mailto:agra.slavko@gmail.com?subject=Povpraševanje: ${model.name}&body=Pozdravljeni,%0A%0AZanima me izdelek: ${model.name}%0A%0A`}
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-medium text-blue-800">Email</p>
                  <p className="text-blue-700">agra.slavko@gmail.com</p>
                </div>
              </a>
            </div>
            
            <button
              onClick={() => setShowInquiry(false)}
              className="w-full mt-4 py-2 text-zinc-500 hover:text-zinc-700 transition-colors"
            >
              Zapri
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
