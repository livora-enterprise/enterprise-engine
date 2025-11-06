import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('initializing')
  const [phase, setPhase] = useState('Phase 0')

  useEffect(() => {
    setStatus('ready')
    setPhase('Phase 0: Foundation')
  }, [])

  return (
    <div className="app">
      <header>
        <h1>🚀 Livora Enterprise Engine</h1>
        <p>{phase}</p>
      </header>
      
      <main>
        <div className="status-card">
          <h2>System Status</h2>
          <p className="status">✅ {status.toUpperCase()}</p>
          <p>Backend is initializing...</p>
        </div>

        <div className="info-card">
          <h3>Phase 0 Foundation</h3>
          <ul>
            <li>✅ AWS CDK Infrastructure</li>
            <li>✅ GitHub Actions CI/CD</li>
            <li>✅ Local Development Environment</li>
            <li>⏳ Backend API (Next)</li>
            <li>⏳ Event Ingestion Pipeline (Phase 1)</li>
          </ul>
        </div>

        <div className="next-steps">
          <h3>Next Steps</h3>
          <ol>
            <li>Complete AWS Setup</li>
            <li>Deploy CDK Foundation Stack</li>
            <li>Start Backend Service</li>
            <li>Build Event Ingestion API (Phase 1)</li>
          </ol>
        </div>
      </main>

      <footer>
        <p>Livora Enterprise Intelligence and Automation Engine v0.1.0</p>
        <p>Phase 0: Foundation Setup</p>
      </footer>
    </div>
  )
}

export default App