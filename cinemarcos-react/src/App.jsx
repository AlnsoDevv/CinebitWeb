import { useDebugValue, useState } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import "./index.css";
import "./catalogue.css";
import { peliculasData } from "./Data/peliculasData.jsx";
import MoviePages from "./MoviePages.jsx";
import Filter from "./components/Filter.jsx";
import SignIn from "./components/SignIn.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("recientes");

  const [currentUser, setCurrentUser] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  const [vista, setVista] = useState("home");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const pathname = window.location.pathname;
  const id = pathname.split("/")[2];

  const movie = peliculasData.find(
    (pelicula) => pelicula.id === Number(selectedMovieId),
  );

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setVista("home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddComentario = (peliculaId, texto, rating) => {
    if (!currentUser) {
      return;
    }
    const nuevoComentario = {
      id: Date.now(),
      peliculaId,
      usuario: currentUser.nombre,
      texto,
      rating,
      fecha: new Date().toLocaleDateString(),
    };
    setComentarios([nuevoComentario, ...comentarios]);
  };

  const handleNavigate = (nuevaVista) => {
    setVista(nuevaVista);
    if (nuevaVista === "home") {
      setSelectedMovieId(null);
    }
  };

  const [filterOpen, setFilterOpen] = useState(false);

  const peliculasFiltradas = peliculasData
    .filter(
      (pelicula) =>
        pelicula.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === "Todos" || pelicula.genre === selectedGenre),
    )
    .sort((a, b) => {
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "estreno") return b.year - a.year;
      return b.id - a.id;
    });
  if (vista === "signin") {
    return (
      <>
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
        <SignIn onLogin={handleLogin} currentUser={currentUser} />
      </>
    );
  }

  if (movie && vista === "home") {
    return (
      <>
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />

        <MoviePages
          movie={movie}
          currentUser={currentUser}
          comentarios={comentarios.filter((c) => c.peliculaId == movie.id)}
          onAddComentario={handleAddComentario}
        />
      </>
    );
  }

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <main>
        <button onClick={() => setFilterOpen(true)}>Filtrar y ordenar</button>

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

        <section className="movies">
          {peliculasFiltradas.map((pelicula) => (
            <MovieCard
              key={pelicula.id}
              id={pelicula.id}
              title={pelicula.title}
              posterUrl={pelicula.posterUrl}
              rating={pelicula.rating / 2}
              onSelectMovie={setSelectedMovieId}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
