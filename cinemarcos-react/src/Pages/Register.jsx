import { useState } from 'react';
import './SignIn.css';

function Register({ onRegisterSuccess, onNavigateLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar usuario');
      }

      const nombreUsuario = data.email.split("@")[0];
      onRegisterSuccess({ nombre: nombreUsuario, email: data.email, rol: data.rol });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main>
      <div className="contenedor-formulario">
        <form onSubmit={handleSubmit}>
          <p>
            <button type="button" onClick={onNavigateLogin} id="back-home">
              Volver
            </button>
          </p>
          <h2>¡Bienvenid@!</h2>
          <h4>¡Sé parte de nosotros!</h4>

          {error && <p style={{ color: '#ff6b6b', marginBottom: '10px' }}>{error}</p>}

          <div className="email">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button id="iniciar-sesion" type="submit" disabled={cargando}>
            {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;