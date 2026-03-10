import { describe, it, expect } from 'vitest';
import { renderStatCard, renderGlassInfoCard, renderAccordionItem } from '../components/ui.ts';
import type { StatItem } from '../data/constants.ts';

describe('UI Components', () => {
  describe('renderStatCard', () => {
    it('renders a stat card correctly', () => {
      const stat: StatItem = { target: 100, suffix: '+', label: 'Volunteers' };
      const html = renderStatCard(stat, 'custom-class');

      expect(html).toContain('class="stat-card glass-card animate-on-scroll custom-class"');
      expect(html).toContain('data-target="100"');
      expect(html).toContain('data-suffix="+"');
      expect(html).toContain('Volunteers');
    });
  });

  describe('renderGlassInfoCard', () => {
    it('renders an info card with provided properties', () => {
      const html = renderGlassInfoCard('🚀', 'Speed', 'Very fast', 'green', 0.5);

      expect(html).toContain('icon-circle-green');
      expect(html).toContain('🚀');
      expect(html).toContain('Speed');
      expect(html).toContain('Very fast');
      expect(html).toContain('animation-delay:0.5s');
    });
  });

  describe('renderAccordionItem', () => {
    it('renders an accordion item with trigger and content', () => {
      const html = renderAccordionItem('Question?', '<p>Answer!</p>', 'extra-class');

      expect(html).toContain('class="accordion-item extra-class"');
      expect(html).toContain('Question?');
      expect(html).toContain('<p>Answer!</p>');
      expect(html).toContain('aria-expanded="false"');
      expect(html).toContain('role="region"');
    });
  });
});
