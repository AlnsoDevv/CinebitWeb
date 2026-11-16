import { useEffect, useState } from "react";
import "./Admin.css";

function Admin({peliculas, onPeliculaCreada, onPeliculaEliminada}) {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");
    const [busquedaUsuario, setBusquedaUsuario] = useState("");
    const [busquedaPelicula, setBusquedaPelicula] = useState("");
    const [formPelicula, setFormPelicula] = useState({
        title: "",
        genre: "",
        year: "",
        rating: "",
        posterUrl: "",
        trailerUrl: "",
        description: ""
    });

    useEffect(() => {
        async function cargarUsuarios() {
            try {
                const res = await fetch("/api/usuarios");

                if (!res.ok) {
                    throw new Error("No se pudieron cargar los usuarios");
                }

                const data = await res.json();
                setUsuarios(data);
            } catch (err) {
                setError(err.message);
            }
        }

        cargarUsuarios();
    }, []);

    const cambiarRol = async (usuarioId, nuevoRol) => {
        try {
            const res = await fetch(`/api/usuarios/${usuarioId}/rol`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ rol: nuevoRol })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error al cambiar rol");
            }

            const actualizado = await res.json();

            setUsuarios((actuales) =>
                actuales.map((usuario) =>
                    usuario._id === actualizado._id ? actualizado : usuario
                )
            );
        } catch (err) {
            alert(err.message);
        }
    };

    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.email.toLowerCase().includes(busquedaUsuario.toLowerCase())
    );

    const handlePeliculaChange = (e) => {
        const { name, value } = e.target;

        setFormPelicula((actual) => ({
            ...actual,
            [name]: value
        }));
    };

    const agregarPelicula = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/peliculas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formPelicula,
                    year: Number(formPelicula.year),
                    rating: Number(formPelicula.rating)
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al agregar pelicula");
            }

            onPeliculaCreada(data);

            setFormPelicula({
                title: "",
                genre: "",
                year: "",
                rating: "",
                posterUrl: "",
                trailerUrl: "",
                description: ""
            });

        } catch (err) {
            alert(err.message);
        }
    };

    const eliminarPelicula = async (id) => {
        const confirmar = window.confirm(
            "¿Seguro que quieres eliminar esta película?"
        );

        if (!confirmar) return;

        try {
            const res = await fetch(`/api/peliculas/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error al eliminar pelicula");
            }

            onPeliculaEliminada(id);

        } catch (err) {
            alert(err.message);
        }
    };

    const peliculasFiltradas = peliculas.filter((pelicula) =>
        pelicula.title
            .toLowerCase()
            .includes(busquedaPelicula.toLowerCase())
    );

    return (
        <main className="admin-page">
            <h1>Panel de Administración</h1>

            {error && <p>{error}</p>}

            <section className="admin-section">
                <h2>Películas</h2>

                <form className="admin-movie-form" onSubmit={agregarPelicula}>
                    <input
                        name="title"
                        placeholder="Título"
                        value={formPelicula.title}
                        onChange={handlePeliculaChange}
                        required
                    />

                    <input
                        name="genre"
                        placeholder="Género"
                        value={formPelicula.genre}
                        onChange={handlePeliculaChange}
                        required
                    />

                    <input
                        name="year"
                        type="number"
                        placeholder="Año"
                        value={formPelicula.year}
                        onChange={handlePeliculaChange}
                        required
                    />

                    <input
                        name="rating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="Rating 0-10"
                        value={formPelicula.rating}
                        onChange={handlePeliculaChange}
                        required
                    />

                    <input
                        name="posterUrl"
                        placeholder="URL del poster"
                        value={formPelicula.posterUrl}
                        onChange={handlePeliculaChange}
                        required
                    />

                    <input
                        name="trailerUrl"
                        placeholder="URL del trailer"
                        value={formPelicula.trailerUrl}
                        onChange={handlePeliculaChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formPelicula.description}
                        onChange={handlePeliculaChange}
                    />

                    <button type="submit">
                        Agregar película
                    </button>
                </form>

                <input
                    className="admin-search"
                    placeholder="Buscar película..."
                    value={busquedaPelicula}
                    onChange={(e) => setBusquedaPelicula(e.target.value)}
                />

                {peliculasFiltradas.map((pelicula) => (
                    <div className="admin-user" key={pelicula._id}>
            <span>
                {pelicula.title} ({pelicula.year})
            </span>

                        <button
                            className="admin-delete"
                            onClick={() => eliminarPelicula(pelicula._id)}
                            title="Eliminar película"
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="rgb(219, 42, 42)"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-1 11H8L7 9Zm2.5 2v7h2v-7h-2Zm3 0v7h2v-7h-2Z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </section>

            <section className="admin-section">
                <h2>Usuarios</h2>

                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={busquedaUsuario}
                    onChange={(e) => setBusquedaUsuario(e.target.value)}
                    className="admin-search"
                />

                {usuariosFiltrados.map((usuario) => (
                    <div className="admin-user" key={usuario._id}>
                        <span>{usuario.email}</span>

                        <select
                            value={usuario.rol}
                            onChange={(e) =>
                                cambiarRol(usuario._id, e.target.value)
                            }
                        >
                            <option value="usuario">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Admin;