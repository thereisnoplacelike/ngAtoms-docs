import { Component, input, signal } from '@angular/core';
import { CodeBlockComponent } from '../code-block/code-block.component';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="preview-wrap">
      <div class="preview-tabs">
        <button class="tab" [class.active]="tab() === 'preview'" (click)="tab.set('preview')">Preview</button>
        <button class="tab" [class.active]="tab() === 'code'" (click)="tab.set('code')">Code</button>
      </div>
      <div class="preview-body">
        @if (tab() === 'preview') {
          <div class="preview-canvas">
            <ng-content />
          </div>
        } @else {
          <app-code-block [code]="code()" [language]="language()" />
        }
      </div>
    </div>
  `,
  styles: `
    .preview-wrap {
      border: 1px solid var(--nga-color-border);
      border-radius: var(--nga-radius-lg);
      overflow: hidden;
    }
    .preview-tabs {
      display: flex;
      border-bottom: 1px solid var(--nga-color-border);
      background: var(--nga-color-muted);
      padding: 0 0.75rem;
      gap: 0.25rem;
    }
    .tab {
      font-size: 0.8125rem; font-weight: 500;
      padding: 0.625rem 0.75rem;
      border: none; background: transparent; cursor: pointer;
      color: var(--nga-color-muted-foreground);
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: color 150ms, border-color 150ms;
    }
    .tab:hover { color: var(--nga-color-foreground); }
    .tab.active { color: var(--nga-color-foreground); border-bottom-color: var(--nga-color-foreground); }
    .preview-canvas {
      display: flex; align-items: center; justify-content: center;
      flex-wrap: wrap; gap: 1rem;
      padding: 3rem 2rem;
      background: var(--nga-color-background);
      min-height: 140px;
    }
  `,
})
export class ComponentPreviewComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('html');
  readonly tab = signal<'preview' | 'code'>('preview');
}
