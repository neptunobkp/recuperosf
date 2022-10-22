import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndFiltrosComponent } from './bnd-filtros.component';

describe('BndFiltrosComponent', () => {
  let component: BndFiltrosComponent;
  let fixture: ComponentFixture<BndFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
