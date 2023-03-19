import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListImperativeComponent } from './hero-list-imperative.component';

describe('HeroListImperativeComponent', () => {
  let component: HeroListImperativeComponent;
  let fixture: ComponentFixture<HeroListImperativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroListImperativeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListImperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
