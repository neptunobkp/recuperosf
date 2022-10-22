import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndResultadosComponent } from './bnd-resultados.component';

describe('BndResultadosComponent', () => {
  let component: BndResultadosComponent;
  let fixture: ComponentFixture<BndResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
