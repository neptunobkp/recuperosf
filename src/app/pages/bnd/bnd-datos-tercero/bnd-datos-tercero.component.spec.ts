import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndDatosTerceroComponent } from './bnd-datos-tercero.component';

describe('BndDatosTerceroComponent', () => {
  let component: BndDatosTerceroComponent;
  let fixture: ComponentFixture<BndDatosTerceroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndDatosTerceroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndDatosTerceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
