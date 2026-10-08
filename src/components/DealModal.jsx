import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  User, 
  Building2, 
  CheckCircle, 
  Copy, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Award
} from 'lucide-react';

export default function DealModal({ lead, onClose, onOpenOutreach }) {
  const [copied, setCopied] = useState(false);
  if (!lead) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 8, 16, 0.82)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '820px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
      }}>
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-muted)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div className={`score-pill ${lead.dealScore >= 85 ? 'score-high' : 'score-med'}`} style={{ width: '56px', height: '56px', fontSize: '1.2rem' }}>
            {lead.dealScore}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }} className="title-gradient">
                {lead.companyName}
              </h2>
              <span className="badge badge-gold">
                <Award size={12} /> Caprae S-Tier Target
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {lead.domain} • {lead.location} • Founded {lead.yearFounded}
            </div>
          </div>
        </div>

        {/* Caprae 4-Pillar Score Breakdown */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', 
          gap: '12px',
          marginBottom: '24px'
        }}>
          <ScoreBox title="Financial Fit" score={92} subtitle={`EBITDA: ${lead.estimatedEbitda}`} color="#34d399" />
          <ScoreBox title="Succession Exit Risk" score={lead.successionRiskScore} subtitle={`Founder Age: ${lead.founderAge}yo`} color="#fbbf24" />
          <ScoreBox title="AI Value-Add Potential" score={lead.aiReadinessScore} subtitle="Post-Acq SaaS Upside" color="#38bdf8" />
          <ScoreBox title="Retention & Moat" score={88} subtitle="Low Churn Rate" color="#a78bfa" />
        </div>

        {/* Deep Analysis Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '24px' }}>
          
          {/* Executive Summary */}
          <div style={{ background: 'rgba(13, 20, 36, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#38bdf8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> Proprietary Investment & Sourcing Analysis
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              {lead.aiAnalysis}
            </p>
          </div>

          {/* Detailed Specifications */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(13, 20, 36, 0.5)', padding: '16px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '700' }}>
                FOUNDER &amp; GOVERNANCE PROFILE
              </div>
              <div style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: '600' }}>{lead.primaryContact?.name} ({lead.primaryContact?.title})</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>Email: {lead.primaryContact?.email}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Phone: {lead.primaryContact?.phone}</div>
              <div style={{ fontSize: '0.82rem', color: '#fbbf24', marginTop: '6px' }}>
                Tenure: {lead.founderTenureYears} Years • Exit Timeline: &lt;12 Months
              </div>
            </div>

            <div style={{ background: 'rgba(13, 20, 36, 0.5)', padding: '16px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '700' }}>
                TECH STACK &amp; MODERNIZATION GAP
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {lead.techStack?.map((t, i) => (
                  <span key={i} className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>{t}</span>
                ))}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Digital Maturity Score: <strong style={{ color: lead.digitalMaturityScore < 50 ? '#fb7185' : '#38bdf8' }}>{lead.digitalMaturityScore}/100</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close Window
          </button>
          <button 
            className="btn-primary" 
            onClick={() => {
              onClose();
              onOpenOutreach(lead);
            }}
          >
            <Mail size={16} /> Open AI Outreach Generator
          </button>
        </div>

      </div>
    </div>
  );
}

function ScoreBox({ title, score, subtitle, color }) {
  return (
    <div style={{ 
      background: 'rgba(13, 20, 36, 0.7)', 
      padding: '14px', 
      borderRadius: '10px', 
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{title}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: '800', color: color, margin: '6px 0' }}>{score}%</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{subtitle}</div>
    </div>
  );
}
