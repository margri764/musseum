'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function HeroSlider() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  const slides = [
    '/assets/img/home_5.jpg',
    '/assets/img/home_1.jpg',
    '/assets/img/espacios_2.jpg',
  ]

  return (
    <section id="testimonials" className="testimonials section">
      <div >
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView="auto"
          pagination={{ clickable: true }}
        >
          {slides.map((src, index) => (
            <SwiperSlide key={index}>
              <section id="hero" className="hero section light-background" data-aos="fade-up" data-aos-delay="200">

                <img src={src} alt="" data-aos="fade-in" />

                <div className="container position-relative">
                  <div
                    className="welcome position-relative"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    <h1>Hola!!</h1>
                    <p>Bienvenidos al museo digital</p>
                  </div>

                  <div className="content row gy-4">
                    <div className="col-lg-4 d-flex align-items-stretch">
                      <div
                        className="why-box"
                        data-aos="zoom-out"
                        data-aos-delay="300"
                      >
                        <h3>¿Qué vas a encontrar acá?</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <div className="text-center">
                          <a href="#about" className="more-btn">
                            <span>Ver más</span>{' '}
                            <i className="bi bi-chevron-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
