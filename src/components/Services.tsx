import React, { useState } from 'react';
import type { Service, Category } from '../../types.ts';

const initialServices: Service[] = [
  { id: 's1', name: 'Haircut', categoryId: 'sc1', duration: 30, price: 25.00 },
  { id: 's2', name: 'Classic Shave', categoryId: 'sc2', duration: 45, price: 30.00 },
  { id: 's3', name: 'Hair Dye', categoryId: 'sc3', duration: 90, price: 75.00 },
  { id: 's4', name: 'Manicure', categoryId: 'sc4', duration: 40, price: 20.00 },
  { id: 's5', name: 'Facial Treatment', categoryId: 'sc4', duration: 60, price: 50.00 },
  { id: 's6', name: 'Beard Trim', categoryId: 'sc2', duration: 20, price: 15.00 },
];

// Mock categories to resolve categoryId to a name for display
const mockServiceCategories: Category[] = [
    { id: 'sc1', name: 'Hairdressing', type: 'service'},
    { id: 'sc2', name: 'Barbering', type: 'service'},
    { id: 'sc3', name: 'Coloring', type: 'service'},
    { id: 'sc4', name: 'Aesthetics', type: 'service'},
];

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryName = (categoryId: string) => {
    return mockServiceCategories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };
  
  const handleAddService = (newService: Omit<Service, 'id'>) => {
    setServices(prev => [...prev, { ...newService, id: `s-${Date.now()}`}]);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <ServiceModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleAddService}
      categories={mockServiceCategories}
    />
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
          <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors w-full md:w-auto">
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


const ServiceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Service, 'id'>) => void;
  categories: Category[];
}> = ({ isOpen, onClose, onSave, categories }) => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
    const [duration, setDuration] = useState(30);
    const [price, setPrice] = useState(25);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, categoryId, duration, price });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface">Add New Service</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <InputField label="Service Name" id="servName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <SelectField label="Category" id="servCat" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} options={categories.map(c => ({ value: c.id, label: c.name }))} />
                         <div className="grid grid-cols-2 gap-4">
                            <InputField label="Duration (min)" id="servDuration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                            <InputField label="Price ($)" id="servPrice" type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-background/50 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-on-surface-variant bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-amber-600 rounded-lg">Save Service</button>
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

export default Services;