import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  perfilImg: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
