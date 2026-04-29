import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  age: number;
  grade: string;
  subject: string;
  enrolledDate: string;
}

const StudentSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    age: { type: Number, required: [true, 'Age is required'], min: [5, 'Age must be at least 5'], max: [100, 'Age must be under 100'] },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      enum: { values: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'], message: '{VALUE} is not a valid grade' },
    },
    subject: { type: String, required: [true, 'Subject is required'], trim: true },
    enrolledDate: { type: String, required: [true, 'Enrolled date is required'] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model<IStudent>('Student', StudentSchema);
