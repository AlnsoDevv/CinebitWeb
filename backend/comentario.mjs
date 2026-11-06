import mongoose from 'mongoose';

const esquema = new mongoose.Schema({
  peliculaId: {
    type: String,
    required: true,
    index: true
  },
  usuario: {
    type: String,
    required: true,
    trim: true
  },
  texto: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  fecha: {
    type: String,
    default: () => new Date().toLocaleDateString()
  }
}, { timestamps: true });

export const Comentario = mongoose.model('Comentario', esquema, 'comentarios');