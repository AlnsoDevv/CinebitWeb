import { useState } from "react";
import { peliculasData } from "../Data/peliculasData.jsx";
import "./Recommended.css";

function Recommended({ currentMovieId }) {

    const [recommendedMovies] = useState(() =>
        peliculasData
            .filter((pelicula) => pelicula.id !== currentMovieId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
    );

    return (
        <section className="recommended">
            <h2>Recomendadas</h2>

            <div className="recommendedMovies">
                {recommendedMovies.map((pelicula) => (
                    <div className="recommendedMovie" key={pelicula.id}>
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