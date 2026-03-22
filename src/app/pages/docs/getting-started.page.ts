import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteNavComponent } from '../../components/site-nav/site-nav.component';
import { DocsSidebarComponent } from '../../components/docs-sidebar/docs-sidebar.component';
import { CodeBlockComponent } from '../../components/code-block/code-block.component';

const SNIPPETS = {
  install: `npm install ngatoms`,
  init: `npx ngatoms init`,
  initOutput: `? Where should components be copied? (src/components)
? Which styles file should imports be added to? (src/styles.css)
? Create a theme template? (Y/n)

✓ Created ngatoms.json
✓ Created src/themes/default.css
✓ Updated src/styles.css`,
  addButton: `npx ngatoms add button`,
  addOutput: `✓ Added button to src/components/button/
✓ Updated src/styles.css`,
  usage: `import { NgAtomsButtonDirective } from './components/button/button.directive';

@Component({
  imports: [NgAtomsButtonDirective],
  template: \`
    <button ngAtomsButton>Click me</button>
    <button ngAtomsButton variant="outline">Outline</button>
    <button ngAtomsButton variant="destructive" size="lg">Delete</button>
  \`,
})
export class MyComponent {}`,
};

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [RouterLink, SiteNavComponent, DocsSidebarComponent, CodeBlockComponent],
  template: `
    <app-site-nav />
    <div class="layout">
      <app-docs-sidebar />
      <main class="content">
        <div class="prose">
          <h1>Getting Started</h1>
          <p class="lead">
            NgAtoms is a CLI that copies Angular UI primitives into your project.
            You own the code — edit it, style it, delete it.
          </p>

          <h2>Installation</h2>
          <p>Install the <code>ngatoms</code> CLI from npm:</p>
          <app-code-block [code]="s.install" language="bash" />

          <h2>Initialize your project</h2>
          <p>
            Run <code>init</code> in your Angular project root. It creates a
            <code>ngatoms.json</code> config file and optionally scaffolds a
            CSS theme file with all design tokens.
          </p>
          <app-code-block [code]="s.init" language="bash" />
          <app-code-block [code]="s.initOutput" language="bash" />

          <h2>Add a component</h2>
          <p>
            Use the <code>add</code> command to copy a component into your project.
            The CLI downloads the latest source files and wires up the CSS import automatically.
          </p>
          <app-code-block [code]="s.addButton" language="bash" />
          <app-code-block [code]="s.addOutput" language="bash" />

          <h2>Use it</h2>
          <p>
            Import the directive as a standalone component and use it in your templates.
            The component lives in <em>your</em> <code>src/components/</code> folder —
            open it, change it, make it yours.
          </p>
          <app-code-block [code]="s.usage" language="typescript" />

          <div class="next-steps">
            <p style="margin:0; font-weight:600;">Next</p>
            <a routerLink="/docs/components/button" class="next-link">
              Button component →
            </a>
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
    .prose { max-width: 680px; }
    .prose app-code-block { display: block; margin: 1rem 0; }

    .next-steps {
      margin-top: 3rem; padding: 1.5rem;
      background: var(--nga-color-card);
      border: 1px solid var(--nga-color-border);
      border-radius: var(--nga-radius-lg);
      display: flex; align-items: center; justify-content: space-between;
    }
    .next-link {
      font-size: 0.9375rem; font-weight: 500;
      color: var(--nga-color-muted-foreground);
      text-decoration: none; transition: color 150ms;
    }
    .next-link:hover { color: var(--nga-color-foreground); }
  `,
})
export default class GettingStartedPage {
  readonly s = SNIPPETS;
}
