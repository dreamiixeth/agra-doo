'use client'

import Link from 'next/link'
import { useState } from 'react'

/* ═══════════════════════════════════════════
   BARVNA PALETA
   ═══════════════════════════════════════════
   Črna:    #0A0A0A   (tekst)
   Srebrna: #B0B7BE   (header, footer)
   Zelena:  #1B6B4A   (hero, kategorije)
   Rumena:  #FFD600   (CTA, akcenti)
   ═══════════════════════════════════════════ */

// ─── NAVBAR ─── Srebrna podlaga
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'DOMOV', href: '/', active: true },
    { name: 'KATALOG', href: '/katalog', active: false },
    { name: 'KONTAKT', href: '#kontakt', active: false },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#B0B7BE] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="text-[#0A0A0A] font-extrabold text-xl tracking-tight">AGRA</span>
            <span className="text-[#3A3A3A] font-normal text-sm">d.o.o.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[#0A0A0A] font-bold text-[13px] tracking-wide px-4 py-2 hover:opacity-100 transition-opacity"
                style={{ opacity: link.active ? 1 : 0.6 }}
              >
                {link.name}
                {link.active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#FFD600] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:031574730"
              className="flex items-center gap-2 bg-[#FFD600] hover:bg-[#E6C200] text-[#0A0A0A] font-bold text-xs tracking-wide px-5 py-2.5 rounded-lg shadow-md shadow-yellow-500/20 transition-all hover:scale-[1.02]"
            >
              031 574 730
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#0A0A0A]"
          >
            {mobileMenuOpen ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <div className="space-y-1.5">
                <div className="w-5 h-0.5 bg-[#0A0A0A]"></div>
                <div className="w-5 h-0.5 bg-[#0A0A0A]"></div>
                <div className="w-5 h-0.5 bg-[#0A0A0A]"></div>
              </div>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#9AA1A8]/50">
            <div className="flex flex-col space-y-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-[#0A0A0A] hover:bg-[#9AA1A8]/20 rounded-lg font-bold text-sm tracking-wide transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:031574730"
                className="mx-4 mt-3 flex items-center justify-center gap-2 bg-[#FFD600] text-[#0A0A0A] font-bold px-6 py-3 rounded-lg text-sm"
              >
                📞 031 574 730
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── HERO ─── Zeleni gradient z ozadjem
function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://press.lectura.de/media-storage/press_releases/steyr_ctis_6300_terrus_cvt_2(6f8).jpg"
          alt="AGRA traktor"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4A2E]/95 via-[#1B6B4A]/85 to-[#1B6B4A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F4A2E]/60 via-transparent to-[#0F4A2E]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 pt-28">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight">
            Kmetijska
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight italic mt-1 mb-8">
            mehanizacija
          </h1>

          <p className="text-white/70 text-base sm:text-lg tracking-wide mb-10">
            Steyr&nbsp; •&nbsp; Pöttinger&nbsp; •&nbsp; Fliegl&nbsp; •&nbsp; Quicke&nbsp; •&nbsp; Trioliet
          </p>

          <Link
            href="/katalog"
            className="group inline-flex items-center gap-3 bg-[#FFD600] hover:bg-[#E6C200] text-[#0A0A0A] font-extrabold text-base px-8 py-4 rounded-full tracking-wide shadow-xl shadow-black/20 transition-all hover:scale-[1.02]"
          >
            ODPRI KATALOG
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F6F7] to-transparent" />
    </section>
  )
}

