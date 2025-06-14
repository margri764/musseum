'use client';
import { useRouter } from 'next/navigation';
// import styles from './Bienvenido.module.css'; // opcional si querés estilizar

export default function Bienvenido() {
  const router = useRouter();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-4">
      <h1 className="mb-3">🎉 ¡Bienvenido al Museo Digital!</h1>

      <p className="mb-4">
        Tu cuenta se creó con éxito.<br />
        Ya podés explorar historias, descubrir nuestro patrimonio y formar parte de la comunidad.
      </p>

      <button
        className="btn btn-primary px-4 py-2"
        onClick={() => router.push('/')}
      >
        Ir al inicio
        <i className="bi bi-arrow-right ms-2"></i>
      </button>
    </div>
  );
}
