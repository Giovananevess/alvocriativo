import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExecutivo } from './dashboard-executivo';

describe('DashboardExecutivo', () => {
  let component: DashboardExecutivo;
  let fixture: ComponentFixture<DashboardExecutivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardExecutivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardExecutivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
