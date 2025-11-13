import React, { useState, useMemo } from 'react';
import type { Product, Category } from '../../types.ts';

const mockProductCategories: Category[] = [
  { id: 'pc1', name: 'Hair Styling', type: 'product' },
  { id: 'pc2', name: 'Shampoos & Conditioners', type: 'product' },
  { id: 'pc3', name: 'Shaving Supplies', type: 'product' },
];

const initialProducts: Product[] = [
  { id: 'p1', name: 'Strong Hold Wax', categoryId: 'pc1', price: 18.50, stock: 45, imageUrl: 'https://picsum.photos/seed/wax/100' },
  { id: 'p2', name: 'Moisturizing Shampoo', categoryId: 'pc2', price: 22.00, stock: 30, imageUrl: 'https://picsum.photos/seed/shampoo/100' },
  { id: 'p3', name: 'Classic Shaving Cream', categoryId: 'pc3', price: 15.00, stock: 60, imageUrl: 'https://picsum.photos/seed/cream/100' },
  { id: 'p4', name: 'Texturizing Sea Salt Spray', categoryId: 'pc1', price: 20.00, stock: 25, imageUrl: 'https://picsum.photos/seed/spray/100' },
  { id: 'p5', name: 'Beard Oil', categoryId: 'pc3', price: 25.00, stock: 50, imageUrl: 'https://picsum.photos/seed/oil/100' },
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryName = (categoryId: string) => {
    return mockProductCategories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };
  
  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'imageUrl'>) => {
    setProducts(prev => [...prev, { ...newProduct, id: `p-${Date.now()}`, imageUrl: `https://picsum.photos/seed/${Date.now()}/100`}]);
  }

  const filteredProducts = useMemo(() =>
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [products, searchTerm]);

  return (
    <>
    <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddProduct}
        categories={mockProductCategories}
    />
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
          <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors w-full md:w-auto">
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

const ProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Product, 'id' | 'imageUrl'>) => void;
  categories: Category[];
}> = ({ isOpen, onClose, onSave, categories }) => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, categoryId, stock, price });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-surface rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface">Add New Product</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <InputField label="Product Name" id="prodName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        <SelectField label="Category" id="prodCat" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} options={categories.map(c => ({ value: c.id, label: c.name }))} />
                         <div className="grid grid-cols-2 gap-4">
                            <InputField label="Stock" id="prodStock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                            <InputField label="Price ($)" id="prodPrice" type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-background/50 flex justify-end gap-3 rounded-b-lg">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-on-surface-variant bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-amber-600 rounded-lg">Save Product</button>
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

export default Products;