import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndSiniestroGestionComponent } from './bnd-siniestro-gestion.component';

describe('BndSiniestroGestionComponent', () => {
  let component: BndSiniestroGestionComponent;
  let fixture: ComponentFixture<BndSiniestroGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndSiniestroGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndSiniestroGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
