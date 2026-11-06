import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import * as argon2 from 'argon2';
import { rateLimit } from 'express-rate-limit';
import { Pelicula } from './pelicula.mjs';
import { Usuario } from './usuario.mjs';

const app = express();
const produccion = process.env.NODE_ENV === 'production';

if (!process.env.SESSION_SECRET) {
  throw new Error('Falta SESSION_SECRET en el archivo .env');
}

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

if (produccion) app.set('trust proxy', 1);

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: produccion,
    maxAge: 60 * 60 * 1000
  }
}));

async function requiereUsuario(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Iniciar sesion' });
  }
  const u = await Usuario.findById(req.session.userId);
  if (!u) {
    return res.status(401).json({ error: 'Sesion invalida' });
  }
  req.usuario = u;
  next();
}

function requiereAdmin(req, res, next) {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Sin permiso' });
  }
  next();
}

const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: 'Demasiados intentos' }
});

app.post('/api/login', limiteLogin, async (req, res, next) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || email.length > 254 || typeof password !== 'string' || password.length > 128) {
    return res.status(400).json({ error: 'Datos invalidos' });
  }

  const u = await Usuario.findOne({
    email: email.trim().toLowerCase()
  }).select('+passwordHash');

  const valida = u && await argon2.verify(u.passwordHash, password);
  if (!valida) {
    return res.status(401).json({ error: 'Credenciales invalidas' });
  }

  req.session.regenerate(err => {
    if (err) return next(err);
    req.session.userId = String(u._id);
    req.session.save(err => {
      if (err) return next(err);
      res.json({ email: u.email, rol: u.rol });
    });
  });
});

app.post('/api/registro', async (req, res, next) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || !email.includes('@') || email.length > 254 ||
      typeof password !== 'string' || password.length < 6 || password.length > 128) {
    return res.status(400).json({ error: 'Datos invalidos (la contraseña debe tener al menos 6 caracteres)' });
  }

  const emailLimpio = email.trim().toLowerCase();
  const existe = await Usuario.findOne({ email: emailLimpio });
  if (existe) {
    return res.status(400).json({ error: 'El correo ya esta registrado' });
  }

  const passwordHash = await argon2.hash(password);
  const nuevo = await Usuario.create({
    email: emailLimpio,
    passwordHash,
    rol: 'usuario'
  });

  req.session.regenerate(err => {
    if (err) return next(err);
    req.session.userId = String(nuevo._id);
    req.session.save(err => {
      if (err) return next(err);
      res.status(201).json({ email: nuevo.email, rol: nuevo.rol });
    });
  });
});

app.get('/api/me', requiereUsuario, (req, res) => {
  res.json({ email: req.usuario.email, rol: req.usuario.rol });
});

app.post('/api/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('sid', { path: '/', httpOnly: true, sameSite: 'lax', secure: produccion });
    res.status(204).end();
  });
});

app.param('id', (req, res, next) => {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ error: 'ID invalido' });
  }
  next();
});

app.get('/api/salud', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/peliculas', async (req, res) => {
  const peliculas = await Pelicula.find();
  res.json(peliculas);
});

app.get('/api/peliculas/:id', async (req, res) => {
  const pelicula = await Pelicula.findById(req.params.id);
  if (!pelicula) {
    return res.status(404).json({ error: 'No existe' });
  }
  res.json(pelicula);
});

app.post('/api/peliculas', requiereUsuario, async (req, res) => {
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

app.delete('/api/peliculas/:id', requiereUsuario, requiereAdmin, async (req, res) => {
  const borrado = await Pelicula.findByIdAndDelete(req.params.id);
  if (!borrado) {
    return res.status(404).json({ error: 'No existe' });
  }
  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  const entrada = ['ValidationError', 'CastError'].includes(err.name) || err.type === 'entity.parse.failed';
  res.status(entrada ? 400 : 500).json({
    error: entrada ? 'Datos invalidos' : 'Error interno'
  });
});

await mongoose.connect(process.env.MONGODB_URI);
console.log('Conectado exitosamente a MongoDB');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});