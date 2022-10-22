import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeldaGestionComponent } from './celda-gestion.component';

describe('CeldaGestionComponent', () => {
  let component: CeldaGestionComponent;
  let fixture: ComponentFixture<CeldaGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeldaGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeldaGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
