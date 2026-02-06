'use client'

import Link from 'next/link'
import { useState } from 'react'

// Navbar komponenta
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Domov', href: '/' },
    { name: 'Katalog', href: '/katalog' },
    { name: 'O nas', href: '#o-nas' },
    { name: 'Kontakt', href: '#kontakt' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">AGRA d.o.o.</span>
              <p className="text-xs text-[#888]">Kmetijska mehanizacija</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[#aaa] hover:text-white px-4 py-2 rounded-lg hover:bg-[#2a2a2a] font-medium transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:031574730"
              className="flex items-center gap-2 bg-[#e6b800] hover:bg-[#f5c800] text-[#1a1a1a] font-semibold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-yellow-500/20"
            >
              031 574 730
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#2a2a2a] text-white transition-colors"
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
          <div className="md:hidden pb-4 border-t border-[#2a2a2a]">
            <div className="flex flex-col space-y-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-[#ccc] hover:bg-[#2a2a2a] hover:text-white rounded-lg font-medium transition-colors"
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

// Hero sekcija
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#111]">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#e6b800]/10 rounded-full blur-[120px]" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-[#e6b800] to-green-600" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-[#1a1a1a] rounded-full border border-[#333]">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[#999] text-sm font-medium">Vaš zanesljiv partner od leta 1998</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
          Kmetijska
          <br />
          <span className="text-[#e6b800]">mehanizacija</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#888] mb-12 max-w-2xl mx-auto leading-relaxed">
          Prodaja, odkup in strokovno svetovanje za vrhunsko kmetijsko tehniko. 
          Zastopamo vodilne svetovne znamke.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/katalog"
            className="group flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg shadow-green-600/30 hover:shadow-green-500/40 hover:scale-[1.02]"
          >
            Odpri katalog
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          
          <a
            href="#kontakt"
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-[#444] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all"
          >
            Kontaktiraj nas
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-24 flex justify-center gap-16 md:gap-24">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#e6b800]">25+</div>
            <div className="text-sm text-[#666] mt-2">Let izkušenj</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#e6b800]">500+</div>
            <div className="text-sm text-[#666] mt-2">Izdelkov</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-[#444] rounded-full flex justify-center">
          <div className="w-1 h-2.5 bg-[#e6b800] rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

// Znamke sekcija
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
    <section className="py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Zastopamo priznane znamke
          </h2>
          <p className="text-[#777] max-w-2xl mx-auto">
            Sodelujemo z vodilnimi svetovnimi proizvajalci kmetijske mehanizacije
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href="/katalog"
              className="group bg-[#222] hover:bg-[#282828] rounded-2xl p-6 flex flex-col items-center justify-center h-32 border border-[#333] hover:border-green-600/50 transition-all duration-300"
            >
              <span className="text-xl font-bold text-white group-hover:text-green-500 transition-colors">
                {brand.name}
              </span>
              <span className="text-xs text-[#666] mt-1">{brand.desc}</span>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-[#e6b800] hover:text-[#f5c800] font-semibold transition-colors"
          >
            Poglej celoten katalog
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// O nas sekcija
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
    <section id="o-nas" className="py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">O podjetju</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
              Družinsko podjetje z dolgoletno tradicijo
            </h2>
            <p className="text-[#888] mb-10 leading-relaxed text-lg">
              Že več kot 25 let nudimo prodajo nove in rabljene kmetijske mehanizacije 
              ter strokovno svetovanje pri nakupu. Naša prioriteta je zadovoljstvo 
              strank in dolgoročno partnerstvo.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center text-green-500 font-bold text-sm flex-shrink-0">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-[#666] mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#1a1a1a] rounded-3xl p-12 border border-[#2a2a2a] text-center relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#e6b800]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-600/20 rounded-full blur-3xl" />
              
              <div className="relative">
                <div className="text-7xl md:text-8xl font-bold text-[#e6b800] mb-2">
                  25+
                </div>
                <p className="text-xl text-white font-medium">Let izkušenj</p>
                <p className="text-[#666] mt-2">na trgu kmetijske mehanizacije</p>
                
                <div className="mt-10 pt-8 border-t border-[#2a2a2a]">
                  <Link 
                    href="/katalog"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-green-600/20"
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

// Kontakt sekcija
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
          <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Stopite v stik z nami
          </h2>
          <p className="text-[#777] max-w-2xl mx-auto">
            Z veseljem vam svetujemo pri izbiri prave kmetijske mehanizacije
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="group bg-[#222] rounded-2xl p-5 border border-[#333] hover:border-[#444] flex items-center justify-between transition-all"
              >
                <div>
                  <p className="text-xs text-[#666] uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a 
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-lg font-medium text-white hover:text-green-500 transition-colors"
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
              className="flex items-center justify-center gap-2 bg-[#e6b800] hover:bg-[#f5c800] text-[#1a1a1a] font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg shadow-yellow-500/20 w-full mt-6"
            >
              Pokličite zdaj
            </a>
          </div>

          {/* Map */}
          <div className="bg-[#222] rounded-2xl border border-[#333] overflow-hidden h-[400px] lg:h-auto">
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

// Footer
function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <span className="text-white font-bold">AGRA d.o.o.</span>
              <p className="text-xs text-[#666]">Ljubljanska cesta 86, Slovenska Bistrica</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <Link href="/katalog" className="text-[#777] hover:text-white transition-colors text-sm">
              Katalog
            </Link>
            <a href="#o-nas" className="text-[#777] hover:text-white transition-colors text-sm">
              O nas
            </a>
            <a href="#kontakt" className="text-[#777] hover:text-white transition-colors text-sm">
              Kontakt
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[#555] text-sm">
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
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <HeroSection />
      <BrandsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
