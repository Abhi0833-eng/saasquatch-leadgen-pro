import React, { useState } from 'react';
import { X, Sparkles, Mail, Copy, Check, Send } from 'lucide-react';

export default function OutreachModal({ lead, onClose }) {
  const [copied, setCopied] = useState(false);
  const [emailSubject, setEmailSubject] = useState(
    `Partnership & Succession Opportunity: Caprae Capital x ${lead?.companyName || 'Target'}`
  );
  
  const defaultBody = lead ? `Hi ${lead.founderName.split(' ')[0]},

I hope this message finds you well.

I’m reaching out from Caprae Capital Partners. We’ve been following ${lead.companyName}'s impressive track record in ${lead.industry} and were particularly impressed by your steady growth and sticky customer base.

Unlike traditional private equity firms that rely purely on financial leverage, Caprae Capital operates as a founder-first growth partner. Through our MaaS (M&A as a Service) and SaaS transformation model, we invest directly into expanding great businesses post-acquisition by integrating practical AI solutions and expanding sales operations.

Given your ${lead.founderTenureYears} years of dedicated leadership at ${lead.companyName}, we would love to explore a confidential conversation regarding a potential transaction, full liquidity for your equity, and a seamless succession plan for your team.

Would you be open to a brief 10-minute introductory call next Tuesday or Wednesday?

Best regards,

Caprae Capital Partners
recruiting@capraecapital.com | www.capraecapital.com` : '';

  const [emailBody, setEmailBody] = useState(defaultBody);

  if (!lead) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '680px',
        padding: '28px',
        position: 'relative',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-muted)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }} className="title-gradient">
              AI Personalized Outreach Generator
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Tailored for {lead.primaryContact?.name} ({lead.primaryContact?.email})
            </div>
          </div>
        </div>

        {/* Email Subject Input */}
        <div style={{ marginBottom: '14px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
            EMAIL SUBJECT LINE
          </label>
          <input 
            type="text" 
            className="input-dark"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />
        </div>

        {/* Email Body TextArea */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
            PERSONALIZED EMAIL BODY
          </label>
          <textarea 
            rows="10"
            className="input-dark"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', lineHeight: '1.6', resize: 'vertical' }}
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Includes Caprae MaaS &amp; AI transformation value props
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={copyToClipboard}>
              {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Email Text'}
            </button>
            <a 
              href={`mailto:${lead.primaryContact?.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              <Send size={16} /> Open Mail Client
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
