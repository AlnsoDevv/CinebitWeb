import { useState } from 'react';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import './index.css';
import './catalogue.css';
import { peliculasData } from './Data/peliculasData.jsx';
import MoviePages from "./MoviePages.jsx";
import Filter from "./components/Filter.jsx";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("Todos");
    const [sortBy, setSortBy] = useState("recientes");

    const id = window.location.pathname.split('/')[2];

    const movie = peliculasData.find(
        (pelicula) => pelicula.id === Number(id)
    );

    const [filterOpen, setFilterOpen] = useState(false);

    const peliculasFiltradas = peliculasData.filter((pelicula) =>
        pelicula.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedGenre === "Todos" || pelicula.genre ===selectedGenre))
    .sort((a,b) => {
        if(sortBy === "az") return a.title.localeCompare(b.title);
        if(sortBy ==="estreno") return b.year - a.year;
        return b.id - a.id;
    }
    );

    if (movie) {
        return (
            <>
                <Header
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <MoviePages movie={movie} />
            </>
        );
    }

    return (
        <>
            <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <main>

                <button onClick={() => setFilterOpen(true)}>
                    Filtrar y ordenar
                </button>

                {filterOpen && (
                    <Filter
                        closeFilter={() => setFilterOpen(false)}
                        peliculas={peliculasData}
                        selectedGenre={selectedGenre}
                        onGenreChange={setSelectedGenre}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                )}

                <section className='movies'>
                    {peliculasFiltradas.map((pelicula) => (
                        <MovieCard
                            key={pelicula.id}
                            id={pelicula.id}
                            title={pelicula.title}
                            posterUrl={pelicula.posterUrl}
                            rating={pelicula.rating / 2}
                        />
                    ))}
                </section>

            </main>
        </>
    );
}

export default App;