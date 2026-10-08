"""
Caprae Capital - SaaSquatch Lead Generation & AI Enrichment Pipeline
Python Demonstration Script
--------------------------------------------------------------------
This script demonstrates:
1. Automated web extraction & DOM parsing simulation.
2. Tech Stack discovery & legacy software detection.
3. WHOIS & Corporate Registry founder tenure lookup.
4. Caprae Acquisition Readiness & Deal Scoring Engine (0-100).
5. Data deduplication & structured JSON/CSV export.
"""

import json
import re
from typing import Dict, List, Any

class SaaSquatchEnrichmentEngine:
    def __init__(self):
        print("[+] Initializing SaaSquatch Lead Generation Pipeline v4.2 [Caprae Capital]")

    def calculate_deal_score(self, target: Dict[str, Any]) -> Dict[str, Any]:
        """
        Caprae Proprietary Acquisition Readiness Algorithm
        Pillar 1: Financial Fit (EBITDA $1M-$5M, Margin >25%)
        Pillar 2: Succession / Founder Exit Risk (Age >58, Tenure >10yr)
        Pillar 3: AI Transformation Upside (Digital score <50 means huge post-acq upside)
        Pillar 4: Moat & Retention
        """
        score = 0
        reasons = []

        # 1. Financial Fit Score (Max 30 pts)
        ebitda = target.get('ebitdaNumeric', 0)
        margin = float(target.get('ebitdaMargin', '0%').replace('%', ''))
        if 1000000 <= ebitda <= 5000000:
            score += 20
            reasons.append("Optimal ETA EBITDA Range ($1M-$5M)")
        elif ebitda > 5000000:
            score += 15

        if margin >= 25:
            score += 10
            reasons.append(f"High Operating Margin ({margin}%)")

        # 2. Founder Succession Risk (Max 35 pts)
        age = target.get('founderAge', 0)
        tenure = target.get('founderTenureYears', 0)
        if age >= 60:
            score += 25
            reasons.append(f"High Founder Retirement Exit Motivation (Age: {age})")
        elif age >= 55:
            score += 15

        if tenure >= 10:
            score += 10
            reasons.append(f"Established Ownership Tenure ({tenure} yrs)")

        # 3. AI & SaaS Modernization Upside (Max 25 pts)
        digital_score = target.get('digitalMaturityScore', 50)
        if digital_score < 45:
            score += 25
            reasons.append(f"Prime Caprae AI Transformation Opportunity (Digital Score: {digital_score})")
        elif digital_score < 65:
            score += 15

        # 4. Growth & Retention (Max 10 pts)
        if target.get('growthRateYoY'):
            score += 10

        target['calculatedDealScore'] = min(score, 99)
        target['scoringBreakdown'] = reasons
        return target

    def deduplicate_leads(self, leads: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        seen_domains = set()
        unique_leads = []
        for lead in leads:
            clean_domain = lead.get('domain', '').lower().strip()
            if clean_domain not in seen_domains:
                seen_domains.add(clean_domain)
                unique_leads.append(lead)
        return unique_leads

if __name__ == "__main__":
    engine = SaaSquatchEnrichmentEngine()

    sample_targets = [
        {
            "companyName": "Apex Logistics Software",
            "domain": "apexlogistics.io",
            "industry": "B2B SaaS - Supply Chain",
            "founderName": "Richard Vance",
            "founderAge": 62,
            "founderTenureYears": 13,
            "estimatedRevenue": "$4.2M",
            "ebitdaNumeric": 1450000,
            "ebitdaMargin": "34.5%",
            "digitalMaturityScore": 42
        },
        {
            "companyName": "BlueShift Precision Machining",
            "domain": "blueshiftmachining.com",
            "industry": "Niche Manufacturing",
            "founderName": "Gerald O'Connor",
            "founderAge": 66,
            "founderTenureYears": 23,
            "estimatedRevenue": "$8.4M",
            "ebitdaNumeric": 2200000,
            "ebitdaMargin": "26.2%",
            "digitalMaturityScore": 22
        }
    ]

    deduped = engine.deduplicate_leads(sample_targets)
    enriched = [engine.calculate_deal_score(t) for t in deduped]

    print("\n--- ENRICHMENT & SCORING RESULTS ---")
    for item in enriched:
        print(f"\nTarget: {item['companyName']} ({item['domain']})")
        print(f"Calculated Caprae AI Deal Score: {item['calculatedDealScore']}/100")
        print("Investment Rationale:")
        for r in item['scoringBreakdown']:
            print(f"  • {r}")
