import React, { useState } from 'react';
import type { Worker } from '../types';

const mockWorkers: Worker[] = [
  { id: 'w1', name: 'Carlos Rodríguez', specialty: 'Cut & Shave', avatarUrl: 'https://picsum.photos/seed/carlos/100', email: 'carlos.r@example.com', status: 'active' },
  { id: 'w2', name: 'Sofía Martínez', specialty: 'Colorist', avatarUrl: 'https://picsum.photos/seed/sofia/100', email: 'sofia.m@example.com', status: 'active' },
  { id: 'w3', name: 'Miguel Torres', specialty: 'Men\'s Haircut', avatarUrl: 'https://picsum.photos/seed/miguel/100', email: 'miguel.t@example.com', status: 'inactive' },
  { id: 'w4', name: 'Lucía Vargas', specialty: 'Stylist', avatarUrl: 'https://picsum.photos/seed/lucia/100', email: 'lucia.v@example.com', status: 'active' },
];

const StatusBadge: React.FC<{ status: 'active' | 'inactive' }> = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
    }`}>
        {status === 'active' ? 'Active' : 'Inactive'}
    </span>
);

const Workers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkers = mockWorkers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">Staff Management</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-gray-600 rounded-lg text-on-surface focus:ring-primary focus:border-primary transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors w-full sm:w-auto">
            Add Staff Member
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4 font-semibold text-on-surface-variant text-sm">Name</th>
              <th className="p-4 font-semibold text-on-surface-variant text-sm">Specialty</th>
              <th className="p-4 font-semibold text-on-surface-variant text-sm">Email</th>
              <th className="p-4 font-semibold text-on-surface-variant text-sm">Status</th>
              <th className="p-4 font-semibold text-on-surface-variant text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker, index) => (
              <tr key={worker.id} className={`border-t border-gray-700 ${index % 2 === 0 ? '' : 'bg-gray-800/50'}`}>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={worker.avatarUrl} alt={worker.name} className="w-10 h-10 rounded-full mr-4" />
                    <span className="font-medium text-on-surface text-sm md:text-base">{worker.name}</span>
                  </div>
                </td>
                <td className="p-3 md:p-4 text-on-surface-variant text-sm md:text-base whitespace-nowrap">{worker.specialty}</td>
                <td className="p-3 md:p-4 text-on-surface-variant text-sm md:text-base whitespace-nowrap">{worker.email}</td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                    <StatusBadge status={worker.status} />
                </td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  <div className="flex space-x-2 text-sm">
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workers;