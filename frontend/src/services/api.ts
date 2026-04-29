import axios from 'axios';
import { Student, CreateStudentDTO, UpdateStudentDTO, ApiResponse, Stats } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const studentService = {
  getAll: async (params?: { search?: string; subject?: string; grade?: string }): Promise<ApiResponse<Student[]>> => {
    const res = await api.get<ApiResponse<Student[]>>('/students', { params });
    return res.data;
  },

  getById: async (id: string): Promise<ApiResponse<Student>> => {
    const res = await api.get<ApiResponse<Student>>(`/students/${id}`);
    return res.data;
  },

  create: async (data: CreateStudentDTO): Promise<ApiResponse<Student>> => {
    const res = await api.post<ApiResponse<Student>>('/students', data);
    return res.data;
  },

  update: async (id: string, data: UpdateStudentDTO): Promise<ApiResponse<Student>> => {
    const res = await api.put<ApiResponse<Student>>(`/students/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<ApiResponse<Student>> => {
    const res = await api.delete<ApiResponse<Student>>(`/students/${id}`);
    return res.data;
  },

  getStats: async (): Promise<ApiResponse<Stats>> => {
    const res = await api.get<ApiResponse<Stats>>('/students/stats/summary');
    return res.data;
  },
};
