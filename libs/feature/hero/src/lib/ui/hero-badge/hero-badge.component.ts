import { Component, HostBinding, Input } from '@angular/core';

import { Hero } from '../../models/hero.model';

export const Layouts = {
  portrait: 'portrait',
  standard: 'standard',
  landscape: 'landscape',
};

export const Sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
};

@Component({
  selector: 'rx-hero-badge',
  template: `
    <div *ngIf="hero">
      <img
        class="rounded"
        [src]="hero.thumbnail.path + '/' + layout + '_' + size + '.' + hero.thumbnail.extension"
        (load)="loaded = true"
      />
      <div>{{ hero.name }}</div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 100px;
        transition: opacity 250ms linear, transform 100ms linear;
        transform: scale(1);
      }
      :host:not(.loaded) {
        opacity: 0;
      }
      :host.loaded {
        opacity: 1;
      }
      :host:hover {
        transform: scale(1.05);
      }
    `,
  ],
})
export class HeroBadgeComponent {
  @Input() hero: Hero | undefined;
  @Input() layout = Layouts.standard;
  @Input() size = Sizes.medium;

  @HostBinding('class.loaded')
  loaded = false;
}
