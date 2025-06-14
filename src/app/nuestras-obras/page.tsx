'use client'

import { useEffect } from 'react'
import 'aos/dist/aos.css'
import 'glightbox/dist/css/glightbox.min.css'

type LightboxInstance = {
  destroy: () => void
}

export default function NuestrasObrasPage() {
  useEffect(() => {
    // AOS
    import('aos').then(({ default: AOS }) => {
      AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
      })
      setTimeout(() => {
        AOS.refresh()
      }, 500)
    })

    // GLightbox
    let lightbox: LightboxInstance | null = null

    import('glightbox').then(({ default: GLightbox }) => {
      lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
      }) as LightboxInstance
    })

    return () => {
      lightbox?.destroy()
    }
  }, [])


  return (
      <section id="gallery" className="gallery section"
        style={{ paddingTop: '150px'}}
      >

      <div className="container section-title" data-aos="fade-up"  data-aos-offset="500">
        <h2>Galería</h2>
        <p>
          Descubrí imágenes, objetos y momentos que forman parte de la memoria
          colectiva de nuestra comunidad. Cada pieza cuenta una historia, y todas juntas
          construyen nuestro patrimonio cultural compartido.
        </p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div className="col-lg-3 col-md-4" key={n}>
              <div className="gallery-item">
                <a
                  href={`/assets/img/gallery/gallery_${n}.jpg`}
                  className="glightbox"
                  data-gallery="images-gallery"
                >
                  <img
                    src={`/assets/img/gallery/gallery_${n}.jpg`}
                    alt={`gallery ${n}`}
                    className="img-fluid"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
