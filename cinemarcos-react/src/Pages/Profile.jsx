import './profile.css';

function Profile({currentUser, comentarios, peliculas, onOpenMovie}){
    const buscarPelicula=(peliculaId) => peliculas.find((pelicula) => String(pelicula.id || pelicula.id)===String(peliculaId));

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
                  <span className="profileStars">{"★".repeat(Math.round(c.rating))}</span>
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