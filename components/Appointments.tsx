import React, { useState, useMemo } from 'react';
// Fix: Removed .ts extension from import to fix module resolution error.
import type { Appointment, Service, Worker } from '../types';

// Mock Data
const workers: Worker[] = [
  { id: 'w1', name: 'Carlos Rodríguez', specialty: 'Cut & Shave', avatarUrl: 'https://picsum.photos/seed/carlos/100', email: 'carlos@example.com', status: 'active' },
  { id: 'w2', name: 'Sofía Martínez', specialty: 'Colorist', avatarUrl: 'https://picsum.photos/seed/sofia/100', email: 'sofia@example.com', status: 'active' },
  { id: 'w3', name: 'Miguel Torres', specialty: 'Men\'s Haircut', avatarUrl: 'https://picsum.photos/seed/miguel/100', email: 'miguel.t@example.com', status: 'inactive' },
  { id: 'w4', name: 'Lucía Vargas', specialty: 'Stylist', avatarUrl: 'https://picsum.photos/seed/lucia/100', email: 'lucia.v@example.com', status: 'active' },
];
const services: Service[] = [
  { id: 's1', name: 'Haircut', duration: 30, price: 25, categoryId: 'sc1' },
  { id: 's2', name: 'Classic Shave', duration: 45, price: 30, categoryId: 'sc2' },
  { id: 's3', name: 'Hair Dye', duration: 90, price: 75, categoryId: 'sc3' },
];

const getTodayAt = (hours: number, minutes: number = 0): Date => {
  const today = new Date();
  today.setHours(hours, minutes, 0, 0);
  return today;
};

const appointments: Appointment[] = [
  { id: 'a1', clientName: 'Juan Pérez', serviceId: 's1', workerId: 'w1', startTime: getTodayAt(10, 0), endTime: getTodayAt(10, 30), status: 'confirmed' },
  { id: 'a2', clientName: 'Ana Gómez', serviceId: 's3', workerId: 'w2', startTime: getTodayAt(10, 30), endTime: getTodayAt(12, 0), status: 'confirmed' },
  { id: 'a3', clientName: 'Luis Fernández', serviceId: 's2', workerId: 'w1', startTime: getTodayAt(11, 0), endTime: getTodayAt(11, 45), status: 'completed' },
  { id: 'a4', clientName: 'Elena Rodríguez', serviceId: 's1', workerId: 'w2', startTime: getTodayAt(14, 0), endTime: getTodayAt(14, 30), status: 'cancelled' },
  { id: 'a5', clientName: 'Pedro Martín', serviceId: 's1', workerId: 'w1', startTime: getTodayAt(15, 0), endTime: getTodayAt(15, 30), status: 'confirmed' },
  { id: 'a6', clientName: 'Lucia Diaz', serviceId: 's1', workerId: 'w4', startTime: new Date(new Date().setDate(new Date().getDate() + 2)), endTime: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'confirmed' },
  { id: 'a7', clientName: 'Marco Polo', serviceId: 's2', workerId: 'w1', startTime: new Date(new Date().setDate(new Date().getDate() - 3)), endTime: new Date(new Date().setDate(new Date().getDate() - 3)), status: 'completed' },
];

