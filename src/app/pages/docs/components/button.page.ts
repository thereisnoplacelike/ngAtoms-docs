import { Component, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteNavComponent } from '../../../components/site-nav/site-nav.component';
import { DocsSidebarComponent } from '../../../components/docs-sidebar/docs-sidebar.component';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component';
import { ComponentPreviewComponent } from '../../../components/component-preview/component-preview.component';
import { NgAtomsButtonDirective, NgAtomsButtonVariant, NgAtomsButtonSize } from '../../../primitives/button/button.directive';

const VARIANTS: NgAtomsButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'destructive'];
const SIZES: NgAtomsButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const SNIPPETS = {
  add: `npx ngatoms add button`,
  import: `import { NgAtomsButtonDirective } from './components/button/button.directive';`,
  basic: `<button ngAtomsButton>Button</button>`,
  variants: `<button ngAtomsButton variant="primary">Primary</button>
<button ngAtomsButton variant="secondary">Secondary</button>
<button ngAtomsButton variant="outline">Outline</button>
<button ngAtomsButton variant="ghost">Ghost</button>
<button ngAtomsButton variant="destructive">Destructive</button>`,
  sizes: `<button ngAtomsButton size="xs">Extra small</button>
<button ngAtomsButton size="sm">Small</button>
<button ngAtomsButton size="md">Medium</button>
<button ngAtomsButton size="lg">Large</button>
<button ngAtomsButton size="xl">Extra large</button>`,
  loading: `<button ngAtomsButton [loading]="isLoading">Save changes</button>`,
  full: `import { Component, signal } from '@angular/core';
import { NgAtomsButtonDirective } from './components/button/button.directive';

@Component({
  imports: [NgAtomsButtonDirective],
  template: \`
    <button
      ngAtomsButton
      [variant]="variant()"
      [size]="size()"
      [loading]="loading()"
    >
      Click me
    </button>
  \`,
})
export class MyComponent {
  variant = signal<NgAtomsButtonVariant>('primary');
  size    = signal<NgAtomsButtonSize>('md');
  loading = signal(false);
}`,
};

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [
    RouterLink, TitleCasePipe, SiteNavComponent, DocsSidebarComponent,
    CodeBlockComponent, ComponentPreviewComponent,
    NgAtomsButtonDirective,
  ],
  template: `
    <app-site-nav />
    <div class="layout">
      <app-docs-sidebar />
      <main class="content">
        <div class="prose">
          <div class="page-header">
            <h1>Button</h1>
            <span class="badge">Directive</span>
          </div>
          <p class="lead">
            A button directive with 5 variants, 5 sizes, loading state, and icon support.
            Apply <code>ngAtomsButton</code> to any <code>&lt;button&gt;</code> element.
          </p>

          <app-code-block [code]="s.add" language="bash" />

          <h2>Variants</h2>
          <p>Five visual styles to fit different contexts.</p>
          <app-component-preview [code]="s.variants" language="html">
            @for (v of variants; track v) {
              <button ngAtomsButton [variant]="v">{{ v | titlecase }}</button>
            }
          </app-component-preview>

          <h2>Sizes</h2>
          <p>From <code>xs</code> to <code>xl</code>.</p>
          <app-component-preview [code]="s.sizes" language="html">
            @for (sz of sizes; track sz) {
              <button ngAtomsButton [size]="sz">{{ sz }}</button>
            }
          </app-component-preview>

          <h2>Loading state</h2>
          <p>
            Set <code>[loading]="true"</code> to show a spinner, disable clicks,
            and set <code>aria-busy</code> automatically.
          </p>
          <app-component-preview [code]="s.loading" language="html">
            <button ngAtomsButton [loading]="loadingDemo()">
              {{ loadingDemo() ? 'Saving…' : 'Save changes' }}
            </button>
            <button ngAtomsButton variant="outline" (click)="loadingDemo.set(!loadingDemo())">
              Toggle loading
            </button>
          </app-component-preview>

          <h2>Usage</h2>
          <p>Import the directive and use it in your template:</p>
          <app-code-block [code]="s.import" language="typescript" />
          <app-code-block [code]="s.full" language="typescript" />

          <h2>API</h2>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead>
                <tr>
                  <th>Input</th><th>Type</th><th>Default</th><th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'</code></td>
                  <td><code>'primary'</code></td>
                  <td>Visual style of the button.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl'</code></td>
                  <td><code>'md'</code></td>
                  <td>Size of the button.</td>
                </tr>
                <tr>
                  <td><code>loading</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Shows a spinner, disables clicks, sets <code>aria-busy</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: `
    .layout {
      max-width: 1100px; margin: 0 auto;
      padding: 0 1.5rem;
      display: flex; gap: 3rem;
      min-height: calc(100vh - 56px);
    }
    .content { flex: 1; padding: 2.5rem 0 4rem; min-width: 0; }
    .prose { max-width: 720px; }
    .prose app-code-block, .prose app-component-preview { display: block; margin: 1rem 0; }

    .page-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.5rem; }
    .badge {
      font-size: 0.75rem; font-weight: 500;
      background: var(--nga-color-muted);
      color: var(--nga-color-muted-foreground);
      border: 1px solid var(--nga-color-border);
      padding: 0.2em 0.6em;
      border-radius: var(--nga-radius-full);
    }

    .api-table-wrap { overflow-x: auto; margin: 1rem 0; }
    .api-table {
      width: 100%; border-collapse: collapse;
      font-size: 0.875rem;
    }
    .api-table th {
      text-align: left; padding: 0.625rem 1rem;
      font-size: 0.75rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.05em;
      color: var(--nga-color-muted-foreground);
      border-bottom: 1px solid var(--nga-color-border);
      background: var(--nga-color-muted);
    }
    .api-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--nga-color-border);
      vertical-align: top; line-height: 1.5;
    }
    .api-table td:last-child { color: var(--nga-color-muted-foreground); }
    .api-table tr:last-child td { border-bottom: none; }
    .api-table code {
      font-family: var(--nga-font-mono); font-size: 0.8em;
      background: var(--nga-color-muted);
      padding: 0.15em 0.4em;
      border-radius: var(--nga-radius-sm);
    }
    .api-table { border: 1px solid var(--nga-color-border); border-radius: var(--nga-radius-lg); overflow: hidden; }
    .api-table th:first-child, .api-table td:first-child { padding-left: 1.25rem; }
  `,
})
export default class ButtonPage {
  readonly s = SNIPPETS;
  readonly variants = VARIANTS;
  readonly sizes = SIZES;
  readonly loadingDemo = signal(false);
}
