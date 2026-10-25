import './MovieCard.css';

function MovieCard({ id, title, posterUrl, year, rating, onSelectMovie }) {
  const starRating = Math.round(rating);
  return (
    <article className="movie">
      <a
        href={`/peliculas/${id}`}
        onClick={(e) => {
          e.preventDefault();
          onSelectMovie(id);
        }}
      >
        <img className="poster" src={posterUrl} alt="`Póster de ${title}`}" />
      </a>
      <p className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= starRating ? "star" : "star-off"}>
            ★
          </span>
        ))}
      </p>
      <h2>{title}</h2>
      <p className="year">{year}</p>
    </article>
  );
}

export default MovieCard;
