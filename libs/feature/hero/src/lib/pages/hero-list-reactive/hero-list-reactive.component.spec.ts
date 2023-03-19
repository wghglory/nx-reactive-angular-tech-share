import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListReactiveComponent } from './hero-list-reactive.component';

describe('HeroListReactiveComponent', () => {
  let component: HeroListReactiveComponent;
  let fixture: ComponentFixture<HeroListReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroListReactiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
