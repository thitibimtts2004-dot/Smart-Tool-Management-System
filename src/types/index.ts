export type ToolStatus = 'available' | 'in_use' | 'maintenance' | 'lost';
export type ToolCondition = 'good' | 'fair' | 'poor';
export type UserRole = 'admin' | 'store_admin' | 'site_store_admin' | 'foreman' | 'driver' | 'technician';
export type BorrowStatus = 'borrowed' | 'returned' | 'overdue';
export type MaintenanceStatus = 'in_progress' | 'completed';

export interface Tool {
  id?: string;
  name: string;
  code: string; // Unique serial or barcode
  category: string;
  status: ToolStatus;
  location: string;
  condition: ToolCondition;
  lastMaintainedAt: string; // ISO DateTime string
  currentBorrowerId: string | null;
  createdAt?: string;
}

export interface Member {
  id: string; // Firebase Auth UID
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  department: string;
  createdAt?: string;
}

export interface BorrowTransaction {
  id?: string;
  toolId: string;
  toolName: string;
  borrowerId: string; // Member ID
  borrowerName: string;
  lentById: string; // Store Admin ID
  borrowedAt: string; // ISO DateTime
  dueDate: string; // ISO DateTime
  returnedAt: string | null; // ISO DateTime
  receivedById: string | null; // Site Store Admin / Store Admin
  status: BorrowStatus;
  notes?: string;
}

export interface MaintenanceLog {
  id?: string;
  toolId: string;
  toolName: string;
  technicianId: string;
  technicianName: string;
  issueDescription: string;
  actionTaken?: string;
  cost?: number;
  status: MaintenanceStatus;
  startedAt: string; // ISO DateTime
  completedAt: string | null; // ISO DateTime
}
