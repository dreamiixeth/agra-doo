import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata = {
  title: 'AGRA d.o.o. | Kmetijska mehanizacija - Steyr, Pöttinger, Vesta',
  description: 'Prodaja kmetijske mehanizacije - Steyr traktorji, Pöttinger oprema za spravilo krme, Vesta avto prikolice. Slovenska Bistrica.',
  keywords: 'traktorji, Steyr, Pöttinger, Vesta, prikolice, kmetijska mehanizacija, Slovenska Bistrica, kosilnice, balirke',
  authors: [{ name: 'AGRA d.o.o.' }],
  openGraph: {
    title: 'AGRA d.o.o. | Kmetijska mehanizacija',
    description: 'Vaš zanesljiv partner za traktorje Steyr, opremo Pöttinger in prikolice Vesta.',
    type: 'website',
    locale: 'sl_SI',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="sl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
