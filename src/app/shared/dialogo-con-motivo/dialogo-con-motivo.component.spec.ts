import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoConMotivoComponent } from './dialogo-con-motivo.component';

describe('DialogoConMotivoComponent', () => {
  let component: DialogoConMotivoComponent;
  let fixture: ComponentFixture<DialogoConMotivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoConMotivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoConMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
