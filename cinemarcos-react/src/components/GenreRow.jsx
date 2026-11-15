import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

function GenreRow({ titulo, peliculas, onSelectMovie }) {
    const track = useRef(null);

    const [visibles, setVisibles] = useState(8);
    const [indice, setIndice] = useState(peliculas.length);
    const [distancia, setDistancia] = useState(0);
    const [animando, setAnimando] = useState(false);

    useEffect(() => {
        const actualizarVisibles = () => {
            if (window.innerWidth <= 600) {
                setVisibles(3);
            } else if (window.innerWidth <= 1100) {
                setVisibles(5);
            } else {
                setVisibles(8);
            }
        };

        actualizarVisibles();

        window.addEventListener("resize", actualizarVisibles);

        return () => {
            window.removeEventListener("resize", actualizarVisibles);
        };
    }, []);

    const puedeMover = peliculas.length > visibles;

    const peliculasCarrusel = puedeMover
        ? [...peliculas, ...peliculas, ...peliculas]
        : peliculas;

    useLayoutEffect(() => {
        const calcularDistancia = () => {
            const tarjeta = track.current?.querySelector(".movie");

            if (!tarjeta) return;

            const estilos = window.getComputedStyle(track.current);
            const gap = parseFloat(estilos.gap) || 0;

            setDistancia(
                tarjeta.getBoundingClientRect().width + gap
            );
        };

        calcularDistancia();

        window.addEventListener("resize", calcularDistancia);

        return () => {
            window.removeEventListener("resize", calcularDistancia);
        };
    }, [peliculas.length, visibles]);

    useEffect(() => {
        if (puedeMover) {
            setIndice(peliculas.length);
        } else {
            setIndice(0);
        }

        setAnimando(false);
    }, [peliculas.length, puedeMover]);

    const moverFila = (direccion) => {
        if (!puedeMover || animando || distancia === 0) return;

        setAnimando(true);
        setIndice((actual) => actual + direccion);
    };

    const terminarMovimiento = () => {
        setAnimando(false);

        if (!puedeMover) return;

        if (indice >= peliculas.length * 2) {
            setIndice((actual) => actual - peliculas.length);
        }

        if (indice < peliculas.length) {
            setIndice((actual) => actual + peliculas.length);
        }
    };

    return (
        <section className="genre-row">
            <h2 className="genre-title">{titulo}</h2>

            <div className="genre-row-content">

                {puedeMover && (
                    <div className="genre-arrow-box">
                        <button
                            className="genre-arrow"
                            onClick={() => moverFila(-1)}
                        >
                            ‹
                        </button>
                    </div>
                )}

                <div className="genre-row-list">
                    <div
                        className="genre-row-track"
                        ref={track}
                        onTransitionEnd={terminarMovimiento}
                        style={{
                            transform: `translateX(-${indice * distancia}px)`,
                            transition: animando
                                ? "transform 0.35s ease"
                                : "none"
                        }}
                    >
                        {peliculasCarrusel.map((pelicula, index) => (
                            <MovieCard
                                key={`${pelicula._id || pelicula.id}-${index}`}
                                id={pelicula._id || pelicula.id}
                                title={pelicula.title}
                                posterUrl={pelicula.posterUrl}
                                rating={pelicula.rating / 2}
                                onSelectMovie={onSelectMovie}
                            />
                        ))}
                    </div>
                </div>

                {puedeMover && (
                    <div className="genre-arrow-box">
                        <button
                            className="genre-arrow"
                            onClick={() => moverFila(1)}
                        >
                            ›
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}

export default GenreRow;