import React from 'react';
import { Kanban, ArrowRight, UserCheck, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';

export default function PipelineCRM({ leads, onUpdateLeadStatus, onOpenOutreach }) {
  const stages = [
    { id: "Uncontacted", title: "1. Uncontacted Target", color: "#38bdf8" },
    { id: "Initial Outreach", title: "2. Initial Outreach Sent", color: "#fbbf24" },
    { id: "NDA Signed", title: "3. NDA & CIM Executed", color: "#c084fc" },
    { id: "IOI Submitted", title: "4. IOI / Indication of Interest", color: "#34d399" }
  ];

  return (
    <div className="glass-panel" style={{ padding: '28px 32px' }}>
      
      {/* Title Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }} className="title-gradient">
            Caprae Sourcing Pipeline &amp; CRM Board
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '3px' }}>
            Track acquisition status from proprietary identification to NDA execution &amp; IOI submission.
          </p>
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px',
        alignItems: 'start'
      }}>
        {stages.map(stage => {
          const stageLeads = leads.filter(l => l.leadStatus === stage.id);

          return (
            <div key={stage.id} style={{ 
              background: 'rgba(10, 15, 28, 0.85)', 
              borderRadius: '16px', 
              border: '1px solid var(--border-color)',
              padding: '20px',
              minHeight: '480px'
            }}>
              {/* Column Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingBottom: '14px',
                marginBottom: '18px',
                borderBottom: `3px solid ${stage.color}`
              }}>
                <span style={{ fontSize: '0.94rem', fontWeight: '800', color: stage.color }}>
                  {stage.title}
                </span>
                <span style={{ 
                  fontSize: '0.78rem', 
                  padding: '3px 10px', 
                  borderRadius: '99px', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  fontWeight: '800',
                  color: '#ffffff'
                }}>
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards in column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {stageLeads.map(lead => (
                  <div key={lead.id} className="glass-panel glass-card-interactive" style={{ padding: '16px', borderRadius: '12px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <strong style={{ fontSize: '0.94rem', color: '#ffffff', fontWeight: '700' }}>{lead.companyName}</strong>
                      <div className={`score-pill ${lead.dealScore >= 85 ? 'score-high' : 'score-med'}`} style={{ width: '34px', height: '34px', fontSize: '0.78rem' }}>
                        {lead.dealScore}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      EBITDA: <strong style={{ color: '#34d399' }}>{lead.estimatedEbitda}</strong>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#fbbf24', marginBottom: '8px' }}>
                      Founder: {lead.founderName} ({lead.founderAge}yo)
                    </div>

                    {/* Move Stage Selector & Actions */}
                    <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <select 
                        value={lead.leadStatus}
                        onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                        style={{ 
                          background: 'rgba(6, 9, 17, 0.95)', 
                          color: 'var(--text-muted)', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          padding: '5px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        {stages.map(s => (
                          <option key={s.id} value={s.id}>Move: {s.id}</option>
                        ))}
                      </select>

                      <button 
                        onClick={() => onOpenOutreach(lead)}
                        style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: '700' }}
                      >
                        <Send size={13} /> Email
                      </button>
                    </div>

                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-dim)', fontSize: '0.84rem', fontStyle: 'italic' }}>
                    No leads currently in this stage
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
