import React from 'react';

const SUBJECTS = ['', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Art'];
const GRADES = ['', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];

interface Props {
  search: string;
  onSearch: (v: string) => void;
  filterSubject: string;
  onSubject: (v: string) => void;
  filterGrade: string;
  onGrade: (v: string) => void;
  onAdd: () => void;
  total: number;
}

const inputStyle: React.CSSProperties = {
  padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8,
  fontSize: 14, outline: 'none', background: '#fff', color: '#111827',
};

const SearchBar: React.FC<Props> = ({
  search, onSearch, filterSubject, onSubject, filterGrade, onGrade, onAdd, total
}) => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
    <div style={{ position: 'relative', flex: '1 1 200px' }}>
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
      <input
        type="text"
        placeholder="Search by name, email or subject..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        style={{ ...inputStyle, paddingLeft: 34, width: '100%', boxSizing: 'border-box' }}
      />
    </div>

    <select value={filterSubject} onChange={(e) => onSubject(e.target.value)} style={inputStyle}>
      <option value="">All Subjects</option>
      {SUBJECTS.filter(Boolean).map((s) => <option key={s}>{s}</option>)}
    </select>

    <select value={filterGrade} onChange={(e) => onGrade(e.target.value)} style={inputStyle}>
      <option value="">All Grades</option>
      {GRADES.filter(Boolean).map((g) => <option key={g}>{g}</option>)}
    </select>

    <span style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'nowrap' }}>{total} result{total !== 1 ? 's' : ''}</span>

    <button
      onClick={onAdd}
      style={{
        marginLeft: 'auto', padding: '10px 20px', borderRadius: 8, border: 'none',
        background: '#6366f1', color: '#fff', cursor: 'pointer',
        fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
        display: 'flex', alignItems: 'center', gap: 6,
      }}
    >
      + Add Student
    </button>
  </div>
);

export default SearchBar;
