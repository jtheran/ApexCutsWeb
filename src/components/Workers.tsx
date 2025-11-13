import React, { useState } from 'react';
import type { Worker } from '../types.ts';

const initialWorkers: Worker[] = [
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
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddWorker = (newWorker: Omit<Worker, 'id' | 'avatarUrl'>) => {
    setWorkers(prev => [...prev, { ...newWorker, id: `w-${Date.now()}`, avatarUrl: `https://picsum.photos/seed/${Date.now()}/100`}]);
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <WorkerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddWorker}
    />
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-on-surface">Staff Management</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-on-surface focus:ring-primary focus:border-primary transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 dark:text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors w-full sm:w-auto">
            Add Staff Member
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-surface rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Name</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Specialty</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Email</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Status</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker, index) => (
              <tr key={worker.id} className={`border-t border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={worker.avatarUrl} alt={worker.name} className="w-10 h-10 rounded-full mr-4" />
                    <span className="font-medium text-gray-900 dark:text-on-surface text-sm md:text-base">{worker.name}</span>
                  </div>
                </td>
                <td className="p-3 md:p-4 text-gray-500 dark:text-on-surface-variant text-sm md:text-base whitespace-nowrap">{worker.specialty}</td>
                <td className="p-3 md:p-4 text-gray-500 dark:text-on-surface-variant text-sm md:text-base whitespace-nowrap">{worker.email}</td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                    <StatusBadge status={worker.status} />
                </td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-blue-500/10 text-blue-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
                        </button>
                        <button className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

const WorkerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Worker, 'id' | 'avatarUrl'>) => void;
}> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'active' | 'inactive'>('active');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, specialty, email, status });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface">Add New Staff Member</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <InputField label="Full Name" id="workerName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <InputField label="Specialty" id="workerSpecialty" type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
                        <InputField label="Email" id="workerEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <SelectField label="Status" id="workerStatus" value={status} onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')} options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' }
                        ]}/>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-background/50 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-on-surface-variant bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-amber-600 rounded-lg">Save Member</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// Reusable form components
const InputField: React.FC<any> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-600 dark:text-on-surface-variant mb-2">{label}</label>
    <input id={id} {...props} className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-on-surface focus:ring-primary focus:border-primary transition" />
  </div>
);
const SelectField: React.FC<any> = ({ label, id, options, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-600 dark:text-on-surface-variant mb-2">{label}</label>
    <select id={id} {...props} className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-on-surface focus:ring-primary focus:border-primary transition">
      {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

export default Workers;