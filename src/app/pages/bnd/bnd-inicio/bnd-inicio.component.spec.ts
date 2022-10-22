import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndInicioComponent } from './bnd-inicio.component';

describe('BndInicioComponent', () => {
  let component: BndInicioComponent;
  let fixture: ComponentFixture<BndInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
