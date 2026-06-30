'use client'

import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/config'

type Status = 'running' | 'done' | 'exists' | 'error'

const ADMIN_EMAIL = 'admin@stms.local'
const ADMIN_PASSWORD = 'admin1'
const ADMIN_USERNAME = 'admin'

export default function SetupPage() {
  const [status, setStatus] = useState<Status>('running')
  const [message, setMessage] = useState('กำลังตั้งค่าระบบ...')
  const [uid, setUid] = useState('')

  useEffect(() => { runSetup() }, [])

  async function runSetup() {
    try {
      // Step 1: Try to create Firebase Auth user
      let resolvedUid: string

      try {
        const credential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
        resolvedUid = credential.user.uid
        setMessage('สร้าง Auth user สำเร็จ กำลังบันทึกข้อมูล...')
      } catch (authErr: unknown) {
        const code = (authErr as { code?: string }).code
        if (code === 'auth/email-already-in-use') {
          // Auth user exists — sign in to get UID, then check Firestore
          const credential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD)
          resolvedUid = credential.user.uid

          // Check if Firestore docs already exist
          const lookup = await getDoc(doc(db, 'username_lookup', ADMIN_USERNAME))
          if (lookup.exists()) {
            setStatus('exists')
            setMessage('ผู้ใช้ admin มีอยู่ในระบบแล้ว พร้อมใช้งาน')
            setUid(resolvedUid)
            return
          }
          setMessage('Auth user มีอยู่แล้ว กำลังสร้าง Firestore docs...')
        } else {
          throw authErr
        }
      }

      // Step 2: Write member doc (authenticated at this point)
      await setDoc(doc(db, 'members', resolvedUid), {
        username: ADMIN_USERNAME,
        name: 'God Admin',
        email: ADMIN_EMAIL,
        role: 'admin',
        phone: '',
        department: 'System',
        createdAt: new Date().toISOString(),
      })

      // Step 3: Write public username lookup doc
      await setDoc(doc(db, 'username_lookup', ADMIN_USERNAME), {
        email: ADMIN_EMAIL,
      })

      setStatus('done')
      setMessage('สร้างบัญชี admin สำเร็จแล้ว')
      setUid(resolvedUid)

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setStatus('error')
      setMessage(msg)
    }
  }

  const icon: Record<Status, string> = {
    running: '⚙️',
    done: '✅',
    exists: '✅',
    error: '❌',
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f8fafc', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: '2.5rem 3rem',
        boxShadow: '0 4px 24px rgba(0,0,0,.08)', maxWidth: 440, width: '90%', textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon[status]}</div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '.5rem' }}>
          ตั้งค่าระบบ — สร้าง Admin
        </h1>
        <p style={{ color: '#64748b', fontSize: '.9rem', marginBottom: '1.5rem' }}>{message}</p>

        {(status === 'done' || status === 'exists') && (
          <div style={{
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', textAlign: 'left',
          }}>
            <p style={{ fontSize: '.85rem', color: '#166534', fontWeight: 600, marginBottom: '.4rem' }}>
              ข้อมูลเข้าสู่ระบบ
            </p>
            <p style={{ fontSize: '.85rem', color: '#15803d', lineHeight: 1.7 }}>
              Username: <strong>admin</strong><br />
              Password: <strong>admin1</strong>
              {uid && <><br /><span style={{ fontSize: '.75rem', opacity: .7 }}>UID: {uid}</span></>}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: 10, padding: '1rem', marginBottom: '1.5rem',
          }}>
            <p style={{ fontSize: '.85rem', color: '#dc2626' }}>{message}</p>
          </div>
        )}

        <a href="/login" style={{
          display: 'inline-block', padding: '.75rem 2rem',
          background: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
          color: '#fff', borderRadius: 10, fontWeight: 600,
          fontSize: '.9rem', textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(37,99,235,.3)',
        }}>
          ไปหน้า Login →
        </a>
      </div>
    </div>
  )
}
