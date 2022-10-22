import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndTablaBitacoraComponent } from './bnd-tabla-bitacora.component';

describe('BndTablaBitacoraComponent', () => {
  let component: BndTablaBitacoraComponent;
  let fixture: ComponentFixture<BndTablaBitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndTablaBitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndTablaBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
