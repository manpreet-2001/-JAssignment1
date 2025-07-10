import express from 'express';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';

const router = express.Router();

// Experiences admin page
router.get('/experiences', async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1 });
  res.render('experiences', { experiences, activePage: 'experiences' });
});

// Add experience
router.post('/experiences/add', async (req, res) => {
  const { title, description, order } = req.body;
  await Experience.create({ title, description, order });
  res.redirect('/admin/experiences');
});

// Delete experience
router.post('/experiences/delete/:id', async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.redirect('/admin/experiences');
});

// Skills admin page
router.get('/skills', async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.render('skills', { skills, activePage: 'skills' });
});

// Add skill
router.post('/skills/add', async (req, res) => {
  const { name, level, order } = req.body;
  await Skill.create({ name, level, order });
  res.redirect('/admin/skills');
});

// Delete skill
router.post('/skills/delete/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/admin/skills');
});

export default router;
