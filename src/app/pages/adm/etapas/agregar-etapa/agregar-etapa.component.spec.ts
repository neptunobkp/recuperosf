import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEtapaComponent } from './agregar-etapa.component';

describe('AgregarEtapaComponent', () => {
  let component: AgregarEtapaComponent;
  let fixture: ComponentFixture<AgregarEtapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEtapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
