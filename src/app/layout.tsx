// app/layout.tsx


import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'glightbox/dist/css/glightbox.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // 👈 este faltaba
import '@/styles/main.css'
import './globals.css'

import type { Metadata } from 'next'
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Museo Digital',
  description: 'Patrimonio cultural digital',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">

      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="index-page">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

// export default function RootLayout({ children}: { children: React.ReactNode }) {

//   const pathname = usePathname();
//   const hideHeaderRoutes = ['/crear-cuenta'];
//   const shouldHideHeader = hideHeaderRoutes.includes(pathname);

//   return (
//   <html lang="es">
//   <body className="index-page">
//     <ScrollEffect />
//      {!shouldHideHeader && <Header />} {/* 👈 Oculta el Header en ciertas rutas */}
//     <main>{children}</main>
//   </body>

//     </html>
//   )
// }

