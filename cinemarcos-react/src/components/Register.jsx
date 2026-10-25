import { useState } from "react";
import "./SignIn.css";

function Register({ onRegister, onNavigateLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onRegister(email);
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
          <h4>Sé parte de nosotros!</h4>

          <div className="email">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password"></div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button id="iniciar-sesion" type="submit">
            Crear Cuenta
          </button>
        </form>
      </div>
    </main>
  );
}
export default Register;
