import React, { useState } from 'react';
import type { Notification } from '../types';

const initialNotifications: Notification[] = [
  { id: 'n1', title: 'New Appointment Booked', description: 'Juan Pérez has booked a "Haircut" for tomorrow at 10:00 AM with Carlos.', timestamp: new Date(Date.now() - 3600000 * 1), read: false },
  { id: 'n2', title: 'Appointment Cancelled', description: 'Ana Gómez has cancelled her "Hair Dye" appointment for today at 3:00 PM.', timestamp: new Date(Date.now() - 3600000 * 2), read: false },
  { id: 'n3', title: 'Low Stock Alert', description: 'Only 3 units of "Strong Hold Wax" remaining.', timestamp: new Date(Date.now() - 3600000 * 5), read: true },
  { id: 'n4', title: 'New Review Received', description: 'You have received a new 5-star review from a client.', timestamp: new Date(Date.now() - 86400000 * 1), read: true },
  { id: 'n5', title: 'Payment Completed', description: 'A payment of $45.00 from Luis Fernández\'s appointment has been processed.', timestamp: new Date(Date.now() - 86400000 * 2), read: true },
];

const NotificationItem: React.FC<{ notification: Notification; onToggleRead: (id: string) => void; }> = ({ notification, onToggleRead }) => {
    const timeAgo = (date: Date): string => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return `${Math.floor(interval)} years ago`;
        interval = seconds / 2592000;
        if (interval > 1) return `${Math.floor(interval)} months ago`;
        interval = seconds / 86400;
        if (interval > 1) return `${Math.floor(interval)} days ago`;
        interval = seconds / 3600;
        if (interval > 1) return `${Math.floor(interval)} hours ago`;
        interval = seconds / 60;
        if (interval > 1) return `${Math.floor(interval)} minutes ago`;
        return `${Math.floor(seconds)} seconds ago`;
    };

    return (
        <div className={`p-3 md:p-4 flex items-start gap-4 border-l-4 ${notification.read ? 'border-transparent' : 'border-primary bg-primary/10'}`}>
            <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-1.5 opacity-50"></div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-on-surface text-sm md:text-base">{notification.title}</p>
                    <span className="text-xs text-on-surface-variant flex-shrink-0 ml-2">{timeAgo(notification.timestamp)}</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">{notification.description}</p>
                <button onClick={() => onToggleRead(notification.id)} className="text-xs text-primary mt-2 hover:underline">
                    {notification.read ? 'Mark as unread' : 'Mark as read'}
                </button>
            </div>
        </div>
    );
};


const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const handleToggleRead = (id: string) => {
    setNotifications(
      notifications.map(n =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-on-surface">Notifications</h1>
            {unreadCount > 0 && <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">{unreadCount}</span>}
        </div>
        <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-sm text-primary hover:underline self-start md:self-center">
          Mark all as read
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-700">
            {notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} onToggleRead={handleToggleRead} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;