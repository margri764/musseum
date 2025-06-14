'use client';
import styles from './Login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-outfit' });

export default function LoginPage() {

  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;

 const [close, setClose] = useState(false);


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  
const closeModal = () => {
  setClose(true);
  setTimeout(() => { 
      setClose(false);
      router.push('/'); // redirige a la página de inicio (o a la que vos quieras)
  }, 300);
};


  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8080'
          : 'https://tusitio.com';

      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 👈 esto es clave para enviar/recibir cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Login exitoso');
        router.push('/'); // o donde quieras redirigir al usuario logueado
      } else {
        setErrorMessage(data.message || 'Email o contraseña incorrectos');
      }
    } catch (error) {
        console.error('❌ Error en login:', error);
      setErrorMessage('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className={`${styles.back} ${outfit.variable}`}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className={styles.whiteFrame} data-aos="fade-up" data-aos-delay="100">

            <div className="d-flex justify-content-between align-items-center mt-2 px-3">
  
            {/* IZQUIERDA: Logo */}
            <div>
              <span style={{ height: '30px' }}className={styles.title}>Museo</span>
              {/* <img src="/assets/logo.svg" alt="Logo" style={{ height: '30px' }} /> */}
            </div>

            {/* DERECHA: Botón cerrar */}
            <div>
              <span
                className={`bi bi-x-lg ${close ? 'iconSelected' : 'iconDeselected'}`}
                onClick={closeModal}
                style={{ cursor: 'pointer' }}
              ></span>
            </div>
         </div>

        
          <div className={styles.divider}></div>
          
          <h1 className={`${styles.title} text-center`}>Ingresá a tu cuenta</h1>
            <h6 className='text-center'> ¿No tenés cuenta? <a href='/crear-cuenta'>Registrate</a></h6>
              {/* <p className={`${styles.terms} ${outfit.variable}`}>
                  ¿No tenés cuenta? <a href="/crear-cuenta">Registrate</a>
            </p> */}

          <form className="px-4 pb-4 mt-5">

            <div className="mb-4">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {formData.email && !isValidEmail(formData.email) && (
                <div className="invalid-feedback d-block">Ingresá un correo válido</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </span>
              </div>
              {formData.password && !isValidPassword(formData.password) && (
                <div className="invalid-feedback d-block">Mínimo 6 caracteres</div>
              )}
            </div>
          
           <div className={styles.socialLogin}>
            <button
              className={styles.nextButton}
              onClick={(e) => {
                e.preventDefault();
                if (isValidEmail(formData.email) && isValidPassword(formData.password)) {
                  handleLogin();
                }
              }}
              disabled={loading || !isValidEmail(formData.email) || !isValidPassword(formData.password)} >
              {loading ? (
                <>
                  <span>Ingresando...</span>
                  <i className="bi bi-hourglass-split ms-2"></i>
                </>
              ) : (
                <>
                  <span>Ingresar</span>
                  <i className="bi bi-arrow-right ms-2"></i>
                </>
              )}
            </button>
           </div>

            <div className={styles.divider2}>
                <span>también podés ingresar con</span>
            </div>

                  <div className={styles.socialLogin}>
                    <button className={styles.socialButton}>
                        <img src="/assets/icons/google.svg" alt="Google" />
                        <span>Google</span>
                    </button>
                  {/* <button className={styles.socialButton}>
                      <img src="/icons/apple.svg" alt="Apple" />
                      <span>Apple</span>
                  </button>
                  <button className={styles.socialButton}>
                      <img src="/icons/facebook.svg" alt="Facebook" />
                      <span>Facebook</span>
                  </button> */}


                  </div>

      

            {errorMessage && (
              <div className="alert alert-danger text-center mt-3">{errorMessage}</div>
            )}
          </form>

      
        </div>
      </div>
    </div>
  );
}
