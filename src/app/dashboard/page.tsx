'use client'

export default function DashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          เข้าสู่ระบบสำเร็จ!
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Dashboard กำลังมา — เราจะสร้างในขั้นตอนถัดไป
        </p>
      </div>
    </div>
  )
}
