import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndAsignacionJudicialComponent } from './bnd-asignacion-judicial.component';

describe('BndAsignacionJudicialComponent', () => {
  let component: BndAsignacionJudicialComponent;
  let fixture: ComponentFixture<BndAsignacionJudicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndAsignacionJudicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndAsignacionJudicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
