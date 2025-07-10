import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  order: { type: Number, default: 0 }
});

export default mongoose.model('Skill', skillSchema);
