'use client';


import Link from "next/link";
import { usePathname } from 'next/navigation'
import clsx from 'clsx'


export default function Header() {

    const pathname = usePathname()


  return (

    <header id="header" className="header sticky-top">
      {/* Topbar */}
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:contact@example.com">contact@example.com</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+54 9 2302 34-4440</span>
            </i>
          </div>
          <div className="social-links  align-items-center"  >
            <a href="#" className="twitter"><i className="bi bi-twitter-x" ></i></a>
            <a href="#" className="facebook" style={{ color: 'white' }}><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Branding + Nav */}
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a href="#" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename" style={{ color: 'red' }}>Museo Digital</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            
            <ul>
              <li>  
                 <Link href="/" className={clsx(pathname  === '/' && 'active')}>
                 Inicio
                </Link>
              </li>  
              
              <li>  
                 <Link href="/acerca-de-nosotros" className={clsx(pathname  === '/acerca-de-nosotros' && 'active')}>
                 Nuestra historia
                </Link>
              </li>  

              <li>  
                 <Link href="/nuestras-obras" className={clsx(pathname  === '/nuestras-obras' && 'active')}>
                 Obras
                </Link>
              </li>  
              {/* <li>  <Link href="/nuestras-obras">Obras</Link> </li> */}
              <li><a href="#patrimonio">Tu patrimonio</a></li>
              <li><a href="#colaboradores">Colaboradores</a></li>
              <li className="dropdown">
                <a href="#"><span>Museo Vivo</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><a href="#experiencia">Viví la experiencia digital</a></li>
                  <li className="dropdown">
                    <a href="#"><span>Explorá la galería virtual</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><a href="#testimonios">Voces del pueblo</a></li>
                      <li><a href="#">Deep link 2</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Descubrí el mapa histórico</a></li>
                  <li><a href="#">Escuchá relatos orales</a></li>
                  <li><a href="#">Subí tu historia</a></li>
                  <li><a href="#">Participá de actividades</a></li>
                  <li><a href="#">Compartí en redes</a></li>
                </ul>
              </li>
              <li><a href="#contact">Contactános</a></li>

              <li>  
                 <Link href="/crear-cuenta" className={clsx(pathname  === '/crear-cuenta' && 'active')}>
                  Registrarse/Entar
                 </Link>
              </li>  
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </div>

      
    </header>
  )
}
