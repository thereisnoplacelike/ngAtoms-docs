import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteNavComponent } from '../components/site-nav/site-nav.component';
import { CodeBlockComponent } from '../components/code-block/code-block.component';

const INSTALL_CMD = `npm install ngatoms`;
const INIT_CMD = `npx ngatoms init\nnpx ngatoms add button`;

const FEATURES = [
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: 'Copy, don\'t install',
    description: 'Components live in your codebase. Modify them however you want — no version lock-in, no fighting a library\'s API.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    title: 'Accessible by default',
    description: 'Every primitive follows WAI-ARIA patterns. Focus management, keyboard navigation, and ARIA attributes built in.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><circle cx="6.5" cy="15.5" r="2.5"/><path d="M13.5 9v1.5L6.5 13"/><path d="M13.5 9v1.5l4 2.5"/></svg>`,
    title: 'Design token system',
    description: 'CSS custom properties for every color, radius, and spacing. Light and dark mode included. Override at any level.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title: 'Angular-native',
    description: 'Standalone directives and components built with modern Angular signals. No wrappers, no zone.js hacks.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    title: 'Zero runtime deps',
    description: 'The primitives have no peer dependencies beyond Angular itself. Lightweight by design.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'SSR compatible',
    description: 'All DOM manipulation goes through Angular\'s Renderer2. Works with server-side rendering and custom renderers.',
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SiteNavComponent, CodeBlockComponent],
  template: `
    <app-site-nav />

    <main>
      <!-- Hero -->
      <section class="hero">
        <div class="hero-inner">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Angular UI Primitives
          </div>
          <h1 class="hero-title">
            Components you own,<br>not just install.
          </h1>
          <p class="hero-subtitle">
            NgAtoms gives you a CLI to copy accessible Angular UI primitives
            directly into your project. No runtime library, no version conflicts —
            just code you control.
          </p>
          <div class="hero-actions">
            <a routerLink="/docs/getting-started" class="btn-primary">Get started</a>
            <a routerLink="/docs/components/button" class="btn-ghost">Browse components →</a>
          </div>
          <div class="hero-install">
            <app-code-block [code]="installCmd" language="bash" />
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="features">
        <div class="features-inner">
          @for (f of features; track f.title) {
            <div class="feature-card">
              <div class="feature-icon" [innerHTML]="f.icon"></div>
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <div class="cta-inner">
          <h2 class="cta-title">Ready to start?</h2>
          <p class="cta-desc">Run init, add your first component, and ship.</p>
          <div class="cta-code">
            <app-code-block [code]="initCmd" language="bash" />
          </div>
          <a routerLink="/docs/getting-started" class="btn-primary">Read the docs</a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <span>NgAtoms — MIT License</span>
        <a href="https://github.com/thereisnoplacelike/ngatoms" target="_blank" rel="noopener">GitHub</a>
      </div>
    </footer>
  `,
  styles: `
    main { min-height: calc(100vh - 56px); }

    /* Hero */
    .hero { padding: 6rem 1.5rem 4rem; text-align: center; }
    .hero-inner { max-width: 680px; margin: 0 auto; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-size: 0.8125rem; font-weight: 500;
      color: var(--nga-color-muted-foreground);
      background: var(--nga-color-muted);
      border: 1px solid var(--nga-color-border);
      padding: 0.3rem 0.875rem;
      border-radius: var(--nga-radius-full);
      margin-bottom: 1.75rem;
    }
    .badge-dot {
      width: 6px; height: 6px;
      background: var(--nga-color-accent-foreground);
      border-radius: 50%;
    }
    .hero-title {
      font-size: clamp(2rem, 5vw, 3.25rem);
      font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
      margin: 0 0 1.25rem;
      color: var(--nga-color-foreground);
    }
    .hero-subtitle {
      font-size: 1.0625rem; line-height: 1.7;
      color: var(--nga-color-muted-foreground);
      margin: 0 0 2rem;
    }
    .hero-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
    .btn-primary {
      display: inline-flex; align-items: center;
      padding: 0.625rem 1.25rem;
      background: var(--nga-color-primary);
      color: var(--nga-color-primary-foreground);
      border-radius: var(--nga-radius-md);
      font-size: 0.9375rem; font-weight: 600;
      text-decoration: none;
      transition: opacity 150ms;
    }
    .btn-primary:hover { opacity: 0.88; }
    .btn-ghost {
      display: inline-flex; align-items: center;
      padding: 0.625rem 1.25rem;
      color: var(--nga-color-muted-foreground);
      border-radius: var(--nga-radius-md);
      font-size: 0.9375rem; font-weight: 500;
      text-decoration: none;
      transition: color 150ms, background 150ms;
    }
    .btn-ghost:hover { color: var(--nga-color-foreground); background: var(--nga-color-muted); }
    .hero-install { max-width: 360px; margin: 0 auto; text-align: left; }

    /* Features */
    .features { padding: 4rem 1.5rem; border-top: 1px solid var(--nga-color-border); }
    .features-inner {
      max-width: 1100px; margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .feature-card {
      padding: 1.5rem;
      background: var(--nga-color-card);
      border: 1px solid var(--nga-color-border);
      border-radius: var(--nga-radius-lg);
    }
    .feature-icon {
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      background: var(--nga-color-muted);
      border-radius: var(--nga-radius-md);
      color: var(--nga-color-foreground);
      margin-bottom: 1rem;
    }
    .feature-title { font-size: 0.9375rem; font-weight: 600; margin: 0 0 0.5rem; }
    .feature-desc { font-size: 0.875rem; color: var(--nga-color-muted-foreground); line-height: 1.6; margin: 0; }

    /* CTA */
    .cta { padding: 5rem 1.5rem; text-align: center; border-top: 1px solid var(--nga-color-border); }
    .cta-inner { max-width: 480px; margin: 0 auto; }
    .cta-title { font-size: var(--nga-text-2xl); font-weight: 700; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
    .cta-desc { color: var(--nga-color-muted-foreground); margin: 0 0 1.75rem; }
    .cta-code { margin-bottom: 1.75rem; text-align: left; }

    /* Footer */
    .footer { border-top: 1px solid var(--nga-color-border); padding: 1.5rem; }
    .footer-inner {
      max-width: 1280px; margin: 0 auto;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.875rem; color: var(--nga-color-muted-foreground);
    }
    .footer-inner a { color: inherit; transition: color 150ms; }
    .footer-inner a:hover { color: var(--nga-color-foreground); }
  `,
})
export default class HomePage {
  readonly installCmd = INSTALL_CMD;
  readonly initCmd = INIT_CMD;
  readonly features = FEATURES;
}
