import React from 'react';
import { Stats } from '../types';

interface Props {
  stats: Stats | null;
}

const StatCard: React.FC<{ label: string; value: string | number; color: string }> = ({ label, value, color }) => (
  <div style={{
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: '1.25rem 1.5rem',
    borderTop: `4px solid ${color}`,
    flex: 1,
    minWidth: 140,
  }}>
    <p style={{ margin: 0, fontSize: 13, color: '#6b7280', marginBottom: 6 }}>{label}</p>
    <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#111827' }}>{value}</p>
  </div>
);

const StatsBar: React.FC<Props> = ({ stats }) => {
  if (!stats) return null;
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
      <StatCard label="Total Students" value={stats.total} color="#6366f1" />
      <StatCard label="Subjects" value={stats.subjects} color="#10b981" />
      <StatCard label="Average Age" value={stats.avgAge} color="#f59e0b" />
      <StatCard label="Top Grade" value={
        Object.entries(stats.gradeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
      } color="#ef4444" />
    </div>
  );
};

export default StatsBar;
