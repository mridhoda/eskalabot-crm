import mongoose from 'mongoose';

const KnowledgeSchema = new mongoose.Schema({
  kind: { type: String, enum: ['url', 'pdf', 'text', 'file', 'qna'], required: true },
  value: { type: String },
  question: { type: String },
  answer: { type: String },
}, { _id: false });

const FollowUpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trigger: { type: String, required: true },
  prompt: { type: String, required: true },
  delay: { type: Number, required: true }, // in minutes
}, { _id: false });

const DatabaseFileSchema = new mongoose.Schema({
  id: { type: String, required: true },
  originalName: { type: String, required: true },
  storedName: { type: String, required: true },
}, { _id: false });

const AgentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  platformId: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' },
  prompt: { type: String, default: '' },
  behavior: { type: String, default: '' },
  welcomeMessage: { type: String, default: 'Halo! Ada yang bisa saya bantu?' },
  stickerUrl: { type: String },
  knowledge: [KnowledgeSchema],
  followUps: [FollowUpSchema],
  database: [DatabaseFileSchema],
}, { timestamps: true });

export default mongoose.model('Agent', AgentSchema);