import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

const NAV = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', route: '/docs/getting-started' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Button', route: '/docs/components/button' },
    ],
  },
];

@Component({
  selector: 'app-docs-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      @for (section of nav; track section.title) {
        <div class="section">
          <p class="section-title">{{ section.title }}</p>
          @for (item of section.items; track item.route) {
            <a
              class="sidebar-link"
              [routerLink]="item.route"
              routerLinkActive="active"
            >{{ item.label }}</a>
          }
        </div>
      }
    </aside>
  `,
  styles: `
    .sidebar {
      width: 220px; flex-shrink: 0;
      padding: 1.5rem 0;
      display: flex; flex-direction: column; gap: 1.5rem;
    }
    .section { display: flex; flex-direction: column; gap: 0.125rem; }
    .section-title {
      font-size: 0.75rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.06em;
      color: var(--nga-color-muted-foreground);
      margin: 0 0 0.375rem;
      padding: 0 0.75rem;
    }
    .sidebar-link {
      font-size: 0.875rem;
      color: var(--nga-color-muted-foreground);
      padding: 0.375rem 0.75rem;
      border-radius: var(--nga-radius-md);
      transition: color 150ms, background 150ms;
      text-decoration: none; display: block;
    }
    .sidebar-link:hover { color: var(--nga-color-foreground); background: var(--nga-color-muted); }
    .sidebar-link.active { color: var(--nga-color-foreground); background: var(--nga-color-muted); font-weight: 500; }
  `,
})
export class DocsSidebarComponent {
  readonly nav = NAV;
}
