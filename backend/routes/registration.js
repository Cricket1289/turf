import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// Register a new player
router.post('/register', async (req, res) => {
  try {
    const { fullName, phoneNumber, collegeName, teamName, course, studentIdUrl, paymentScreenshotUrl } = req.body;

    // Validation
    if (!fullName || !phoneNumber || !collegeName || !teamName || !course || !studentIdUrl || !paymentScreenshotUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }

    const { data, error } = await supabase
      .from('players')
      .insert([
        { 
          full_name: fullName, 
          phone_number: phoneNumber, 
          college_name: collegeName, 
          team_name: teamName,
          course, 
          student_id_url: studentIdUrl, 
          payment_screenshot_url: paymentScreenshotUrl
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Registration successful', player: data[0] });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
