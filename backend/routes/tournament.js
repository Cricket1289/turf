import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// Get matches/bracket
router.get('/bracket', async (req, res) => {
  try {
    const { data: matches, error } = await supabase
      .from('matches')
      .select('*, team_a(team_name), team_b(team_name), winner_id(team_name)')
      .order('match_number', { ascending: true });

    if (error) throw error;
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update match result
router.patch('/match/:id', async (req, res) => {
  try {
    const { scoreA, scoreB, winnerId, isCompleted } = req.body;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('matches')
      .update({ 
        score_a: scoreA, 
        score_b: scoreB, 
        winner_id: winnerId, 
        is_completed: isCompleted 
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
