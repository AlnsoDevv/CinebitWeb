import mongoose from 'mongoose';

const esquema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  }
}, { timestamps: true });

export const Usuario = mongoose.model('Usuario', esquema, 'usuarios');