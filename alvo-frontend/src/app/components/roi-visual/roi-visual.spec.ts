import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiVisual } from './roi-visual';

describe('RoiVisual', () => {
  let component: RoiVisual;
  let fixture: ComponentFixture<RoiVisual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoiVisual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoiVisual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
