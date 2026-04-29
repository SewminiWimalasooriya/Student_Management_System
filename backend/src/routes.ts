import { Router, Request, Response } from 'express';
import Student from './models/Student';
import { ApiResponse } from './types';

const router = Router();

// GET /api/students — get all with optional search/filter
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, subject, grade } = req.query;
    const query: Record<string, unknown> = {};

    if (search && typeof search === 'string') {
      const regex = new RegExp(search, 'i');
      query['$or'] = [{ name: regex }, { email: regex }, { subject: regex }];
    }
    if (subject && typeof subject === 'string') query['subject'] = subject;
    if (grade && typeof grade === 'string') query['grade'] = grade;

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: students, message: `${students.length} student(s) found` });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch students' });
  }
});

// GET /api/students/stats/summary
router.get('/stats/summary', async (_req: Request, res: Response) => {
  try {
    const total = await Student.countDocuments();
    const subjects = await Student.distinct('subject');
    const gradeAgg = await Student.aggregate([
      { $group: { _id: '$grade', count: { $sum: 1 } } }
    ]);
    const gradeCount: Record<string, number> = {};
    gradeAgg.forEach((g) => { gradeCount[g._id] = g.count; });
    const avgAgeResult = await Student.aggregate([{ $group: { _id: null, avg: { $avg: '$age' } } }]);
    const avgAge = avgAgeResult.length > 0 ? Math.round(avgAgeResult[0].avg) : 0;

    res.json({ success: true, data: { total, subjects: subjects.length, gradeCount, avgAge } });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

// GET /api/students/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: student });
  } catch {
    res.status(400).json({ success: false, error: 'Invalid student ID' });
  }
});

// POST /api/students
router.post('/', async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    const response: ApiResponse<typeof saved> = { success: true, data: saved, message: 'Student created successfully' };
    res.status(201).json(response);
  } catch (err: unknown) {
    const mongoErr = err as { code?: number; message?: string; errors?: Record<string, { message: string }> };
    if (mongoErr.code === 11000) {
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }
    if (mongoErr.errors) {
      const messages = Object.values(mongoErr.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(400).json({ success: false, error: 'Failed to create student' });
  }
});

// PUT /api/students/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: updated, message: 'Student updated successfully' });
  } catch (err: unknown) {
    const mongoErr = err as { code?: number; errors?: Record<string, { message: string }> };
    if (mongoErr.code === 11000) {
      return res.status(409).json({ success: false, error: 'Email already in use' });
    }
    if (mongoErr.errors) {
      const messages = Object.values(mongoErr.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(400).json({ success: false, error: 'Failed to update student' });
  }
});

// DELETE /api/students/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: deleted, message: 'Student deleted successfully' });
  } catch {
    res.status(400).json({ success: false, error: 'Invalid student ID' });
  }
});

export default router;
