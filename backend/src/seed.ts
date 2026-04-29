import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './models/Student';

dotenv.config();

const seedStudents = [
  { name: 'Alice Johnson', email: 'alice.johnson@school.edu', age: 20, grade: 'A', subject: 'Computer Science', enrolledDate: '2023-09-01' },
  { name: 'Bob Smith', email: 'bob.smith@school.edu', age: 22, grade: 'B', subject: 'Mathematics', enrolledDate: '2023-09-01' },
  { name: 'Carol White', email: 'carol.white@school.edu', age: 19, grade: 'A+', subject: 'Physics', enrolledDate: '2024-01-15' },
  { name: 'David Brown', email: 'david.brown@school.edu', age: 21, grade: 'C', subject: 'Chemistry', enrolledDate: '2023-09-01' },
  { name: 'Eva Martinez', email: 'eva.martinez@school.edu', age: 23, grade: 'B+', subject: 'Biology', enrolledDate: '2022-09-01' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/student_management');
    console.log('Connected to MongoDB');

    await Student.deleteMany({});
    console.log('Cleared existing students');

    const created = await Student.insertMany(seedStudents);
    console.log(`✅ Seeded ${created.length} students`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();
