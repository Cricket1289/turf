import express from 'express';
import { supabase } from '../supabaseClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({ token, admin: { username: admin.username, role: admin.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all players (Admin only)
router.get('/players', async (req, res) => {
  try {
    const { data: players, error } = await supabase
      .from('players')
      .select('*, teams(team_name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update registration status
router.patch('/players/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('players')
      .update({ registration_status: status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
