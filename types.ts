export interface Worker {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  email: string;
  status: 'active' | 'inactive';
}

export interface Service {
  id: string;
  name: string;
  categoryId: string;
  duration: number; // in minutes
  price: number;
}

export interface Appointment {
  id: string;
  clientName: string;
  serviceId: string;
  workerId: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'completed' | 'cancelled';
  recurrenceId?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'service' | 'product';
}