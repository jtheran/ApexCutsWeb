import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Worker, Appointment, Service } from '../types.ts';

// --- Mock Data ---
// Added comprehensive mock data to power the new stats components.
const workers: Worker[] = [
  { id: 'w1', name: 'Carlos Rodríguez', specialty: 'Cut & Shave', avatarUrl: 'https://picsum.photos/seed/carlos/100', email: 'carlos.r@example.com', status: 'active' },
  { id: 'w2', name: 'Sofía Martínez', specialty: 'Colorist', avatarUrl: 'https://picsum.photos/seed/sofia/100', email: 'sofia.m@example.com', status: 'active' },
  { id: 'w4', name: 'Lucía Vargas', specialty: 'Stylist', avatarUrl: 'https://picsum.photos/seed/lucia/100', email: 'lucia.v@example.com', status: 'active' },
];

const services: Service[] = [
  { id: 's1', name: 'Haircut', duration: 30, price: 25, categoryId: 'sc1' },
  { id: 's2', name: 'Classic Shave', duration: 45, price: 30, categoryId: 'sc2' },
  { id: 's3', name: 'Hair Dye', duration: 90, price: 75, categoryId: 'sc3' },
  { id: 's6', name: 'Beard Trim', categoryId: 'sc2', duration: 20, price: 15,},
];

const today = new Date();
const getTodayAt = (hours: number, minutes: number = 0): Date => new Date(new Date().setHours(hours, minutes, 0, 0));
const getPastDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
};

const appointments: Appointment[] = [
  // Today's completed appointments
  { id: 'a3', clientName: 'Luis Fernández', serviceId: 's2', workerId: 'w1', startTime: getTodayAt(11, 0), endTime: getTodayAt(11, 45), status: 'completed' },
  { id: 'a8', clientName: 'John Doe', serviceId: 's1', workerId: 'w2', startTime: getTodayAt(9, 0), endTime: getTodayAt(9, 30), status: 'completed' },
  { id: 'a9', clientName: 'Jane Smith', serviceId: 's6', workerId: 'w1', startTime: getTodayAt(10, 0), endTime: getTodayAt(10, 20), status: 'completed' },
  // Today's confirmed appointments
  { id: 'a1', clientName: 'Juan Pérez', serviceId: 's1', workerId: 'w1', startTime: getTodayAt(14, 0), endTime: getTodayAt(14, 30), status: 'confirmed' },
  { id: 'a2', clientName: 'Ana Gómez', serviceId: 's3', workerId: 'w2', startTime: getTodayAt(15, 30), endTime: getTodayAt(17, 0), status: 'confirmed' },
  // This month's completed appointments
  { id: 'a10', clientName: 'Peter Jones', serviceId: 's3', workerId: 'w2', startTime: getPastDate(3), endTime: getPastDate(3), status: 'completed' },
  { id: 'a11', clientName: 'Mary Williams', serviceId: 's1', workerId: 'w4', startTime: getPastDate(5), endTime: getPastDate(5), status: 'completed' },
  { id: 'a12', clientName: 'David Brown', serviceId: 's2', workerId: 'w1', startTime: getPastDate(2), endTime: getPastDate(2), status: 'completed' },
  { id: 'a13', clientName: 'Linda Davis', serviceId: 's1', workerId: 'w4', startTime: getPastDate(1), endTime: getPastDate(1), status: 'completed' },
];
// --- End Mock Data ---


const salesData = [
  { name: 'Mon', sales: 2400, appointments: 24 },
  { name: 'Tue', sales: 1398, appointments: 22 },
  { name: 'Wed', sales: 9800, appointments: 32 },
  { name: 'Thu', sales: 3908, appointments: 20 },
  { name: 'Fri', sales: 4800, appointments: 27 },
  { name: 'Sat', sales: 3800, appointments: 45 },
  { name: 'Sun', sales: 4300, appointments: 15 },
];

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactElement }> = ({ title, value, change, icon }) => (
  <div className="bg-white dark:bg-surface p-6 rounded-lg shadow-lg">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-primary/20 text-primary">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-on-surface-variant">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-on-surface">{value}</p>
        <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
      </div>
    </div>
  </div>
);

// Helper functions for date checks
const isToday = (someDate: Date) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
};

const isThisMonth = (someDate: Date) => {
    const today = new Date();
    return someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
};