const timeSlots = Array.from({ length: 22 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour}:${minute}`;
});

const statusColors = {
  confirmed: 'bg-blue-600/80 border-blue-500',
  completed: 'bg-green-600/80 border-green-500',
  cancelled: 'bg-red-600/80 border-red-500',
};

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'daily' | 'monthly'>('daily');
  const [calendarDate, setCalendarDate] = useState(new Date()); 
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | 'all'>('all');

  const activeWorkers = useMemo(() => workers.filter(w => w.status === 'active'), []);
  
  const workersToDisplay = useMemo(() => 
    selectedWorkerId === 'all' 
      ? activeWorkers 
      : activeWorkers.filter(w => w.id === selectedWorkerId),
    [selectedWorkerId, activeWorkers]
  );

  const appointmentsByDate = useMemo(() => {
    const grouped = new Map<string, Appointment[]>();
    appointments.forEach(appt => {
        const dateKey = appt.startTime.toISOString().split('T')[0];
        if (!grouped.has(dateKey)) {
            grouped.set(dateKey, []);
        }
        grouped.get(dateKey)!.push(appt);
    });
    return grouped;
  }, []);

  const getAppointmentForSlot = (workerId: string, time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    const slotTime = new Date(selectedDate);
    slotTime.setHours(hour, minute, 0, 0);
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    const dailyAppointments = appointmentsByDate.get(dateKey) || [];

    return dailyAppointments.find(
      (appt) =>
        appt.workerId === workerId &&
        slotTime.getTime() >= appt.startTime.getTime() &&
        slotTime.getTime() < appt.endTime.getTime()
    );
  };
  
  const getServiceById = (serviceId: string) => services.find(s => s.id === serviceId);

  const renderDailyView = () => (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-shrink-0 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-on-surface-variant mb-2">Filter by Staff</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                  onClick={() => setSelectedWorkerId('all')}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                      selectedWorkerId === 'all'
                          ? 'bg-primary text-white'
                          : 'bg-white dark:bg-surface text-gray-600 dark:text-on-surface-variant hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                  All Staff
              </button>
              {activeWorkers.map(worker => (
                  <button
                      key={worker.id}
                      onClick={() => setSelectedWorkerId(worker.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors border-2 ${
                          selectedWorkerId === worker.id
                              ? 'bg-primary/20 border-primary text-gray-900 dark:text-on-surface'
                              : 'bg-white dark:bg-surface border-transparent text-gray-600 dark:text-on-surface-variant hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                      <img src={worker.avatarUrl} alt={worker.name} className="w-7 h-7 rounded-full" />
                      {worker.name}
                  </button>
              ))}
          </div>
      </div>
      <div className="flex-1 overflow-auto bg-white dark:bg-surface rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <div className="grid sticky top-0 bg-white dark:bg-surface z-10" style={{ gridTemplateColumns: `6rem repeat(${workersToDisplay.length}, minmax(160px, 1fr))` }}>
            <div className="p-4 border-b border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-on-surface-variant font-semibold">Time</div>
            {workersToDisplay.map(worker => (
              <div key={worker.id} className="p-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
                <img src={worker.avatarUrl} alt={worker.name} className="w-10 h-10 rounded-full mx-auto mb-2" />
                <p className="font-semibold text-gray-900 dark:text-on-surface">{worker.name}</p>
                <p className="text-xs text-gray-500 dark:text-on-surface-variant">{worker.specialty}</p>
              </div>
            ))}
          </div>
          
          <div className="grid" style={{ gridTemplateColumns: `6rem repeat(${workersToDisplay.length}, minmax(160px, 1fr))` }}>
            {timeSlots.map(time => (
              <React.Fragment key={time}>
                <div className="flex items-center justify-center p-2 h-20 border-r border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-on-surface-variant text-sm">
                  {time}
                </div>
                {workersToDisplay.map(worker => {
                  const appointment = getAppointmentForSlot(worker.id, time);
                  const service = appointment ? getServiceById(appointment.serviceId) : null;
                  
                  const isFirstSlot = appointment && new Date(selectedDate).setHours(...(time.split(':').map(Number) as [number, number])) === appointment.startTime.getTime();

                  if (isFirstSlot && appointment && service) {
                    const durationInSlots = Math.ceil(service.duration / 30);
                    return (
                      <div key={`${worker.id}-${time}`} className="p-1 border-r border-b border-gray-200 dark:border-gray-700" style={{ gridRow: `span ${durationInSlots}` }}>
                        <div className={`p-2 rounded-lg h-full flex flex-col justify-center text-white text-xs shadow-lg border-l-4 ${statusColors[appointment.status]}`}>
                            <p className="font-bold">{appointment.clientName}</p>
                            <p className="text-gray-200">{service.name}</p>
                            <p className="text-gray-300 text-right mt-1 opacity-75">{appointment.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {appointment.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                      </div>
                    );
                  }
                  
                  if (appointment && !isFirstSlot) {
                      return null;
                  }

                  return (
                    <div key={`${worker.id}-${time}`} className="border-r border-b border-gray-200 dark:border-gray-700 h-20"></div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonthlyView = () => {
    const month = calendarDate.getMonth();
    const year = calendarDate.getFullYear();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarGrid = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarGrid.push({ day: daysInPrevMonth - firstDayOfMonth + 1 + i, isCurrentMonth: false, date: new Date(year, month - 1, daysInPrevMonth - firstDayOfMonth + 1 + i) });
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarGrid.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    }
    const remainingCells = 42 - calendarGrid.length;
    for (let i = 1; i <= remainingCells; i++) {
        calendarGrid.push({ day: i, isCurrentMonth: false, date: new Date(year, month + 1, i) });
    }

    const today = new Date();
    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
        setView('daily');
    };
    
    const changeMonth = (offset: number) => {
      setCalendarDate(current => {
        const newDate = new Date(current);
        newDate.setMonth(newDate.getMonth() + offset);
        return newDate;
      })
    }

    return (
      <div className="bg-white dark:bg-surface rounded-lg shadow-lg p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4 px-2">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6 text-gray-500 dark:text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-on-surface">{`${monthNames[month]} ${year}`}</h2>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6 text-gray-500 dark:text-on-surface-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
        <div className="grid grid-cols-7 gap-1 flex-1">
          {daysOfWeek.map(day => <div key={day} className="text-center font-semibold text-gray-500 dark:text-on-surface-variant text-xs py-2">{day}</div>)}
          {calendarGrid.map((item, index) => {
              const dateKey = item.date.toISOString().split('T')[0];
              const dailyAppointments = appointmentsByDate.get(dateKey) || [];
              const isToday = isSameDay(item.date, today);

              return (
                  <button 
                    key={index} 
                    onClick={() => handleDayClick(item.date)} 
                    className={`relative p-1 md:p-2 text-center rounded-lg transition-colors h-full w-full flex flex-col justify-start items-center ${
                      item.isCurrentMonth ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'text-gray-500/40 dark:text-on-surface-variant/40'
                    }`}
                    disabled={!item.isCurrentMonth}
                  >
                    <span className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full text-sm ${isToday ? 'bg-primary text-white' : ''}`}>
                      {item.day}
                    </span>
                    {dailyAppointments.length > 0 && item.isCurrentMonth && 
                        <span className="mt-1 text-xs bg-secondary text-white font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                            {dailyAppointments.length}
                        </span>
                    }
                  </button>
              );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col">
      <div className="flex-shrink-0 flex flex-col items-start gap-4 md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-on-surface">Appointments</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="bg-white dark:bg-surface p-1 rounded-lg flex space-x-1 border border-gray-200 dark:border-gray-700">
                <button 
                    onClick={() => setView('monthly')} 
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors w-1/2 sm:w-auto ${view === 'monthly' ? 'bg-primary text-white' : 'text-gray-600 dark:text-on-surface-variant hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                    Monthly
                </button>
                <button 
                    onClick={() => setView('daily')} 
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors w-1/2 sm:w-auto ${view === 'daily' ? 'bg-primary text-white' : 'text-gray-600 dark:text-on-surface-variant hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                    Daily
                </button>
            </div>
            {view === 'daily' && (
              <input 
                type="date" 
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.valueAsDate || new Date())}
                className="bg-white dark:bg-surface p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary text-gray-500 dark:text-on-surface-variant"
              />
            )}
            <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 transition-colors">
              New Appointment
            </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {view === 'monthly' ? renderMonthlyView() : renderDailyView()}
      </div>
    </div>
  );
};

export default Appointments;