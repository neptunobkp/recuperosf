import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEtapasComponent } from './contenedor-etapas.component';

describe('ContenedorEtapasComponent', () => {
  let component: ContenedorEtapasComponent;
  let fixture: ComponentFixture<ContenedorEtapasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenedorEtapasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
