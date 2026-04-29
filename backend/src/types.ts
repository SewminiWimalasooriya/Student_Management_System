export interface Student {
  _id: string;
  name: string;
  email: string;
  age: number;
  grade: string;
  subject: string;
  enrolledDate: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateStudentDTO = Omit<Student, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateStudentDTO = Partial<CreateStudentDTO>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
