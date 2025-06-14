'use client'

import { useEffect } from 'react'
import 'aos/dist/aos.css'
import 'glightbox/dist/css/glightbox.min.css'

export default function AcercaDeNosotrosPage() {
  useEffect(() => {
    // Inicializa AOS
    import('aos').then(({ default: AOS }) => {
      AOS.init({ duration: 1000, once: false, mirror: true })
      setTimeout(() => AOS.refresh(), 300)
    })

    // Inicializa Glightbox
    import('glightbox').then(({ default: GLightbox }) => {
      const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
      })

      return () => {
        lightbox.destroy()
      }
    })
  }, [])

  return (
    <section
      id="about"
      className="about section"
      style={{ paddingTop: '150px', scrollMarginTop: '100px' }}
    >
      <div className="container">
        <div className="row gy-4 gx-5">
          <div
            className="col-lg-6 position-relative align-self-start"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src="/assets/img/about_2.jpg"
              className="img-fluid"
              alt="Acerca de nosotros"
            />
            <a
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              className="glightbox pulsating-play-btn"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <i className="fa-solid fa-play fa-2x text-white"></i>
            </a>
          </div>

          <div
            className="col-lg-6 content"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3>Acerca de nosotros</h3>
            <p>
              Nuestro Museo Digital nace con el propósito de preservar,
              compartir y revalorizar el patrimonio cultural e histórico de
              nuestra comunidad. A través de exposiciones virtuales, galerías
              colaborativas y contenidos interactivos, buscamos acercar la
              historia local a todos, desde cualquier lugar del mundo.
            </p>
            <p>
              Este espacio es construido junto a vecinos, instituciones y
              amantes de la memoria colectiva. Creemos que cada fotografía,
              objeto o relato es una pieza valiosa de nuestra identidad. Te
              invitamos a recorrer nuestras colecciones, participar con tus
              propios recuerdos y ser parte de esta experiencia viva.
            </p>

            <ul>
              <li>
                <i className="fa-solid fa-photo-film"></i>
                <div>
                  <h5>Galería de imágenes históricas</h5>
                  <p>
                    Accedé a una colección digitalizada de fotografías antiguas,
                    objetos patrimoniales y relatos de nuestra comunidad.
                  </p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-map-location-dot"></i>
                <div>
                  <h5>Mapa interactivo del patrimonio</h5>
                  <p>
                    Explorá lugares clave de nuestra historia con imágenes,
                    testimonios y archivos vinculados a cada punto del pueblo.
                  </p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-people-group"></i>
                <div>
                  <h5>Participación ciudadana</h5>
                  <p>
                    Contribuí con fotos, historias o documentos y ayudá a
                    construir colectivamente este espacio cultural abierto a
                    todos.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
