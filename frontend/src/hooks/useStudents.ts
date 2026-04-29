import { useState, useEffect, useCallback } from 'react';
import { Student, CreateStudentDTO, UpdateStudentDTO, Stats } from '../types';
import { studentService } from '../services/api';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await studentService.getAll({
        search: search || undefined,
        subject: filterSubject || undefined,
        grade: filterGrade || undefined,
      });
      if (res.success && res.data) setStudents(res.data);
    } catch {
      setError('Failed to fetch students. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [search, filterSubject, filterGrade]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await studentService.getStats();
      if (res.success && res.data) setStats(res.data);
    } catch {}
  }, []);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);
  useEffect(() => { fetchStats(); }, [fetchStats, students]);

  const createStudent = async (data: CreateStudentDTO): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await studentService.create(data);
      if (res.success) { await fetchStudents(); return { success: true }; }
      return { success: false, error: res.error };
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to create student';
      return { success: false, error: message };
    }
  };

  const updateStudent = async (id: string, data: UpdateStudentDTO): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await studentService.update(id, data);
      if (res.success) { await fetchStudents(); return { success: true }; }
      return { success: false, error: res.error };
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to update student';
      return { success: false, error: message };
    }
  };

  const deleteStudent = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await studentService.delete(id);
      if (res.success) { await fetchStudents(); return { success: true }; }
      return { success: false, error: res.error };
    } catch {
      return { success: false, error: 'Failed to delete student' };
    }
  };

  return {
    students, stats, loading, error,
    search, setSearch,
    filterSubject, setFilterSubject,
    filterGrade, setFilterGrade,
    createStudent, updateStudent, deleteStudent,
    refetch: fetchStudents,
  };
};
