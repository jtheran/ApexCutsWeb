import React, { useState, useMemo } from 'react';
// Fix: Removed .ts extension from import to fix module resolution error.
import type { Product, Category } from '../types';

const mockProductCategories: Category[] = [
  { id: 'pc1', name: 'Hair Styling', type: 'product' },
  { id: 'pc2', name: 'Shampoos & Conditioners', type: 'product' },
  { id: 'pc3', name: 'Shaving Supplies', type: 'product' },
];

const mockProducts: Product[] = [
  { id: 'p1', name: 'Strong Hold Wax', categoryId: 'pc1', price: 18.50, stock: 45, imageUrl: 'https://picsum.photos/seed/wax/100' },
  { id: 'p2', name: 'Moisturizing Shampoo', categoryId: 'pc2', price: 22.00, stock: 30, imageUrl: 'https://picsum.photos/seed/shampoo/100' },
  { id: 'p3', name: 'Classic Shaving Cream', categoryId: 'pc3', price: 15.00, stock: 60, imageUrl: 'https://picsum.photos/seed/cream/100' },
  { id: 'p4', name: 'Texturizing Sea Salt Spray', categoryId: 'pc1', price: 20.00, stock: 25, imageUrl: 'https://picsum.photos/seed/spray/100' },
  { id: 'p5', name: 'Beard Oil', categoryId: 'pc3', price: 25.00, stock: 50, imageUrl: 'https://picsum.photos/seed/oil/100' },
];

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryName = (categoryId: string) => {
    return mockProductCategories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };

  const filteredProducts = useMemo(() =>
    mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-on-surface">Product Management</h1>
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
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-surface rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left min-w-[720px]">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Product</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Category</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm text-center">Stock</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm text-right">Price ($)</th>
              <th className="p-4 font-semibold text-gray-600 dark:text-on-surface-variant text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id} className={`border-t border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                <td className="p-3 md:p-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg mr-4 object-cover" />
                    <span className="font-medium text-gray-900 dark:text-on-surface text-sm md:text-base">{product.name}</span>
                  </div>
                </td>
                <td className="p-3 md:p-4 text-gray-500 dark:text-on-surface-variant text-sm md:text-base whitespace-nowrap">{getCategoryName(product.categoryId)}</td>
                <td className="p-3 md:p-4 text-gray-500 dark:text-on-surface-variant text-sm md:text-base text-center whitespace-nowrap">{product.stock}</td>
                <td className="p-3 md:p-4 text-gray-900 dark:text-on-surface font-semibold text-right text-sm md:text-base whitespace-nowrap">{product.price.toFixed(2)}</td>
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

export default Products;