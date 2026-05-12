import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapInteligente } from './roadmap-inteligente';

describe('RoadmapInteligente', () => {
  let component: RoadmapInteligente;
  let fixture: ComponentFixture<RoadmapInteligente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapInteligente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapInteligente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
