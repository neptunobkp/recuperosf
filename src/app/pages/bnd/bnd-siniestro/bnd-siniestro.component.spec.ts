import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndSiniestroComponent } from './bnd-siniestro.component';

describe('BndSiniestroComponent', () => {
  let component: BndSiniestroComponent;
  let fixture: ComponentFixture<BndSiniestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndSiniestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
