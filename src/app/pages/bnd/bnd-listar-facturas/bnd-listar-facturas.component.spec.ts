import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndListarFacturasComponent } from './bnd-listar-facturas.component';

describe('BndListarFacturasComponent', () => {
  let component: BndListarFacturasComponent;
  let fixture: ComponentFixture<BndListarFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndListarFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndListarFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
