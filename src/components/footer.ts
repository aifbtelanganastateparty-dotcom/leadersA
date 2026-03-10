/**
 * Footer component.
 */

export function renderFooter(): string {
  return `
    <footer class="footer" aria-label="Site Footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#/" class="navbar-logo footer-logo-spacing" aria-label="Leaders for India Home">
              <div class="navbar-logo-icon">L</div>
              <span>Leaders for India</span>
            </a>
            <p>Transforming India from unethical & divisive politics to constructive, citizen-centric policy through decentralized, transparent civic governance.</p>
            <div class="footer-social">
              <a href="#" aria-label="Twitter / X">𝕏</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◻</a>
              <a href="#" aria-label="YouTube">▶</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <a href="#/about">About Us</a>
            <a href="#/get-involved">Get Involved</a>
            <a href="#/transparency">Transparency</a>
            <a href="#/resources">Resources</a>
          </div>
          <div class="footer-col">
            <h4>For Citizens</h4>
            <a href="#/get-involved">Report an Issue</a>
            <a href="#/resources">RTI Guide</a>
            <a href="#/resources">Know Your Rights</a>
            <a href="#/resources">FAQs</a>
          </div>
          <div class="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#/transparency">Financial Reports</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 Leaders for India. All rights reserved. Registered under Societies Registration Act, 1860.</p>
          <p>Made with ❤️ for a better India</p>
        </div>
      </div>
    </footer>
  `;
}
