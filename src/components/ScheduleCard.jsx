import React from 'react';
import { Clock, GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScheduleCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition border border-emerald-100"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
          Jam ke {item.jamKe}
        </div>
        <div className="flex items-center text-gray-500 text-sm gap-1">
          <Clock size={16} />
          <span>{item.timeStart}–{item.timeEnd}</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-gray-900 font-semibold text-base">{item.subject}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <GraduationCap size={16} className="text-emerald-600" />
            <span className="font-medium">{item.major}</span>
            <span className="text-gray-400">•</span>
            <span>{item.className}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin size={16} className="text-emerald-600" />
          <span>{item.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
