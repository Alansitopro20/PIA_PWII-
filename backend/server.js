import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/guia_turistica';


mongoose.connect(MONGO_URI)
  .then(()=> console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error MongoDB:', err));


app.use('/api/auth', authRouter);


app.get('/', (req, res) => res.json({ ok: true, message: 'Backend funcionando' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`🚀 Backend en http://localhost:${PORT}`));
