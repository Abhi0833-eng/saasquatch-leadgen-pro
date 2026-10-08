import React from 'react';
import { Target, TrendingUp, UserCheck, DollarSign } from 'lucide-react';

export default function MetricCards({ leads }) {
  const totalLeads = leads.length;
  const highPriorityCount = leads.filter(l => l.dealScore >= 85).length;
  
  const totalEbitda = leads.reduce((acc, curr) => acc + (curr.ebitdaNumeric || 0), 0);
  const formattedEbitda = `$${(totalEbitda / 1000000).toFixed(2)}M`;
  
  const avgDealScore = Math.round(leads.reduce((acc, curr) => acc + curr.dealScore, 0) / (totalLeads || 1));

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
      gap: '20px', 
      marginBottom: '28px' 
    }}>
      {/* Card 1 */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '22px 24px', borderTop: '3px solid #38bdf8' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Active Sourced Targets</span>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.14)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#ffffff' }}>{totalLeads} Companies</div>
        <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
          <TrendingUp size={13} /> +12% added this week
        </div>
      </div>

      {/* Card 2 */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '22px 24px', borderTop: '3px solid #fbbf24' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>High-Priority Deals (&gt;85 Score)</span>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(251, 191, 36, 0.14)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#fbbf24', letterSpacing: '-0.03em' }}>{highPriorityCount} Leads</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          Immediate founder exit &amp; high EBITDA fit
        </div>
      </div>

      {/* Card 3 */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '22px 24px', borderTop: '3px solid #10b981' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total EBITDA Sourced</span>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.14)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#10b981', letterSpacing: '-0.03em' }}>{formattedEbitda}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          Average EBITDA Margin: <strong style={{ color: '#f8fafc' }}>30.1%</strong>
        </div>
      </div>

      {/* Card 4 */}
      <div className="glass-panel glass-card-interactive" style={{ padding: '22px 24px', borderTop: '3px solid #c084fc' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Caprae AI Score Index</span>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(192, 132, 252, 0.14)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={18} />
          </div>
        </div>
        <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#c084fc', letterSpacing: '-0.03em' }}>{avgDealScore} / 100</div>
        <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '4px', fontWeight: '600' }}>
          High suitability for Caprae AI post-acq
        </div>
      </div>
    </div>
  );
}
