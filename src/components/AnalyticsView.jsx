import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid
} from 'recharts';
import { DollarSign, Award } from 'lucide-react';

export default function AnalyticsView({ leads }) {
  const chartData = leads.map(l => ({
    name: l.companyName.split(' ')[0],
    fullName: l.companyName,
    ebitda: l.ebitdaNumeric / 1000000,
    score: l.dealScore,
    founderAge: l.founderAge
  }));

  return (
    <div className="glass-panel" style={{ padding: '28px 32px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }} className="title-gradient">
          Valuation &amp; Deal Market Intelligence
        </h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '3px' }}>
          Real-time analytics on candidate EBITDA margins, founder age distribution, and AI score alignment.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '28px' }}>
        
        {/* Chart 1: EBITDA ($M) per Target */}
        <div style={{ background: 'rgba(10, 15, 28, 0.85)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#38bdf8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} /> EBITDA ($ Millions) by Target Company
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="M" />
                <Tooltip 
                  contentStyle={{ background: '#070a12', border: '1px solid #38bdf8', borderRadius: '10px', color: '#fff', padding: '10px 14px' }} 
                  formatter={(val) => [`$${val}M`, 'EBITDA']}
                />
                <Bar dataKey="ebitda" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Caprae AI Score vs Founder Age */}
        <div style={{ background: 'rgba(10, 15, 28, 0.85)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#fbbf24', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} /> Caprae AI Sourcing Score Breakdown
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[50, 100]} />
                <Tooltip 
                  contentStyle={{ background: '#070a12', border: '1px solid #fbbf24', borderRadius: '10px', color: '#fff', padding: '10px 14px' }} 
                  formatter={(val) => [`${val}/100`, 'Caprae AI Score']}
                />
                <Bar dataKey="score" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
