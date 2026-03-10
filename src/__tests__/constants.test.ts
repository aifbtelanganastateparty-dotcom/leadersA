import { describe, it, expect } from 'vitest';
import {
  HOME_STATS,
  TEAM_MEMBERS,
  GOVERNANCE_LEVELS,
  FUNDING_SOURCES,
  FAQS,
  GLOSSARY,
  VOLUNTEER_ROLES,
} from '../data/constants.ts';

describe('Data Constants Integrity', () => {
  it('HOME_STATS should have 4 items', () => {
    expect(HOME_STATS.length).toBe(4);
    expect(HOME_STATS[0]).toHaveProperty('target');
  });

  it('TEAM_MEMBERS should have required fields', () => {
    expect(TEAM_MEMBERS.length).toBeGreaterThan(0);
    TEAM_MEMBERS.forEach(member => {
      expect(member).toHaveProperty('initials');
      expect(member).toHaveProperty('name');
      expect(member).toHaveProperty('role');
      expect(member).toHaveProperty('bio');
    });
  });

  it('GOVERNANCE_LEVELS should have exactly 5 levels', () => {
    expect(GOVERNANCE_LEVELS.length).toBe(5);
    GOVERNANCE_LEVELS.forEach(level => {
      expect(level.label).toContain('Level');
    });
  });

  it('FUNDING_SOURCES percentages should sum to 100', () => {
    const totalPct = FUNDING_SOURCES.reduce((sum, current) => sum + current.pct, 0);
    expect(totalPct).toBe(100);
  });

  it('FAQS and GLOSSARY should be populated', () => {
    expect(FAQS.length).toBeGreaterThan(0);
    expect(GLOSSARY.length).toBeGreaterThan(0);
  });

  it('VOLUNTEER_ROLES should have colors mapped to CSS variables', () => {
    const validColors = ['saffron', 'green-light', 'green'];
    VOLUNTEER_ROLES.forEach(role => {
      expect(validColors).toContain(role.color);
    });
  });
});
