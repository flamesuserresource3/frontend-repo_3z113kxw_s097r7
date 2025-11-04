import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Clock, User } from 'lucide-react';
import Navbar from './components/Navbar';
import ScheduleCard from './components/ScheduleCard';
import DaySelector from './components/DaySelector';
import MajorSelector from './components/MajorSelector';

const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const MOCK_SCHEDULES = [
  // Senin
  { day: 'Senin', jamKe: 1, timeStart: '07:00', timeEnd: '07:45', major: 'X-RPL', className: 'RPL-1', subject: 'Pemrograman Dasar', location: 'Lab RPL 1' },
  { day: 'Senin', jamKe: 2, timeStart: '07:45', timeEnd: '08:30', major: 'X-RPL', className: 'RPL-1', subject: 'Pemrograman Dasar', location: 'Lab RPL 1' },
  { day: 'Senin', jamKe: 4, timeStart: '09:30', timeEnd: '10:15', major: 'XI-BD', className: 'BD-2', subject: 'Basis Data', location: 'Lab Basis Data' },
  // Selasa
  { day: 'Selasa', jamKe: 3, timeStart: '08:30', timeEnd: '09:15', major: 'XI-RPL', className: 'RPL-2', subject: 'PBO', location: 'Lab RPL 2' },
  { day: 'Selasa', jamKe: 4, timeStart: '09:15', timeEnd: '10:00', major: 'XI-RPL', className: 'RPL-2', subject: 'PBO', location: 'Lab RPL 2' },
  // Rabu
  { day: 'Rabu', jamKe: 1, timeStart: '07:00', timeEnd: '07:45', major: 'XII-AK', className: 'AK-1', subject: 'Akuntansi', location: 'Kelas 3' },
  // Kamis
  { day: 'Kamis', jamKe: 5, timeStart: '10:15', timeEnd: '11:00', major: 'X-BR', className: 'BR-1', subject: 'Bahasa Inggris', location: 'Kelas 7' },
  // Jumat
  { day: 'Jumat', jamKe: 2, timeStart: '07:45', timeEnd: '08:30', major: 'X-BD', className: 'BD-1', subject: 'Basis Data', location: 'Lab BD' },
];

function gradientBg() {
  return (
    <div className="fixed inset-0 -z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100" />
      <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: 'radial-gradient(800px 400px at 10% 10%, rgba(16,185,129,0.15), transparent), radial-gradient(600px 300px at 90% 20%, rgba(101,163,13,0.12), transparent), radial-gradient(700px 350px at 30% 80%, rgba(16,185,129,0.12), transparent)' }} />
    </div>
  );
}

