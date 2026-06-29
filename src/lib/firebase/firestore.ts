import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  runTransaction
} from 'firebase/firestore';
import { db } from './config';
import { Tool, Member, BorrowTransaction, MaintenanceLog } from '@/types';

// Collection References
const toolsCol = collection(db, 'tools');
const membersCol = collection(db, 'members');
const borrowsCol = collection(db, 'borrows');
const maintenanceCol = collection(db, 'maintenance');

// ==========================================
// 1. Tool Collection Helpers
// ==========================================

export async function getTools(): Promise<Tool[]> {
  const snapshot = await getDocs(query(toolsCol, orderBy('name')));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool));
}

export async function getToolById(id: string): Promise<Tool | null> {
  const docRef = doc(db, 'tools', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Tool) : null;
}

export async function addTool(tool: Omit<Tool, 'id'>): Promise<string> {
  const docRef = await addDoc(toolsCol, {
    ...tool,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function updateTool(id: string, data: Partial<Omit<Tool, 'id'>>): Promise<void> {
  const docRef = doc(db, 'tools', id);
  await updateDoc(docRef, data);
}

// ==========================================
// 2. Member Collection Helpers
// ==========================================

export async function getMemberById(id: string): Promise<Member | null> {
  const docRef = doc(db, 'members', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Member) : null;
}

export async function createMember(member: Member): Promise<void> {
  const docRef = doc(db, 'members', member.id);
  await updateDoc(docRef, {
    ...member,
    createdAt: new Date().toISOString()
  });
}

// ==========================================
// 3. Borrow Transactions Helpers
// ==========================================

export async function getActiveBorrows(): Promise<BorrowTransaction[]> {
  const q = query(borrowsCol, where('status', '==', 'borrowed'), orderBy('borrowedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BorrowTransaction));
}

/**
 * Executes a atomic transaction to borrow a tool:
 * 1. Verifies the tool is available.
 * 2. Creates the borrow transaction document.
 * 3. Updates the tool status to 'in_use' and sets currentBorrowerId.
 */
export async function borrowTool(
  toolId: string,
  borrowerId: string,
  borrowerName: string,
  lentById: string,
  dueDate: string,
  notes?: string
): Promise<string> {
  return await runTransaction(db, async (transaction) => {
    const toolDocRef = doc(db, 'tools', toolId);
    const toolSnap = await transaction.get(toolDocRef);
    
    if (!toolSnap.exists()) {
      throw new Error('Tool does not exist');
    }
    
    const toolData = toolSnap.data() as Tool;
    if (toolData.status !== 'available') {
      throw new Error('Tool is not available for borrow');
    }

    // Create the transaction
    const borrowDocRef = doc(borrowsCol);
    const borrowData: BorrowTransaction = {
      toolId,
      toolName: toolData.name,
      borrowerId,
      borrowerName,
      lentById,
      borrowedAt: new Date().toISOString(),
      dueDate,
      returnedAt: null,
      receivedById: null,
      status: 'borrowed',
      notes
    };
    
    transaction.set(borrowDocRef, borrowData);
    
    // Update the tool status
    transaction.update(toolDocRef, {
      status: 'in_use',
      currentBorrowerId: borrowerId,
      location: `Site (Borrowed by ${borrowerName})`
    });
    
    return borrowDocRef.id;
  });
}

/**
 * Executes a atomic transaction to return a tool:
 * 1. Closes the borrow transaction.
 * 2. Releases the tool back to 'available' status.
 */
export async function returnTool(
  transactionId: string,
  toolId: string,
  receivedById: string,
  notes?: string
): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const borrowDocRef = doc(db, 'borrows', transactionId);
    const toolDocRef = doc(db, 'tools', toolId);
    
    // Update borrow log
    transaction.update(borrowDocRef, {
      status: 'returned',
      returnedAt: new Date().toISOString(),
      receivedById,
      notes: notes ? `Return notes: ${notes}` : null
    });
    
    // Reset tool status
    transaction.update(toolDocRef, {
      status: 'available',
      currentBorrowerId: null,
      location: 'Main Storehouse'
    });
  });
}

// ==========================================
// 4. Maintenance Collection Helpers
// ==========================================

export async function getMaintenanceLogs(): Promise<MaintenanceLog[]> {
  const snapshot = await getDocs(query(maintenanceCol, orderBy('startedAt', 'desc')));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MaintenanceLog));
}

export async function addMaintenanceLog(log: Omit<MaintenanceLog, 'id' | 'status' | 'startedAt' | 'completedAt'>): Promise<string> {
  return await runTransaction(db, async (transaction) => {
    const toolDocRef = doc(db, 'tools', log.toolId);
    const toolSnap = await transaction.get(toolDocRef);
    
    if (!toolSnap.exists()) {
      throw new Error('Tool does not exist');
    }
    
    // 1. Create maintenance doc
    const maintenanceDocRef = doc(maintenanceCol);
    const maintenanceData: MaintenanceLog = {
      ...log,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      completedAt: null
    };
    transaction.set(maintenanceDocRef, maintenanceData);
    
    // 2. Change tool status to maintenance
    transaction.update(toolDocRef, {
      status: 'maintenance',
      location: 'Repair Workshop'
    });
    
    return maintenanceDocRef.id;
  });
}

export async function completeMaintenanceLog(
  logId: string,
  toolId: string,
  actionTaken: string,
  cost: number
): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const logDocRef = doc(db, 'maintenance', logId);
    const toolDocRef = doc(db, 'tools', toolId);
    
    // 1. Update log to completed
    transaction.update(logDocRef, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      actionTaken,
      cost
    });
    
    // 2. Return tool to available
    transaction.update(toolDocRef, {
      status: 'available',
      location: 'Main Storehouse',
      lastMaintainedAt: new Date().toISOString()
    });
  });
}
