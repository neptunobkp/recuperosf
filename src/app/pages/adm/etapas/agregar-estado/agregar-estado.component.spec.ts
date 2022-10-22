import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEstadoComponent } from './agregar-estado.component';

describe('AgregarEstadoComponent', () => {
  let component: AgregarEstadoComponent;
  let fixture: ComponentFixture<AgregarEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
