const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user resume data
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      profile: user.profile,
      achievements: user.achievements,
      resume: user.resume
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add achievement
router.post('/achievements', auth, async (req, res) => {
  try {
    const { type, title, organization, description, skills, startDate, endDate } = req.body;
    
    const user = await User.findById(req.user._id);
    user.achievements.push({
      type, title, organization, description, skills, startDate, endDate
    });
    
    await user.save();
    res.status(201).json(user.achievements[user.achievements.length - 1]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findById(req.user._id);
    
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        user.profile[key] = updates[key];
      }
    });
    
    await user.save();
    res.json(user.profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Generate resume (auto-summary)
router.post('/generate', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Simple auto-generation logic
    const skills = [...new Set(user.achievements.flatMap(a => a.skills || []))];
    const experienceCount = user.achievements.filter(a => a.type === 'internship').length;
    const projectCount = user.achievements.filter(a => a.type === 'project').length;
    
    const summary = `Motivated professional with ${experienceCount} internship${experienceCount !== 1 ? 's' : ''} and ${projectCount} project${projectCount !== 1 ? 's' : ''} completed. Skilled in ${skills.slice(0, 5).join(', ')}. Passionate about leveraging technology to solve real-world problems.`;
    
    user.profile.summary = summary;
    user.resume.lastGenerated = new Date();
    await user.save();
    
    res.json({ summary, skills, lastGenerated: user.resume.lastGenerated });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
