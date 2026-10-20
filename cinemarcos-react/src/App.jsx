import Header from './components/Header';
import MovieCard from './components/MovieCard';
import './index.css';
import './catalogue.css';


const peliculasData = [

  {
    id:1,
    title: "Tren Bala",
    posterUrl: "https://m.media-amazon.com/images/S/pv-target-images/2ed471e106bc24501af52be9ce05a75191d83ba24494405c246840b7f685482e.jpg"
  },
  {
    id:2,
    title: "Godzilla",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODE2NTdmMmYtY2U1OS00MjExLWIwNjQtYjQ5NTA0ZDZmZjZiXkEyXkFqcGc@._V1_.jpg"
  },
  {
    id:3,
    title: "Cars",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDk5ZWI2ZTgtZmU3My00Y2Y3LTkzMzctNmExZmE3NWQ0OGRkXkEyXkFqcGc@._V1_.jpg"
  },

















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
      posterUrl={pelicula.posterUrl}/>))
  }
    </section>
  </main>
    </>
  );
}

export default App;