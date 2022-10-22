import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndCierreEstudiosComponent } from './bnd-cierre-estudios.component';

describe('BndCierreEstudiosComponent', () => {
  let component: BndCierreEstudiosComponent;
  let fixture: ComponentFixture<BndCierreEstudiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndCierreEstudiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndCierreEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
