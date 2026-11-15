import './profile.css';

function Profile({currentUser, comentarios, peliculas, onOpenMovie, onDeleteComentario}) {
  const buscarPelicula = (peliculaId) =>
      peliculas.find((pelicula) => String(pelicula._id || pelicula.id) === String(peliculaId));

    return (
    <main className="profilePage">
      <section className="profileHeader">
        <div className="profileAvatar">
          {currentUser.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="profileName">{currentUser.nombre}</h1>
          <p className="profileEmail">{currentUser.email}</p>
          <span className="profileRole">
            {currentUser.rol === "admin" ? "Administrador" : "Usuario"}
          </span>
        </div>
      </section>
 
      <section className="profileReviews">
        <h2>Mis reseñas ({comentarios.length})</h2>
 
        {comentarios.length === 0 ? (
          <p className="profileEmpty">Todavía no has escrito reseñas.</p>
        ) : (
          comentarios.map((c) => {
            const pelicula = buscarPelicula(c.peliculaId);
            return (
              <article className="profileReview" key={c._id || c.id}>
                <div className="profileReviewTop">
                  {pelicula ? (
                    <button
                      className="profileMovieLink"
                      onClick={() => onOpenMovie(pelicula._id || pelicula.id)}
                    >
                      {pelicula.title}
                    </button>
                  ) : (
                    <span>Película eliminada</span>
                  )}
                  <div className="profileReviewActions">
  <span className="profileStars">
    {"★".repeat(Math.round(c.rating))}
  </span>

                    <button
                        className="profileDelete"
                        onClick={() => onDeleteComentario(c._id)}
                        title="Eliminar reseña"
                    >
                      <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="profileText">{c.texto}</p>
                <small className="profileDate">{c.fecha}</small>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
 
export default Profile;