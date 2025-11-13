import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
  <div className="bg-surface p-6 rounded-lg shadow-lg">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-primary/20 text-primary">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-on-surface-variant">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-on-surface">{value}</p>
        <p className={`text-sm ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
    const icons = {
        revenue: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
        appointments: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
        clients: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        products: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
    }
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-on-surface">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Revenue" value="$1,250" change="+12.5% vs yesterday" icon={icons.revenue} />
        <StatCard title="Today's Appointments" value="23" change="-5 vs yesterday" icon={icons.appointments} />
        <StatCard title="New Clients (Month)" value="45" change="+8.2%" icon={icons.clients} />
        <StatCard title="Products Sold (Month)" value="112" change="+21%" icon={icons.products}/>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow-lg h-72 md:h-96">
        <h2 className="text-xl font-semibold mb-4 text-on-surface">Weekly Sales Summary</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#A0AEC0' }} />
            <YAxis tick={{ fill: '#A0AEC0' }} />
            <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }} />
            <Legend />
            <Bar dataKey="sales" fill="#D69E2E" name="Sales ($)" />
            <Bar dataKey="appointments" fill="#4A5568" name="# Appointments" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-on-surface">Recent Activity</h2>
        <ul className="space-y-4">
            <li className="flex items-center">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                    <p className="text-on-surface text-sm md:text-base">New appointment confirmed for <span className="font-semibold">Juan Pérez</span></p>
                    <p className="text-sm text-on-surface-variant">Today at 3:30 PM with Carlos</p>
                </div>
            </li>
            <li className="flex items-center">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                     <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div>
                    <p className="text-on-surface text-sm md:text-base">Payment of <span className="font-semibold">$45.00</span> processed</p>
                    <p className="text-sm text-on-surface-variant">Client: Ana Gómez</p>
                </div>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;