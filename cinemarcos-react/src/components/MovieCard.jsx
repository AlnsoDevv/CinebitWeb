import './MovieCard.css';

function MovieCard ({title, posterUrl, year, rating}) {
    return (<article className='movie'>
        <a href={`/peliculas/${title.replace(/\s+/g, '')}`}>
        <img className='poster' src={posterUrl} alt="`Póster de ${title}`}"/>
        </a>
        <p>
        <span className='stars'>
        <span className='star'>★</span>
        </span>
        <span className='rating-value'>{rating}</span>
        </p>
        <h2>{title}</h2>
        <p className='year'>{year}</p>
    </article>);
}

export default MovieCard;