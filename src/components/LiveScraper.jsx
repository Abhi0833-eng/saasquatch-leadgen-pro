import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  Globe, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Sparkles, 
  Plus, 
  Terminal,
  UserCheck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function LiveScraper({ onAddScrapedLead }) {
  const [targetUrl, setTargetUrl] = useState('https://quantumlogistics-software.com');
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [scrapedResult, setScrapedResult] = useState(null);
  const [scrapedCount, setScrapedCount] = useState(0);

  const startScrapeSimulation = (e) => {
    e.preventDefault();
    if (!targetUrl) return;

    setIsScanning(true);
    setLogs([]);
    setScrapedResult(null);

    const steps = [
      `[0.1s] Initiating HTTP GET request to ${targetUrl}...`,
      `[0.3s] Server Status 200 OK (Response time: 142ms, TLS 1.3).`,
      `[0.6s] Parsing DOM tags & Wappalyzer signatures...`,
      `[0.9s] Tech Stack Detected: [ASP.NET 4.8, SQL Server 2016, IIS 10.0, Bootstrap 3].`,
      `[1.2s] Querying WHOIS & State Corporate Registry for ownership records...`,
      `[1.5s] Founder Identified: Harold Finch (Owner & CEO, Age: 64, Founded: 2006).`,
      `[1.8s] Querying Glassdoor & LinkedIn headcount data: 32 Employees, 4.4 rating.`,
      `[2.2s] Estimating EBITDA & Revenue fit based on head-count & pricing model...`,
      `[2.6s] Running Caprae AI Sourcing Score Algorithm...`,
      `[3.0s] Scrape & Enrichment complete! High Priority Deal Candidate discovered!`
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsScanning(false);
          const mockResult = {
            id: `lead-scraped-${Date.now()}`,
            companyName: "Quantum Logistics Software",
            domain: targetUrl.replace('https://', '').replace('http://', ''),
            industry: "B2B SaaS - Transportation & Freight",
            location: "Dallas, TX",
            yearFounded: 2006,
            founderName: "Harold Finch",
            founderAge: 64,
            founderTenureYears: 18,
            estimatedRevenue: "$5.4M",
            revenueNumeric: 5400000,
            estimatedEbitda: "$1.82M",
            ebitdaNumeric: 1820000,
            ebitdaMargin: "33.7%",
            employeeCount: 32,
            techStack: ["ASP.NET 4.8", "SQL Server 2016", "Bootstrap 3", "Legacy IIS"],
            digitalMaturityScore: 36,
            aiReadinessScore: 92,
            successionRiskScore: 96,
            dealScore: 94,
            primaryContact: {
              name: "Harold Finch",
              title: "Founder & CEO",
              email: "hfinch@quantumlogistics-software.com",
              phone: "+1 (214) 774-9012",
              linkedin: "https://linkedin.com/in/harold-finch-quantum"
            },
            sourcingChannel: "Live SaaSquatch Web Scraper",
            leadStatus: "Uncontacted",
            aiAnalysis: "S-Tier ETA Acquisition Candidate! 64yo founder with 18yrs tenure. ASP.NET legacy stack presents prime SaaS rewrite & AI automated dispatch potential.",
            growthRateYoY: "7.4%",
            customerCount: 165
          };
          setScrapedResult(mockResult);
          setScrapedCount(prev => prev + 1);
        }
      }, (index + 1) * 300);
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '28px 32px' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '12px', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <Bot size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }} className="title-gradient">
              Live SaaSquatch Web Crawler &amp; AI Enrichment
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Enter any company URL or domain to run automated tech stack parsing, WHOIS founder lookup, and EBITDA AI estimation.
            </p>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={startScrapeSimulation} style={{ display: 'flex', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Globe size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
          <input 
            type="url"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example-company.com"
            className="input-dark"
            style={{ paddingLeft: '44px', height: '50px', fontSize: '0.96rem', borderRadius: '12px' }}
          />
        </div>
        <button 
          type="submit"
          disabled={isScanning}
          className="btn-primary"
          style={{ height: '50px', padding: '0 28px', fontSize: '0.96rem', borderRadius: '12px' }}
        >
          {isScanning ? (
            <>
              <Zap size={20} className="pulse-glow" /> Scanning Domain...
            </>
          ) : (
            <>
              <Search size={20} /> Run Live Crawler
            </>
          )}
        </button>
      </form>

      {/* Grid: Console Logs + Result Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Terminal Log Console */}
        <div style={{ 
          background: '#050811', 
          borderRadius: '16px', 
          border: '1px solid var(--border-color)', 
          padding: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.84rem',
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingBottom: '12px', 
            marginBottom: '14px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '700' }}>
              <Terminal size={16} /> SaaSquatch Extraction Stream
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Engine: HTTP/2 Async Crawler</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {logs.length === 0 ? (
              <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', paddingTop: '60px', textAlign: 'center' }}>
                Click "Run Live Crawler" to start target extraction...
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ color: index === logs.length - 1 ? '#34d399' : '#94a3b8', lineHeight: '1.5' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Scraped Lead Card Preview */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.85)', 
          borderRadius: '16px', 
          border: scrapedResult ? '1.5px solid rgba(52, 211, 153, 0.5)' : '1px solid var(--border-color)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {scrapedResult ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                    <CheckCircle2 size={13} /> Target Extracted Successfully
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>
                    {scrapedResult.companyName}
                  </h3>
                  <div style={{ fontSize: '0.84rem', color: '#38bdf8', marginTop: '3px' }}>
                    {scrapedResult.domain} • {scrapedResult.location}
                  </div>
                </div>

                <div className="score-pill score-high">
                  {scrapedResult.dealScore}
                </div>
              </div>

              {/* Scraped details grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '14px', 
                fontSize: '0.86rem',
                background: 'rgba(10, 15, 28, 0.75)',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '20px',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Founder Signal</span>
                  <strong style={{ color: '#fbbf24' }}>{scrapedResult.founderName} ({scrapedResult.founderAge}yo)</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Est. EBITDA Fit</span>
                  <strong style={{ color: '#34d399' }}>{scrapedResult.estimatedEbitda} ({scrapedResult.ebitdaMargin})</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Tech Stack</span>
                  <span style={{ color: '#f8fafc' }}>{scrapedResult.techStack.slice(0, 2).join(', ')}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.76rem', textTransform: 'uppercase' }}>Primary Contact</span>
                  <span style={{ color: '#f8fafc' }}>{scrapedResult.primaryContact.email}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                <strong style={{ color: '#38bdf8' }}>AI Acquisition Summary:</strong> {scrapedResult.aiAnalysis}
              </div>

              <button 
                className="btn-accent"
                style={{ width: '100%', justifyContent: 'center', height: '44px' }}
                onClick={() => {
                  onAddScrapedLead(scrapedResult);
                  alert(`"${scrapedResult.companyName}" successfully added to your SaaSquatch Deal Matrix!`);
                }}
              >
                <Plus size={18} /> Add Target to SaaSquatch Pipeline
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '70px 20px', color: 'var(--text-muted)' }}>
              <Cpu size={44} color="var(--text-dim)" style={{ marginBottom: '14px' }} />
              <div style={{ fontSize: '0.92rem' }}>Waiting for domain scan to generate target profile...</div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
