import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Pelicula } from './pelicula.mjs';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Validación para rutas con :id (Lámina 11)
app.param('id', (req, res, next) => {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ error: 'ID invalido' });
  }
  next();
});

// Ruta de comprobación de salud (Lámina 9 Clase 13)
app.get('/api/salud', (req, res) => {
  res.json({ ok: true });
});

// GET: Obtener todas las películas (Lámina 12)
app.get('/api/peliculas', async (req, res) => {
  const peliculas = await Pelicula.find();
  res.json(peliculas);
});

// GET: Obtener una película por ID (Lámina 12)
app.get('/api/peliculas/:id', async (req, res) => {
  const pelicula = await Pelicula.findById(req.params.id);
  if (!pelicula) {
    return res.status(404).json({ error: 'No existe' });
  }
  res.json(pelicula);
});

// POST: Crear una película (Lámina 13)
app.post('/api/peliculas', async (req, res) => {
  const { title, genre, year, rating, posterUrl, trailerUrl, description } = req.body ?? {};

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Titulo invalido' });
  }

  const nueva = await Pelicula.create({
    title: title.trim(),
    genre,
    year,
    rating,
    posterUrl,
    trailerUrl,
    description
  });

  res.status(201).json(nueva);
});

// DELETE: Eliminar una película por ID (Lámina 15)
app.delete('/api/peliculas/:id', async (req, res) => {
  const borrado = await Pelicula.findByIdAndDelete(req.params.id);
  if (!borrado) {
    return res.status(404).json({ error: 'No existe' });
  }
  res.status(204).end();
});

// Manejo de rutas inexistentes y errores (Lámina 16)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  const entrada = ['ValidationError', 'CastError'].includes(err.name) || err.type === 'entity.parse.failed';
  res.status(entrada ? 400 : 500).json({
    error: entrada ? 'Datos invalidos' : 'Error interno'
  });
});

// Conectar a MongoDB y arrancar servidor (Lámina 9)
await mongoose.connect(process.env.MONGODB_URI);
console.log(' Conectado exitosamente a MongoDB');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`);
});