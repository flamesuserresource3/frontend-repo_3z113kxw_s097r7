import React from 'react';
import { GraduationCap } from 'lucide-react';

const DEFAULT_MAJORS = ['X-RPL', 'XI-RPL', 'XII-RPL', 'X-BD', 'XI-BD', 'XII-BD', 'X-AK', 'XI-AK', 'XII-AK', 'X-BR', 'XI-BR', 'XII-BR'];

export default function MajorSelector({ value, onChange, majors = DEFAULT_MAJORS }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {majors.map((m) => {
        const active = value === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={`flex items-center gap-2 px-3 py-3 rounded-xl border transition shadow-sm hover:shadow ${
              active
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-700 border-emerald-200 hover:border-emerald-400'
            }`}
          >
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${active ? 'bg-white/20' : 'bg-emerald-50'} text-emerald-700`}>
              <GraduationCap size={18} />
            </div>
            <div className="text-left">
              <div className="font-semibold">{m}</div>
              <div className={`text-xs ${active ? 'text-emerald-50' : 'text-gray-500'}`}>Pilih</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
