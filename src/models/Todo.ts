import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  userId: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