// ─── ZNAMKE ─── Brand showcase
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
    <section className="py-20 bg-[#F5F6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mb-4">
            Zastopamo priznane znamke
          </h2>
          <p className="text-[#8A9199] max-w-2xl mx-auto">
            Sodelujemo z vodilnimi svetovnimi proizvajalci kmetijske mehanizacije
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href="/katalog"
              className="group bg-white hover:bg-[#1B6B4A] rounded-2xl p-6 flex flex-col items-center justify-center h-28 border border-[#E8EAED] hover:border-[#1B6B4A] transition-all duration-300 hover:shadow-lg"
            >
              <span className="text-lg font-bold text-[#0A0A0A] group-hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="text-xs text-[#8A9199] group-hover:text-white/70 mt-1 transition-colors">
                {brand.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURES BAR ───
function FeaturesBar() {
  const features = [
    { icon: '✓', title: 'KVALITETA', desc: 'Preverjeni stroji' },
    { icon: '🔧', title: 'SERVIS', desc: 'Podpora & deli' },
    { icon: '🛡️', title: 'ZANESLJIVOST', desc: '25+ let izkušenj' },
    { icon: '🚚', title: 'HITRA DOSTAVA', desc: 'Po dogovoru' },
  ]

  return (
    <section className="py-8 bg-[#F5F6F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E8EAED] overflow-hidden grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E8EAED]">
          {features.map((feat) => (
            <div key={feat.title} className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#1B6B4A]/10 border border-[#1B6B4A]/20 flex items-center justify-center text-[#1B6B4A] text-xl mb-3">
                {feat.icon}
              </div>
              <h4 className="text-[#0A0A0A] font-extrabold text-xs tracking-[1px] mb-1">{feat.title}</h4>
              <p className="text-[#8A9199] text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── O NAS ───
function AboutSection() {
  const features = [
    { title: 'Družinsko podjetje', description: 'Z dolgoletno tradicijo in osebnim pristopom do vsake stranke.' },
    { title: 'Nova & rabljena tehnika', description: 'Široka ponudba kvalitetne kmetijske mehanizacije.' },
    { title: 'Strokovno svetovanje', description: 'Pomagamo vam izbrati pravo opremo za vaše potrebe.' },
    { title: 'Servis & podpora', description: 'Dolgoročno partnerstvo in tehnična podpora.' },
  ]

  return (
    <section id="o-nas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#1B6B4A] font-bold text-xs uppercase tracking-[2px]">O podjetju</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] mt-3 mb-6">
              Smo družinsko podjetje z dolgoletno tradicijo
            </h2>
            <p className="text-[#8A9199] mb-10 leading-relaxed text-lg">
              Nudimo prodajo nove in rabljene kmetijske mehanizacije ter strokovno
              svetovanje pri nakupu. Naša prioriteta je zadovoljstvo strank in
              dolgoročno partnerstvo.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1B6B4A] rounded-xl flex items-center justify-center text-[#FFD600] font-bold text-sm flex-shrink-0">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A0A0A]">{feature.title}</h3>
                    <p className="text-sm text-[#8A9199] mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl p-12 border-2 border-[#1B6B4A] text-center shadow-xl">
              <div className="text-7xl md:text-8xl font-extrabold text-[#FFD600] mb-2">25+</div>
              <p className="text-xl text-[#0A0A0A] font-semibold">Let izkušenj</p>
              <p className="text-[#8A9199] mt-2">na trgu kmetijske mehanizacije</p>

              <div className="mt-10 pt-8 border-t border-[#E8EAED]">
                <Link
                  href="/katalog"
                  className="inline-flex items-center gap-2 bg-[#1B6B4A] hover:bg-[#145438] text-white font-bold px-6 py-3 rounded-full transition-all"
                >
                  Oglej si ponudbo <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── KONTAKT ───
function ContactSection() {
  const contactInfo = [
    { label: 'Naslov', value: 'Ljubljanska cesta 86, Slovenska Bistrica', href: 'https://maps.google.com/?q=Ljubljanska+cesta+86,+Slovenska+Bistrica' },
    { label: 'Telefon', value: '031 574 730', href: 'tel:031574730' },
    { label: 'E-pošta', value: 'agra.slavko@gmail.com', href: 'mailto:agra.slavko@gmail.com' },
    { label: 'Delovni čas', value: 'Pon - Pet: 08:00 - 16:00', href: null },
  ]

  return (
    <section id="kontakt" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#FFD600] font-bold text-xs uppercase tracking-[2px]">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">Kontaktirajte nas</h2>
          <p className="text-[#8A9199] max-w-2xl mx-auto">
            Z veseljem vam svetujemo pri izbiri prave kmetijske mehanizacije
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="group bg-[#151515] rounded-2xl p-5 border border-[#252525] hover:border-[#1B6B4A] flex items-center justify-between transition-all"
              >
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-lg font-medium text-white hover:text-[#FFD600] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-white">{item.value}</p>
                  )}
                </div>
                {item.href && (
                  <span className="text-[#555] group-hover:text-[#FFD600] transition-colors text-lg">→</span>
                )}
              </div>
            ))}

            <a
              href="tel:031574730"
              className="flex items-center justify-center gap-2 bg-[#FFD600] hover:bg-[#E6C200] text-[#0A0A0A] font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg w-full mt-6"
            >
              Pokličite zdaj
            </a>
          </div>

          <div className="bg-[#151515] rounded-2xl border border-[#252525] overflow-hidden h-[400px] lg:h-auto">
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

// ─── FOOTER ─── Srebrna podlaga
function Footer() {
  return (
    <footer className="bg-[#B0B7BE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[#0A0A0A] font-extrabold text-xl">AGRA</span>
              <span className="text-[#3A3A3A] text-sm">d.o.o.</span>
            </div>
            <p className="text-[#3A3A3A] text-sm">Slovenska Bistrica</p>
          </div>

          <div className="flex flex-wrap gap-8">
            <a href="mailto:agra.slavko@gmail.com" className="flex items-center gap-2 text-[#0A0A0A] font-semibold text-sm hover:opacity-70 transition-opacity">
              ✉ agra.slavko@gmail.com
            </a>
            <a href="tel:031574730" className="flex items-center gap-2 text-[#0A0A0A] font-semibold text-sm hover:opacity-70 transition-opacity">
              📞 031 574 730
            </a>
          </div>
        </div>

        <div className="h-px bg-[#8A9199]/30 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[#3A3A3A] text-sm">
            © {new Date().getFullYear()} AGRA d.o.o. — Slovenska Bistrica
          </span>
          <div className="flex gap-1">
            <div className="w-6 h-1 rounded-full bg-white" />
            <div className="w-6 h-1 rounded-full bg-[#1B6B4A]" />
            <div className="w-6 h-1 rounded-full bg-[#FFD600]" />
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN PAGE ───
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesBar />
      <BrandsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
