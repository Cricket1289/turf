import express from 'express';
import { supabase } from '../supabaseClient.js';
import crypto from 'crypto';

const router = express.Router();

// Create a new team
router.post('/create', async (req, res) => {
  try {
    const { teamName, captainId } = req.body;

    if (!teamName || !captainId) {
      return res.status(400).json({ error: 'Team name and Captain ID are required' });
    }

    // Generate unique 6-char team code
    const teamCode = crypto.randomBytes(3).toString('hex').toUpperCase();

    // 1. Create Team
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .insert([{ team_name: teamName, team_code: teamCode, captain_id: captainId }])
      .select();

    if (teamError) throw teamError;

    const team = teamData[0];

    // 2. Update Player with team_id and is_captain = true
    const { error: playerError } = await supabase
      .from('players')
      .update({ team_id: team.id, is_captain: true })
      .eq('id', captainId);

    if (playerError) throw playerError;

    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    console.error('Team creation error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Join a team using team code
router.post('/join', async (req, res) => {
  try {
    const { teamCode, playerId } = req.body;

    if (!teamCode || !playerId) {
      return res.status(400).json({ error: 'Team code and Player ID are required' });
    }

    // 1. Find team by code
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('id, team_name')
      .eq('team_code', teamCode.toUpperCase())
      .single();

    if (teamError || !teamData) {
      return res.status(404).json({ error: 'Invalid team code' });
    }

    const team = teamData;

    // 2. Check if team is full (max 8)
    const { count, error: countError } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', team.id);

    if (countError) throw countError;

    if (count >= 8) {
      return res.status(400).json({ error: 'Team is already full (max 8 players)' });
    }

    // 3. Update player with team_id
    const { error: updateError } = await supabase
      .from('players')
      .update({ team_id: team.id })
      .eq('id', playerId);

    if (updateError) throw updateError;

    res.status(200).json({ message: 'Joined team successfully', team });
  } catch (error) {
    console.error('Join team error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get team details and members
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select(`
        *,
        players (*)
      `)
      .eq('id', id)
      .single();

    if (teamError) throw teamError;

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
