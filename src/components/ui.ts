/**
 * Shared UI component rendering functions.
 * Eliminates duplicated markup across page files.
 */

import { html, raw } from '../utils.ts';
import type { StatItem } from '../data/constants.ts';

/**
 * Renders a stat card with an animated counter value.
 */
export function renderStatCard(stat: StatItem, extraClass = '', delay = 0): string {
  return html`
    <div class="stat-card glass-card animate-on-scroll ${extraClass}"${delay ? raw(` style="transition-delay:${delay}ms"`) : ''}>
      <div class="stat-number counter-value" data-target="${stat.target}" data-suffix="${stat.suffix}">0</div>
      <div class="stat-label">${stat.label}</div>
    </div>`;
}

/**
 * Renders an impact dashboard card with emoji icon.
 */
export function renderImpactCard(stat: StatItem, emoji: string, delay = 0): string {
  return html`
    <div class="glass-card card-centered animate-on-scroll"${delay ? raw(` style="transition-delay:${delay}ms"`) : ''}>
      <div class="emoji-icon-lg">${emoji}</div>
      <div class="stat-number counter-value stat-value-sm" data-target="${stat.target}" data-suffix="${stat.suffix}">0</div>
      <div class="stat-label">${stat.label}</div>
    </div>`;
}

/**
 * Renders a glass card with icon, title, and description.
 */
export function renderGlassInfoCard(
  icon: string,
  title: string,
  description: string,
  variant: 'saffron' | 'green' = 'saffron',
  delay = 0,
): string {
  return html`
    <div class="glass-card animate-on-scroll"${delay ? raw(` style="animation-delay:${delay}s"`) : ''}>
      <div class="icon-circle icon-circle-${variant} mb-md">${icon}</div>
      <h3 class="mb-sm">${title}</h3>
      <p class="text-secondary-sm">${description}</p>
    </div>`;
}

/**
 * Renders an accordion item.
 */
export function renderAccordionItem(
  triggerLabel: string,
  content: string,
  extraClass = '',
): string {
  return html`
    <div class="accordion-item ${extraClass}">
      <button class="accordion-trigger" aria-expanded="false">
        <span>${triggerLabel}</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content" role="region">
        <div class="accordion-content-inner">${raw(content)}</div>
      </div>
    </div>`;
}

/**
 * Renders a section header with badge, heading, and optional subtitle.
 */
export function renderSectionHeader(
  badge: string,
  badgeColor: 'saffron' | 'green',
  heading: string,
  subtitle?: string,
): string {
  return html`
    <div class="section-header animate-on-scroll">
      <span class="badge badge-${badgeColor}">${badge}</span>
      <h2>${heading}</h2>
      ${subtitle ? html`<p>${subtitle}</p>` : ''}
    </div>`;
}

/**
 * Renders a team member card.
 */
export function renderTeamCard(member: {
  initials: string;
  name: string;
  role: string;
  bio: string;
  gradient: 'saffron' | 'green';
}, delay = 0): string {
  return html`
    <div class="team-card glass-card animate-on-scroll"${delay ? raw(` style="transition-delay:${delay}ms"`) : ''}>
      <div class="team-card-inner">
        <div class="team-avatar" style="background:var(--gradient-${member.gradient})">${member.initials}</div>
        <div class="team-name">${member.name}</div>
        <div class="team-role">${member.role}</div>
        <div class="team-bio">${member.bio}</div>
      </div>
    </div>`;
}

/**
 * Renders a testimonial card.
 */
export function renderTestimonialCard(testimonial: {
  quote: string;
  initials: string;
  name: string;
  role: string;
  gradient: 'saffron' | 'green';
}): string {
  return html`
    <div class="testimonial-card glass-card">
      <div class="testimonial-quote">${testimonial.quote}</div>
      <div class="testimonial-author">
        <div class="testimonial-avatar" style="background:var(--gradient-${testimonial.gradient})">${testimonial.initials}</div>
        <div>
          <div class="testimonial-name">${testimonial.name}</div>
          <div class="testimonial-role">${testimonial.role}</div>
        </div>
      </div>
    </div>`;
}
