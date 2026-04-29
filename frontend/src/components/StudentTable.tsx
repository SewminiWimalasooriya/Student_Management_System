import React from 'react';
import { Student } from '../types';

interface Props {
  students: Student[];
  loading: boolean;
  onView: (s: Student) => void;
  onEdit: (s: Student) => void;
  onDelete: (s: Student) => void;
}

const gradeColor: Record<string, string> = {
  'A+': '#059669', 'A': '#10b981', 'B+': '#3b82f6', 'B': '#60a5fa',
  'C+': '#f59e0b', 'C': '#fbbf24', 'D': '#f97316', 'F': '#ef4444',
};

const GradeBadge: React.FC<{ grade: string }> = ({ grade }) => (
  <span style={{
    display: 'inline-block',
    background: (gradeColor[grade] ?? '#6b7280') + '20',
    color: gradeColor[grade] ?? '#6b7280',
    border: `1px solid ${(gradeColor[grade] ?? '#6b7280')}40`,
    borderRadius: 6,
    padding: '2px 10px',
    fontSize: 12,
    fontWeight: 700,
  }}>
    {grade}
  </span>
);

const StudentTable: React.FC<Props> = ({ students, loading, onView, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
        <p>Loading students...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
        <p style={{ fontSize: 16, fontWeight: 500 }}>No students found</p>
        <p style={{ fontSize: 14 }}>Try adjusting your search or add a new student.</p>
      </div>
    );
  }

  const thStyle: React.CSSProperties = {
    padding: '12px 16px', textAlign: 'left', fontSize: 12,
    fontWeight: 600, color: '#6b7280', textTransform: 'uppercase',
    letterSpacing: '0.05em', borderBottom: '1px solid #e5e7eb',
    background: '#f9fafb',
  };

  const tdStyle: React.CSSProperties = {
    padding: '14px 16px', fontSize: 14, color: '#374151',
    borderBottom: '1px solid #f3f4f6', verticalAlign: 'middle',
  };

  return (
    <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Student</th>
            <th style={thStyle}>Subject</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Grade</th>
            <th style={thStyle}>Enrolled</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr
              key={s._id}
              style={{ transition: 'background 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
            >
              <td style={{ ...tdStyle, color: '#9ca3af', fontWeight: 500 }}>{i + 1}</td>
              <td style={tdStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#eef2ff', color: '#6366f1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13, flexShrink: 0,
                  }}>
                    {s.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, color: '#111827', fontSize: 14 }}>{s.name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>{s.email}</p>
                  </div>
                </div>
              </td>
              <td style={tdStyle}>
                <span style={{
                  background: '#eff6ff', color: '#3b82f6',
                  padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                }}>
                  {s.subject}
                </span>
              </td>
              <td style={tdStyle}>{s.age}</td>
              <td style={tdStyle}><GradeBadge grade={s.grade} /></td>
              <td style={tdStyle}>{new Date(s.enrolledDate).toLocaleDateString()}</td>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                  <button
                    onClick={() => onView(s)}
                    title="View"
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 14 }}
                  >👁</button>
                  <button
                    onClick={() => onEdit(s)}
                    title="Edit"
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: 14 }}
                  >✏️</button>
                  <button
                    onClick={() => onDelete(s)}
                    title="Delete"
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', fontSize: 14 }}
                  >🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
