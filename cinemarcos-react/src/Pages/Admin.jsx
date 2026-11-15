import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");
    const [busquedaUsuario, setBusquedaUsuario] = useState("");

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

    return (
        <main className="admin-page">
            <h1>Panel de Administración</h1>

            {error && <p>{error}</p>}

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