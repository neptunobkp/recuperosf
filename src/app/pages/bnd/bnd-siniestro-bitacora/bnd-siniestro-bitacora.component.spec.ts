import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndSiniestroBitacoraComponent } from './bnd-siniestro-bitacora.component';

describe('BndSiniestroBitacoraComponent', () => {
  let component: BndSiniestroBitacoraComponent;
  let fixture: ComponentFixture<BndSiniestroBitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndSiniestroBitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndSiniestroBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
