import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndCertificacionComponent } from './bnd-certificacion.component';

describe('BndCertificacionComponent', () => {
  let component: BndCertificacionComponent;
  let fixture: ComponentFixture<BndCertificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndCertificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndCertificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
