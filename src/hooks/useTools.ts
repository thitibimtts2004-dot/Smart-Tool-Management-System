import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { Tool } from '../types';

export function useTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'tools'), orderBy('name'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const toolsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Tool));
        setTools(toolsList);
        setLoading(false);
      },
      (err) => {
        console.error('Error listening to tools:', err);
        setError(err);
        setLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return { tools, loading, error };
}
