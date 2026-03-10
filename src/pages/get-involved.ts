/**
 * Get Involved page component.
 * Renders tabs for citizens, volunteers, donors, and partners.
 */

import {
  CITIZEN_STEPS,
  VOLUNTEER_ROLES,
  FUNDING_BARS,
  COLLAB_OPPORTUNITIES,
  APPLICATION_STEPS,
} from '../data/constants.ts';
import { renderSectionHeader } from '../components/ui.ts';

export function renderGetInvolved(): string {
  return `
    <section class="section section-page-header" aria-label="Get Involved Header">
      <div class="container">
        ${renderSectionHeader('Take Action', 'green', 'Get Involved', "Whether you're a citizen seeking help, a volunteer ready to serve, a donor wanting transparency, or an organization looking to partner — there's a role for you.")}
      </div>
    </section>
    <section class="section" aria-label="Get Involved Tabs">
      <div class="container">
        <div class="tabs-container">
          <div class="tabs-nav animate-on-scroll" role="tablist">
            <button class="tab-btn active" data-tab="tab-citizens" role="tab" aria-selected="true" aria-controls="tab-citizens">🏠 For Citizens</button>
            <button class="tab-btn" data-tab="tab-volunteers" role="tab" aria-selected="false" aria-controls="tab-volunteers">🤝 For Volunteers</button>
            <button class="tab-btn" data-tab="tab-donors" role="tab" aria-selected="false" aria-controls="tab-donors">💛 For Donors</button>
            <button class="tab-btn" data-tab="tab-partners" role="tab" aria-selected="false" aria-controls="tab-partners">🏢 For Partners</button>
          </div>
          ${citizensTab()}
          ${volunteersTab()}
          ${donorsTab()}
          ${partnersTab()}
        </div>
      </div>
    </section>
  `;
}

