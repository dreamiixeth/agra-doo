'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

/* ═══════════════════════════════════════════
   AGRA SMERNICE — Barvna paleta
   ═══════════════════════════════════════════
   60% bela (#F8F9FA)  — glavna površina
   25% zelena (#2C6E49) — hero, poudarki
   10% srebrna (#B8BFC6) — kartice, dividerji
    4% črna (#1A1A1A)   — tipografija
    1% rumena (#E0A800)  — CTA gumbi
   ═══════════════════════════════════════════ */

// ─── NAVBAR ─── Bela (header)
function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToKontakt = () => {
    const el = document.getElementById('kontakt')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { 
      name: 'DOMOV', 
      action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }) },
      active: true 
    },
    { 
      name: 'KATALOG', 
      action: () => router.push('/katalog'),
      active: false 
    },
    { 
      name: 'KONTAKT', 
      action: scrollToKontakt,
      active: false 
    },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F9FA] border-b border-[#DDE1E6] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-baseline gap-1.5"
          >
            <span className="text-[#1A1A1A] font-extrabold text-xl tracking-tight">AGRA</span>
            <span className="text-[#1A1A1A]/60 font-normal text-sm">d.o.o.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="relative text-[#1A1A1A] font-semibold text-[13px] tracking-wide px-4 py-2 hover:opacity-100 transition-opacity"
                style={{ opacity: link.active ? 1 : 0.55 }}
              >
                {link.name}
                {link.active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#E0A800] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:031574730"
              className="flex items-center gap-2 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-semibold text-xs tracking-wide px-6 py-2.5 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              031 574 730
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#1A1A1A]"
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#1A1A1A]/10">
            <div className="flex flex-col space-y-1 pt-4">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false) }} className="px-4 py-3 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded-lg font-semibold text-sm tracking-wide text-left transition-colors">DOMOV</button>
              <button onClick={() => { router.push('/katalog'); setMobileMenuOpen(false) }} className="px-4 py-3 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded-lg font-semibold text-sm tracking-wide text-left transition-colors">KATALOG</button>
              <button onClick={() => { scrollToKontakt(); setMobileMenuOpen(false) }} className="px-4 py-3 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded-lg font-semibold text-sm tracking-wide text-left transition-colors">KONTAKT</button>
              <a href="tel:031574730" className="mx-4 mt-3 flex items-center justify-center gap-2 bg-[#E0A800] text-[#1A1A1A] font-semibold px-6 py-3 rounded-lg text-sm">📞 031 574 730</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── HERO ─── 25% zelena z gradient overlay
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://press.lectura.de/media-storage/press_releases/steyr_ctis_6300_terrus_cvt_2(6f8).jpg"
          alt="AGRA traktor"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {/* Subtilen gradient: zelena → svetlejša zelena */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C6E49]/95 via-[#3E8F6A]/80 to-[#2C6E49]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C6E49]/50 via-transparent to-[#2C6E49]/20" />
      </div>

      {/* Content — več praznega prostora */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-32 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight">
            Kmetijska
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight italic mt-1 mb-10">
            mehanizacija
          </h1>

          <p className="text-white/70 text-base sm:text-lg tracking-wider mb-14">
            Steyr&nbsp; •&nbsp; Pöttinger&nbsp; •&nbsp; Fliegl&nbsp; •&nbsp; Quicke&nbsp; •&nbsp; Trioliet
          </p>

          {/* CTA — 1% rumena */}
          <Link
            href="/katalog"
            className="group inline-flex items-center gap-3 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-semibold text-base px-8 py-4 rounded-lg tracking-wide shadow-lg transition-all hover:scale-[1.02]"
          >
            ODPRI KATALOG
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F9FA] to-transparent" />
    </section>
  )
}

