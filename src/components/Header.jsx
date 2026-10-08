import React from 'react';
import { 
  Search, 
  Bot, 
  Kanban, 
  BarChart3, 
  Sparkles, 
  Zap,
  Download,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onExportAll }) {
  return (
    <header className="glass-panel" style={{ padding: '26px 32px', marginBottom: '28px', borderRadius: '20px' }}>
      
      {/* Top Bar: Brand Header + Metrics Ticker + Export */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '20px' }}>
        
        {/* Brand Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '14px', 
            background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
          }}>
            <Zap size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }} className="title-gradient">
                SaaSquatch <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.18)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', verticalAlign: 'middle', fontWeight: '700' }}>AI PRO</span>
              </h1>
              <span className="badge badge-gold">
                <Sparkles size={12} /> Caprae Capital Engine
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
              Proprietary Deal Sourcing &amp; Acquisition Intelligence Platform
            </p>
          </div>
        </div>

        {/* Live System Status & Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            background: 'rgba(10, 15, 28, 0.75)', 
            padding: '8px 18px', 
            borderRadius: '999px', 
            border: '1px solid var(--border-color)',
            fontSize: '0.82rem'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
              Crawler: <strong style={{ color: '#f8fafc' }}>Active &amp; Scanning</strong>
            </span>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <span style={{ color: 'var(--text-muted)' }}>
              Evaluated Target EBITDA: <strong style={{ color: '#fbbf24' }}>$3.4B+</strong>
            </span>
          </div>

          <button className="btn-secondary" onClick={onExportAll} style={{ padding: '10px 18px' }}>
            <Download size={16} /> Export Deal CSV
          </button>
        </div>

      </div>

      {/* Segmented Pill Navigation Bar */}
      <nav style={{ 
        display: 'flex', 
        gap: '8px', 
        borderTop: '1px solid rgba(255, 255, 255, 0.07)',
        paddingTop: '16px',
        overflowX: 'auto',
        background: 'rgba(10, 15, 26, 0.5)',
        padding: '8px',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <TabButton 
          id="matrix" 
          active={activeTab === 'matrix'} 
          onClick={() => setActiveTab('matrix')}
          icon={<Search size={16} />}
          label="Deal Sourcing Matrix" 
        />
        <TabButton 
          id="scraper" 
          active={activeTab === 'scraper'} 
          onClick={() => setActiveTab('scraper')}
          icon={<Bot size={16} />}
          label="Live Scraper & Enrichment" 
          badge="Live"
        />
        <TabButton 
          id="crm" 
          active={activeTab === 'crm'} 
          onClick={() => setActiveTab('crm')}
          icon={<Kanban size={16} />}
          label="Pipeline CRM Board" 
        />
        <TabButton 
          id="analytics" 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')}
          icon={<BarChart3 size={16} />}
          label="Valuation & Market Intelligence" 
        />
      </nav>
    </header>
  );
}

function TabButton({ id, active, onClick, icon, label, badge }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderRadius: '10px',
        border: active ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid transparent',
        background: active ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.18) 0%, rgba(2, 132, 199, 0.12) 100%)' : 'transparent',
        color: active ? '#38bdf8' : 'var(--text-muted)',
        fontWeight: active ? '700' : '600',
        cursor: 'pointer',
        fontSize: '0.88rem',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: active ? '0 4px 14px rgba(56, 189, 248, 0.15)' : 'none'
      }}
    >
      {icon}
      {label}
      {badge && (
        <span style={{
          fontSize: '0.68rem',
          padding: '2px 7px',
          borderRadius: '99px',
          background: '#f43f5e',
          color: '#fff',
          fontWeight: '800'
        }}>
          {badge}
        </span>
      )}
    </button>
  );
}
