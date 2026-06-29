import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase/config';
import { getMemberById } from '../lib/firebase/firestore';
import { Member } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          // Fetch the user's details and role from Firestore
          const profile = await getMemberById(firebaseUser.uid);
          setMember(profile);
        } catch (err) {
          console.error('Error fetching member profile:', err);
          setMember(null);
        }
      } else {
        setMember(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, member, loading };
}
