import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndAsignacionComponent } from './bnd-asignacion.component';

describe('BndAsignacionComponent', () => {
  let component: BndAsignacionComponent;
  let fixture: ComponentFixture<BndAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