export default function App() {
  const todayName = DAYS_ID[new Date().getDay()] || 'Senin';
  const [page, setPage] = useState('login');
  const [remember, setRemember] = useState(true);
  const [user, setUser] = useState(null);

  const [selectedDay, setSelectedDay] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].includes(todayName) ? todayName : 'Senin');
  const [selectedMajor, setSelectedMajor] = useState('X-RPL');

  const todaySchedules = useMemo(() => {
    return [...MOCK_SCHEDULES]
      .filter((s) => s.day === selectedDay)
      .sort((a, b) => a.timeStart.localeCompare(b.timeStart));
  }, [selectedDay]);

  const weeklyGroups = useMemo(() => {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    const map = {};
    days.forEach((d) => (map[d] = []));
    MOCK_SCHEDULES.forEach((s) => {
      if (map[s.day]) map[s.day].push(s);
    });
    Object.keys(map).forEach((k) => map[k].sort((a, b) => a.jamKe - b.jamKe));
    return map;
  }, []);

  const majorGroups = useMemo(() => {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    const map = {};
    days.forEach((d) => (map[d] = []));
    MOCK_SCHEDULES.filter((s) => s.major === selectedMajor).forEach((s) => {
      if (map[s.day]) map[s.day].push(s);
    });
    Object.keys(map).forEach((k) => map[k].sort((a, b) => a.jamKe - b.jamKe));
    return map;
  }, [selectedMajor]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get('username');
    const password = form.get('password');
    if (username && password) {
      setUser({ name: username });
      setPage('dashboard');
    }
  };

  const totalToday = todaySchedules.length;
  const startTime = todaySchedules[0]?.timeStart || '-';
  const endTime = todaySchedules[todaySchedules.length - 1]?.timeEnd || '-';

  return (
    <div className="min-h-screen relative">
      {gradientBg()}

      <AnimatePresence mode="wait">
        {page !== 'login' ? (
          <motion.div key="nav" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
            <Navbar user={user} onLogout={() => { setUser(null); setPage('login'); }} onNavigate={setPage} current={page} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-4 pt-6 pb-16">
        <AnimatePresence mode="wait">
          {page === 'login' && (
            <motion.section
              key="login"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="min-h-[70vh] flex items-center justify-center"
            >
              <div className="w-full max-w-md relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500 via-emerald-500 to-lime-400 rounded-3xl blur-2xl opacity-30 pointer-events-none" />
                <div className="relative bg-white/80 backdrop-blur p-8 rounded-3xl shadow-xl border border-emerald-100">
                  <div className="text-center mb-6">
                    <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-green-600 via-emerald-500 to-lime-400 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                      <Calendar size={22} />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">Selamat Datang</h1>
                    <p className="text-gray-600 mt-1">Masuk untuk melihat jadwal mengajar Anda</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">Username</label>
                      <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-200 bg-white focus-within:ring-2 focus-within:ring-emerald-400">
                        <User className="text-emerald-600" size={18} />
                        <input name="username" type="text" className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400" placeholder="nama.guru" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Password</label>
                      <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-200 bg-white focus-within:ring-2 focus-within:ring-emerald-400">
                        <Clock className="text-emerald-600" size={18} />
                        <input name="password" type="password" className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400" placeholder="••••••••" required />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />
                        Ingat saya
                      </label>
                      <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 hover:shadow-lg transition shadow-md">
                        Masuk
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.section>
          )}

          {page === 'dashboard' && (
            <motion.section key="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <header className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Halo, {user?.name || 'Guru'} 👋</h2>
                <p className="text-gray-600">Ringkasan jadwal hari ini, {selectedDay}</p>
              </header>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-2xl p-4 bg-white border border-emerald-100 shadow-sm">
                  <div className="text-sm text-gray-500">Total Kelas</div>
                  <div className="text-2xl font-bold text-emerald-700">{totalToday}</div>
                </div>
                <div className="rounded-2xl p-4 bg-white border border-emerald-100 shadow-sm">
                  <div className="text-sm text-gray-500">Mulai</div>
                  <div className="text-2xl font-bold text-emerald-700">{startTime}</div>
                </div>
                <div className="rounded-2xl p-4 bg-white border border-emerald-100 shadow-sm">
                  <div className="text-sm text-gray-500">Selesai</div>
                  <div className="text-2xl font-bold text-emerald-700">{endTime}</div>
                </div>
              </div>

              <div className="mb-4">
                <DaySelector value={selectedDay} onChange={setSelectedDay} />
              </div>

              {todaySchedules.length === 0 ? (
                <div className="rounded-2xl p-8 text-center bg-white border border-emerald-100 shadow-sm text-gray-600">
                  Tidak ada kelas hari ini.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {todaySchedules.map((item, idx) => (
                    <ScheduleCard key={`${item.day}-${item.jamKe}-${idx}`} item={item} />
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setPage('weekly')} className="px-4 py-2 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 text-gray-700 shadow-sm hover:shadow transition">Lihat Jadwal Mingguan</button>
                <button onClick={() => setPage('major')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:shadow-lg transition">Lihat per Jurusan</button>
              </div>
            </motion.section>
          )}

          {page === 'weekly' && (
            <motion.section key="weekly" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Jadwal Mingguan</h2>
                  <p className="text-gray-600">Kelompok per hari (Senin–Jumat)</p>
                </div>
                <button onClick={() => setPage('dashboard')} className="px-4 py-2 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 text-gray-700 shadow-sm hover:shadow transition">Kembali ke Dashboard</button>
              </header>

              <div className="grid lg:grid-cols-2 gap-6">
                {Object.entries(weeklyGroups).map(([day, items]) => (
                  <div key={day} className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{day}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{items.length} kelas</span>
                    </div>
                    {items.length === 0 ? (
                      <div className="text-gray-500 text-sm">Tidak ada kelas.</div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {items.map((item, idx) => (
                          <ScheduleCard key={`${day}-${item.jamKe}-${idx}`} item={item} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {page === 'major' && (
            <motion.section key="major" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Jadwal per Jurusan</h2>
                  <p className="text-gray-600">Pilih jurusan untuk melihat jadwalnya</p>
                </div>
                <button onClick={() => setPage('dashboard')} className="px-4 py-2 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 text-gray-700 shadow-sm hover:shadow transition">Kembali ke Dashboard</button>
              </header>

              <div className="mb-6">
                <MajorSelector value={selectedMajor} onChange={setSelectedMajor} />
              </div>

              <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedMajor}</h3>
                    <p className="text-gray-600 text-sm">Kelompok per hari</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  {Object.entries(majorGroups).map(([day, items]) => (
                    <div key={day} className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{day}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{items.length} kelas</span>
                      </div>
                      {items.length === 0 ? (
                        <div className="text-gray-500 text-sm">Tidak ada kelas.</div>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {items.map((item, idx) => (
                            <ScheduleCard key={`${day}-${item.jamKe}-${idx}`} item={item} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
