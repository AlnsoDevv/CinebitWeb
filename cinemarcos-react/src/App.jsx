import Header from './components/Header';
import MovieCard from './components/MovieCard';
import './index.css';
import './catalogue.css';
import { peliculasData } from './Data/peliculasData.jsx';
import MoviePages from "./MoviePages.jsx";

function App() {
    const id = window.location.pathname.split('/')[2];
    const movie = peliculasData.find(
        (pelicula) => pelicula.id === Number(id)
    );

    if (movie) {
        return (
            <>
                <Header />
                <MoviePages movie={movie} />
            </>
        );
    }
  return (
    <>
      <Header />
      <main>
    <section className='movies'>
    {peliculasData.map((pelicula) => (
        <MovieCard
            key={pelicula.id}
            id={pelicula.id}
            title={pelicula.title}
            posterUrl={pelicula.posterUrl}
            rating={pelicula.rating/2}/>)
    )


  }
    </section>
  </main>
    </>
  );
}

export default App;