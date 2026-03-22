import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly dark = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('nga-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.dark.set(stored ? stored === 'dark' : prefersDark);
    }

    effect(() => {
      const isDark = this.dark();
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('nga-theme', isDark ? 'dark' : 'light');
      }
    });
  }

  toggle(): void {
    this.dark.update(v => !v);
  }
}
