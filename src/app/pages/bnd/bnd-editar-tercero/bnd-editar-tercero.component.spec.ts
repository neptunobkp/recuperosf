import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndEditarTerceroComponent } from './bnd-editar-tercero.component';

describe('BndEditarTerceroComponent', () => {
  let component: BndEditarTerceroComponent;
  let fixture: ComponentFixture<BndEditarTerceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndEditarTerceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndEditarTerceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
