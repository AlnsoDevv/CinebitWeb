import "./Recommended.css";

function Recommended({ currentMovieId, peliculas = [] }) {
    const recommendedMovies = peliculas
        .filter((pelicula) => String(pelicula._id || pelicula.id) !== String(currentMovieId))
        .slice(0, 3);

    return (
        <section className="recommended">
            <h2>Recomendadas</h2>
            <div className="recommendedMovies">
                {recommendedMovies.map((pelicula) => (
                    <div className="recommendedMovie" key={pelicula._id || pelicula.id}>
                        <img
                            src={pelicula.posterUrl}
                            alt={`Póster de ${pelicula.title}`}
                        />
                        <p>{pelicula.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Recommended;