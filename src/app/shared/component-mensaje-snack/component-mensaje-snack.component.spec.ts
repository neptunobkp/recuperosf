import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMensajeSnackComponent } from './component-mensaje-snack.component';

describe('ComponentMensajeSnackComponent', () => {
  let component: ComponentMensajeSnackComponent;
  let fixture: ComponentFixture<ComponentMensajeSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentMensajeSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMensajeSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
