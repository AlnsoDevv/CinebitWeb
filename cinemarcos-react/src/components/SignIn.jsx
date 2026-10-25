import { useState } from "react";
import "../components/SignIn.css";

function SignIn({ onLogin, onNavigateRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const nombreUsuario = email.split("@")[0];
      onLogin({ nombre: nombreUsuario, email: email });
    }
  };
  return (
    <main>
      <div className="contendor-formulario">
        <form onSubmit={handleSubmit}>
          <h2>¡Bienvenido!</h2>
          <h4>¡Que gusto tenerte devuelta!</h4>

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
          <button id="iniciar-sesion" type="submit">
            Iniciar Sesión
          </button>
          <div className="registro">
            <p>¿No tienes cuenta?{""}</p>
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
