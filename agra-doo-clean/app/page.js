'use client'

import Link from 'next/link'
import { useState } from 'react'

// Navbar komponenta - ZELENA
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Domov', href: '/' },
    { name: 'Katalog', href: '/katalog' },
    { name: 'O nas', href: '#o-nas' },
    { name: 'Kontakt', href: '#kontakt' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e3a1e]/95 backdrop-blur-md border-b border-[#2d4a2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#e6b800] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-[#1a1a1a] font-bold text-lg">A</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">AGRA d.o.o.</span>
              <p className="text-xs text-[#8fac8f]">Kmetijska mehanizacija</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#c5d9c5] hover:text-white px-4 py-2 rounded-lg hover:bg-[#2d4a2d] font-medium transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:031574730"
              className="flex items-center gap-2 bg-[#e6b800] hover:bg-[#f5c800] text-[#1a1a1a] font-semibold px-6 py-2.5 rounded-full transition-all shadow-lg"
            >
              031 574 730
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#2d4a2d] text-white transition-colors"
          >
            {mobileMenuOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <div className="space-y-1.5">
                <div className="w-5 h-0.5 bg-white"></div>
                <div className="w-5 h-0.5 bg-white"></div>
                <div className="w-5 h-0.5 bg-white"></div>
              </div>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#2d4a2d]">
            <div className="flex flex-col space-y-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-[#c5d9c5] hover:bg-[#2d4a2d] hover:text-white rounded-lg font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:031574730"
                className="mx-4 mt-3 flex items-center justify-center gap-2 bg-[#e6b800] text-[#1a1a1a] font-semibold px-6 py-3 rounded-full"
              >
                031 574 730
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero sekcija - ZELENO OZADJE
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a1e] via-[#2d5a2d] to-[#1e3a1e]">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#e6b800]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#4a7c4a]/30 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-[#1a1a1a]/30 backdrop-blur-sm rounded-full border border-white/10">
          <span className="w-2 h-2 bg-[#e6b800] rounded-full animate-pulse"></span>
          <span className="text-white/80 text-sm font-medium">Vaš zanesljiv partner od leta 1998</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
          Zanesljiv partner za
          <br />
          <span className="text-[#e6b800]">kmetijsko mehanizacijo</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          Prodaja, odkup in strokovno svetovanje za vrhunsko kmetijsko tehniko.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/katalog"
            className="group flex items-center gap-3 bg-[#e6b800] hover:bg-[#f5c800] text-[#1a1a1a] font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl shadow-black/20 hover:shadow-black/30 hover:scale-[1.02]"
          >
            Preveri ponudbo
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          
          <a
            href="#kontakt"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all"
          >
            Kontaktiraj nas
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
        <span className="text-white/50 text-sm block mb-3">Več informacij</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto">
          <div className="w-1 h-2.5 bg-[#e6b800] rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

// Znamke sekcija - SVETLA
function BrandsSection() {
  const brands = [
    { name: 'Steyr', desc: 'Traktorji' },
    { name: 'Pöttinger', desc: 'Travniška tehnika' },
    { name: 'Quicke', desc: 'Nakladalci' },
    { name: 'Trioliet', desc: 'Krmilna tehnika' },
    { name: 'Fliegl', desc: 'Prikolice' },
    { name: 'Vesta', desc: 'Avto prikolice' },
  ]

  return (
    <section className="py-24 bg-[#f5f0e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Zastopamo in prodajamo priznane znamke
          </h2>
          <p className="text-[#666] max-w-2xl mx-auto">
            Sodelujemo z vodilnimi svetovnimi proizvajalci kmetijske mehanizacije
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href="/katalog"
              className="group bg-white hover:bg-[#1e3a1e] rounded-2xl p-6 flex flex-col items-center justify-center h-32 border-2 border-[#e0d9c8] hover:border-[#1e3a1e] transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <span className="text-xl font-bold text-[#1a1a1a] group-hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="text-xs text-[#888] group-hover:text-white/70 mt-1 transition-colors">{brand.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// O nas sekcija - SVETLA
function AboutSection() {
  const features = [
    {
      title: 'Družinsko podjetje',
      description: 'Z dolgoletno tradicijo in osebnim pristopom do vsake stranke.',
    },
    {
      title: 'Nova & rabljena tehnika',
      description: 'Široka ponudba kvalitetne kmetijske mehanizacije.',
    },
    {
      title: 'Strokovno svetovanje',
      description: 'Pomagamo vam izbrati pravo opremo za vaše potrebe.',
    },
    {
      title: 'Servis & podpora',
      description: 'Dolgoročno partnerstvo in tehnična podpora.',
    },
  ]

  return (
    <section id="o-nas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-[#1e3a1e] font-semibold text-sm uppercase tracking-wider">O podjetju</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-3 mb-6">
              Smo družinsko podjetje z dolgoletno tradicijo
            </h2>
            <p className="text-[#666] mb-10 leading-relaxed text-lg">
              Nudimo prodajo nove in rabljene kmetijske mehanizacije ter strokovno 
              svetovanje pri nakupu. Naša prioriteta je zadovoljstvo strank in 
              dolgoročno partnerstvo.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1e3a1e] rounded-xl flex items-center justify-center text-[#e6b800] font-bold text-sm flex-shrink-0">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a]">{feature.title}</h3>
                    <p className="text-sm text-[#888] mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl p-12 border-2 border-[#1e3a1e] text-center relative overflow-hidden shadow-xl">
              <div className="relative">
                <div className="text-7xl md:text-8xl font-bold text-[#e6b800] mb-2">
                  25+
                </div>
                <p className="text-xl text-[#1a1a1a] font-medium">Let izkušenj</p>
                <p className="text-[#888] mt-2">na trgu kmetijske mehanizacije</p>
                
                <div className="mt-10 pt-8 border-t border-[#eee]">
                  <Link 
                    href="/katalog"
                    className="inline-flex items-center gap-2 bg-[#1e3a1e] hover:bg-[#2d5a2d] text-white font-semibold px-6 py-3 rounded-full transition-all"
                  >
                    Oglej si ponudbo
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Kontakt sekcija - TEMNO SIVA
function ContactSection() {
  const contactInfo = [
    {
      label: 'Naslov',
      value: 'Ljubljanska cesta 86, Slovenska Bistrica',
      href: 'https://maps.google.com/?q=Ljubljanska+cesta+86,+Slovenska+Bistrica',
    },
    {
      label: 'Telefon',
      value: '031 574 730',
      href: 'tel:031574730',
    },
    {
      label: 'E-pošta',
      value: 'agra.slavko@gmail.com',
      href: 'mailto:agra.slavko@gmail.com',
    },
    {
      label: 'Delovni čas',
      value: 'Pon - Pet: 08:00 - 16:00',
      href: null,
    },
  ]

  return (
    <section id="kontakt" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#e6b800] font-semibold text-sm uppercase tracking-wider">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Kontaktirajte nas
          </h2>
          <p className="text-[#888] max-w-2xl mx-auto">
            Z veseljem vam svetujemo pri izbiri prave kmetijske mehanizacije
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="group bg-[#252525] rounded-2xl p-5 border border-[#333] hover:border-[#1e3a1e] flex items-center justify-between transition-all"
              >
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a 
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-lg font-medium text-white hover:text-[#e6b800] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-white">{item.value}</p>
                  )}
                </div>
                {item.href && (
                  <span className="text-[#555] group-hover:text-[#e6b800] transition-colors text-lg">→</span>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <a
              href="tel:031574730"
              className="flex items-center justify-center gap-2 bg-[#e6b800] hover:bg-[#f5c800] text-[#1a1a1a] font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg w-full mt-6"
            >
              Pokličite zdaj
            </a>
          </div>

          {/* Map */}
          <div className="bg-[#252525] rounded-2xl border border-[#333] overflow-hidden h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.894903390856!2d15.560700000000002!3d46.3936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f6b8d7a0a5e2d%3A0x8a0a5e2d7a0a5e2d!2sLjubljanska%20cesta%2086%2C%202310%20Slovenska%20Bistrica!5e0!3m2!1ssl!2ssi!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', filter: 'grayscale(1) invert(0.92) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer - ZELENA
function Footer() {
  return (
    <footer className="bg-[#1e3a1e] border-t border-[#2d4a2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e6b800] rounded-xl flex items-center justify-center">
              <span className="text-[#1a1a1a] font-bold">A</span>
            </div>
            <div>
              <span className="text-white font-bold">AGRA d.o.o.</span>
              <p className="text-xs text-[#8fac8f]">Ljubljanska cesta 86, Slovenska Bistrica</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <Link href="/katalog" className="text-[#8fac8f] hover:text-white transition-colors text-sm">
              Katalog
            </Link>
            <a href="#o-nas" className="text-[#8fac8f] hover:text-white transition-colors text-sm">
              O nas
            </a>
            <a href="#kontakt" className="text-[#8fac8f] hover:text-white transition-colors text-sm">
              Kontakt
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[#5a7a5a] text-sm">
            © {new Date().getFullYear()} AGRA d.o.o.
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Landing Page
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BrandsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
