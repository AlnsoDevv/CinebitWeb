import { useState } from 'react';
import './SignIn.css';

function SignIn({ onLogin, onNavigateRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      const nombreUsuario = data.email.split("@")[0];
      onLogin({ nombre: nombreUsuario, email: data.email, rol: data.rol });
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
          <h2>¡Bienvenido!</h2>
          <h4>¡Qué gusto tenerte de vuelta!</h4>

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
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button id="iniciar-sesion" type="submit" disabled={cargando}>
            {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>

          <div className="registro">
            <p>¿No tienes cuenta?</p>
            <button type="button" onClick={onNavigateRegister}>
              Regístrate
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignIn;