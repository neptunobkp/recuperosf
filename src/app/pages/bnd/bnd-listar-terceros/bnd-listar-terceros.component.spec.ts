import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndListarTercerosComponent } from './bnd-listar-terceros.component';

describe('BndListarTercerosComponent', () => {
  let component: BndListarTercerosComponent;
  let fixture: ComponentFixture<BndListarTercerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndListarTercerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndListarTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
