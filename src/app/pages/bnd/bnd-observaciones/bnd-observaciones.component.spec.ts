import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndObservacionesComponent } from './bnd-observaciones.component';

describe('BndObservacionesComponent', () => {
  let component: BndObservacionesComponent;
  let fixture: ComponentFixture<BndObservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndObservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
