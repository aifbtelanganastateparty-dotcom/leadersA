/**
 * Transparency page component.
 * Renders quarterly reports, case statistics, funding sources, and governance meeting minutes.
 */

import './transparency.css';
import {
  QUARTERLY_REPORTS,
  WARD_STATS,
  FUNDING_SOURCES,
  MEETING_MINUTES,
} from '../data/constants.ts';
import { renderSectionHeader, renderAccordionItem } from '../components/ui.ts';

export function renderTransparency(): string {
  const conicGradient = FUNDING_SOURCES.reduce(
    (acc: { segments: string[]; total: number }, s) => {
      const start = acc.total;
      const end = start + s.pct * 3.6;
      acc.segments.push(`${s.color} ${start}deg ${end}deg`);
      acc.total = end;
      return acc;
    },
    { segments: [], total: 0 },
  ).segments.join(', ');

  return `
    <section class="section section-page-header" aria-label="Transparency Header">
      <div class="container">
        ${renderSectionHeader('Full Disclosure', 'saffron', 'Transparency Portal', 'Every rupee, every case, every decision — open for public review. We believe transparency is the foundation of trust.')}
      </div>
    </section>

    <!-- Quarterly Reports -->
    <section class="section" aria-label="Quarterly Reports">
      <div class="container">
        <h3 class="heading-md mb-lg animate-on-scroll">📊 Quarterly Reports</h3>
        <div class="grid-2 animate-on-scroll">
          ${QUARTERLY_REPORTS.map(
            q => `
            <div class="glass-card">
              <div class="flex-between mb-md">
                <span class="badge badge-saffron">${q.q}</span>
                <span class="text-muted-note" style="cursor:pointer">📥 Download PDF</span>
              </div>
              <div class="grid-inner">
                <div><div class="text-muted-xs">Revenue</div><div class="heading-color-green" style="font-weight:700;font-size:1.1rem">${q.revenue}</div></div>
                <div><div class="text-muted-xs">Expenses</div><div class="heading-color-saffron" style="font-weight:700;font-size:1.1rem">${q.expenses}</div></div>
                <div><div class="text-muted-xs">Cases Filed</div><div style="font-weight:700;font-size:1.1rem">${q.cases}</div></div>
                <div><div class="text-muted-xs">Resolved</div><div class="heading-color-green" style="font-weight:700;font-size:1.1rem">${q.resolved}</div></div>
              </div>
            </div>
          `,
          ).join('')}
        </div>
      </div>
    </section>

    <!-- Case Stats by Ward -->
    <section class="section section-alt-bg" aria-label="Case Statistics by Region">
      <div class="container">
        <h3 class="heading-md mb-lg animate-on-scroll">📍 Case Statistics by Region</h3>
        <div class="glass-card animate-on-scroll">
          <div class="bar-chart">
            ${WARD_STATS.map(
              w => `
              <div class="bar-item">
                <div class="bar-value">${w.pct}%</div>
                <div class="bar-fill" style="height:${w.pct}%;background:${w.pct > 80 ? 'var(--gradient-green)' : 'var(--gradient-saffron)'}"></div>
                <div class="bar-label">${w.name}</div>
              </div>
            `,
            ).join('')}
          </div>
          <p class="text-muted-note text-center mt-md">Resolution rate by region (last 12 months)</p>
        </div>
      </div>
    </section>

    <!-- Funding Sources -->
    <section class="section" aria-label="Funding Sources">
      <div class="container">
        <h3 class="heading-md mb-lg animate-on-scroll">💰 Funding Sources Disclosure</h3>
        <div class="grid-2 animate-on-scroll">
          <div class="glass-card" style="display:flex;flex-direction:column;align-items:center">
            <div class="pie-chart mb-md" style="background:conic-gradient(${conicGradient})"></div>
            <div class="pie-legend">
              ${FUNDING_SOURCES.map(
                s => `
                <div class="pie-legend-item">
                  <div class="pie-legend-dot" style="background:${s.color}"></div>
                  <span>${s.label} — <strong>${s.pct}%</strong></span>
                </div>
              `,
              ).join('')}
            </div>
          </div>
          <div class="glass-card">
            <h4 class="heading-sm mb-md">Funding Policy</h4>
            <ul class="funding-policy-list">
              <li>🚫 No donations from political parties or politicians</li>
              <li>🚫 No anonymous donations above ₹20,000</li>
              <li>🚫 No foreign contributions (non-FCRA)</li>
              <li>✅ All donors verified via KYC</li>
              <li>✅ All donations above ₹500 published quarterly</li>
              <li>✅ Independent auditor: Deloitte India</li>
            </ul>
            <div class="audit-badge">
              <p class="audit-badge-title">✓ Last audited: December 2025</p>
              <p class="audit-badge-sub">Clean audit opinion — zero discrepancies found</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Governance Meeting Minutes -->
    <section class="section section-alt-bg" aria-label="Governance Meeting Minutes">
      <div class="container">
        <h3 class="heading-md mb-lg animate-on-scroll">📋 Governance Meeting Minutes</h3>
        <div class="animate-on-scroll">
          ${MEETING_MINUTES.map(m =>
            renderAccordionItem(
              `<span class="heading-color-saffron font-xs" style="margin-right:0.75rem">${m.date}</span>${m.title}`,
              `<p><strong>Key Decisions:</strong> ${m.key}</p>
             <p class="text-muted-sm mt-sm">📥 Full minutes available for download (names redacted for privacy)</p>`,
            ),
          ).join('')}
        </div>
      </div>
    </section>
  `;
}
