import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 }
});

export default mongoose.model('Experience', experienceSchema);
