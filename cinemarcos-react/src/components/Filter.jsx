import './Filter.css';

function Filter({
                    closeFilter,
                    peliculas,
                    selectedGenre, onGenreChange,
                    sortBy, onSortChange
                }) {

    const generos = [
        ...new Set(peliculas.map((pelicula) => pelicula.genre))
    ];

    return (
        <div
            className="filterOverlay"
            onClick={closeFilter}
        >

            <div
                className="filterPanel"
                onClick={(event) => event.stopPropagation()}
            >

                <button
                    className="closeFilter"
                    onClick={closeFilter}
                >
                    X
                </button>

                <h2>Filtrar y ordenar</h2>

                <h3>Género</h3>

                <div className="genreButtons">

                    <button
                        className={`genreButton ${selectedGenre === "Todos" ? "active" : ""}`}
                        onClick={() => onGenreChange("Todos")}
                    >
                        Todos
                    </button>

                    {generos.map((genero) => (
                        <button
                            key={genero}
                            className={`genreButton ${selectedGenre === genero ? "active" : ""}`}
                            onClick={() => onGenreChange(genero)}
                        >
                            {genero}
                        </button>
                    ))}

                </div>

                <h3>Ordenar por</h3>

                <select
                    className="sortSelect"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="recientes">Añadidas recientemente</option>
                    <option value="az">A-Z</option>
                    <option value="estreno">Fecha de estreno</option>
                    <option value="rating">Mejor calificadas</option>
                </select>

            </div>

        </div>
    );
}

export default Filter;