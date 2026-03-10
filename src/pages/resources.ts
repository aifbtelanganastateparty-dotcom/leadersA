/**
 * Resources page component.
 * Renders FAQs, glossary, and resource cards.
 */

import { FAQS, GLOSSARY, RESOURCES } from '../data/constants.ts';
import { renderSectionHeader, renderAccordionItem } from '../components/ui.ts';

export function renderResources(): string {
  return `
    <section class="section section-page-header" aria-label="Resources Header">
      <div class="container">
        ${renderSectionHeader('Knowledge Base', 'green', 'Resources & Guides', 'Everything you need to know about your rights, government processes, and how to hold authorities accountable')}
        <div class="search-bar animate-on-scroll">
          <span class="search-bar-icon">🔍</span>
          <input type="text" id="resource-search" placeholder="Search resources, guides, and FAQs..." aria-label="Search resources" />
        </div>
      </div>
    </section>

    <!-- Resource Cards -->
    <section class="section" aria-label="Resource Documents">
      <div class="container">
        <div class="grid-3 animate-on-scroll">
          ${RESOURCES.map(
            r => `
            <div class="glass-card resource-card" style="cursor:pointer" tabindex="0" role="button">
              <div class="emoji-icon-md mb-sm">${r.icon}</div>
              <span class="badge badge-${r.tagColor} mb-sm">${r.tag}</span>
              <h4 class="heading-sm mb-xs">${r.title}</h4>
              <p class="text-secondary-xs">${r.desc}</p>
            </div>
          `,
          ).join('')}
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section section-alt-bg" aria-label="Frequently Asked Questions">
      <div class="container">
        ${renderSectionHeader('FAQ', 'saffron', 'Frequently Asked Questions')}
        <div class="animate-on-scroll faq-container">
          ${FAQS.map(f => renderAccordionItem(f.question, f.answer, 'resource-card')).join('')}
        </div>
      </div>
    </section>

    <!-- Glossary -->
    <section class="section" aria-label="Glossary">
      <div class="container">
        ${renderSectionHeader('Reference', 'green', 'Glossary of Government Processes')}
        <div class="glass-card animate-on-scroll" style="overflow-x:auto">
          <table class="glossary-table">
            <thead>
              <tr>
                <th scope="col">Term</th>
                <th scope="col">Full Form</th>
                <th scope="col">Definition</th>
              </tr>
            </thead>
            <tbody>
              ${GLOSSARY.map(
                g => `
                <tr class="resource-card">
                  <td class="heading-color-saffron" style="font-weight:600">${g.term}</td>
                  <td>${g.full}</td>
                  <td>${g.def}</td>
                </tr>
              `,
              ).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}
