import { useState } from 'react';
import './MoviePage.css';
import Recommended from "../components/Recommended.jsx";

function MoviePage({ movie, currentUser, comentarios = [], onAddComentario }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [texto, setTexto] = useState("");
  const [calificacion, setCalificacion] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    onAddComentario(movie.id, texto, calificacion);
    setTexto("");
    setMostrarFormulario(false);
  };

  return (
    <main className="movieMain">
      <h1 className="movieTitle">{movie.title}</h1>
        <div className="movieLayout">
            <div className="movieContent">

      <section className="posterTrailer">
        <div className="moviePoster">
          <img src={movie.posterUrl} alt={`Póster de ${movie.title}`} />
        </div>

        <iframe
          className="trailerFrame"
          src={movie.trailerUrl}
          title={`Tráiler de ${movie.title}`}
          allowFullScreen
        ></iframe>
      </section>

      <section className="movie-description">
        <p>{movie.description}</p>
        <p>{movie.year}</p>
      </section>

      <div className="movieButtons">
        <button className="buttonFav">Añadir a favoritos</button>

        <button
          className="buttonQualify"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cancelar" : "Calificar"}
        </button>
      </div>

      {mostrarFormulario && (
        <section className="form-calificar-container">
          {currentUser ? (
            <form onSubmit={handleSubmit} className="form-calificar">
              <h3>
                Calificar película como <strong>{currentUser.nombre}</strong>
              </h3>
              <div>
                <label htmlFor="puntuacion-select">Puntuación: </label>
                <select
                  id="puntuacion-select"
                  value={calificacion}
                  onChange={(e) => setCalificacion(Number(e.target.value))}
                  className="select-calificacion"
                >
                  <option value={5}>★★★★★ (5/5)</option>
                  <option value={4}>★★★★ (4/5)</option>
                  <option value={3}>★★★ (3/5)</option>
                  <option value={2}>★★ (2/5)</option>
                  <option value={1}>★ (1/5)</option>
                </select>
              </div>
              <textarea
                rows="3"
                placeholder="Escribe tu reseña u opinión sobre la película..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
                className="textarea-comentario"
              />
              <button type="submit" className="btn-publicar">
                Publicar Comentario
              </button>
            </form>
          ) : (
            <p className="mensaje-login-requerido">
              Debes iniciar sesión para calificar y comentar.
            </p>
          )}
        </section>
      )}

      <section className="seccion-comentarios">
        <h2>Reseñas y Comentarios ({comentarios.length})</h2>
        {comentarios.length === 0 ? (
          <p className="sin-comentarios">No hay comentarios disponibles :p</p>
        ) : (
          <div className="lista-comentarios">
            {comentarios.map((c) => (
              <div key={c.id} className="comentario-item">
                <div className="comentario-header">
                  <strong>{c.usuario}</strong>
                  <span>{"★".repeat(c.rating)}</span>
                </div>
                <p className="comentario-texto">{c.texto}</p>
                <small className="comentario-fecha">{c.fecha}</small>
              </div>
            ))}
          </div>
        )}
      </section>
            </div> <Recommended currentMovieId={movie.id} /> </div>
    </main>
  );
}

export default MoviePage;
