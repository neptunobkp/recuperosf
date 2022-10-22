import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoConEjecutivoComponent } from './dialogo-con-ejecutivo.component';

describe('DialogoConEjecutivoComponent', () => {
  let component: DialogoConEjecutivoComponent;
  let fixture: ComponentFixture<DialogoConEjecutivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoConEjecutivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoConEjecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
