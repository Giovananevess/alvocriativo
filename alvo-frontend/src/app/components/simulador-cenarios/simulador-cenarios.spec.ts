import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorCenarios } from './simulador-cenarios';

describe('SimuladorCenarios', () => {
  let component: SimuladorCenarios;
  let fixture: ComponentFixture<SimuladorCenarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorCenarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorCenarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
