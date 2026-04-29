import React, { useState, useEffect } from 'react';
import { Student, CreateStudentDTO, ModalMode } from '../types';

interface Props {
  mode: ModalMode;
  student?: Student | null;
  onSubmit: (data: CreateStudentDTO) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
}

const SUBJECTS = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Art'];
const GRADES = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

const EMPTY: CreateStudentDTO = {
  name: '', email: '', age: 18, grade: 'B', subject: 'Computer Science', enrolledDate: '',
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1px solid #d1d5db',
  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
  background: '#fff', color: '#111827',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 4,
};

const StudentForm: React.FC<Props> = ({ mode, student, onSubmit, onClose }) => {
  const [form, setForm] = useState<CreateStudentDTO>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateStudentDTO, string>>>({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isView = mode === 'view';
  const title = mode === 'create' ? 'Add New Student' : mode === 'edit' ? 'Edit Student' : 'Student Details';

  useEffect(() => {
    if (student && (mode === 'edit' || mode === 'view')) {
      const { _id, createdAt, updatedAt, ...rest } = student;
      void _id; void createdAt; void updatedAt;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
    setErrors({});
    setApiError('');
  }, [student, mode]);

  const validate = (): boolean => {
    const e: Partial<Record<keyof CreateStudentDTO, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.age || form.age < 5 || form.age > 100) e.age = 'Age must be between 5–100';
    if (!form.enrolledDate) e.enrolledDate = 'Enrolled date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'age' ? Number(value) : value }));
    if (errors[name as keyof CreateStudentDTO]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isView || !validate()) return;
    setSubmitting(true);
    setApiError('');
    const result = await onSubmit(form);
    setSubmitting(false);
    if (result.success) {
      onClose();
    } else {
      setApiError(result.error || 'Something went wrong');
    }
  };

  const Field: React.FC<{
    label: string; name: keyof CreateStudentDTO; type?: string;
    children?: React.ReactNode;
  }> = ({ label, name, type = 'text', children }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {children ?? (
        <input
          type={type}
          name={name}
          value={form[name] as string}
          onChange={handleChange}
          disabled={isView}
          style={{ ...inputStyle, borderColor: errors[name] ? '#ef4444' : '#d1d5db' }}
        />
      )}
      {errors[name] && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#ef4444' }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16, padding: '2rem',
          width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>{title}</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#6b7280' }}
          >×</button>
        </div>

        {apiError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#dc2626', fontSize: 14 }}>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Full Name" name="name" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Email Address" name="email" type="email" />
            </div>
            <Field label="Age" name="age" type="number" />
            <Field label="Enrolled Date" name="enrolledDate" type="date" />
            <Field label="Subject" name="subject">
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                disabled={isView}
                style={inputStyle}
              >
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Grade" name="grade">
              <select
                name="grade"
                value={form.grade}
                onChange={handleChange}
                disabled={isView}
                style={inputStyle}
              >
                {GRADES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
          </div>

          {!isView && (
            <div style={{ display: 'flex', gap: 12, marginTop: 8, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 20px', borderRadius: 8, border: '1px solid #d1d5db',
                  background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#374151',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '10px 24px', borderRadius: 8, border: 'none',
                  background: submitting ? '#a5b4fc' : '#6366f1',
                  color: '#fff', cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: 14, fontWeight: 600,
                }}
              >
                {submitting ? 'Saving...' : mode === 'create' ? 'Add Student' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
