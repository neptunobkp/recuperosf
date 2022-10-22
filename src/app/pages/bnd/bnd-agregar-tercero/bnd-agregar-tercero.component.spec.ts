import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndAgregarTerceroComponent } from './bnd-agregar-tercero.component';

describe('BndAgregarTerceroComponent', () => {
  let component: BndAgregarTerceroComponent;
  let fixture: ComponentFixture<BndAgregarTerceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndAgregarTerceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndAgregarTerceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
