import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import MovieCard from './components/MovieCard.jsx';
import Filter from './components/Filter.jsx';
import MoviePages from './Pages/MoviePages.jsx';
import SignIn from './Pages/SignIn.jsx';
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx';
import './Styles/index.css';
import './Styles/catalogue.css';
import GenreRow from './components/GenreRow.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("recientes");

  const [currentUser, setCurrentUser] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [vista, setVista] = useState("home");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    async function cargarSesion() {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setCurrentUser({
            nombre: data.email.split("@")[0],
            email: data.email,
            rol: data.rol
          });
        }
      } catch (err) {
        console.error('No hay sesion activa:', err);
      }
    }
    cargarSesion();
  }, []);

  useEffect(() => {
    async function cargarPeliculas() {
      try {
        setCargando(true);
        const res = await fetch('/api/peliculas');
        if (!res.ok) throw new Error('Error al conectar con la API');
        const data = await res.json();
        setPeliculas(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarPeliculas();
  }, []);

useEffect(() => {
  async function cargarComentarios() {
    try {
      const res = await fetch('/api/comentarios');
      if (res.ok) {
        const data = await res.json();
        setComentarios(data);
      }
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  }
  cargarComentarios();
}, []);




  const movie = peliculas.find(
    (pelicula) => String(pelicula._id || pelicula.id) === String(selectedMovieId),
  );

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setVista("home");
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    } finally {
      setCurrentUser(null);
      setVista("home");
    }
  };

  const handleAddComentario = async (peliculaId, texto, rating) => {
  if (!currentUser) return;
  try {
    const res = await fetch('/api/comentarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peliculaId, texto, rating })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Error al guardar comentario');
    }

    const nuevo = await res.json();
    setComentarios((prev) => [nuevo, ...prev]);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  const handleNavigate = (nuevaVista) => {
    setVista(nuevaVista);
    if (nuevaVista === "home") {
      setSelectedMovieId(null);
    }
  };

  const [filterOpen, setFilterOpen] = useState(false);

  const peliculasFiltradas = peliculas
    .filter(
      (pelicula) =>
        pelicula.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === "Todos" || pelicula.genre === selectedGenre),
    )
    .sort((a, b) => {
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "estreno") return b.year - a.year;
      if (sortBy === "rating") return b.rating - a.rating;
      return String(b._id || b.id || '').localeCompare(String(a._id || a.id || ''));
    });

  const generos = [...new Set(peliculas.map((pelicula) => pelicula.genre))];
  const sinFiltros = searchTerm === "" && selectedGenre === "Todos";

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
        <SignIn
          onLogin={handleLogin}
          onNavigateRegister={() => setVista("register")}
        />
      </>
    );
  }

  if (vista === "register") {
    return (
      <>
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
        <Register
          onRegisterSuccess={handleLogin}
          onNavigateLogin={() => setVista("signin")}
        />
      </>
    );
  }

    if (vista === "perfil" && currentUser) {
    return (
      <>
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
        <Profile
          currentUser={currentUser}
          comentarios={comentarios.filter((c) => c.usuario === currentUser.nombre)}
          peliculas={peliculas}
          onOpenMovie={(id) => {
            setSelectedMovieId(id);
            setVista("home");
          }}
        />
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
          comentarios={comentarios.filter((c) => c.peliculaId == (movie._id || movie.id))}
          onAddComentario={handleAddComentario}
          peliculas={peliculas}
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
        <button className="filterButton" onClick={() => setFilterOpen(true)}>
          <span className="filterIcon">☰</span> Filtrar
        </button>

        {filterOpen && (
          <Filter
            closeFilter={() => setFilterOpen(false)}
            peliculas={peliculas}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        )}

        {cargando ? (
          <p style={{ color: "white", textAlign: "center", margin: "40px" }}>Cargando catálogo...</p>
        ) : error ? (
          <p style={{ color: "#ff6b6b", textAlign: "center", margin: "40px" }}>{error}</p>
        ) : sinFiltros ? (
          <>
            <GenreRow
              titulo="Catalogo completo"
              peliculas={peliculasFiltradas}
              onSelectMovie={setSelectedMovieId}
            />
            {generos.map((genero) => (
              <GenreRow
                key={genero}
                titulo={genero}
                peliculas={peliculasFiltradas.filter((pelicula) => pelicula.genre === genero)}
                onSelectMovie={setSelectedMovieId}
              />
            ))}
          </>
        ) : (
          <section className="movies">
            {peliculasFiltradas.map((pelicula) => (
              <MovieCard
                key={pelicula._id || pelicula.id}
                id={pelicula._id || pelicula.id}
                title={pelicula.title}
                posterUrl={pelicula.posterUrl}
                rating={pelicula.rating / 2}
                onSelectMovie={setSelectedMovieId}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}

export default App;