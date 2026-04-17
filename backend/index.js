import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { supabase } from './supabaseClient.js';
import registrationRoutes from './routes/registration.js';
import teamRoutes from './routes/teams.js';
import adminRoutes from './routes/admin.js';
import tournamentRoutes from './routes/tournament.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/registration', registrationRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tournament', tournamentRoutes);

app.get('/', (req, res) => {
  res.send('Ottobon Box Cricket Tournament API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
