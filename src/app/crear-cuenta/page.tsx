'use client'
import styles from './SignUp.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import { Outfit } from 'next/font/google';


const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-outfit' });


// const outfit = Outfit({
//   subsets: ['latin'],
//   variable: '--font-outfit'
// });

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';



export default function CrearCuentaPage() {

 const router = useRouter();

 const [close, setClose] = useState(false);

 const [backPressed, setBackPressed] = useState(false);

 const [showPassword, setShowPassword] = useState(false);


const [step, setStep] = useState(1);

const [formData, setFormData] = useState({
  email: '',
  name: '',
  lastName: '',
  password: '',
  confirmPassword: ''
});

const nextStep = () => setStep((prev) => prev + 1);
const prevStep = () => setStep((prev) => prev - 1);

const isValidName = (name: string) => name.trim().length >= 2;
const isValidLastName = (lastName: string) => lastName.trim().length >= 2;

// Validación simple de email
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validación de contraseña: mínimo 6 caracteres
const isValidPassword = (password: string) =>
  password.length >= 6;

const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');



const closeModal = () => {
  setClose(true);
  setTimeout(() => { 
      setClose(false);
      router.push('/'); // redirige a la página de inicio (o a la que vos quieras)
  }, 300);
};

    useEffect(() => {
      AOS.init({ duration: 1000, once: true })
    }, [])

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

    const handleSubmit = async () => {

     setLoading(true);
     setErrorMessage('');
     
     try {
     
      await new Promise((resolve) => setTimeout(resolve, 1500)); // ⏳ delay artificial

      const baseUrl =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:8080'
            : 'https://tusitio.com'; // reemplazá por tu dominio real

        console.log(JSON.stringify({
              email: formData.email,
              name: formData.name,
              lastName: formData.lastName,
              password: formData.password,
            }));
        
        const response = await fetch(`${baseUrl}/api/auth/signUp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
              lastName: formData.lastName,
              password: formData.password,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log('✅ Registro exitoso:', data);
            // Redireccionar o mostrar mensaje
            router.push('/bienvenido'); // o donde quieras
          } else {
            console.error('❌ Error en el registro:', data.message);
                  setErrorMessage(data.message || 'Ocurrió un error');
            // Mostrar error en pantalla si querés
          }
        } catch (error) {
          console.error('❌ Error en el fetch:', error);
           setErrorMessage('Error de conexión con el servidor');
        }finally{
           setLoading(false);
        }
      };

    
  return (

<div className={`${styles.back}  ${outfit.variable}`}>

    
      <div className="d-flex justify-content-center align-items-center h-100 ">

          
        <div className={styles.whiteFrame} data-aos="fade-up" data-aos-delay="100">

   
   <div className="d-flex justify-content-between align-items-center mt-2 px-3">
  
            {/* IZQUIERDA: Logo */}
            <div>
              <span style={{ height: '30px' }}className={styles.title}>Museo</span>
              {/* <img src="/assets/logo.svg" alt="Logo" style={{ height: '30px' }} /> */}
            </div>

            {/* CENTRO: Contador */}
            {step === 2 && (
              <div data-aos="fade-down" className="text-center">
                <span>02 de 04</span>
              </div>
            )}
            {step === 3 && (
              <div data-aos="fade-down" className="text-center">
                <span>03 de 03</span>
              </div>
            )}

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
          
      
          
      <form className="px-4 pb-4" style={{ padding: '10px' }}>

        {step === 1 && (
          <div data-aos="fade-right" className="px-4 pb-4" >

           <h1 className={styles.title}>CREA TU CUENTA</h1>
          <h6 className='text-center'>Ya tenés una cuenta? <a href='#'>Ingresar</a></h6>

            <div className="mb-3 p-4" >
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  {formData.email && !isValidEmail(formData.email) && (
                <div className="invalid-feedback d-block">
                  Ingresá un correo válido.
                </div>
              )}


            </div>

            <div className={styles.socialLogin}>
              
            <button className={styles.nextButton}
                onClick={(e) => {
                  e.preventDefault();
                  console.log('👉 Email al avanzar:', formData.email); // LOG ACÁ
                   if (isValidEmail(formData.email)) nextStep();
                  // if (formData.email.trim()) nextStep();
                }}
                disabled={!formData.email.trim() ||!isValidEmail(formData.email) }>
                <span>Siguiente</span>
                <i className="bi bi-arrow-right ms-2"></i>
            </button>

            
            </div>  

            
            <div className={styles.divider2}>
            <span>tambien podés ingresar con</span>
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
          </div>
        )}

        {step === 2 && (
          <div data-aos="fade-left" className="px-4 pb-4">

          <div className="position-relative">
            <button
              className={`${styles.backButton} ${backPressed ? styles.backButtonPressed : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setBackPressed(true);
                setTimeout(() => {
                  setBackPressed(false);
                  prevStep();
                }, 200);
              }}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <i className="bi bi-arrow-left"></i>
            </button>

            <div className="text-center">
              <h1 className={styles.title}>Queremos conocerte</h1>
              <h6>Ingresá tu nombre y apellido para continuar</h6>
            </div>
          </div>


            <div className="p-4">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                  {formData.name && !isValidName(formData.name) && (
                  <div className="invalid-feedback d-block">
                    El nombre debe tener al menos 2 caracteres.
                  </div>
                )}
            </div>
          
            <div className="mb-3 p-4">
              <label htmlFor="lastName" className="form-label">Apellido</label>
               <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
             </div>

            <div className={styles.socialLogin}>
                 
            <button className={styles.nextButton}
                onClick={(e) => {
                  e.preventDefault();
                      console.log('👉 Nombre y apellido al avanzar:', formData.name, formData.lastName); // LOG ACÁ
                  if (formData.name.trim() && formData.lastName.trim() && isValidName(formData.name) && isValidLastName(formData.lastName)) nextStep();
                }}
                disabled={!formData.name.trim() || !formData.lastName.trim()
                          || !isValidName(formData.name) || !isValidLastName(formData.lastName)
                }>
                <span>Siguiente</span>
                <i className="bi bi-arrow-right ms-2"></i>
            </button>
            </div>  
        
          </div>
        )}

        {step === 3 && (
          <div data-aos="fade-left" className="px-4 pb-4">

          <div className="position-relative">
            <button
              className={`${styles.backButton} ${backPressed ? styles.backButtonPressed : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setBackPressed(true);
                setTimeout(() => {
                  setBackPressed(false);
                  prevStep();
                }, 200);
              }}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <i className="bi bi-arrow-left"></i>
            </button>

              <div className="text-center">
            <h1 className={styles.title}>Elegí tu contraseña</h1>
            <h6>Será tu clave para ingresar a tu cuenta</h6>
          </div>

          </div>


               <div className="p-4">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      formData.password && !isValidPassword(formData.password) ? 'is-invalid' : ''
                    }`}
                    id="password"
                    required
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

                    {/* ⚠️ Mensaje si es inválida */}
                    {formData.password && !isValidPassword(formData.password) && (
                      <div className="invalid-feedback d-block">
                        La contraseña debe tener al menos 6 caracteres.
                      </div>
                    )}
                </div>
              </div>

              <div className="p-4">
                <label htmlFor="confirmPassword" className="form-label">Repetí la contraseña</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword ? 'is-invalid' : ''
                  }`}
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="invalid-feedback">
                    Las contraseñas no coinciden
                  </div>
                )}
              </div>

       

       <div className={styles.socialLogin}>
  <button
    className={styles.nextButton}
    onClick={(e) => {
      e.preventDefault();
      if (
        formData.password.trim() &&
        formData.confirmPassword.trim() &&
        formData.password === formData.confirmPassword &&
        isValidPassword(formData.password)
      ) {
        handleSubmit();
      }
    }}
    disabled={
      loading ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim() ||
      formData.password !== formData.confirmPassword ||
      !isValidPassword(formData.password)
    }
  >
    {loading ? (
      <>
        <span>Creando cuenta...</span>
        <i className="bi bi-hourglass-split  ms-2"></i>
      </>
    ) : (
      <>
        <span>Crear cuenta</span>
        <i className="bi bi-check-lg ms-2"></i>
      </>
    )}
  </button>

  {/* Mensaje de error si ocurre algo */}
  {errorMessage && (
    <div className="alert alert-danger text-center mt-3 w-100">
      {errorMessage}
    </div>
  )}
</div>

        
          </div>
        )}



        <p className={styles.terms}>
        Al registrarte, aceptás los <a href="#">Términos del servicio</a> y la <a href="#">Política de privacidad</a> del Museo Digital.
        </p>
        {/* <p className={styles.terms}>
           https://dribbble.com/shots/25485528-Banking-Registration-UI
        </p> */}

         
        </form>

        </div>

        
      </div>
    </div>
  );
}