// ─── FEATURES ─── Bela kartica z srebrnimi dividerji
function FeaturesBar() {
  const features = [
    { icon: '✓', title: 'KVALITETA', desc: 'Preverjeni stroji' },
    { icon: '🔧', title: 'SERVIS', desc: 'Podpora & deli' },
    { icon: '🛡️', title: 'ZANESLJIVOST', desc: '25+ let izkušenj' },
    { icon: '🚚', title: 'HITRA DOSTAVA', desc: 'Po dogovoru' },
  ]

  return (
    <section className="py-10 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-white rounded-2xl border-2 border-[#1A1A1A] overflow-hidden grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1A1A1A] shadow-sm">
          {features.map((feat) => (
            <div key={feat.title} className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#2C6E49]/8 border border-[#2C6E49]/15 flex items-center justify-center text-[#2C6E49] text-xl mb-3">
                {feat.icon}
              </div>
              <h4 className="text-[#2C6E49] font-bold text-xs tracking-[1.5px] mb-1">{feat.title}</h4>
              <p className="text-[#B8BFC6] text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ZNAMKE ─── 60% bela površina
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
            ZASTOPAMO PRIZNANE ZNAMKE
          </h2>
          <p className="text-[#B8BFC6] max-w-2xl mx-auto">
            Sodelujemo z vodilnimi svetovnimi proizvajalci kmetijske mehanizacije
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href="/katalog"
              className="group bg-white hover:bg-[#2C6E49] rounded-2xl p-6 flex flex-col items-center justify-center h-28 border-2 border-[#B8BFC6]/30 hover:border-[#2C6E49] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="text-lg font-bold text-[#1A1A1A] group-hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="text-xs font-semibold text-[#2C6E49] group-hover:text-white/70 mt-1 transition-colors">
                {brand.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── O NAS ─── 60% bela
function AboutSection() {
  const features = [
    { title: 'Družinsko podjetje', description: 'Z dolgoletno tradicijo in osebnim pristopom do vsake stranke.' },
    { title: 'Nova & rabljena tehnika', description: 'Široka ponudba kvalitetne kmetijske mehanizacije.' },
    { title: 'Strokovno svetovanje', description: 'Pomagamo vam izbrati pravo opremo za vaše potrebe.' },
    { title: 'Servis & podpora', description: 'Dolgoročno partnerstvo in tehnična podpora.' },
  ]

  return (
    <section id="o-nas" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C6E49] via-[#2C6E49] to-[#3E8F6A]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C4532]/40 via-transparent to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[#E0A800] font-semibold text-xs uppercase tracking-[3px]">O podjetju</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-6 tracking-tight">
              SMO DRUŽINSKO PODJETJE Z DOLGOLETNO TRADICIJO
            </h2>
            <p className="text-white/65 mb-12 leading-relaxed text-lg">
              Nudimo prodajo nove in rabljene kmetijske mehanizacije ter strokovno
              svetovanje pri nakupu. Naša prioriteta je zadovoljstvo strank in
              dolgoročno partnerstvo.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <div key={feature.title} className="flex items-start gap-4 bg-white/8 rounded-xl p-4 border-2 border-[#E0A800]/40 hover:border-[#E0A800] transition-all">
                  <div className="w-10 h-10 bg-[#E0A800] rounded-xl flex items-center justify-center text-[#1A1A1A] font-bold text-sm flex-shrink-0">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-white uppercase text-sm tracking-wide">{feature.title}</h3>
                    <p className="text-sm text-white/55 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-14 border-2 border-[#E0A800] text-center shadow-xl">
              <div className="text-7xl md:text-8xl font-extrabold text-[#E0A800] mb-2">25+</div>
              <p className="text-xl text-white font-semibold">LET IZKUŠENJ</p>
              <p className="text-white/50 mt-2">na trgu kmetijske mehanizacije</p>

              <div className="mt-12 pt-8 border-t border-white/15">
                <Link
                  href="/katalog"
                  className="inline-flex items-center gap-2 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-semibold px-6 py-3 rounded-lg transition-all hover:scale-[1.02]"
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

// ─── KONTAKT ─── 4% črna
function ContactSection() {
  const contactInfo = [
    { label: 'Naslov', value: 'Ljubljanska cesta 86, Slovenska Bistrica', href: 'https://maps.google.com/?q=Ljubljanska+cesta+86,+Slovenska+Bistrica' },
    { label: 'Telefon', value: '031 574 730', href: 'tel:031574730' },
    { label: 'E-pošta', value: 'agra.slavko@gmail.com', href: 'mailto:agra.slavko@gmail.com' },
    { label: 'Delovni čas', value: 'Pon - Pet: 08:00 - 16:00', href: null },
  ]

  return (
    <section id="kontakt" className="py-28 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-[#2C6E49] font-semibold text-xs uppercase tracking-[3px]">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mt-3 mb-4 tracking-tight">KONTAKTIRAJTE NAS</h2>
          <p className="text-[#B8BFC6] max-w-2xl mx-auto">
            Z veseljem vam svetujemo pri izbiri prave kmetijske mehanizacije
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="group bg-white rounded-2xl p-6 border-2 border-[#1C5C35]/40 hover:border-[#1C5C35] flex items-center justify-between transition-all shadow-sm hover:shadow-md"
              >
                <div>
                  <p className="text-xs text-[#B8BFC6] uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-lg font-medium text-[#1A1A1A] hover:text-[#2C6E49] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-[#1A1A1A]">{item.value}</p>
                  )}
                </div>
                {item.href && (
                  <span className="text-[#1C5C35]/40 group-hover:text-[#1C5C35] transition-colors text-lg">→</span>
                )}
              </div>
            ))}

            {/* Edini CTA tukaj — redek */}
            <a
              href="tel:031574730"
              className="flex items-center justify-center gap-2 bg-[#E0A800] hover:bg-[#c99700] text-[#1A1A1A] font-semibold px-8 py-4 rounded-lg text-lg transition-all w-full mt-6"
            >
              Pokličite zdaj
            </a>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#1C5C35]/40 overflow-hidden h-[400px] lg:h-auto shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.894903390856!2d15.560700000000002!3d46.3936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f6b8d7a0a5e2d%3A0x8a0a5e2d7a0a5e2d!2sLjubljanska%20cesta%2086%2C%202310%20Slovenska%20Bistrica!5e0!3m2!1ssl!2ssi!4v1234567890"
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

// ─── FOOTER ─── Temno zelena
function Footer() {
  return (
    <footer className="bg-[#1C4532]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-white font-extrabold text-xl">AGRA</span>
              <span className="text-white/50 text-sm">d.o.o.</span>
            </div>
            <p className="text-white/40 text-sm">Slovenska Bistrica</p>
          </div>

          <div className="flex flex-wrap gap-8">
            <a href="mailto:agra.slavko@gmail.com" className="flex items-center gap-2 text-white/70 font-medium text-sm hover:text-white transition-colors">
              ✉ agra.slavko@gmail.com
            </a>
            <a href="tel:031574730" className="flex items-center gap-2 text-white/70 font-medium text-sm hover:text-white transition-colors">
              📞 031 574 730
            </a>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-white/40 text-sm">
            © {new Date().getFullYear()} AGRA d.o.o. — Slovenska Bistrica
          </span>
          <div className="flex gap-1">
            <div className="w-5 h-1 rounded-full bg-white/30" />
            <div className="w-5 h-1 rounded-full bg-[#3E8F6A]" />
            <div className="w-5 h-1 rounded-full bg-[#E0A800]" />
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN PAGE ───
export default function LandingPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const scrollTo = params.get('scrollTo')
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
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
