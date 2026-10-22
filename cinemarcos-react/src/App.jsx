import Header from './components/Header';
import MovieCard from './components/MovieCard';
import './index.css';
import './catalogue.css';

const peliculasData = [
  {
    id: 1,
    title: "Tren Bala",
    posterUrl: "https://m.media-amazon.com/images/S/pv-target-images/2ed471e106bc24501af52be9ce05a75191d83ba24494405c246840b7f685482e.jpg",
    rating: 7.3
  },
  {
    id: 2,
    title: "Godzilla",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODE2NTdmMmYtY2U1OS00MjExLWIwNjQtYjQ5NTA0ZDZmZjZiXkEyXkFqcGc@._V1_.jpg",
    rating: 6.4
  },
  {
    id: 3,
    title: "Cars",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDk5ZWI2ZTgtZmU3My00Y2Y3LTkzMzctNmExZmE3NWQ0OGRkXkEyXkFqcGc@._V1_.jpg",
    rating: 7.3
  },
  {
    id: 4,
    title: "DragonBall: Evolution",
    posterUrl: "https://m.media-amazon.com/images/S/pv-target-images/eff97ff56a9ebbfe951436efeb22f6debbf6b2d9bd0f649fe5c5bd646bc7129a.jpg",
    rating: 2.5
  },
  {
    id: 5,
    title: "Venom 2",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZTZkMGY0NTQtMzg2NC00YzdhLTg1NzYtZDMyNzZhNGU3ZGUwXkEyXkFqcGc@._V1_.jpg",
    rating: 5.9
  },
  {
    id: 6,
    title: "Lluvia de Hamburguesas",
    posterUrl: "https://static.wikia.nocookie.net/doblaje/images/0/0f/LLUVIA_DE_HAMBURGUESAS.jpg/revision/latest?cb=20100615004553&path-prefix=es",
    rating: 6.9
  },
  {
    id: 7,
    title: "En Busca de la Felicidad",
    posterUrl: "https://static.wikia.nocookie.net/doblaje/images/2/29/En_busca_de_la_felicidad.JPG/revision/latest?cb=20100417173538&path-prefix=es",
    rating: 8.0
  },
  {
    id: 8,
    title: "Bolt",
    posterUrl: "https://static.wikia.nocookie.net/doblaje/images/a/a6/Bolt.jpg/revision/latest?cb=20200731233731&path-prefix=es",
    rating: 6.8
  },
  {
    id: 9,
    title: "1917",
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWmRbsCL1dxTz0-mx0jgC9sfIr_gHwsvKEaHtxnzyBg&s=10",
    rating: 8.2
  },
  {
    id: 10,
    title: "Cuando las Luces se Apagan",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjI0NzVhNWEtZTA0YS00MTY2LWFkYTUtZmYzMjM3YzM3NGU4XkEyXkFqcGc@._V1_.jpg",
    rating: 6.3
  },
  {
    id: 11,
    title: "La La Land",
    posterUrl: "https://m.media-amazon.com/images/S/pv-target-images/178c2a0f654a66eda07ca098fa243728b6bc7c5f4359863860e12c50be3b8e39.jpg",
    rating: 8.0
  },
  {
    id: 12,
    title: "Little Miss Sunshine",
    posterUrl: "https://m.media-amazon.com/images/S/pv-target-images/bfb50dfd14726312b95c5e9f736e85f9d4744de4bd1ada2dfc3b216190f617aa.jpg",
    rating: 7.8
  },
  {
    id: 13,
    title: "Alicia en el País de las Maravillas",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZTllYThmMDYtYzU1ZC00MmRkLWI2OGItNjc0NTcxNGY3Y2M4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: 6.4
  },
  {
    id: 14,
    title: "Backrooms",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYzQyYjZmMjctMzIyZi00MDI0LWJhNGQtMzQ3MTFlNDgwNGM5XkEyXkFqcGc@._V1_.jpg",
    rating: 6.7
  }

















];


function App() {
  return (
    <>
      <Header />
      <main>
    <section className='movies'>
    {peliculasData.map((pelicula) => (
        <MovieCard
            key={pelicula.id}
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