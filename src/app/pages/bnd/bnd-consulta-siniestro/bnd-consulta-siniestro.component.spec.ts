import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndConsultaSiniestroComponent } from './bnd-consulta-siniestro.component';

describe('BndConsultaSiniestroComponent', () => {
  let component: BndConsultaSiniestroComponent;
  let fixture: ComponentFixture<BndConsultaSiniestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndConsultaSiniestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndConsultaSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
