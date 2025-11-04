import React from 'react';
import { Calendar, LogOut, User, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ user, onLogout, onNavigate, current }) {
  return (
    <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-600 via-emerald-500 to-lime-400 text-white flex items-center justify-center shadow-md shadow-emerald-200"
          >
            <Calendar size={22} />
          </motion.div>
          <div>
            <div className="text-sm uppercase tracking-widest text-emerald-600 font-semibold">SiJadwal</div>
            <div className="text-gray-600 text-sm -mt-0.5">Jadwal Mengajar Guru</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'weekly', label: 'Mingguan' },
            { key: 'major', label: 'Per Jurusan' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className={`px-4 py-2 rounded-full transition shadow-sm hover:shadow-md text-sm font-medium flex items-center gap-2 border ${
                current === tab.key
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-emerald-200 hover:border-emerald-400'
              }`}
            >
              <LayoutGrid size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <User size={16} />
            <span className="text-sm font-medium truncate max-w-[160px]">{user?.name || 'Tamu'}</span>
          </div>
          {user && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-emerald-50 text-gray-700 border border-emerald-200 hover:border-emerald-400 transition shadow-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline text-sm">Keluar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
