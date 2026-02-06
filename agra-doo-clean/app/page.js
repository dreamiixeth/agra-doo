'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, MapPin, Mail, Clock, ChevronDown, ArrowRight, Users, Wrench, Award, Handshake } from 'lucide-react'

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/agra-logo.png" 
              alt="AGRA d.o.o." 
              className="h-14 w-auto"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="hidden items-center gap-2">
              <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-green-700 font-bold text-xl">AGRA d.o.o.</span>
                <p className="text-xs text-gray-500">Kmetijska mehanizacija</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-700 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:031574730"
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              <Phone className="w-5 h-5" />
              031 574 730
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:031574730"
                className="mx-4 mt-2 flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full"
              >
                <Phone className="w-5 h-5" />
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-traktor.jpg')`,
          backgroundColor: '#1a3d1a',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Zanesljiv partner za{' '}
          <span className="text-yellow-400">kmetijsko mehanizacijo</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Prodaja, odkup in svetovanje za vrhunsko kmetijsko tehniko.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/katalog"
            className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Preveri ponudbo
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Link>
          
          <a
            href="#kontakt"
            className="flex items-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold px-8 py-4 rounded-full text-lg transition-all"
          >
            Kontaktiraj nas
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="text-white/60 text-sm block mb-2">Več informacij</span>
        <ChevronDown className="w-6 h-6 text-white/60 mx-auto" />
      </div>
    </section>
  )
}

// Znamke sekcija
function BrandsSection() {
  const brands = [
    { name: 'Steyr', logo: null },
    { name: 'Pöttinger', logo: null },
    { name: 'Quicke', logo: null },
    { name: 'Trioliet', logo: null },
    { name: 'Fliegl', logo: null },
    { name: 'Vesta', logo: null },
  ]

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Zastopamo in prodajamo priznane znamke
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sodelujemo z vodilnimi proizvajalci kmetijske mehanizacije
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href="/katalog"
              className="group bg-white rounded-2xl p-6 flex items-center justify-center h-28 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-600"
            >
              <span className="text-xl font-bold text-gray-700 group-hover:text-green-700 transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// O nas sekcija
function AboutSection() {
  const features = [
    {
      icon: Users,
      title: 'Družinsko podjetje',
      description: 'Z dolgoletno tradicijo in osebnim pristopom',
    },
    {
      icon: Wrench,
      title: 'Nova & rabljena tehnika',
      description: 'Široka ponudba kmetijske mehanizacije',
    },
    {
      icon: Award,
      title: 'Strokovno svetovanje',
      description: 'Pomagamo vam najti pravo rešitev',
    },
    {
      icon: Handshake,
      title: 'Zanesljivost',
      description: 'Kvaliteta in zaupanje naših strank',
    },
  ]

  return (
    <section id="o-nas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <p className="text-green-700 font-semibold mb-2 uppercase tracking-wide">O podjetju</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Smo družinsko podjetje z dolgoletno tradicijo
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nudimo prodajo nove in rabljene kmetijske mehanizacije ter strokovno svetovanje pri nakupu. 
              Naša prioriteta je zadovoljstvo strank in dolgoročno partnerstvo.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-green-600 p-12 text-center">
              <div className="text-7xl md:text-8xl font-bold text-yellow-500 mb-4">
                25+
              </div>
              <p className="text-xl text-gray-700 font-medium">Let izkušenj</p>
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
      icon: MapPin,
      label: 'Naslov',
      value: 'Ljubljanska cesta 86, Slovenska Bistrica',
      href: 'https://maps.google.com/?q=Ljubljanska+cesta+86,+Slovenska+Bistrica',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '031 574 730',
      href: 'tel:031574730',
    },
    {
      icon: Mail,
      label: 'E-pošta',
      value: 'agra.slavko@gmail.com',
      href: 'mailto:agra.slavko@gmail.com',
    },
    {
      icon: Clock,
      label: 'Delovni čas',
      value: 'Pon - Pet: 08:00 - 16:00',
      href: null,
    },
  ]

  return (
    <section id="kontakt" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kontaktirajte nas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Z veseljem vam svetujemo pri izbiri prave kmetijske mehanizacije
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-7 h-7 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  {item.href ? (
                    <a 
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-lg font-semibold text-gray-900 hover:text-green-700 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <a
              href="tel:031574730"
              className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl w-full"
            >
              <Phone className="w-5 h-5" />
              Pokličite zdaj
            </a>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.8949033908564!2d15.5607!3d46.3936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f6b8d7a0a5e2d%3A0x8a0a5e2d7a0a5e2d!2sLjubljanska%20cesta%2086%2C%202310%20Slovenska%20Bistrica!5e0!3m2!1ssl!2ssi!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">AGRA d.o.o.</h3>
            <p className="text-gray-400">Kmetijska mehanizacija</p>
            <p className="text-gray-400">Ljubljanska cesta 86, Slovenska Bistrica</p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <Link href="/katalog" className="text-gray-400 hover:text-white transition-colors">
              Katalog
            </Link>
            <a href="#o-nas" className="text-gray-400 hover:text-white transition-colors">
              O nas
            </a>
            <a href="#kontakt" className="text-gray-400 hover:text-white transition-colors">
              Kontakt
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AGRA d.o.o. Vse pravice pridržane.
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
