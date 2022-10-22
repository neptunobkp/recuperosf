import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndTablaAdjuntosComponent } from './bnd-tabla-adjuntos.component';

describe('BndTablaAdjuntosComponent', () => {
  let component: BndTablaAdjuntosComponent;
  let fixture: ComponentFixture<BndTablaAdjuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndTablaAdjuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndTablaAdjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
