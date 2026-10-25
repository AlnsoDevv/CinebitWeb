import './Filter.css';

function Filter({ 
    closeFilter, 
    peliculas, 
    selectedGenre, onGenreChange,
    sortBy, onSortChange 
}) {
    const generos = [...new Set(peliculas.map((pelicula) => pelicula.genre))]
    return (
        <div className="filterOverlay"
             onClick={closeFilter}>

            <div className="filterPanel"
                 onClick={(event) => event.stopPropagation()}>

                <button
                    className="closeFilter"
                    onClick={closeFilter}
                >
                    X
                </button>

                <h2>Filtrar y ordenar</h2>

                <h3>Género</h3>
                <select value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)}>
                    <option value="Todos">Todos</option>
                    {generos.map((genero)=> (<option key={genero} value={genero}>{genero}</option>))}
                </select>
                <h3>Ordenar por</h3>
                <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                    <option value="recientes">Añadidas recientemente</option>
                    <option value="az">A-Z</option>
                    <option value="estreno">Fecha de estreno</option>
                </select>

            </div>

        </div>
    );
}

export default Filter;