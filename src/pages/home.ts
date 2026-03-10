/**
 * Home page component.
 * Renders the landing page with hero, mission, stats, how-it-works, impact, testimonials, and CTA sections.
 */

import {
  HOME_STATS,
  HOME_STEPS,
  IMPACT_STATS,
  IMPACT_EMOJIS,
  TESTIMONIALS,
} from '../data/constants.ts';
import {
  renderStatCard,
  renderImpactCard,
  renderGlassInfoCard,
  renderSectionHeader,
  renderTestimonialCard,
} from '../components/ui.ts';

export function renderHome(): string {
  return `
    <!-- Hero Section -->
    <section class="hero" id="hero" aria-label="Hero">
      <div class="hero-bg"></div>
      <div class="hero-blob"></div>
      <div class="hero-particles" id="hero-particles"></div>
      <div class="hero-content">
        <div class="hero-badge">🇮🇳 Civic Leadership Movement</div>
        <h1>Redefining Leadership,<br/><span class="highlight">Rebuilding India</span></h1>
        <p class="hero-subtitle">
          Empowering qualified citizens to become organized civic advocates —
          combating corruption and transforming Indian politics from divisive
          rhetoric to constructive, citizen-centric policy-making.
        </p>
        <div class="hero-ctas">
          <a href="#/get-involved" class="btn btn-primary">Join as Volunteer ✦</a>
          <a href="#/get-involved" class="btn btn-green">Report an Issue →</a>
          <a href="#/about" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
      <div class="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Mission Statement Section -->
    <section class="section section-alt-bg" id="mission-section" aria-label="Our Mission">
      <div class="container">
        ${renderSectionHeader('Our Mission', 'saffron', "Transforming India's Political Landscape", 'From unethical & divisive politics to constructive, citizen-centric policy through decentralized, transparent civic governance.')}
        <div class="grid-3">
          ${renderGlassInfoCard('🔍', 'Identify', 'Citizens report local governance issues — from potholes to permit corruption — through our secure platform.', 'saffron', 0.1)}
          ${renderGlassInfoCard('⚖️', 'Advocate', 'Our trained volunteers escalate issues through proper channels — RTI, legal notices, and public forums.', 'green', 0.2)}
          ${renderGlassInfoCard('🏛️', 'Transform', 'Systemic issues are addressed through policy advocacy, creating lasting change at ward, district, and state levels.', 'saffron', 0.3)}
        </div>
      </div>
    </section>

    <!-- Key Statistics -->
    <section class="section" id="stats-section" aria-label="Key Statistics">
      <div class="container">
        <div class="stats-grid">
          ${HOME_STATS.map((s, i) => renderStatCard(s, '', i * 100)).join('')}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section section-alt-bg" id="how-it-works" aria-label="How It Works">
      <div class="container">
        ${renderSectionHeader('Process', 'green', 'How It Works', 'A simple, transparent, three-step process from reporting to resolution')}
        <div class="steps-container animate-on-scroll">
          ${HOME_STEPS.map(
            (step, i) => `
            <div class="step-item">
              <div class="step-number">${step.number}</div>
              ${i < HOME_STEPS.length - 1 ? '<div class="step-connector"></div>' : ''}
              <h3>${step.title}</h3>
              <p>${step.description}</p>
            </div>
          `,
          ).join('')}
        </div>
      </div>
    </section>

    <!-- Impact Dashboard -->
    <section class="section" id="impact-dashboard" aria-label="Impact Dashboard">
      <div class="container">
        ${renderSectionHeader('Live Impact', 'saffron', 'Impact Dashboard', "Real-time metrics showcasing our community's collective action")}
        <div class="grid-4 animate-on-scroll">
          ${IMPACT_STATS.map((s, i) => renderImpactCard(s, IMPACT_EMOJIS[i], i * 150)).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section section-alt-bg" id="testimonials" aria-label="Success Stories">
      <div class="container">
        ${renderSectionHeader('Success Stories', 'green', 'Voices of Change', 'Real citizens, real issues, real results')}
        <div class="testimonials-track">
          ${TESTIMONIALS.map(t => renderTestimonialCard(t)).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section" id="home-cta" aria-label="Call to Action">
      <div class="container text-center">
        <div class="animate-on-scroll">
          <h2 class="tricolor-heading">Ready to Make a Difference?</h2>
          <p class="text-secondary-sm" style="max-width:520px;margin:0 auto 2rem">
            Whether you want to report an issue, volunteer your time, or support the movement — every action counts.
          </p>
          <div class="hero-ctas">
            <a href="#/get-involved" class="btn btn-primary">Join the Movement ✦</a>
            <a href="#/transparency" class="btn btn-secondary">See Our Impact →</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
