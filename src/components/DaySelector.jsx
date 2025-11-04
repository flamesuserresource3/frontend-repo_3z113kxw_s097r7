import React from 'react';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export default function DaySelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {DAYS.map((d) => (
        <button
          key={d}
          onClick={() => onChange(d)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition shadow-sm hover:shadow ${
            value === d
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-gray-700 border-emerald-200 hover:border-emerald-400'
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
