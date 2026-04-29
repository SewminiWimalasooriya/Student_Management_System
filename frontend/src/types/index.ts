export interface Student {
  _id: string;
  id?: string;   // Mongoose virtual alias
  name: string;
  email: string;
  age: number;
  grade: string;
  subject: string;
  enrolledDate: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateStudentDTO = Omit<Student, '_id' | 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateStudentDTO = Partial<CreateStudentDTO>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Stats {
  total: number;
  subjects: number;
  gradeCount: Record<string, number>;
  avgAge: number;
}

export type ModalMode = 'create' | 'edit' | 'view' | null;
