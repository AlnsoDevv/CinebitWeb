import './components/MoviePage.css';

function MoviePage({ movie }) {
    return (
        <main className="movieMain">

            <h1 className="movieTitle">{movie.title}</h1>

            <section className="posterTrailer">

                <div className="moviePoster">
                    <img
                        src={movie.posterUrl}
                        alt={`Póster de ${movie.title}`}
                    />
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
                <button className="buttonFav">
                    Añadir a favoritos
                </button>

                <button className="buttonQualify">
                    Calificar
                </button>
            </div>

        </main>
    );
}

export default MoviePage;