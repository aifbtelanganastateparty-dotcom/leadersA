/**
 * About page component.
 * Renders vision/mission/values, org structure, governance model, leadership, and legal compliance.
 */

import { TEAM_MEMBERS, GOVERNANCE_LEVELS, LEGAL_ITEMS } from '../data/constants.ts';
import { renderSectionHeader, renderTeamCard, renderAccordionItem } from '../components/ui.ts';

export function renderAbout(): string {
  return `
    <!-- Page Header -->
    <section class="section section-page-header" aria-label="About Header">
      <div class="container">
        ${renderSectionHeader('Who We Are', 'saffron', 'About Leaders for India', 'A decentralized civic movement building transparent, accountable governance from the ground up')}
      </div>
    </section>

    <!-- Vision Mission Values -->
    <section class="section" aria-label="Vision Mission Values">
      <div class="container">
        <div class="grid-3">
          <div class="glass-card animate-on-scroll text-center">
            <div class="emoji-icon-xl">🔭</div>
            <h3 class="heading-color-saffron mb-sm">Vision</h3>
            <p class="text-secondary-sm">An India where every citizen has the power, knowledge, and organized support to hold their elected representatives accountable — creating governance that serves people, not parties.</p>
          </div>
          <div class="glass-card animate-on-scroll text-center" style="animation-delay:0.1s">
            <div class="emoji-icon-xl">🎯</div>
            <h3 class="heading-color-green mb-sm">Mission</h3>
            <p class="text-secondary-sm">To transform Indian politics from unethical & divisive to constructive, citizen-centric policy-making through decentralized, transparent civic governance at every administrative level.</p>
          </div>
          <div class="glass-card animate-on-scroll text-center" style="animation-delay:0.2s">
            <div class="emoji-icon-xl">💎</div>
            <h3 class="mb-sm">Values</h3>
            <p class="text-secondary-sm">Transparency · Accountability · Non-partisanship · Evidence-based advocacy · Citizen empowerment · Decentralized governance · Integrity in action.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Organization Structure -->
    <section class="section section-alt-bg" aria-label="Organization Structure">
      <div class="container">
        ${renderSectionHeader('Structure', 'green', 'Organization Hierarchy', 'Our five-level decentralized governance model ensures accountability at every tier')}
        <div class="org-tree animate-on-scroll">
          <div class="org-level">
            <div class="org-node glass-card org-node-saffron">
              <div class="emoji-icon mb-xs">🏛️</div>
              National Council
              <div class="text-muted-sm mt-sm">Policy & Strategy</div>
            </div>
          </div>
          <div class="org-connector"></div>
          <div class="org-level">
            <div class="org-node glass-card">
              <div class="emoji-icon mb-xs">📍</div>
              State Chapters
              <div class="text-muted-sm mt-sm">Regional Coordination</div>
            </div>
            <div class="org-node glass-card">
              <div class="emoji-icon mb-xs">📍</div>
              State Chapters
              <div class="text-muted-sm mt-sm">28 States + 8 UTs</div>
            </div>
          </div>
          <div class="org-connector"></div>
          <div class="org-level">
            <div class="org-node glass-card">
              <div class="emoji-icon mb-xs">🏘️</div>
              District Units
              <div class="text-muted-sm mt-sm">District-level operations</div>
            </div>
            <div class="org-node glass-card">
              <div class="emoji-icon mb-xs">🏘️</div>
              District Units
              <div class="text-muted-sm mt-sm">Case coordination</div>
            </div>
            <div class="org-node glass-card">
              <div class="emoji-icon mb-xs">🏘️</div>
              District Units
              <div class="text-muted-sm mt-sm">Volunteer management</div>
            </div>
          </div>
          <div class="org-connector"></div>
          <div class="org-level">
            <div class="org-node glass-card org-node-sm">Constituency Cells</div>
            <div class="org-node glass-card org-node-sm">Constituency Cells</div>
            <div class="org-node glass-card org-node-sm">Constituency Cells</div>
            <div class="org-node glass-card org-node-sm">Constituency Cells</div>
          </div>
          <div class="org-connector"></div>
          <div class="org-level">
            <div class="org-node glass-card org-node-ward">Ward Volunteers</div>
            <div class="org-node glass-card org-node-ward">Ward Volunteers</div>
            <div class="org-node glass-card org-node-ward">Ward Volunteers</div>
            <div class="org-node glass-card org-node-ward">Ward Volunteers</div>
            <div class="org-node glass-card org-node-ward">Ward Volunteers</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Five-Level Governance Model -->
    <section class="section" aria-label="Governance Model">
      <div class="container">
        ${renderSectionHeader('Governance', 'saffron', 'Five-Level Governance Model', 'Each level has defined responsibilities, autonomy, and accountability measures')}
        <div class="animate-on-scroll">
          ${GOVERNANCE_LEVELS.map(level =>
            renderAccordionItem(
              `${level.emoji} ${level.label}`,
              `<p><strong>Responsibilities:</strong> ${level.responsibilities}</p>
             <p class="mt-sm"><strong>Composition:</strong> ${level.composition}</p>
             <p class="mt-sm"><strong>Accountability:</strong> ${level.accountability}</p>`,
            ),
          ).join('')}
        </div>
      </div>
    </section>

    <!-- Leadership Team -->
    <section class="section section-alt-bg" aria-label="Leadership Team">
      <div class="container">
        ${renderSectionHeader('Leadership', 'green', 'Our Leadership Team', 'Experienced professionals committed to civic transformation')}
        <div class="grid-4 animate-on-scroll">
          ${TEAM_MEMBERS.map(m => renderTeamCard(m)).join('')}
        </div>
      </div>
    </section>

    <!-- Legal & Compliance -->
    <section class="section" aria-label="Legal and Compliance">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2>Legal & Compliance</h2>
        </div>
        <div class="grid-3 animate-on-scroll">
          ${LEGAL_ITEMS.map(
            item => `
            <div class="glass-card legal-card">
              <div class="emoji-icon-lg">${item.emoji}</div>
              <h4 class="heading-sm mb-sm">${item.title}</h4>
              <p class="text-muted-sm">${item.description}</p>
              <p class="cert-number heading-color-${item.certColor}">${item.certNumber}</p>
            </div>
          `,
          ).join('')}
        </div>
      </div>
    </section>
  `;
}
