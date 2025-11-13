import React, { useState } from 'react';
// Fix: Removed .ts extension from import to fix module resolution error.
import type { Service } from '../types';

const mockServices: Service[] = [
  { id: 's1', name: 'Haircut', categoryId: 'sc1', duration: 30, price: 25.00 },
  { id: 's2', name: 'Classic Shave', categoryId: 'sc2', duration: 45, price: 30.00 },
  { id: 's3', name: 'Hair Dye', categoryId: 'sc3', duration: 90, price: 75.00 },
  { id: 's4', name: 'Manicure', categoryId: 'sc4', duration: 40, price: 20.00 },
  { id: 's5', name: 'Facial Treatment', categoryId: 'sc4', duration: 60, price: 50.00 },
  { id: 's6', name: 'Beard Trim', categoryId: 'sc2', duration: 20, price: 15.00 },
];

// Mock categories to resolve categoryId to a name for display
const mockServiceCategories = [
    { id: 'sc1', name: 'Hairdressing'},
    { id: 'sc2', name: 'Barbering'},
    { id: 'sc3', name: 'Coloring'},
    { id: 'sc4', name: 'Aesthetics'},
];

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryName = (categoryId: string) => {
    return mockServiceCategories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-on-surface">Services</h1>
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
          <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors w-full md:w-auto">
            Add Service
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-surface rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Service Name</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Category</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm text-right">Duration (min)</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm text-right">Price ($)</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr key={service.id} className={`border-t border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                <td className="p-3 md:p-4 font-medium text-gray-900 dark:text-on-surface text-sm md:text-base whitespace-nowrap">{service.name}</td>
                <td className="p-3 md:p-4 text-gray-500 dark:text-on-surface-variant text-sm md:text-base whitespace-nowrap">{getCategoryName(service.categoryId)}</td>
                <td className="p-3 md:p-4 text-gray-500 dark:text-on-surface-variant text-sm md:text-base text-right whitespace-nowrap">{service.duration}</td>
                <td className="p-3 md:p-4 text-gray-900 dark:text-on-surface font-semibold text-right text-sm md:text-base whitespace-nowrap">{service.price.toFixed(2)}</td>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  <div className="flex space-x-2 text-sm">
                    <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">Edit</button>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300">Delete</button>
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

export default Services;