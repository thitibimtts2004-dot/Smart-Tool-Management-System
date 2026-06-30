'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './login.module.css'
import { loginWithUsername } from '@/lib/firebase/auth'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await loginWithUsername(username, password)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('invalid-credential') || msg.includes('wrong-password')) {
        setError('รหัสผ่านไม่ถูกต้อง')
      } else if (msg.includes('ไม่พบชื่อผู้ใช้')) {
        setError(msg)
      } else {
        setError('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>

      {/* ── Left Panel: Form ── */}
      <div className={styles.formPanel}>
        <div className={styles.formInner}>

          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.logoText}>Smart Tool MS</span>
          </div>

          {/* Heading */}
          <h1 className={styles.heading}>เข้าสู่ระบบ</h1>
          <p className={styles.subheading}>
            ยินดีต้อนรับกลับมา กรุณากรอกข้อมูลเพื่อดำเนินการต่อ
          </p>

          {/* Error Banner */}
          {error && (
            <div className={styles.errorBanner}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>

            {/* Username */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="username">
                ชื่อผู้ใช้ (Username)
              </label>
              <input
                id="username"
                type="text"
                className={styles.input}
                placeholder="กรอกชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">
                รหัสผ่าน
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className={styles.rememberRow}>
              <input
                id="remember"
                type="checkbox"
                className={styles.checkbox}
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" className={styles.rememberLabel}>
                จดจำฉันในระบบนี้
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.loginBtn}
              disabled={loading}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          {/* Sign Up */}
          <p className={styles.signupText}>
            ยังไม่มีบัญชี?{' '}
            <a href="/register" className={styles.signupLink}>
              ลงทะเบียนที่นี่
            </a>
          </p>
        </div>
      </div>

      {/* ── Right Panel: Illustration ── */}
      <div className={styles.illustrationPanel}>
        <div className={styles.illustration}>

          <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="240" height="150" rx="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <rect x="20" y="20" width="240" height="42" rx="16" fill="rgba(255,255,255,0.08)"/>
            <rect x="20" y="46" width="240" height="16" fill="rgba(255,255,255,0.08)"/>
            <circle cx="42" cy="41" r="5" fill="rgba(255,255,255,0.5)"/>
            <circle cx="58" cy="41" r="5" fill="rgba(255,255,255,0.3)"/>
            <circle cx="74" cy="41" r="5" fill="rgba(255,255,255,0.2)"/>
            <rect x="50" y="110" width="20" height="45" rx="4" fill="rgba(255,255,255,0.6)"/>
            <rect x="80" y="90" width="20" height="65" rx="4" fill="rgba(255,255,255,0.85)"/>
            <rect x="110" y="100" width="20" height="55" rx="4" fill="rgba(255,255,255,0.5)"/>
            <rect x="140" y="75" width="20" height="80" rx="4" fill="rgba(255,255,255,0.9)"/>
            <rect x="170" y="95" width="20" height="60" rx="4" fill="rgba(255,255,255,0.65)"/>
            <rect x="200" y="85" width="20" height="70" rx="4" fill="rgba(255,255,255,0.75)"/>
            <polyline points="60,108 90,85 120,98 150,72 180,92 210,80" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="60" cy="108" r="4" fill="white"/>
            <circle cx="90" cy="85" r="4" fill="white"/>
            <circle cx="120" cy="98" r="4" fill="white"/>
            <circle cx="150" cy="72" r="4" fill="white"/>
            <circle cx="180" cy="92" r="4" fill="white"/>
            <circle cx="210" cy="80" r="4" fill="white"/>
            <rect x="180" y="30" width="70" height="36" rx="8" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            <text x="215" y="48" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif">98.5%</text>
            <text x="215" y="60" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="Inter, sans-serif">Uptime</text>
            <rect x="20" y="180" width="74" height="32" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <rect x="103" y="180" width="74" height="32" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <rect x="186" y="180" width="74" height="32" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <text x="57" y="199" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter, sans-serif">เครื่องมือ 142</text>
            <text x="140" y="199" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter, sans-serif">งาน 38 รอ</text>
            <text x="223" y="199" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter, sans-serif">แจ้งเตือน 7</text>
          </svg>

          <h2 className={styles.illustrationTitle}>
            ระบบจัดการเครื่องมืออัจฉริยะ
          </h2>
          <p className={styles.illustrationSubtitle}>
            ติดตาม ตรวจสอบ และบริหารเครื่องมือทุกชิ้นแบบ Real-time
            พร้อมระบบแจ้งเตือนและการซ่อมบำรุงอัตโนมัติ
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>142</span>
              <span className={styles.statLabel}>เครื่องมือทั้งหมด</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>อัตราใช้งาน</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>ประเภทผู้ใช้</span>
            </div>
          </div>

          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.active}`}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>

        </div>
      </div>

    </div>
  )
}