const Dashboard: React.FC = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    const icons = {
        revenue: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
        appointments: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
        clients: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        products: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
    }

    const getServiceById = (serviceId: string) => services.find(s => s.id === serviceId);

    const todayStats = appointments.reduce((acc, appt) => {
      if (isToday(appt.startTime) && appt.status === 'completed') {
        const service = getServiceById(appt.serviceId);
        if (service) {
          acc.revenue += service.price;
          acc.appointments += 1;
        }
      }
      return acc;
    }, { revenue: 0, appointments: 0 });

    const workerPerformance = workers.map(worker => {
      let todayServices = 0;
      let todayRevenue = 0;
      let monthServices = 0;
      let monthRevenue = 0;

      appointments.forEach(appt => {
        if (appt.workerId === worker.id && appt.status === 'completed') {
          const service = getServiceById(appt.serviceId);
          if (service) {
            if (isThisMonth(appt.startTime)) {
              monthServices += 1;
              monthRevenue += service.price;
            }
            if (isToday(appt.startTime)) {
              todayServices += 1;
              todayRevenue += service.price;
            }
          }
        }
      });

      return {
        ...worker,
        todayServices,
        todayRevenue,
        monthServices,
        monthRevenue,
      };
    });

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-on-surface">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue (Today)" value={`$${todayStats.revenue.toFixed(2)}`} change="+12.5% vs yesterday" icon={icons.revenue} />
        <StatCard title="Total Appointments (Today)" value={String(todayStats.appointments)} change="-5 vs yesterday" icon={icons.appointments} />
        <StatCard title="New Clients (Month)" value="45" change="+8.2%" icon={icons.clients} />
        <StatCard title="Products Sold (Month)" value="112" change="+21%" icon={icons.products}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-surface p-6 rounded-lg shadow-lg h-72 md:h-96">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-on-surface">Weekly Sales Summary</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#E5E7EB"} />
              <XAxis dataKey="name" tick={{ fill: isDarkMode ? '#A0AEC0' : '#4A5568' }} />
              <YAxis tick={{ fill: isDarkMode ? '#A0AEC0' : '#4A5568' }} />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF', 
                    border: '1px solid',
                    borderColor: isDarkMode ? '#4A5568' : '#E5E7EB'
                }} 
              />
              <Legend />
              <Bar dataKey="sales" fill="#D69E2E" name="Sales ($)" />
              <Bar dataKey="appointments" fill="#4A5568" name="# Appointments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-on-surface">Recent Activity</h2>
          <ul className="space-y-4">
              <li className="flex items-center">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                      <p className="text-gray-900 dark:text-on-surface text-sm md:text-base">New appointment for <span className="font-semibold">Juan Pérez</span></p>
                      <p className="text-sm text-gray-500 dark:text-on-surface-variant">Today at 2:00 PM with Carlos</p>
                  </div>
              </li>
              <li className="flex items-center">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <div>
                      <p className="text-gray-900 dark:text-on-surface text-sm md:text-base">Payment of <span className="font-semibold">$30.00</span> processed</p>
                      <p className="text-sm text-gray-500 dark:text-on-surface-variant">Client: Luis Fernández</p>
                  </div>
              </li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-on-surface">Worker Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="p-4 font-semibold text-gray-500 dark:text-on-surface-variant text-sm">Staff Member</th>
                <th className="p-4 font-semibold text-gray-500 dark:text-on-surface-variant text-sm text-center">Services (Today)</th>
                <th className="p-4 font-semibold text-gray-500 dark:text-on-surface-variant text-sm text-center">Revenue (Today)</th>
                <th className="p-4 font-semibold text-gray-500 dark:text-on-surface-variant text-sm text-center">Services (Month)</th>
                <th className="p-4 font-semibold text-gray-500 dark:text-on-surface-variant text-sm text-center">Revenue (Month)</th>
              </tr>
            </thead>
            <tbody>
              {workerPerformance.map((worker, index) => (
                <tr key={worker.id} className={`border-t border-gray-200 dark:border-gray-700`}>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={worker.avatarUrl} alt={worker.name} className="w-10 h-10 rounded-full mr-4" />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-on-surface">{worker.name}</span>
                        <p className="text-xs text-gray-500 dark:text-on-surface-variant">{worker.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-on-surface-variant text-center whitespace-nowrap">{worker.todayServices}</td>
                  <td className="p-4 text-gray-800 dark:text-on-surface font-semibold text-center whitespace-nowrap">${worker.todayRevenue.toFixed(2)}</td>
                  <td className="p-4 text-gray-600 dark:text-on-surface-variant text-center whitespace-nowrap">{worker.monthServices}</td>
                  <td className="p-4 text-gray-800 dark:text-on-surface font-semibold text-center whitespace-nowrap">${worker.monthRevenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;