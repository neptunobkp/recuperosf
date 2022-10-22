import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeldaAlertaComponent } from './celda-alerta.component';

describe('CeldaAlertaComponent', () => {
  let component: CeldaAlertaComponent;
  let fixture: ComponentFixture<CeldaAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeldaAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeldaAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
