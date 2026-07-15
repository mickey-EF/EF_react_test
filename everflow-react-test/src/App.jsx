import React, { useState } from 'react';
import EverflowTracker from './components/EverflowTracker';

function App() {
  const [trackerLog, setTrackerLog] = useState('Booting up sandbox...');
  
  // We'll target this mock product domain for our cross-site test
  const targetDomain = "your-brand-product-page.com"; 
  const advertiserId = "12345"; 

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '700px', margin: '0 auto', padding: '20px', color: '#2c3e50' }}>
      
      {/* 🚀 Mount the headless tracker silently */}
      <EverflowTracker 
        targetDomain={targetDomain} 
        advertiserId={advertiserId} 
        onLog={(msg) => setTrackerLog(msg)} 
      />

      <header style={{ borderBottom: '2px solid #ecf0f1', paddingBottom: '15px', marginBottom: '30px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '26px', color: '#e74c3c' }}>⚡ TechVibe Magazine</div>
        <div style={{ color: '#7f8c8d', fontSize: '14px' }}>React Sandbox Edition • July 2026</div>
      </header>

      <main>
        <h1>The Best 2026 Smart Gadgets (Direct Link Demo)</h1>
        <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
          This page simulates a live listicle website. Hover over the buttons or check your browser's bottom-left status bar to see the tracking link append in real time!
        </p>

        {/* Listicle Item 1 */}
        <div style={{ background: '#f8f9fa', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>1. AeroPods Pro Max (2026 Edition)</h3>
          <p>The active noise cancellation on these headphones is unmatched.</p>
          {/* Outbound Link destined for our target domain */}
          <a 
            href={`https://${targetDomain}/checkout/aeropods`} 
            style={{ display: 'inline-block', background: '#2ecc71', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
          >
            Check Price &rarr;
          </a>
        </div>

        {/* Listicle Item 2 */}
        <div style={{ background: '#f8f9fa', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>2. ChargeGrip Magnetic Power Bank</h3>
          <p>Supercharge your device in under 20 minutes wire-free.</p>
          <a 
            href={`https://${targetDomain}/checkout/chargegrip?discount=true`} 
            style={{ display: 'inline-block', background: '#2ecc71', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
          >
            View Deal Online &rarr;
          </a>
        </div>

        {/* Control Link (Not matching target domain) */}
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#95a5a6' }}>
          <span>Regular link (Should NOT be tracked): </span>
          <a href="https://google.com" style={{ color: '#3498db' }}>Go to Google</a>
        </div>
      </main>

      {/* 🖥️ Live On-Screen Debug Console */}
      <div style={{ background: '#2c3e50', color: '#ecf0f1', padding: '20px', borderRadius: '6px', fontFamily: 'monospace', marginTop: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ color: '#e74c3c', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px dashed #34495e', paddingBottom: '5px' }}>
          [REACT SANDBOX LOGS]
        </div>
        <div style={{ fontSize: '13px', lineHeight: '1.5' }}>{trackerLog}</div>
      </div>
    </div>
  );
}

export default App;