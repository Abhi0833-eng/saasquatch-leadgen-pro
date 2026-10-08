import React, { useState } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import SourcingMatrix from './components/SourcingMatrix';
import LiveScraper from './components/LiveScraper';
import PipelineCRM from './components/PipelineCRM';
import AnalyticsView from './components/AnalyticsView';
import DealModal from './components/DealModal';
import OutreachModal from './components/OutreachModal';
import { initialLeads } from './data/initialLeads';

export default function App() {
  const [leads, setLeads] = useState(initialLeads);
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedLead, setSelectedLead] = useState(null);
  const [outreachLead, setOutreachLead] = useState(null);

  // Add a lead extracted by Live Scraper
  const handleAddScrapedLead = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  // Update lead CRM stage
  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, leadStatus: newStatus } : lead
    ));
  };

  // Export pipeline to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID", "Company Name", "Domain", "Industry", "Location", "Year Founded",
      "Founder Name", "Founder Age", "Tenure (Yrs)", "Est. Revenue", "Est. EBITDA",
      "EBITDA Margin", "Tech Stack", "Digital Score", "AI Readiness Score",
      "Succession Risk Score", "Caprae Deal Score", "Contact Email", "Contact Phone", "Lead Status"
    ];

    const rows = leads.map(l => [
      l.id,
      `"${l.companyName}"`,
      l.domain,
      `"${l.industry}"`,
      `"${l.location}"`,
      l.yearFounded,
      `"${l.founderName}"`,
      l.founderAge,
      l.founderTenureYears,
      l.estimatedRevenue,
      l.estimatedEbitda,
      l.ebitdaMargin,
      `"${l.techStack.join('; ')}"`,
      l.digitalMaturityScore,
      l.aiReadinessScore,
      l.successionRiskScore,
      l.dealScore,
      l.primaryContact?.email || '',
      l.primaryContact?.phone || '',
      l.leadStatus
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Caprae_SaaSquatch_Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      
      {/* Top Header & Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onExportAll={handleExportCSV} 
      />

      {/* KPI Overview Metrics */}
      <MetricCards leads={leads} />

      {/* Main Tab Views */}
      <main>
        {activeTab === 'matrix' && (
          <SourcingMatrix 
            leads={leads} 
            onSelectLead={(lead) => setSelectedLead(lead)} 
            onOpenOutreach={(lead) => setOutreachLead(lead)} 
          />
        )}

        {activeTab === 'scraper' && (
          <LiveScraper 
            onAddScrapedLead={handleAddScrapedLead} 
          />
        )}

        {activeTab === 'crm' && (
          <PipelineCRM 
            leads={leads} 
            onUpdateLeadStatus={handleUpdateLeadStatus} 
            onOpenOutreach={(lead) => setOutreachLead(lead)} 
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView 
            leads={leads} 
          />
        )}
      </main>

      {/* Footer info */}
      <footer style={{ marginTop: '40px', padding: '20px 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        <div>SaaSquatch AI Pro — Proprietary Sourcing &amp; Acquisition Intelligence Engine</div>
        <div style={{ marginTop: '4px' }}>Engineered for Caprae Capital Partners • Full Stack Challenge Submission</div>
      </footer>

      {/* Modals */}
      {selectedLead && (
        <DealModal 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onOpenOutreach={(lead) => setOutreachLead(lead)} 
        />
      )}

      {outreachLead && (
        <OutreachModal 
          lead={outreachLead} 
          onClose={() => setOutreachLead(null)} 
        />
      )}

    </div>
  );
}
