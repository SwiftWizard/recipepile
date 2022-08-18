import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPagecarouselComponent } from './landing-pagecarousel.component';

describe('LandingPagecarouselComponent', () => {
  let component: LandingPagecarouselComponent;
  let fixture: ComponentFixture<LandingPagecarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPagecarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPagecarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
