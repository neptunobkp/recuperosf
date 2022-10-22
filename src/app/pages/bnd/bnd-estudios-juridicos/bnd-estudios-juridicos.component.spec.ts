import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndEstudiosJuridicosComponent } from './bnd-estudios-juridicos.component';

describe('BndEstudiosJuridicosComponent', () => {
  let component: BndEstudiosJuridicosComponent;
  let fixture: ComponentFixture<BndEstudiosJuridicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndEstudiosJuridicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndEstudiosJuridicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
