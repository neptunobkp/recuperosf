import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndRecuperadosComponent } from './bnd-recuperados.component';

describe('BndRecuperadosComponent', () => {
  let component: BndRecuperadosComponent;
  let fixture: ComponentFixture<BndRecuperadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndRecuperadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndRecuperadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
