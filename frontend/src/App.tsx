import React, { useState, useCallback } from 'react';
import { Student, CreateStudentDTO, ModalMode } from './types';
import { useStudents } from './hooks/useStudents';
import StatsBar from './components/StatsBar';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import DeleteConfirm from './components/DeleteConfirm';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

const App: React.FC = () => {
  const {
    students, stats, loading, error,
    search, setSearch,
    filterSubject, setFilterSubject,
    filterGrade, setFilterGrade,
    createStudent, updateStudent, deleteStudent,
  } = useStudents();

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  const handleView = (s: Student) => { setSelectedStudent(s); setModalMode('view'); };
  const handleEdit = (s: Student) => { setSelectedStudent(s); setModalMode('edit'); };
  const handleAdd = () => { setSelectedStudent(null); setModalMode('create'); };
  const handleCloseModal = () => { setModalMode(null); setSelectedStudent(null); };

  const handleSubmit = async (data: CreateStudentDTO) => {
    if (modalMode === 'create') {
      const result = await createStudent(data);
      if (result.success) showToast('Student added successfully!', 'success');
      return result;
    } else if (modalMode === 'edit' && selectedStudent) {
      const result = await updateStudent(selectedStudent._id, data);
      if (result.success) showToast('Student updated successfully!', 'success');
      return result;
    }
    return { success: false, error: 'Unknown mode' };
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const result = await deleteStudent(deleteTarget._id);
    setDeleteTarget(null);
    if (result.success) {
      showToast(`${deleteTarget.name} has been deleted.`, 'success');
    } else {
      showToast(result.error || 'Failed to delete student', 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🎓</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Student Management System</span>
          </div>
          <span style={{
            background: '#eef2ff', color: '#6366f1',
            padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
          }}>
            {students.length} Students
          </span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10,
            padding: '12px 16px', marginBottom: 20, color: '#dc2626', fontSize: 14,
          }}>
            ⚠️ {error} — Make sure the backend is running on port 5000.
          </div>
        )}

        <StatsBar stats={stats} />

        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <SearchBar
            search={search}
            onSearch={setSearch}
            filterSubject={filterSubject}
            onSubject={setFilterSubject}
            filterGrade={filterGrade}
            onGrade={setFilterGrade}
            onAdd={handleAdd}
            total={students.length}
          />
          <StudentTable
            students={students}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={(s) => setDeleteTarget(s)}
          />
        </div>

        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 16 }}>
          Student Management System — React + TypeScript + Node.js
        </p>
      </div>

      {/* Modals */}
      {modalMode && (
        <StudentForm
          mode={modalMode}
          student={selectedStudent}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}

      {deleteTarget && (
        <DeleteConfirm
          student={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;
