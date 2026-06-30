import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'

export async function loginWithUsername(username: string, password: string) {
  // username_lookup is publicly readable — no auth required
  const snap = await getDoc(doc(db, 'username_lookup', username.toLowerCase().trim()))

  if (!snap.exists()) {
    throw new Error('ไม่พบชื่อผู้ใช้นี้ในระบบ')
  }

  const email = snap.data().email as string
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  await signOut(auth)
}
