import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndTablaObservacionesComponent } from './bnd-tabla-observaciones.component';

describe('BndTablaObservacionesComponent', () => {
  let component: BndTablaObservacionesComponent;
  let fixture: ComponentFixture<BndTablaObservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndTablaObservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndTablaObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
