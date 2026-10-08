import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  User, 
  Mail,
  SlidersHorizontal,
  CheckCircle2,
  Building2
} from 'lucide-react';

export default function SourcingMatrix({ leads, onSelectLead, onOpenOutreach }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [minDealScore, setMinDealScore] = useState(0);
  const [onlyRetirement, setOnlyRetirement] = useState(false);

  // Extract unique industries
  const industries = ['All', ...Array.from(new Set(leads.map(l => l.industry)))];

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.founderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = selectedIndustry === 'All' || lead.industry === selectedIndustry;
    const matchesScore = lead.dealScore >= minDealScore;
    const matchesRetirement = !onlyRetirement || lead.founderAge >= 58;

    return matchesSearch && matchesIndustry && matchesScore && matchesRetirement;
  });

  return (
    <div className="glass-panel" style={{ padding: '28px 32px' }}>
      
      {/* Header & Section Title */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }} className="title-gradient">
              Deal Sourcing Matrix
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '3px' }}>
              Filter targets by proprietary ETA criteria: Founder Retirement Exit Signal, EBITDA Margin, and Caprae AI Readiness
            </p>
          </div>
          
          <div style={{ 
            fontSize: '0.84rem', 
            color: 'var(--text-muted)', 
            background: 'rgba(10, 15, 28, 0.75)', 
            padding: '8px 16px', 
            borderRadius: '10px', 
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Building2 size={16} color="#38bdf8" />
            Showing <strong style={{ color: '#ffffff' }}>{filteredLeads.length}</strong> of {leads.length} Active Deals
          </div>
        </div>

        {/* Spacious Filters Control Panel */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '16px',
          background: 'rgba(10, 15, 28, 0.75)',
          padding: '20px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          alignItems: 'center'
        }}>
          {/* Text Search */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Target Search
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input 
                type="text"
                placeholder="Search company, founder, domain..."
                className="input-dark"
                style={{ paddingLeft: '38px', height: '42px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Industry Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Industry Sector
            </label>
            <select 
              className="select-dark" 
              style={{ width: '100%', height: '42px' }}
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>Industry: {ind}</option>
              ))}
            </select>
          </div>

          {/* Min Score Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              <span>Min Caprae AI Score:</span>
              <strong style={{ color: '#38bdf8', fontSize: '0.84rem' }}>{minDealScore}+</strong>
            </div>
            <input 
              type="range"
              min="0"
              max="95"
              step="5"
              value={minDealScore}
              onChange={(e) => setMinDealScore(Number(e.target.value))}
              style={{ accentColor: '#38bdf8', cursor: 'pointer', width: '100%', height: '6px', marginTop: '10px' }}
            />
          </div>

          {/* Founder Retirement Checkbox */}
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Succession Risk Toggle
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.84rem', color: 'var(--text-main)', userSelect: 'none', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <input 
                type="checkbox"
                checked={onlyRetirement}
                onChange={(e) => setOnlyRetirement(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#fbbf24', cursor: 'pointer' }}
              />
              <span className="badge badge-gold">Founder &gt;58yo (Exit Risk)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Table Display with Custom Scroll & Spacing */}
      <div className="custom-table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ minWidth: '240px' }}>Target Company</th>
              <th style={{ minWidth: '180px' }}>Financial Metrics</th>
              <th style={{ minWidth: '210px' }}>Founder &amp; Succession Signal</th>
              <th style={{ minWidth: '220px' }}>Tech Stack &amp; Digital Score</th>
              <th style={{ minWidth: '170px' }}>Caprae AI Score</th>
              <th style={{ minWidth: '180px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="table-row">
                {/* Company Name & Domain */}
                <td>
                  <div style={{ fontWeight: '700', fontSize: '0.96rem', color: '#ffffff' }}>
                    {lead.companyName}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <a 
                      href={`https://${lead.domain}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ fontSize: '0.8rem', color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
                    >
                      {lead.domain} <ExternalLink size={11} />
                    </a>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>• {lead.location}</span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {lead.industry}
                  </div>
                </td>

                {/* Financial Metrics */}
                <td>
                  <div style={{ fontWeight: '800', color: '#10b981', fontSize: '0.96rem' }}>
                    {lead.estimatedEbitda} <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 'normal' }}>EBITDA</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                    Rev: <strong>{lead.estimatedRevenue}</strong> ({lead.ebitdaMargin} margin)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    YoY Growth: <span style={{ color: '#f8fafc', fontWeight: '600' }}>{lead.growthRateYoY}</span>
                  </div>
                </td>

                {/* Founder & Succession Signal */}
                <td>
                  <div style={{ fontWeight: '700', color: '#f8fafc', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} color="#fbbf24" />
                    {lead.founderName}
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    {lead.founderAge >= 58 ? (
                      <span className="badge badge-gold">
                        Age {lead.founderAge} (Retirement Risk)
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Age {lead.founderAge} • {lead.founderTenureYears} yrs tenure
                      </span>
                    )}
                  </div>
                </td>

                {/* Tech Stack */}
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '230px' }}>
                    {lead.techStack.map((tech, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '0.7rem', 
                        padding: '2px 7px', 
                        borderRadius: '6px', 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        color: 'var(--text-muted)',
                        border: '1px solid rgba(255, 255, 255, 0.09)'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                    Digital Maturity: <strong style={{ color: lead.digitalMaturityScore < 50 ? '#f43f5e' : '#38bdf8' }}>{lead.digitalMaturityScore}/100</strong>
                  </div>
                </td>

                {/* Caprae AI Score */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className={`score-pill ${lead.dealScore >= 85 ? 'score-high' : 'score-med'}`}>
                      {lead.dealScore}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: '800', color: lead.dealScore >= 85 ? '#10b981' : '#fbbf24' }}>
                        {lead.dealScore >= 85 ? 'S Tier Target' : 'A Tier Target'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        AI Readiness: {lead.aiReadinessScore}%
                      </div>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button 
                      className="btn-primary" 
                      style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                      onClick={() => onSelectLead(lead)}
                      title="Inspect Caprae Acquisition Readiness Score Breakdown"
                    >
                      <Sparkles size={13} /> Inspect
                    </button>
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                      onClick={() => onOpenOutreach(lead)}
                      title="Generate Personalized Founder Email"
                    >
                      <Mail size={13} /> Outreach
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No target companies match your specified filters. Try adjusting your search query or minimum deal score.
          </div>
        )}
      </div>

    </div>
  );
}
