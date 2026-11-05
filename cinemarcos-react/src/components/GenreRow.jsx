import MovieCard from "./MovieCard";
function GenreRow({titulo, peliculas, onSelectMovie}){
    return(
        <section className="genre-row">
            <h2 className="genre-title">{titulo}</h2>
            <div className="genre-row-list">
                {peliculas.map((pelicula)=> (
                    <MovieCard
                    key={pelicula.id}
                    id={pelicula.id}
                    title={pelicula.title}
                    posterUrl={pelicula.posterUrl}
                    rating={pelicula.rating / 2}
                    onSelectMovie={onSelectMovie}
                    />
                ))}
            </div>
        </section>
    );
}
export default GenreRow;