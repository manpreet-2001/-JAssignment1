import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRouter from './routes/admin.js';
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up Pug
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Admin routes
app.use('/admin', adminRouter);

// Public resume route
app.get('/resume', async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1 });
  const skills = await Skill.find().sort({ order: 1 });
  res.render('resume', { experiences, skills });
});

// Redirect root to resume
app.get('/', (req, res) => res.redirect('/resume'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