function citizensTab(): string {
  return `
  <div class="tab-panel active" id="tab-citizens" role="tabpanel">
    <div class="grid-2">
      <div>
        <h3 class="heading-color-saffron mb-md">How to Report an Issue</h3>
        ${CITIZEN_STEPS.map(
          s => `
          <div class="glass-card mb-sm">
            <div class="flex-row">
              <div class="icon-circle icon-circle-${s.c} step-badge">${s.n}</div>
              <div>
                <h4 class="heading-sm mb-xs">${s.t}</h4>
                <p class="text-secondary-xs">${s.d}</p>
              </div>
            </div>
          </div>
        `,
        ).join('')}
      </div>
      <div>
        <h3 class="heading-color-green mb-md">What to Expect</h3>
        <div class="glass-card mb-lg">
          <h4 class="heading-sm mb-sm">⏱️ Timeline</h4>
          <ul class="funding-policy-list">
            <li>• Case acknowledgment: <strong class="text-primary">24 hours</strong></li>
            <li>• Initial assessment: <strong class="text-primary">3–5 days</strong></li>
            <li>• RTI filing (if needed): <strong class="text-primary">7 days</strong></li>
            <li>• Average resolution: <strong class="text-primary">18 days</strong></li>
          </ul>
        </div>
        <div class="glass-card">
          <h4 class="heading-sm mb-sm">🛡️ Your Protections</h4>
          <ul class="funding-policy-list">
            <li>✓ Complete anonymity guaranteed</li>
            <li>✓ Legal protection for whistleblowers</li>
            <li>✓ Encrypted communications</li>
            <li>✓ No political affiliation required</li>
            <li>✓ Free of charge — always</li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
}

function volunteersTab(): string {
  return `
  <div class="tab-panel" id="tab-volunteers" role="tabpanel">
    <div class="grid-2">
      <div>
        <h3 class="heading-color-saffron mb-md">Membership Criteria</h3>
        <div class="glass-card mb-lg">
          <ul class="funding-policy-list">
            <li>✦ Indian citizen (18+ years)</li>
            <li>✦ No criminal record</li>
            <li>✦ Non-partisan — no active political party membership</li>
            <li>✦ Commitment of minimum 4 hours/week</li>
            <li>✦ Willingness to complete 20-hour training program</li>
          </ul>
        </div>
        <h3 class="heading-color-green mb-md">Volunteer Roles</h3>
        <div class="glass-card">
          <div class="grid-inner" style="display:flex;flex-direction:column;gap:0.75rem">
            ${VOLUNTEER_ROLES.map(
              r => `
              <div class="role-item">
                <strong class="heading-color-${r.color} font-sm">${r.icon} ${r.title}</strong>
                <p class="text-muted-xs mt-xs" style="text-transform:none;letter-spacing:normal">${r.description}</p>
              </div>
            `,
            ).join('')}
          </div>
        </div>
      </div>
      <div>
        <h3 class="heading-color-saffron mb-md">Volunteer Benefits</h3>
        <div class="glass-card mb-lg">
          <ul class="funding-policy-list">
            <li>🎓 Professional training in civic advocacy & law</li>
            <li>📜 Certified volunteer credential (NSDC recognized)</li>
            <li>🤝 Network of 12,500+ like-minded advocates</li>
            <li>💼 Letters of recommendation</li>
            <li>🏆 Annual awards and public recognition</li>
            <li>🔒 Legal protection during volunteer activities</li>
          </ul>
        </div>
        <h3 class="heading-color-green mb-md">Application Process</h3>
        <div class="glass-card">
          ${APPLICATION_STEPS.map(
            (step, i) => `
            <div class="flex-center mb-sm" style="justify-content:flex-start">
              <span class="step-badge mr-sm" style="margin-right:0.75rem">${i < 3 ? i + 1 : '✓'}</span>
              <span class="text-secondary-xs">${step}</span>
            </div>
          `,
          ).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function donorsTab(): string {
  return `
  <div class="tab-panel" id="tab-donors" role="tabpanel">
    <div class="grid-2">
      <div>
        <h3 class="heading-color-saffron mb-md">Our Transparency Pledge</h3>
        <div class="glass-card mb-lg">
          <ul class="funding-policy-list">
            <li>✓ Every rupee tracked and published quarterly</li>
            <li>✓ Independent third-party audits annually</li>
            <li>✓ Less than 12% administrative overhead</li>
            <li>✓ No corporate or political party donations accepted</li>
            <li>✓ 80G tax exemption for all donations</li>
          </ul>
        </div>
        <div class="glass-card">
          <h4 class="heading-sm mb-sm">Where Your Money Goes</h4>
          ${FUNDING_BARS.map(
            b => `
            <div class="mb-sm">
              <div class="flex-between font-xs mb-xs">
                <span class="text-secondary-xs">${b.label}</span>
                <span class="heading-color-${b.color === 'gray' ? 'muted' : b.color === 'saffron' ? 'saffron' : 'green'}" style="font-weight:600">${b.pct}%</span>
              </div>
              <div class="progress-bar-track">
                <div style="height:100%;width:${b.pct}%;background:${b.color === 'gray' ? 'linear-gradient(90deg,#666,#888)' : b.color === 'saffron' ? 'var(--gradient-saffron)' : 'var(--gradient-green)'};border-radius:3px"></div>
              </div>
            </div>
          `,
          ).join('')}
        </div>
      </div>
      <div>
        <h3 class="heading-color-green mb-md">Donation Impact Calculator</h3>
        <div class="glass-card">
          <div class="calculator-widget">
            <p class="text-secondary-sm mb-sm">See what your contribution can achieve:</p>
            <div class="text-center mb-md">
              <span id="calc-amount" style="font-family:var(--font-heading);font-size:2rem;font-weight:700;color:var(--saffron)">₹5,000</span>
            </div>
            <input type="range" id="donation-slider" class="calculator-slider" min="500" max="50000" step="500" value="5000" aria-label="Donation amount" />
            <div class="flex-between text-muted-xs mb-md">
              <span>₹500</span><span>₹50,000</span>
            </div>
            <div class="calculator-output">
              <div class="calculator-item"><div class="calculator-item-value" id="calc-rti">50</div><div class="calculator-item-label">RTI Applications</div></div>
              <div class="calculator-item"><div class="calculator-item-value" id="calc-wards">2</div><div class="calculator-item-label">Wards Supported</div></div>
              <div class="calculator-item"><div class="calculator-item-value" id="calc-cases">10</div><div class="calculator-item-label">Cases Funded</div></div>
              <div class="calculator-item"><div class="calculator-item-value" style="color:var(--green-light)">80G</div><div class="calculator-item-label">Tax Deduction</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function partnersTab(): string {
  return `
  <div class="tab-panel" id="tab-partners" role="tabpanel">
    <div class="grid-2">
      <div>
        <h3 class="heading-color-saffron mb-md">Collaboration Opportunities</h3>
        ${COLLAB_OPPORTUNITIES.map(
          c => `
          <div class="glass-card mb-md">
            <div class="flex-row">
              <div class="emoji-icon-md">${c.icon}</div>
              <div>
                <h4 class="heading-sm mb-xs">${c.title}</h4>
                <p class="text-secondary-xs">${c.description}</p>
              </div>
            </div>
          </div>
        `,
        ).join('')}
      </div>
      <div>
        <h3 class="heading-color-green mb-md">Partnership Benefits</h3>
        <div class="glass-card mb-lg">
          <ul class="funding-policy-list">
            <li>🔗 Access to grassroots network across 850+ wards</li>
            <li>📊 Real-time civic data and research insights</li>
            <li>📣 Co-branded campaigns reaching 100K+ citizens</li>
            <li>🏅 CSR compliance and impact reporting</li>
          </ul>
        </div>
        <div class="glass-card card-centered">
          <h4 class="mb-sm">Interested in partnering?</h4>
          <p class="text-secondary-xs mb-md">Reach out to explore collaboration opportunities.</p>
          <a href="mailto:partners@leadersforindia.org" class="btn btn-primary">Contact Partnerships Team</a>
        </div>
      </div>
    </div>
  </div>`;
}
