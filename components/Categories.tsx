import React, { useState, useMemo } from 'react';
// Fix: Removed .ts extension from import to fix module resolution error.
import type { Category, Service, Product } from '../types';

// Mock Data from other components for context
const mockServices: Service[] = [
  { id: 's1', name: 'Haircut', categoryId: 'sc1', duration: 30, price: 25.00 },
  { id: 's2', name: 'Classic Shave', categoryId: 'sc2', duration: 45, price: 30.00 },
  { id: 's3', name: 'Hair Dye', categoryId: 'sc3', duration: 90, price: 75.00 },
  { id: 's4', name: 'Manicure', categoryId: 'sc4', duration: 40, price: 20.00 },
  { id: 's5', name: 'Facial Treatment', categoryId: 'sc4', duration: 60, price: 50.00 },
  { id: 's6', name: 'Beard Trim', categoryId: 'sc2', duration: 20, price: 15.00 },
];

const mockProducts: Product[] = [
  { id: 'p1', name: 'Strong Hold Wax', categoryId: 'pc1', price: 18.50, stock: 45, imageUrl: '' },
  { id: 'p2', name: 'Moisturizing Shampoo', categoryId: 'pc2', price: 22.00, stock: 30, imageUrl: '' },
  { id: 'p3', name: 'Classic Shaving Cream', categoryId: 'pc3', price: 15.00, stock: 60, imageUrl: '' },
  { id: 'p4', name: 'Texturizing Sea Salt Spray', categoryId: 'pc1', price: 20.00, stock: 25, imageUrl: '' },
  { id: 'p5', name: 'Beard Oil', categoryId: 'pc3', price: 25.00, stock: 50, imageUrl: '' },
];


const mockCategories: Category[] = [
    { id: 'sc1', name: 'Hairdressing', type: 'service' },
    { id: 'sc2', name: 'Barbering', type: 'service' },
    { id: 'sc3', name: 'Coloring', type: 'service' },
    { id: 'sc4', name: 'Aesthetics', type: 'service' },
    { id: 'pc1', name: 'Hair Styling', type: 'product' },
    { id: 'pc2', name: 'Shampoos & Conditioners', type: 'product' },
    { id: 'pc3', name: 'Shaving Supplies', type: 'product' },
];

const CategoryTable: React.FC<{
  title: string;
  categories: Category[];
  itemCountMap: Map<string, number>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> = ({ title, categories, itemCountMap, searchTerm, setSearchTerm }) => {
  
  const filteredCategories = useMemo(() =>
    categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [categories, searchTerm]);

  return (
    <div className="bg-white dark:bg-surface rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface">{title}</h2>
        <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-on-surface focus:ring-primary focus:border-primary transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 dark:text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead>
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Category Name</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm text-center">Items</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category.id} className={`border-t border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                <td className="p-3 md:p-4 font-medium text-gray-900 dark:text-on-surface text-sm md:text-base whitespace-nowrap">{category.name}</td>
                <td className="p-3 md:p-4 text-gray-500 dark:text-on-surface-variant text-sm md:text-base text-center whitespace-nowrap">{itemCountMap.get(category.id) || 0}</td>
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

const Categories: React.FC = () => {
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');

  const { serviceCategories, productCategories, serviceItemCount, productItemCount } = useMemo(() => {
    const serviceCats = mockCategories.filter(c => c.type === 'service');
    const productCats = mockCategories.filter(c => c.type === 'product');
    
    const serviceCount = new Map<string, number>();
    mockServices.forEach(service => {
        serviceCount.set(service.categoryId, (serviceCount.get(service.categoryId) || 0) + 1);
    });

    const productCount = new Map<string, number>();
    mockProducts.forEach(product => {
        productCount.set(product.categoryId, (productCount.get(product.categoryId) || 0) + 1);
    });

    return {
        serviceCategories: serviceCats,
        productCategories: productCats,
        serviceItemCount: serviceCount,
        productItemCount: productCount
    };
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-on-surface">Category Management</h1>
        <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors w-full sm:w-auto">
          Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryTable 
          title="Service Categories"
          categories={serviceCategories}
          itemCountMap={serviceItemCount}
          searchTerm={serviceSearchTerm}
          setSearchTerm={setServiceSearchTerm}
        />
        <CategoryTable 
          title="Product Categories"
          categories={productCategories}
          itemCountMap={productItemCount}
          searchTerm={productSearchTerm}
          setSearchTerm={setProductSearchTerm}
        />
      </div>
    </div>
  );
};

export default Categories;