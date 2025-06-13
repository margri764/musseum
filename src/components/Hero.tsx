'use client'

// import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative w-full h-[80vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/assets/img/home_5.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center bg-black/60 p-8 rounded">
        <h1 className="text-4xl font-bold mb-4">Hola!!</h1>
        <p className="text-xl mb-6">Bienvenidos al museo digital</p>
        <Link
          href="#about"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Ver más
        </Link>
      </div>
    </section>
  )
}
