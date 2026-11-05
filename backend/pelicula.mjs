import mongoose from 'mongoose';

const esquema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  posterUrl: {
    type: String,
    required: true,
    trim: true
  },
  trailerUrl: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

export const Pelicula = mongoose.model('Pelicula', esquema, 'peliculas');