import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BndPestanasSiniestroComponent } from './bnd-pestanas-siniestro.component';

describe('BndPestanasSiniestroComponent', () => {
  let component: BndPestanasSiniestroComponent;
  let fixture: ComponentFixture<BndPestanasSiniestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BndPestanasSiniestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BndPestanasSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
