import { Component, computed, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-code-block',
  standalone: true,
  template: `
    <div class="code-wrap">
      <button class="copy-btn" (click)="copy()" [attr.aria-label]="copied() ? 'Copied' : 'Copy code'">
        @if (copied()) {
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        } @else {
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
        }
      </button>
      <pre class="code-pre"><code [innerHTML]="highlighted()"></code></pre>
    </div>
  `,
  styles: `
    .code-wrap {
      position: relative;
      background: var(--nga-color-card);
      border: 1px solid var(--nga-color-border);
      border-radius: var(--nga-radius-lg);
      overflow: hidden;
    }
    .code-pre {
      margin: 0; padding: 1.25rem 1.5rem;
      overflow-x: auto;
      font-family: var(--nga-font-mono);
      font-size: 0.8125rem; line-height: 1.7;
      color: var(--nga-color-foreground);
    }
    .copy-btn {
      position: absolute; top: 0.75rem; right: 0.75rem;
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
      background: var(--nga-color-muted);
      border: 1px solid var(--nga-color-border);
      border-radius: var(--nga-radius-md);
      color: var(--nga-color-muted-foreground);
      cursor: pointer; transition: color 150ms, background 150ms;
    }
    .copy-btn:hover { color: var(--nga-color-foreground); background: var(--nga-color-secondary); }

    /* Minimal token coloring using CSS */
    :host ::ng-deep .token.keyword   { color: oklch(60% 0.12 280); }
    :host ::ng-deep .token.string    { color: oklch(62% 0.10 148); }
    :host ::ng-deep .token.comment   { color: var(--nga-color-muted-foreground); font-style: italic; }
    :host ::ng-deep .token.function  { color: oklch(65% 0.10 230); }
    :host ::ng-deep .token.number    { color: oklch(65% 0.10 30); }
    :host ::ng-deep .token.operator,
    :host ::ng-deep .token.punctuation { color: var(--nga-color-muted-foreground); }
    :host ::ng-deep .token.tag .token.tag { color: oklch(60% 0.10 20); }
    :host ::ng-deep .token.attr-name { color: oklch(65% 0.08 280); }
    :host ::ng-deep .token.attr-value { color: oklch(62% 0.10 148); }
  `,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');

  private readonly platformId = inject(PLATFORM_ID);
  readonly copied = signal(false);

  readonly highlighted = computed(() => {
    const code = this.code();
    const lang = this.language();
    try {
      if (isPlatformBrowser(this.platformId)) {
        const Prism = (window as any).Prism;
        if (Prism && Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang);
        }
      }
    } catch {}
    return this.escapeHtml(code);
  });

  copy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  private escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
